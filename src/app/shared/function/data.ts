export function cloneDeep(data) {
  let parseData = JSON.stringify(data);
  return JSON.parse(parseData);
}

export function compare(object1: any, object2: any, key: string = 'id', order: string = 'ASC') {
  if (order === 'ASC') {
    if (object1[key] < object2[key]) {
      return -1;
    }
  if (object1[key] > object2[key]) {
    return 1;
  }
  return 0;
  } else {
    if (object1[key] > object2[key]) {
      return -1;
    }
  if (object1[key] < object2[key]) {
    return 1;
  }
  return 0;
  }
}
