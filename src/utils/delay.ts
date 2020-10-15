// Delays a function for the given number of milliseconds, and then calls

import restArguments from "./restArguments";

// it with the arguments supplied.
var delay:Function = restArguments(function(func, wait, args) {
    return setTimeout(function() {
      return func.apply(null, args);
    }, wait);
  });

  export default delay