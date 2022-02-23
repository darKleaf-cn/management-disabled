// 获取url中的参数
export default function (url) {
  const arr = url.split(/\?|&/);
  arr.shift();
  const obj = {};
  for (const item of arr) {
    obj[item.split('=')[0]] = item.split('=')[1];
  }
  return obj;
}
