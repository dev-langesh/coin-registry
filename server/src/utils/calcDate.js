function calculateDate() {
  const d = new Date();

  // calc today date
  const dt = d.getDate();
  const m = d.getMonth() + 1;
  const y = d.getFullYear();

  const date = `${dt}-${m}-${y}`;

  // calc current time
  let hr = d.getHours();

  hr = hr % 12 || 12;

  const min = d.getMinutes();

  const in_time = `${hr}:${min}`;

  return { date, in_time };
}

module.exports = { calculateDate };
