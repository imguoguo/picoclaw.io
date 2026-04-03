// Chat demo scene data for homepage typewriter effect

export const CHAT_SCENES: Record<string, Array<{ user: string; reply: string }>> = {
  en: [
    {
      user: 'Write a Python script to monitor CPU temperature on Raspberry Pi',
      reply: 'Here\'s a lightweight monitoring script:\n```python\nimport subprocess, time\ndef get_temp():\n    out = subprocess.check_output(["vcgencmd", "measure_temp"]).decode()\n    return float(out.split("=")[1].split("\'")[0])\nwhile True:\n    t = get_temp()\n    print(f"CPU: {t}\u00b0C" + (" \u26a0\ufe0f" if t > 70 else " \u2705"))\n    time.sleep(5)\n```\nSaved to `~/monitor.py`. Run with `python3 monitor.py`.',
    },
    {
      user: 'Summarize today\'s top AI news',
      reply: '\ud83d\udcf0 Here\'s today\'s AI digest:\n\n1. **Claude 4.6 released** \u2014 1M context, faster output\n2. **DeepSeek open-sources R2** \u2014 new reasoning model\n3. **Llama 4 Scout** \u2014 10M context on 16 GPUs\n\nWant me to set up a daily auto-summary?',
    },
    {
      user: 'Remind me every day at 9am to check server status',
      reply: '\u2705 Scheduled! Created cron job:\n```\n0 9 * * * picoclaw agent -m "Check all server status and report any issues"\n```\nI\'ll check your servers every morning at 9:00 and generate a report.',
    },
  ],
  zh: [
    {
      user: '\u5199\u4e00\u4e2a Python \u811a\u672c\u76d1\u63a7\u6811\u8393\u6d3e CPU \u6e29\u5ea6',
      reply: '\u8fd9\u662f\u4e00\u4e2a\u8f7b\u91cf\u76d1\u63a7\u811a\u672c\uff1a\n```python\nimport subprocess, time\ndef get_temp():\n    out = subprocess.check_output(["vcgencmd", "measure_temp"]).decode()\n    return float(out.split("=")[1].split("\'")[0])\nwhile True:\n    t = get_temp()\n    print(f"CPU: {t}\u00b0C" + (" \u26a0\ufe0f" if t > 70 else " \u2705"))\n    time.sleep(5)\n```\n\u5df2\u4fdd\u5b58\u5230 `~/monitor.py`\uff0c\u8fd0\u884c `python3 monitor.py` \u5373\u53ef\u3002',
    },
    {
      user: '\u603b\u7ed3\u4eca\u5929\u7684 AI \u70ed\u70b9\u65b0\u95fb',
      reply: '\ud83d\udcf0 \u4eca\u65e5 AI \u901f\u62a5\uff1a\n\n1. **Claude 4.6 \u53d1\u5e03** \u2014 1M \u4e0a\u4e0b\u6587\uff0c\u8f93\u51fa\u66f4\u5feb\n2. **DeepSeek \u5f00\u6e90 R2** \u2014 \u5168\u65b0\u63a8\u7406\u6a21\u578b\n3. **Llama 4 Scout** \u2014 16 GPU \u652f\u6301 10M \u4e0a\u4e0b\u6587\n\n\u9700\u8981\u6211\u8bbe\u7f6e\u6bcf\u65e5\u81ea\u52a8\u603b\u7ed3\u5417\uff1f',
    },
    {
      user: '\u6bcf\u5929\u65e9\u4e0a 9 \u70b9\u63d0\u9192\u6211\u68c0\u67e5\u670d\u52a1\u5668\u72b6\u6001',
      reply: '\u2705 \u5df2\u8bbe\u7f6e\uff01\u521b\u5efa\u4e86\u5b9a\u65f6\u4efb\u52a1\uff1a\n```\n0 9 * * * picoclaw agent -m "\u68c0\u67e5\u6240\u6709\u670d\u52a1\u5668\u72b6\u6001\u5e76\u62a5\u544a\u95ee\u9898"\n```\n\u6bcf\u5929\u65e9\u4e0a 9:00 \u6211\u4f1a\u81ea\u52a8\u68c0\u67e5\u4f60\u7684\u670d\u52a1\u5668\u5e76\u751f\u6210\u62a5\u544a\u3002',
    },
  ],
};
