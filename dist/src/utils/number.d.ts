declare type numType = number | string;
/**
 * @desc 解决浮动运算问题，避免小数点后产生多位数和计算精度损失。
 * 问题示例：2.3 + 2.4 = 4.699999999999999，1.0 - 0.9 = 0.09999999999999998
 */
/**
 * 把错误的数据转正
 * strip(0.09999999999999998)=0.1
 */
declare function strip(num: numType, precision?: number): number;
/**
 * Return digits length of a number
 * @param {*number} num Input number
 */
declare function digitLength(num: numType): number;
/**
 * 把小数转成整数，支持科学计数法。如果是小数则放大成整数
 * @param {*number} num 输入数
 */
declare function float2Fixed(num: numType): number;
/**
 * 精确乘法
 */
declare function times(num1: numType, num2: numType, ...others: numType[]): number;
/**
 * 精确加法
 */
declare function plus(num1: numType, num2: numType, ...others: numType[]): number;
/**
 * 精确减法
 */
declare function minus(num1: numType, num2: numType, ...others: numType[]): number;
/**
 * 精确除法
 */
declare function divide(num1: numType, num2: numType, ...others: numType[]): number;
/**
 * 四舍五入
 */
declare function round(num: numType, ratio: number): number;
/**
 * 是否进行边界检查，默认开启
 * @param flag 标记开关，true 为开启，false 为关闭，默认为 true
 */
declare function enableBoundaryChecking(flag?: boolean): boolean;
export { strip, plus, minus, times, divide, round, digitLength, float2Fixed, enableBoundaryChecking };
declare const _default: {
    strip: typeof strip;
    plus: typeof plus;
    minus: typeof minus;
    times: typeof times;
    divide: typeof divide;
    round: typeof round;
    digitLength: typeof digitLength;
    float2Fixed: typeof float2Fixed;
    enableBoundaryChecking: typeof enableBoundaryChecking;
};
export default _default;
