---
category: 编程
tags:
  - typescirpt
date: 2020-03-30
title: typescript学习（一）
---


## Typescript 学习（一）

### module => namespace

新版本中推荐我们用 namespace 来代替 module

module: 
```ts
module Person {
    export xxx
}
```
namespace:
```ts
module Person {
    export xxx
}
···

### never、undefined、void

* null 和 undefined 是其他类型的（包括void)的子类型，可以赋值给其他类型的

* 默认情况下，编译器会提示错误，这是因为 tsconfig.json 里面有一个配置项是默认开启的。
```json
// tsconfig
{
  "strict": true // 可以关闭这个严格模式
}
```

* never 表示一个不包含值得类型，即不存在

### 元组越界

```ts

let x: [string, number] = ['ybrelax', 10];

x.push(5);

console.log('x:', x);

// error tip: Tuple type '[string, number]' of length '2' has no element at index '2'
console.log(x[0],x[1], x[2])

```

### 枚举成员得特点
* 只读属性，无法修改
* 枚举成员默认从0开始递增，也可以改变初始值
* 可以设置表达式，但是不能数字和其他类型同在一个枚举对象里
* 可以引用其他枚举得变量 ， 但是枚举对象只能有一个类型声明
```ts

enum Gender {
    a = 1,
    b,
    c = Gender.a,
    
    // 单一类型
    body = 'xx',
    girl = '1'
}

console.log(Gender.body);
console.log(Gender);
```

* 使用场景，可以去除一些硬编码操作
```ts
// 使用场景

enum Role {
    superAdmin,
    admin,
    normal
}

function switchRole(role: number) {
    switch(role) {
        case Role.superAdmin: // 1
         console.log('超级管理员');
         break;
         case Role.admin: //2
            console.log("管理员");
            break;
        default: 
            console.log('一般用户');
            break
    }
}
switchRole(1)
```

### 可索引类型接口

* 约束数组和对象
```ts
interface StringArray {
    // index 类型为number, 一般都表示数组
    [index:number]:string
}

let arr:StringArray = ['aaa', 'bbb'];
console.log(arr)

interface stringObject {
    // index 类型为string, 一般都表示为对象
    [index:string]:string
}

let obj:stringObject = {name: 'cccc'}
```

### 函数类型接口
* 对传入的参数和返回值进行约束

```ts
interface discount2 {
    // ":" 前面是用来约束函数参数
    // ":" 后面是用来约束函数的返回值
    (price:number): number
}

let cost:discount2 = function(price:number) {
    return price * 8;
}
```

### 类类型接口
* 对类进行约束，同时可以实现多个接口
* 实现之后接口元素为公有元素
* 接口只能约束类的公有成员（实例属性/方法），无法约束私有成员，构造函数，静态属性/方法
```ts
interface A {
    name: string,

    speak(words: string): void
}

interface B {
    age: number
}

class Cat implements A, B {
    public name:string;
    public age = 18;

    speak(words:string) {
        console.log('the cat say:', words)
    }
}
```

###  混合类型接口
* 一个对象可以同时作为函数和对象使用
```ts
interface FnType {
    (getName:string):string;
}

interface MixedType extends FnType{
    name:string;
    age:number;
}
```

### 函数重载
* java中函数重载是指 参数类型和参数个数不同
* ts中，适用于接收不同的参数和返回结果
* ts重载的时候，会去查询函数声明列表，从上到下匹配

1. 申明函数
```ts
function attr(val: string): string;
function attr(val: number): number;
// 前面两行是函数申明，这一行是实现函数重载
function attr(val: any): any {
    if (typeof val === 'string') {
        return val;
    } else if (typeof val === 'number') {
        return val;
    } 
}

attr('aaa');
attr(666);
```
2. 单独声明
```ts
// 后写的接口中的函数声明优先级高
interface Cloner111 {
    clone(animal: Animal): Animal;
}
interface Cloner111 {
    clone(animal: Sheep): Sheep;
}
interface Cloner111 {
    clone(animal: Dog): Dog;
    clone(animal: Cat): Cat;
}

// ==> 同名接口会合并
// 接口内部按书写的顺序来排，先写的优先级高
interface Cloner111 {
    clone(animal: Dog): Dog;
    clone(animal: Cat): Cat;
    clone(animal: Sheep): Sheep;
    clone(animal: Animal): Animal;
}

```

### ？ and !
* ?  为了解决变量为空，页面出错
```ts
function (a:string, b?:string) {}
```
* ! 非空断言操作符不会防止出现null或者undefined.它只是告诉TypeScript的类型检查器对特定的属性表达式，不做**严格空值检测**
```ts
this.listeners.get(type)!.size > 0
```

### 访问你控制权限
* public 所有都可以访问
* protected  定义在类中， 类的实例，子类，子类实例都可以访问
* private 只能在定义的类中访问，子类，子类实例都不可以范文

```ts
class Father {
    content: string; // 默认public
    public name: string; // public 都可以访问
    protected age: number; // 定义在类中， 类的实例，子类，子类实例都可以访问
    private money: number; // 只能在定义的类中访问，子类，子类实例都不可以范文

    constructor(name: string, age: number, moneny:number) {
        this.name = name;
        this.age = age;
        this.money = moneny;
    }

    getName():string {
        return this.name;
    }
}

const father = new Father('ybrelax', 20, 100);

console.log(father.name);
console.log(father.age); // 报错
```

### 重写（override) 和 重载（overload)

* 重写是指子类重写“继承”自父类中的方法
* 重载是指为同一个函数提供多个类型定义

```ts
// 重写
class Person {
    say(word: sring): string {
        return word
    }
}

class Student extends Person {
    say(word: string):string {
        return `I am ${word}`
    }
}

// 重载
function attr(val: string): string;
function attr(val: number): number;
// 前面两行是函数申明，这一行是实现函数重载
function attr(val: any): any {
    if (typeof val === 'string') {
        return val;
    } else if (typeof val === 'number') {
        return val;
    } 
}
```

### 继承 vs 多态
* 继承： 子类继承父类， 子类除了拥有父类的所有特性，还可以实现自己的定义
* 多态：由继承而产生了相关不同的类，对同一个方法可以由不同的响应

```ts
class Person {
    say(word: sring): string {
        return word
    }
}

class Person extend Student {
    say(word: string): string {
        return 'Student' + word;
    }
}

class Teacher extend Student {
    say(word: string): string {
        return 'Student' + word;
    }
}
```
### 泛型
* 泛型是在定义函数、接口或类的时候，不预定指定具体的类型，使用的时候再去指定类型的一种特性
* 可以把泛型理解成类型的参数


```ts
// 使用any就等于始于类型检测的意义
function createObj(name: any, sex: any): Array<any> {
    return [name, sex]
}

// 这种就是不能通用，不同函数得不同定义  可以使用函数重载
function createObj1(name: string, sex: string): Array<string> {
    return [name, sex]
}

// 泛型指定
function createObj2<T>(name: T, sex: T): Array<T> {
    return [name, sex]
}
const result = createObj2<string>('ybrelax', '1')
```

### 类型谓词

* 类型保护函数： 要自定义一个类型保护，只需要为这个类型保护定义一个函数即可，这个函数的返回值是一个类型谓词。
* 类型谓词： 语法为 **parameterName is Type** 这种形式，其中**parameterName**必须为当前函数签名里的一个参数名。

```ts
 // 类型谓词
interface Bird {
    fly()
    layEggs()
}
interface Fish {
    swim()
    layEggs()
}

function getSmallPet():Fish | Bird{
    return ;
}
let pet = getSmallPet();

pet.layEggs();
// 当使用联合类型时，如果不用类型断言，默认只会从中获取共有的部分
(pet as Fish).swim();
// pet.swim();

// 使用类型谓词 
function isFish(pet:Fish | Bird):pet is Fish {
    return (pet as Fish).swim !== undefined;
}

if(isFish(pet)){
    pet.swim();
}else{
    pet.fly();
}
```

### 可选链运算符的使用

* 可选链运算是一种先检查属性是否存在， 再尝试放回该属性的运算符，其符号为**?.**
* 如果运算符左侧操作数**?.**,计算为undefine或null,则表达式为undefined.否则触发目标属性

```ts
a?.b;
// 相当于 a == null ? undefined : a.b;
// 如果 a 是 null/undefined，那么返回 undefined，否则返回 a.b 的值.

a?.[x];
// 相当于 a == null ? undefined : a[x];
// 如果 a 是 null/undefined，那么返回 undefined，否则返回 a[x] 的值

a?.b();
// 相当于a == null ? undefined : a.b();
// 如果 a 是 null/undefined，那么返回 undefined
// 如果 a.b 不是函数的话，会抛类型错误异常，否则计算 a.b() 的结果
```

### TS 中的 never 类型具体有什么用？
```ts
interface Foo {
  type: "foo";
}

interface Bar {
  type: "bar";
}

type All = Foo | Bar;

function handValue(val: All) {
  switch (val.type) {
    case "foo":
      // 这里 val 被收窄为 Foo
      break;
    case "bar":
      // val 在这里是 Bar
      break;
    default:
      // val 在这里是 never
      const exhaustiveCheck: never = val;
      break;
  }
}

```
如果之后给 All 增加一个类型 Bax, 那么就会出现编译错误，default branch就无法赋值给 exhaust【穷尽】
[https://www.zhihu.com/question/354601204/answer/888551021](https://www.zhihu.com/question/354601204/answer/888551021)
