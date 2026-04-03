// Chat typewriter utilities for homepage demo

export function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function formatReply(text: string): string {
  var result = escapeHtml(text);
  result = result.replace(/```(\w*)\n([\s\S]*?)```/g, function(_: string, _lang: string, code: string) {
    return '<pre><code>' + code + '</code></pre>';
  });
  result = result.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  result = result.replace(/\n/g, '<br/>');
  result = result.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/g, function(_: string, code: string) {
    return '<pre><code>' + code.replace(/<br\/>/g, '\n') + '</code></pre>';
  });
  return result;
}

export function typeText(el: any, text: string, speed: number, cb: (() => void) | null): void {
  var formatted = formatReply(text);
  el.innerHTML = '';
  var chars: number[] = [];
  var inTag = false;
  for (var c = 0; c < formatted.length; c++) {
    if (formatted[c] === '<') inTag = true;
    if (!inTag) chars.push(c);
    if (formatted[c] === '>') inTag = false;
  }
  var shown = 0;
  function tick() {
    shown += 3;
    if (shown >= chars.length) {
      el.innerHTML = formatted;
      if (cb) (window as any)._chatTimers?.push(setTimeout(cb, 100));
      return;
    }
    var pos = chars[Math.min(shown, chars.length - 1)];
    el.innerHTML = formatted.substring(0, pos + 1);
    (window as any)._chatTimers?.push(setTimeout(tick, speed));
  }
  tick();
}
