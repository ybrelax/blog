---
category: 前端
tags:
  - javascript
date: 2020-04-10
title: call、apply和bind
---

三者之间的关系，主要简述了 this 的指向和函数的调用方式


* apply

通过**apply**方法可以改变**this**的指向，从一个context 传到另外一个。

```js
// 一个对象可以作为call和apply的第一个参数，并且this会被绑定到这个对象。
var obj = {a: 'Custom'};

// 这个属性是在global对象定义的。
var a = 'Global';

function whatsThis(arg) {
  return this.a;  // this的值取决于函数的调用方式
}

whatsThis();          // 直接调用，      返回'Global'
whatsThis.call(obj);  // 通过call调用，  返回'Custom'
whatsThis.apply(obj); // 通过apply调用 ，返回'Custom'
```