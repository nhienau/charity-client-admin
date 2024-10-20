export function commafy(num) {
  const str = num.toString().split(".");
  if (str[0].length >= 3) {
    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
  }
  return str.join(".");
}

export function formatDate(str) {
  return new Intl.DateTimeFormat("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(str));
}

export function formatDateTime(str) {
  return new Intl.DateTimeFormat("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "numeric",
  }).format(new Date(str));
}

export function getTimeDiffStr(date1, date2, expiredStr) {
  const timeDiff = date1.getTime() - date2.getTime();
  const secondsDiff = Math.floor(timeDiff / 1000);

  if (secondsDiff <= 0) {
    return expiredStr;
  }
  if (secondsDiff > 0 && secondsDiff < 60) {
    return `Còn ${Math.floor(secondsDiff)} giây`;
  }
  if (secondsDiff >= 60 && secondsDiff < 3600) {
    return `Còn ${Math.floor(secondsDiff / 60)} phút`;
  }
  if (secondsDiff >= 3600 && secondsDiff < 86400) {
    return `Còn ${Math.floor(secondsDiff / (60 * 60))} giờ`;
  }
  if (secondsDiff >= 86400) {
    return `Còn ${Math.floor(secondsDiff / (60 * 60 * 24))} ngày`;
  }
}
