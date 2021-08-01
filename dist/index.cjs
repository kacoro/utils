'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing. The function also has a property 'clear'
 * that is a function which will clear the timer to prevent previously scheduled executions.
 *
 * @source underscore.js
 * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
 * @param {Function} function to wrap
 * @param {Number} timeout in ms (`100`)
 * @param {Boolean} whether to execute at the beginning (`false`)
 * @api public
 */
function debounce(func, wait, immediate) {
    let timeout, args, context, timestamp, result;
    if (null == wait)
        wait = 100;
    function later() {
        const last = Date.now() - timestamp;
        if (last < wait && last >= 0) {
            timeout = setTimeout(later, wait - last);
        }
        else {
            timeout = null;
            if (!immediate) {
                result = func.apply(context, args);
                context = args = null;
            }
        }
    }
    const debounced = function () {
        context = this;
        // eslint-disable-next-line prefer-rest-params
        args = arguments;
        timestamp = Date.now();
        const callNow = immediate && !timeout;
        if (!timeout)
            timeout = setTimeout(later, wait);
        if (callNow) {
            result = func.apply(context, args);
            context = args = null;
        }
        return result;
    };
    debounced.clear = function () {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
    };
    debounced.flush = function () {
        if (timeout) {
            result = func.apply(context, args);
            context = args = null;
            clearTimeout(timeout);
            timeout = null;
        }
    };
    return debounced;
}
// Adds compatibility for ES modules
debounce.debounce = debounce;

const now = Date.now || function () {
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
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// eslint-disable-next-line @typescript-eslint/ban-types
function throttle(func, wait, options) {
    let timeout, context, args, result;
    let previous = 0;
    if (!options)
        options = {};
    const later = function () {
        previous = options.leading === false ? 0 : now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout)
            context = args = null;
    };
    const throttled = function () {
        const _now = now();
        if (!previous && options.leading === false)
            previous = _now;
        const remaining = wait - (_now - previous);
        context = this;
        // eslint-disable-next-line prefer-rest-params
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
    return _boundaryCheckingState;
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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
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
