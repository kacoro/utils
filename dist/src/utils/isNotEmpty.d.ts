declare type valueType = number | string | [];
/**
 * @description 验证数据是否不为空（空值时返回false，null、undefined、空字符串、空数组、空对象都被设定为空）
 * @param value {any}  数据
 * @returns Boolean
**/
export declare function isNotEmpty(value: valueType): boolean;
export default isNotEmpty;
