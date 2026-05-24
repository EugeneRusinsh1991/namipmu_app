module.exports = function timer(row) {
  const meta = (row.meta || row.seconds || '').toString();
  let seconds = null;

  if (meta) {
    const m = meta.match(/seconds?=\s*(\d+)/i);
    if (m) seconds = parseInt(m[1], 10);
    else if (/^\d+$/.test(meta.trim())) seconds = parseInt(meta.trim(), 10);
  }

  return {
    seconds: Number.isFinite(seconds) && seconds > 0 ? seconds : undefined,
  };
};
