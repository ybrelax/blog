---
category: 前端
date: 2019-04-29
title: svg学习笔记
---
 svg 是一种基于xml语法的图像格式，全称是可缩放矢量图（Scalable Vector Graphics)。

<!-- more -->

::: tip 
  很早之前就知道有这个东西存在，但是一直没怎么把它去深入研究一下，趁着这段空闲时间，打算把这个好好研究一下，也算是对自己前端知识体系的一个补充
:::

他的语法外表是通过一个**svg**标签来包裹着整个svg的内容块，接下来打算从一些常规的形状来去了解svg的知识
### 形状

## 矩形

```html
<svg width="100%" height="100%" version="1.1"
xmlns="http://www.w3.org/2000/svg">

<rect width="300" height="100"
style="fill:rgb(0,0,255);stroke-width:1;
stroke:rgb(0,0,0)"></rect>

</svg>
```

首先svg 中width, height中的属性自不必说了，就是指定高宽；

version属性用来定义svg的版本；

xmlns属性是用来定义svg命名空间, 指定了这个dtd能够在svg标签中引用它特定的属性内容；(可省略不写)

好接下来发信rect这个标签，这个是用来创建矩形，其中有几个点要去说明下，（这些可以被当成属性元素使用，也可以被当成style元素使用

 **stroke-width** 这个是用来定义矩形边框的宽度，
 
 **stroke** 是定义矩形边宽的颜色

**fill** 定义填充色

**fill-opacity** 背景颜色不透明度

## 圆形

```html
<svg width = "200px" height = "400px">
  <circle cx="100" cy="50" r="40" stroke="black"
stroke-width="2" fill="red"/>
</svg>
```
要点说明：cx,cy代表圆点的x和y坐标，如果省略，圆的中心会被设置为（0，0）

## 路径

```html
<svg>
<path d="M250 150 L150 350 L350 350 Z" />
</svg>

```

这个怎么说呢，有点复杂记录几个属性 **d**标识回执的顺序

**M**: 移动到（moveto)

**L**: 画直线到（lineto)

**Z**: 闭合路径

这个怎么说呢，由于在绘制路径时的复杂性，强烈建议使用SVG编辑器来创建复杂的图形。（复杂的目前我也没试过）


更多可以参考

[链接1](https://zhuanlan.zhihu.com/p/36138381) [链接2](http://www.ruanyifeng.com/blog/2018/08/svg.html)

### 滤镜

滤镜的内容还是有挺多的，这里只是初步的去了解下它的原理过程，具体可以参考[这里](https://www.runoob.com/svg/svg-filters-intro.html) or [here](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial)

## 模糊效果
```html
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <defs>
    <filter id="f1" x="0" y="0">
      <feGaussianBlur in="SourceGraphic" stdDeviation="30" />
    </filter>
  </defs>
  <rect width="90" height="90" stroke="green" stroke-width="3"
  fill="yellow" filter="url(#f1)" />
</svg>
````
所有的svg滤镜都是定义在**defs**元素中的

其中filter标签中的id对应 rect标签的filter="url(#f1)" 属性

in="SourceGraphic" 属性指明了模糊效果应用到整个图片

stdDeviation 代表模糊度



