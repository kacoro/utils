type valueType = number | string | [];
/**  
 * @description 验证数据是否不为空（空值时返回false，null、undefined、空字符串、空数组、空对象都被设定为空）
 * @param value {any}  数据
 * @returns Boolean
**/
export function isNotEmpty(value:valueType):boolean {
    switch (typeof value) {
        case "undefined": {
            return false;
        }

        case "string": {
            return value.length !== 0;
        }

        case "object": {
            if (Array.isArray(value)) {
                return value.length !== 0;
            } else if (value === null) {
                return false;
            } else {
                return Object.keys(value).length !== 0;
            }
        }

        default: {
            return true;
        }
    }
}
export default isNotEmpty