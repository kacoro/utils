import debounce from './utils/debounce';
import throttle from './utils/throttle';
import Numbers from './utils/number';
import isEmpty from './utils/isEmpty';
import isNotEmpty from './utils/isNotEmpty';
export { debounce, throttle, Numbers, isEmpty, isNotEmpty };
declare const _default: {
    debounce: typeof debounce;
    throttle: typeof throttle;
    Numbers: {
        strip: typeof import("./utils/number").strip;
        plus: typeof import("./utils/number").plus;
        minus: typeof import("./utils/number").minus;
        times: typeof import("./utils/number").times;
        divide: typeof import("./utils/number").divide;
        round: typeof import("./utils/number").round;
        digitLength: typeof import("./utils/number").digitLength;
        float2Fixed: typeof import("./utils/number").float2Fixed;
        enableBoundaryChecking: typeof import("./utils/number").enableBoundaryChecking;
    };
    isEmpty: (val: any) => boolean;
    isNotEmpty: typeof isNotEmpty;
};
export default _default;
