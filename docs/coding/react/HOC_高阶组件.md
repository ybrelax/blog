---
category: 编程
tags:
  - App
  - react
date: 2019-07-11
title: HOC 高阶组件
---
# 高阶组件（HOC)
高阶组件（HOC) 是React中用于复用组件逻辑的一种高级技巧，具体而言就是插件的一种写法。**高阶组件的参数是组件，返回值为新组件的函数**

高阶组件看着名字还是挺洋气的，现在就让我来拆解一下，逐步地去了解；

> 实现高阶组件的方式有以下几种

* 属性代理（Props Proxy)

* 反向代理 (Inheritance Inversion)

## 属性代理
  什么事属性代理呢？简而言之就是通过包裹原来的组件来操作传递过来的props, 看下这个例子

````js
import React, { Component } from 'React';
//高阶组件定义
const HOC = (WrappedComponent) =>
  class WrapperComponent extends Component {
    render() {
      return <WrappedComponent {...this.props} />;
    }
}
//普通的组件
class WrappedComponent extends Component{
    render(){
        //....
    }
}

//高阶组件使用
export default HOC(WrappedComponent)
````
这个案例主要就是展示了，HOC组件把WrapperComponent的props传递给WrappedComponent,并返回WrappedComponent

##### 操作props

通过HOC函数，可以获得WrappedComponent props的控制权，分析下如何来操作

```js
const HOC = (WrappedComponent) =>
    class WrapperComponent extends Component {
        render() {
            const newProps = {
                name: 'HOC'
            }
            return <WrappedComponent
                {...this.props}
                {...newProps}
            />;
        }
    }
```
这样就实现对原组件的进一步封装（新增props元素）

### 获得refs的引用

如何在属性带来这种方式中获得refs的引用，来看下以下代码

```js
import React, { Component } from 'React';
　
const HOC = (WrappedComponent) =>
    class wrapperComponent extends Component {
        storeRef(ref) {
            this.ref = ref;
        }
        render() {
            return <WrappedComponent
                {...this.props}
                ref={ (e)=> this.storeRef(e)} 
            />;
        }
    }

```

### 抽离state

  我们可以将被包裹组件（WrappedComponent）中的状态提到被包裹组件中, 下面市县如何市县**不受控组件**到受控组件的转变（ps: 在受控组件中，表单数据由React组件处理。另外一个可选项是不受控组件，其表单数据由DOM元素本身处理)

```js
class WrappedComponent extends Component {
    render() {
        return <input name="name" {...this.props.name} />;
    }
}

const HOC = (WrappedComponent) =>
    class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                name: '',
            };

            this.onNameChange = this.onNameChange.bind(this);
        }

        onNameChange(event) {
            this.setState({
                name: event.target.value,
            })
        }

        render() {
            const newProps = {
                name: {
                    value: this.state.name,
                    onChange: this.onNameChange,
                },
            }
            return <WrappedComponent {...this.props} {...newProps} />;
        }
    }

```
 这样就避免了直接操作dom，在外层形成一个受控组价

 ### 用其他元素包裹组件

```js
 render(){
        <div>
            <WrappedComponent {...this.props} />
        </div>
    }
```
这样就可以对被包装的组件实现再次布局之类的骚操作

## 反向继承

  反向继承是指返回的组件去继承之前的组件

  ```js
  const HOC = (WrappedComponent) =>
  class extends WrappedComponent {
    render() {
      return super.render();
    }
  }
```

从上可以知道组件已经被WrappedComponent继承，但是调用确是通过super进行反向调用，这就叫做反向继承。

### 渲染劫持

这种简单的来说就是我们来控制显示什么

```js
const HOC = (WrappedComponent) =>
  class extends WrappedComponent {
    render() {
      if (this.props.isRender) {
        return super.render();
      } else {
        return null;
      }
    }
  }
```

还可以修改渲染的结果

```js
//例子来源于《深入React技术栈》

const HOC = (WrappedComponent) =>
    class extends WrappedComponent {
        render() {
            const elementsTree = super.render();
            let newProps = {};
            if (elementsTree && elementsTree.type === 'input') {
                newProps = {value: 'may the force be with you'};
            }
            const props = Object.assign({}, elementsTree.props, newProps);
            const newElementsTree = React.cloneElement(elementsTree, props, elementsTree.props.children);
            return newElementsTree;
    }
}
class WrappedComponent extends Component{
    render(){
        return(
            <input value={'Hello World'} />
        )
    }
}
export default HOC(WrappedComponent)
//实际显示的效果是input的值为"may the force be with you"
```
  在反向继承中，可以操作很多，但是有一点就是：**反向继承不能保证完整的子组件树被解析**， 这一点需要特别说明：
  元素树种包含了组件（函数型或者class类型），就不能再操作子组件了

  ```js
  import React, { Component } from 'react';

const MyFuncComponent = (props)=>{
    return (
        <div>Hello World</div>
    );
}

class MyClassComponent extends Component{

    render(){
        return (
            <div>Hello World</div>
        )
    }

}

class WrappedComponent extends Component{
    render(){
        return(
            <div>
                <div>
                    <span>Hello World</span>
                </div>
                <MyFuncComponent />
                <MyClassComponent />
            </div>

        )
    }
}

const HOC = (WrappedComponent) =>
    class extends WrappedComponent {
        render() {
            const elementsTree = super.render();
            return elementsTree;
        }
    }

export default HOC(WrappedComponent);
```

像这种 WrappedComponent 中的子组件 --Myxxxxx-- 就不能被解析

### 操作props和state

  可以通过柯里化形式传参：

```js
import React, { Component } from 'React';

const HOCFactoryFactory = (...params) => {
    // 可以做一些改变 params 的事
    return (WrappedComponent) => {
        return class HOC extends Component {
            render() {
                return <WrappedComponent {...this.props} />;
            }
        }
    }
}
```

使用：
```js
HOCFactoryFactory(params)(WrappedComponent)
```
这种形式有没有让我们想起redux中的connect用法...有木有😁






