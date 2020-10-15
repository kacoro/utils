import restArguments from './restArguments'
import delay from './delay'
interface Debounced{
  cancel?:Function
}
/**
 * @description 当返回函数的一系列调用结束时，将触发实参函数。序列的末尾由“wait”参数定义。如果传递了' immediate '，参数函数将在序列的开始而不是结束时被触发。
 * @param func {Function}   实际要执行的函数
 * @param wait {Number}  延迟时间，单位是毫秒（ms）
 * @param immediate {Boolean} 配置回调函数是在一个时间区间的最开始执行（immediate为true），还是最后执行（immediate为false），如果immediate为true，意味着是一个同步的回调，可以传递返回值。
 * @return {Function}     返回一个“防反跳”了的函数
 */


function debounce(func:Function, wait:number = 300, immediate:boolean = false) {
    let timeout, result;
  
    let later = function(context, args) {
      timeout = null;
      if (args) result = func.apply(context, args);
    };
  
    let debounced = restArguments(function(args) {
      if (timeout) clearTimeout(timeout);
      if (immediate) {
        let callNow = !timeout;
        timeout = setTimeout(later, wait);
        if (callNow) result = func.apply(this, args);
      } else {
        timeout = delay(later, wait, this, args);
      }
      return result;
    });
  
    (debounced as Debounced).cancel = function() {
      clearTimeout(timeout);
      timeout = null;
    };
  
    return debounced;
  }


  export default debounce;