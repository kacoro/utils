// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// eslint-disable-next-line @typescript-eslint/ban-types
function restArguments(func:Function, startIndex?:number) {
    startIndex = startIndex == null ? func.length - 1 : +startIndex;
    return function() {
      const length = Math.max(arguments.length - startIndex, 0),
          rest = Array(length);
          let  index = 0;
      for (; index < length; index++) {
        // eslint-disable-next-line prefer-rest-params
        rest[index] = arguments[index + startIndex];
      }
      switch (startIndex) {
        case 0: return func.call(this, rest);
        // eslint-disable-next-line prefer-rest-params
        case 1: return func.call(this, arguments[0], rest);
        // eslint-disable-next-line prefer-rest-params
        case 2: return func.call(this, arguments[0], arguments[1], rest);
      }
      const args = Array(startIndex + 1);
      for (index = 0; index < startIndex; index++) {
        // eslint-disable-next-line prefer-rest-params
        args[index] = arguments[index];
      }
      args[startIndex] = rest;
      return func.apply(this, args);
    };
  }
  export default restArguments