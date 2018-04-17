export function cloneDeep(data) {
  let parseData = JSON.stringify(data);
  return JSON.parse(parseData);
}
