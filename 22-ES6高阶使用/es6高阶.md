## ES6高阶

## 课堂主题

- 1.利用defineProperty实现数据劫持;

- 2.利用ES6中proxy实现数据劫持

- 3.数据劫持实现mvvm里的表达式

- 4.利用自定义事件实现数据动态更新；

- 5.通过es6模块化改造自己的mvvm框架；

- 6.AMD模块化require.js介绍；

## 知识点

- defineProperty；
- Proxy代理
- 数据劫持
- es6模块化、exports 和 import
- AMD(sea.js) /CMD(require.js) 模块化；



### defineProperty（ES5）

Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。
备注：应当直接在 Object 构造器对象上调用此方法，而不是在任意一个 Object 类型的实例上调用。

```js
Object.defineProperty(obj,'name',{
        get(){
            return value;
        },
        set(newValue){
            console.log("set...");
            value = newValue;
        }
    })
```



### proxy（ES6）

- 定义  ：对象用于定义基本操作的自定义行为（如属性查找，赋值，枚举，函数调用等）。

- 基本使用

  ```js
  let myObj = {
    name: "张三",
    age: 20
  }
  let obj = new Proxy(myObj,{
        get(target, name) {  // target 就相当于 myObj
            return target[name];
        },
        set(target,name,value){
            target[name] = value;
        }
    })
  ```

- 相关配置参数

  ```
  has(target, propKey)：拦截propKey in proxy的操作，返回一个布尔值。
  defineProperty(target, propKey, propDesc)：拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。
  ```

  

## es6模块化
  Javascript 程序本来很小——在早期，它们大多被用来执行独立的脚本任务，在你的 web 页面需要的地方提供一定交互，所以一般不需要多大的脚本。过了几年，我们现在有了运行大量 Javascript 脚本的复杂程序，还有一些被用在其他环境（例如 Node.js）。
  因此，近年来，有必要开始考虑提供一种将 JavaScript 程序拆分为可按需导入的单独模块的机制。Node.js 已经提供这个能力很长时间了，还有很多的 Javascript 库和框架 已经开始了模块的使用（例如， CommonJS 和基于 AMD 的其他模块系统 如 RequireJS, 以及最新的 Webpack 和 Babel）。

应用模块到你的HTML： 首先，你需要把 type="module" 放到 <script> 标签中, 来声明这个脚本是一个模块:
  - 浏览器默认模块化  script 里加入  "type=module"；

导出模块的功能：
  为了获得模块的功能要做的第一件事是把它们导出来。使用 export 语句来完成。
  存在两种 exports 导出方式：
    - 命名导出（每个模块包含任意数量）
    - 默认导出（每个模块包含一个）

导入功能到你的脚本：
  想在模块外面使用一些功能，那你就需要导入他们才能使用。
  导入模块功能的脚本基本是作为顶级模块。 如果省略它，Firefox就会给出错误“SyntaxError: import declarations may only appear at top level of a module。
  只能在模块内部使用 import 和export 语句；不是普通脚本文件。

- 导出  关键字  export

  - 导出 方式一  ：

    ```js
    export { a ,b , c}
    ```

  - 导出方式二 关键字  "as"

    ```js
    export { a as aa ,b , c}
    ```

  - 导出方式三

    ```js
    export let c = ()=>{console.log("I am c function...")}
    ```

  - 导出方式四

    ```js
    export default a;
    ```

    - 等同

      ```js
      export {a as default};
      ```

  - 

  export  可以导出多个，export default  只能导出一个；

- 导入方式：关键字 import

  - export导出的,命名要保持一致

    ```js
    import {aa , b , c} from './moduleb.js';
    ```

  - export导出的，命名可以自定义；

    ```js
    import myfn from './moduleb.js';
    ```

  - 通配符 "*"方式导入

    ```js
    import * as obj from './moduleb.js';
    ```



###  AMD require.js



- require.js使用

  - 引入require.js

    ```js
    https://cdn.bootcss.com/require.js/2.3.6/require.js
    ```

  - 1.加载模块

    ```js
    require(["a"]);
    ```

  - 2.定义模块

    - 无依赖定义

    ```js
    define({
        method1:function(){
            console.log("a method...");
        },
        method2:function(){
            console.log("b method...");
        }
    });
    ```

    - 模块有依赖

      ```js
      define(["c"],{
          method1:function(){
              console.log("a method...");
          },
          method2:function(){
              console.log("b method...");
          }
      });
      ```

    - 函数式写法

      ```js
      define(["c"],function(){
          obj = {
              name:"张安",
              age:20
          }
          return obj;
      });
      ```

### 模块化优点

- 防止作用域污染 
- 提高代码的复用性
- 维护成本降低



## 总结

- defineProperty
- Proxy
- 数据劫持
- 自定义事件
- es6模块化
- AMD/CMD模块化

## 练习&作业
- 使用ES6模块化完成一个 Kvue
  - 编译模块提取一个类，放在一个ES6的模块（文件）
  - 数据劫持，放在另一个模块(文件)
  - 发布订阅

mvvm 模块划分：
  - 编译模块
  - 数据劫持
  - 发布订阅（自定义事件：系统预定义好了）

## 下期预告

- Nodejs 应用