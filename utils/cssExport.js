export function makeCSS(arr) {
  let cssObj = {};

  for (let i = 0; i < arr.length; i++) {
    cssObj[`$color${i + 1}`] = arr[i].color;
  }
  const data = encodeURI(cssObj);

  return data;
}
