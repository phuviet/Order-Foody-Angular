export function getQuery(params: any, excludes: Array<string> = null) {
  let _params = Object.assign({}, params);
  if (excludes !== null) {
    excludes.forEach((key) => {
      if (_params[key]) {
        delete _params[key];
      }
    });
  }
  return _params;
}

export function parseQuery(params: any, separator: string = '&') {
  let arr: Array<string> = [];
  for (let key in params) {
    let str: string = '';
    let obj = params[key];
    if (typeof obj === 'object') {
      if (obj.length) {
        //parse array to string query like this
        //fields = [1, 2, 3] => fields[]=1&fields[]=2&fields[]=3
        let field = key + '[]=';
        str = field + obj.join(separator + field);
      }
    } else {
      if (obj !== '') {
        str = key + '=' + obj;
      }
    }
    if (str !== '') {
      arr.push(str);
    }
  }
  let cat = separator === '&' ? '?' : ';';
  return arr.length ? cat + arr.join(separator) : '';
}

export function updateQuery(route: any, params: any) {
  let paths: any = route['_urlSegment'].segments;
  paths = paths.map((obj: any) => {
    let item: any;
    item = obj['path'];
    return item;
  });
  Object.keys(params).forEach((key) => {
    if ((key === 'page' && params[key] === '1') || !params[key] || (Array.isArray(params[key]) && params[key].length === 0)) {
      delete params[key];
    }
  });
  return [`${paths.join('/')}`, params];
}
