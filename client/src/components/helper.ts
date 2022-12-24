export default class Helper {
  [key: string]: any;
  constructor(params: any) {
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        this[key] = params[key];
      }
    }
  }
}

const obj = {
  x: 1,
  y: 2,
  z: 3,
};
