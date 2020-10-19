let a = 20;
let b = 'wwww'

console.log('module a')

/*
    ES6 模块中的变量需要导出，才能在其他模块引用
    存在两种 exports 导出方式：
    - 命名导出（每个模块包含任意数量）
    - 默认导出（每个模块包含一个）
*/

/*
    默认导出
        export default expression;
        export default function (…) { … } // also class, function*
        export default function name1(…) { … } // also class, function*
        export { name1 as default, … };

    导出模块合集
        export * from …; // does not set the default export
        export * as name1 from …; // Draft ECMAScript® 2O21
        export { name1, name2, …, nameN } from …;
        export { import1 as name1, import2 as name2, …, nameN } from …;
        export { default } from …;
*/


// 导出单个特性
// export default a
// export {a as default}
// export let name = "zhangsan", age = 30
// export let name, age
// export default function fn(){
//     console.log(123)
// }
// export class ClassName {
//    //  ...
// }

// 导出列表
// export {a, b}

// 重命名导出
// export { variable1 as name1, variable2 as name2, …, nameN };
// export {a as aa} 

// 解构导出并重命名
// export const { name1, name2: bar } = o;
let o = {
    name: 'zhangsa',
    age: 23
}
export const { name, age: ag } = o;