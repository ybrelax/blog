---
category: 编程
tags:
  - 前端
  - uniapp
date: 2019-12-08
title: uniapp介绍篇
---

> 基于公司未来要做app，(人手有限)， 所以选择uniapp进行开发小程序;

从目前得使用来看，对于vue的支持还是非常不错的，开发的标签形式和微信小程序相似

### 请求形式区别

* 微信中请求方式
```js
wx.request({
  url: "https://www.example.com/request", //仅为示例，并非真实接口地址
  success: res => {
    console.log(res.data);
  }
});
```
* uni-app中发送请求：
```js
uni.request({
  url: "https://www.example.com/request", //仅为示例，并非真实接口地址
  success: res => {
    console.log(res.data);
  }
});
```
### 如何解决兼容性问题
uniapp用了自己的一些内部标签解决了这以策略
```html
<view class="content">
  <! -- #ifdef MP-WEIXIN -->
  <view>只会编译到微信小程序</view>
  <! -- #endif --> 
  <! -- #ifdef APP-PLUS -->
  <view>只会编译到app</view>
  <! -- #endif -->
</view>
```
具体可以参考 [https://uniapp.dcloud.io/platform?id=跨端兼容](https://uniapp.dcloud.io/platform?id=跨端兼容)

### nvue 模式
uniapp 对于app的原生模式提供了weex的模式

* uni-app App端内置 weex 渲染引擎，提供了原生渲染能力。

* uni-app 里根据编译配置不同，可以使用 weex 的组件，也可以使用小程序组件(即uni-app组件)。编写页面时页面后缀名为 .nvue(native vue的缩写)

* nvue 相当于给 weex 补充了大量 uni-app 的组件和api，以及丰富的 Plus API、Native.js、原生插件。

具体可以参考 [https://uniapp.dcloud.io/use-weex](https://uniapp.dcloud.io/use-weex)

### uni-ui
 uni-ui是DCloud提供的一个跨端ui库，它是基于vue组件的、flex布局的、无dom的跨全端ui框架。

 在这一点上如果可以的话尽量使用基础组件，反而性能会更高。

 为了适用各端的开发，首先推荐的是**flex**布局方案

### 总结
  目前从使用一周的情况，感觉还好；希望在后续的开发能正常使用
