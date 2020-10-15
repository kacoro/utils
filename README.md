# 使用rollup编写一个自己常用的库，支持UMD打包

整合工作中常用的方法集合
使用ts语法
发布到npm
支持jest测试
提供一些exmple,利用serve，浏览，以支持（/example/debounceAndThrottle）

## 主要一些常用的API

- [x]防抖 debounce
- [x]节流 throttle
- [x]数值计算   [Numbers](https://github.com/nefe/number-precision)
- [x]是否为空 isEmpty
- [x]是否不为空 isNotEmpty JAVA后端API时常会出现有可能是null,[],{}的情况。十分头疼，用这个来解决
- [ ]常用的正则校验 （是否是站内链接、账号、密码）
- [ ]常用的算法 （数组、或者对象）
- [ ]日期格式化 （是否替代days）
- [ ]类型校验
- [ ]类型转化
- [ ]平台判断
- [ ]设备判断
- [ ]设备信息

## 未收录
深克隆 返回一个新的克隆对象 一般使用 JSON.parse( JSON.stringify (oldObj) ) 有诸多问题，无法复制RegExp，会抛弃constructior，构造函数的constunctor指向Object，对象有循环引用会报错 建议谨慎使用loadash
浅克隆 Object.assign() 只会被克隆最外部的一层，至于内部的对象，则是通过引用指向同一块堆内存。也就是说当对象的内部对象元素被修改时，克隆后的内部对象元素也会改变，这就是浅克隆的弊端，
