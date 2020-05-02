---
category: 编程
tags:
  - typescirpt
date: 2020-03-30
title: typescript学习（二）
---

## Typescript 学习（二）

### 在全局环境中国，不能给某些变量声明类型

```ts
let name: string;

// 加了 export 后就不会报错
// export {} 
```

### 不必要的命名空间

命名空间和模块不要混在一起使用，不要在一个模块种使用命名空间，命名空间要在一个全局的环境中使用。

```ts
// all.ts
export namespace All {
  export class A {}
  export class B {}
}
//c.ts
import * as ALL from "./All"

```
不要再模块中使用命名空间或者将命名空间导出

你可以这样
```ts
// all.ts
export class a {}
export class b {}

// c.ts 
import * as ALL from "./All"
```

也可以这样
```ts
// all.ts
namespace All {
  export class a{}
  export class b{}
}
//c.ts
let c = new All.a()
```

### export = xxx 和 import xxx = require('xxx')

* 在CommonJs和AMD的环境中，两者是不能兼容存在的。
* typescript 中，可以通过下列写法来达到兼容操作
```ts
export = function () {
  console.log('xxx')
}


//b.ts 
import fn = require('./a.ts')
fn()
```
### 对Js文件进行类型检测
* 在tsconfig.json中可以设置 **checkJs:true**, 对.js文件进行类型检测
1. 可以在**.js**文件顶部添加 // @ts-nocheck , 忽略检测
2. // @ts-ignore 可以忽略本行错误
```ts
/**
 * @type {string | boolean}
 */
var sb;
```
* ts对js的类型判断可以参考 [https://www.typescriptlang.org/docs/handbook/type-checking-javascript-files.html#supported-jsdoc](https://www.typescriptlang.org/docs/handbook/type-checking-javascript-files.html#supported-jsdoc)

### 不要使用如下类型的Number，String, Boolean, Object, 应该使用类型 number、string、boolean、object
```ts
/** 错误 **/
function reverse(s:String): String

/** OK */
function reverse(s:stirng): string
```

### Pick 摘取返回的接口是一个对象， 里面包含摘取的属性

```ts
interface Test {
    arr: string[]
}

let aaa: Pick<Test, 'arr'> = {arr: ['1']}
```

###  无法使用 for of 遍历 map 数据

```ts
const map = new Map([
  ['F', 'no']
])
```