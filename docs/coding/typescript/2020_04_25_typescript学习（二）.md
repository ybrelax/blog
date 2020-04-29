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



