// $ node --experimental-modules index.mjs
import { debounce, throttle, Numbers, isNotEmpty } from '../dist/index';

function testNumbers() {
    console.log(Numbers.minus(0.1, 0.2, 0.3, 0.4))
    console.log(Numbers.plus(0.1, 0.2, 0.3, 0.4))
    console.log(Numbers.plus(0.1, 0.2, 0.3, 0.4))
}
testNumbers()
function testIsNotEmpty() {
    console.log(isNotEmpty(''))
    console.log(isNotEmpty({}))
    console.log(isNotEmpty(null))
    console.log(isNotEmpty(undefined))
}
testIsNotEmpty()
var debounceInputElmt = document.getElementById('debounceInput');
var debounceTargetElmt = document.getElementById('debounceTarget');

debounceInputElmt.addEventListener('input', debounce(function () {
    debounceTargetElmt.value = (debounceInputElmt.value || '').toUpperCase();
}, 500));

var throttleInputElmt = document.getElementById('throttleInput');
var throttleTargetElmt = document.getElementById('throttleTarget');
throttleInputElmt.addEventListener('input', throttle(function () {
    throttleTargetElmt.value = (throttleInputElmt.value || '').toUpperCase();
}, 500));