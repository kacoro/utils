'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function restArguments(func, startIndex) {
    startIndex = startIndex == null ? func.length - 1 : +startIndex;
    return function () {
        var length = Math.max(arguments.length - startIndex, 0), rest = Array(length), index = 0;
        for (; index < length; index++) {
            rest[index] = arguments[index + startIndex];
        }
        switch (startIndex) {
            case 0: return func.call(this, rest);
            case 1: return func.call(this, arguments[0], rest);
            case 2: return func.call(this, arguments[0], arguments[1], rest);
        }
        var args = Array(startIndex + 1);
        for (index = 0; index < startIndex; index++) {
            args[index] = arguments[index];
        }
        args[startIndex] = rest;
        return func.apply(this, args);
    };
}

// Delays a function for the given number of milliseconds, and then calls
// it with the arguments supplied.
var delay = restArguments(function (func, wait, args) {
    return setTimeout(function () {
        return func.apply(null, args);
    }, wait);
});

/**
 * @description 当返回函数的一系列调用结束时，将触发实参函数。序列的末尾由“wait”参数定义。如果传递了' immediate '，参数函数将在序列的开始而不是结束时被触发。
 * @param func {Function}   实际要执行的函数
 * @param wait {Number}  延迟时间，单位是毫秒（ms）
 * @param immediate {Boolean} 配置回调函数是在一个时间区间的最开始执行（immediate为true），还是最后执行（immediate为false），如果immediate为true，意味着是一个同步的回调，可以传递返回值。
 * @return {Function}     返回一个“防反跳”了的函数
 */
function debounce(func, wait = 300, immediate = false) {
    let timeout, result;
    let later = function (context, args) {
        timeout = null;
        if (args)
            result = func.apply(context, args);
    };
    let debounced = restArguments(function (args) {
        if (timeout)
            clearTimeout(timeout);
        if (immediate) {
            let callNow = !timeout;
            timeout = setTimeout(later, wait);
            if (callNow)
                result = func.apply(this, args);
        }
        else {
            timeout = delay(later, wait, this, args);
        }
        return result;
    });
    debounced.cancel = function () {
        clearTimeout(timeout);
        timeout = null;
    };
    return debounced;
}

var now = Date.now || function () {
    return new Date().getTime();
};

/**
  *@description 返回一个函数，当调用该函数时，在给定的时间段内最多只触发一次。通常，节流函数会尽可能多地运行，而不会在每个“等待”持续时间内运行不止一次;但是如果你想禁用前缘的执行，通过'{leading:false}'。禁用后缘执行，同上。
 * @param func {Function}   实际要执行的函数
 * @param wait {Number}  延迟时间，单位是毫秒（ms）
 * @param options {Object} 配置回调函数是在一个时间区间的最开始执行（immediate为true），还是最后执行（immediate为false），如果immediate为true，意味着是一个同步的回调，可以传递返回值。
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout
 * @return {Function}     返回一个“防反跳”了的函数
  **/
function throttle(func, wait, options) {
    var timeout, context, args, result;
    var previous = 0;
    if (!options)
        options = {};
    var later = function () {
        previous = options.leading === false ? 0 : now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout)
            context = args = null;
    };
    var throttled = function () {
        var _now = now();
        if (!previous && options.leading === false)
            previous = _now;
        var remaining = wait - (_now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = _now;
            result = func.apply(context, args);
            if (!timeout)
                context = args = null;
        }
        else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
    throttled.cancel = function () {
        clearTimeout(timeout);
        previous = 0;
        timeout = context = args = null;
    };
    return throttled;
}

/**
 * @desc 解决浮动运算问题，避免小数点后产生多位数和计算精度损失。
 * 问题示例：2.3 + 2.4 = 4.699999999999999，1.0 - 0.9 = 0.09999999999999998
 */
/**
 * 把错误的数据转正
 * strip(0.09999999999999998)=0.1
 */
function strip(num, precision = 15) {
    return +parseFloat(Number(num).toPrecision(precision));
}
/**
 * Return digits length of a number
 * @param {*number} num Input number
 */
function digitLength(num) {
    // Get digit length of e
    const eSplit = num.toString().split(/[eE]/);
    const len = (eSplit[0].split('.')[1] || '').length - +(eSplit[1] || 0);
    return len > 0 ? len : 0;
}
/**
 * 把小数转成整数，支持科学计数法。如果是小数则放大成整数
 * @param {*number} num 输入数
 */
function float2Fixed(num) {
    if (num.toString().indexOf('e') === -1) {
        return Number(num.toString().replace('.', ''));
    }
    const dLen = digitLength(num);
    return dLen > 0 ? strip(Number(num) * Math.pow(10, dLen)) : Number(num);
}
/**
 * 检测数字是否越界，如果越界给出提示
 * @param {*number} num 输入数
 */
function checkBoundary(num) {
    if (_boundaryCheckingState) {
        if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
            console.warn(`${num} is beyond boundary when transfer to integer, the results may not be accurate`);
        }
    }
}
/**
 * 精确乘法
 */
function times(num1, num2, ...others) {
    if (others.length > 0) {
        return times(times(num1, num2), others[0], ...others.slice(1));
    }
    const num1Changed = float2Fixed(num1);
    const num2Changed = float2Fixed(num2);
    const baseNum = digitLength(num1) + digitLength(num2);
    const leftValue = num1Changed * num2Changed;
    checkBoundary(leftValue);
    return leftValue / Math.pow(10, baseNum);
}
/**
 * 精确加法
 */
function plus(num1, num2, ...others) {
    if (others.length > 0) {
        return plus(plus(num1, num2), others[0], ...others.slice(1));
    }
    const baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
    return (times(num1, baseNum) + times(num2, baseNum)) / baseNum;
}
/**
 * 精确减法
 */
function minus(num1, num2, ...others) {
    if (others.length > 0) {
        return minus(minus(num1, num2), others[0], ...others.slice(1));
    }
    const baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
    return (times(num1, baseNum) - times(num2, baseNum)) / baseNum;
}
/**
 * 精确除法
 */
function divide(num1, num2, ...others) {
    if (others.length > 0) {
        return divide(divide(num1, num2), others[0], ...others.slice(1));
    }
    const num1Changed = float2Fixed(num1);
    const num2Changed = float2Fixed(num2);
    checkBoundary(num1Changed);
    checkBoundary(num2Changed);
    // fix: 类似 10 ** -4 为 0.00009999999999999999，strip 修正
    return times(num1Changed / num2Changed, strip(Math.pow(10, digitLength(num2) - digitLength(num1))));
}
/**
 * 四舍五入
 */
function round(num, ratio) {
    const base = Math.pow(10, ratio);
    return divide(Math.round(times(num, base)), base);
}
let _boundaryCheckingState = true;
/**
 * 是否进行边界检查，默认开启
 * @param flag 标记开关，true 为开启，false 为关闭，默认为 true
 */
function enableBoundaryChecking(flag = true) {
    _boundaryCheckingState = flag;
}
var Numbers = {
    strip,
    plus,
    minus,
    times,
    divide,
    round,
    digitLength,
    float2Fixed,
    enableBoundaryChecking,
};

const isEmpty = val => val === null || !(Object.keys(val) || val).length;

/**
 * @description 验证数据是否不为空（空值时返回false，null、undefined、空字符串、空数组、空对象都被设定为空）
 * @param value {any}  数据
 * @returns Boolean
**/
function isNotEmpty(value) {
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
            }
            else if (value === null) {
                return false;
            }
            else {
                return Object.keys(value).length !== 0;
            }
        }
        default: {
            return true;
        }
    }
}

var index = {
    debounce, throttle, Numbers, isEmpty, isNotEmpty
};

exports.Numbers = Numbers;
exports.debounce = debounce;
exports.default = index;
exports.isEmpty = isEmpty;
exports.isNotEmpty = isNotEmpty;
exports.throttle = throttle;
