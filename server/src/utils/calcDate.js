function calculateDate() {
  const d = new Date();

  // calc today date
  const day = d.getDay();
  const m = d.getMonth();
  const y = d.getFullYear();

  const date = `${day}-${m}-${y}`;

  // calc current time
  const hr = Math.floor(d.getHours() / 2);
  const min = d.getMinutes();

  const in_time = `${hr}:${min}`;

  return { date, in_time };
}

module.exports = { calculateDate };
