#!/bin/bash
# One-time setup: Create and associate CloudFront Function for URL rewriting
# This makes /download/ correctly serve /download/index.html
#
# Prerequisites: AWS CLI configured with proper credentials
# Usage: bash scripts/setup-cloudfront-function.sh

set -e

DISTRIBUTION_ID="EC2YSW0R0BOS6"
FUNCTION_NAME="picoclaw-url-rewrite"

echo "==> Creating CloudFront Function: $FUNCTION_NAME"

# Create the function
aws cloudfront create-function \
  --name "$FUNCTION_NAME" \
  --function-config '{"Comment":"Rewrite /path/ to /path/index.html for Astro static site","Runtime":"cloudfront-js-2.0"}' \
  --function-code "$(cat <<'JSEOF'
function handler(event) {
    var request = event.request;
    var uri = request.uri;

    // If URI ends with '/', append index.html
    if (uri.endsWith('/')) {
        request.uri += 'index.html';
    }
    // If URI has no file extension and doesn't end with '/', add /index.html
    else if (!uri.split('/').pop().includes('.')) {
        request.uri += '/index.html';
    }

    return request;
}
JSEOF
)"

echo "==> Publishing function..."

# Get the ETag for publishing
ETAG=$(aws cloudfront describe-function --name "$FUNCTION_NAME" --query 'ETag' --output text)

aws cloudfront publish-function \
  --name "$FUNCTION_NAME" \
  --if-match "$ETAG"

echo "==> Getting function ARN..."

FUNCTION_ARN=$(aws cloudfront describe-function --name "$FUNCTION_NAME" --stage LIVE --query 'FunctionSummary.FunctionMetadata.FunctionARN' --output text)

echo "    ARN: $FUNCTION_ARN"

echo "==> Associating with CloudFront distribution: $DISTRIBUTION_ID"

# Get current distribution config
aws cloudfront get-distribution-config --id "$DISTRIBUTION_ID" > /tmp/cf-config.json

# Extract ETag and config
CF_ETAG=$(python3 -c "import json; print(json.load(open('/tmp/cf-config.json'))['ETag'])")
python3 -c "
import json

with open('/tmp/cf-config.json') as f:
    data = json.load(f)

config = data['DistributionConfig']

# Add function association to default cache behavior
config['DefaultCacheBehavior']['FunctionAssociations'] = {
    'Quantity': 1,
    'Items': [{
        'FunctionARN': '$FUNCTION_ARN',
        'EventType': 'viewer-request'
    }]
}

with open('/tmp/cf-config-updated.json', 'w') as f:
    json.dump(config, f, indent=2)
"

aws cloudfront update-distribution \
  --id "$DISTRIBUTION_ID" \
  --distribution-config file:///tmp/cf-config-updated.json \
  --if-match "$CF_ETAG"

echo ""
echo "==> Done! CloudFront Function associated."
echo "    /download/  -> /download/index.html"
echo "    /changelog/ -> /changelog/index.html"
echo ""
echo "    It may take a few minutes for the distribution to deploy."
