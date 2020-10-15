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
interface Options {
    leading?: boolean;
    trailing?: boolean;
}
declare function throttle(func: Function, wait: number, options?: Options): () => any;
export default throttle;
