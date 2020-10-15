import debounce from './src/utils/debounce';
import throttle from './src/utils/throttle';
import Numbers from './src/utils/number';
import isEmpty from './src/utils/isEmpty';
import isNotEmpty from './src/utils/isNotEmpty';
export { debounce, throttle, Numbers, isEmpty, isNotEmpty };
declare const _default: {
    debounce: typeof debounce;
    throttle: typeof throttle;
    Numbers: {
        strip: typeof import("./src/utils/number").strip;
        plus: typeof import("./src/utils/number").plus;
        minus: typeof import("./src/utils/number").minus;
        times: typeof import("./src/utils/number").times;
        divide: typeof import("./src/utils/number").divide;
        round: typeof import("./src/utils/number").round;
        digitLength: typeof import("./src/utils/number").digitLength;
        float2Fixed: typeof import("./src/utils/number").float2Fixed;
        enableBoundaryChecking: typeof import("./src/utils/number").enableBoundaryChecking;
    };
    isEmpty: (val: any) => boolean;
    isNotEmpty: typeof isNotEmpty;
};
export default _default;
