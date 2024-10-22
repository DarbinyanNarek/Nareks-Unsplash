import _ from "lodash"
class Utils {

  static isEmail = (value) => /^[a-zA-Z0-9.-]+@[a-zA-Z0-9_.-]+\.[a-zA-Z]{2,20}$/img.test(value);
  static deleteEmptyKeys = (object) => {
    const obj = _.cloneDeep(object);

    for (const propName in obj) {
      if ((typeof obj[propName] !== "boolean" && typeof obj[propName] !== "number")
        && (typeof obj[propName] === "object" ? _.isEmpty(obj[propName]) : !obj[propName].trim())) {
        delete obj[propName];
      }
    }
    return obj
  };
}
export default Utils
