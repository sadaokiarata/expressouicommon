const day = 864e5;

export default function(date) {
  var now = new Date();
  var diff = date - now;
  if (diff <= 0 && Math.abs(diff) < day && now.getDate() === date.getDate()) {
    return "present";
  } else {
    return diff > 0 ? "future" : "past";
  }
}
