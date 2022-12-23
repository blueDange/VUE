// 函数的类型 demo/02_func.ts
// 如下指定函数的类型：
// x:number  参数x为number类型
// y:number  参数y为number类型
// :number   该方法的返回值类型也是number
function add(x:number, y:number):number {
    return x + y
}
console.log(add(10, 20))
// console.log(add(10, 'a'))  错误：调用时传递的参数不符合函数的要求


// 声明一个函数，接收一个数字n，返回n以内的随机小数
function getNum(n:number):number{
    return Math.random() * n
}
console.log(getNum(25).toFixed(2))


let myadd: (x:number, y:number)=>number = 
    function(a:number, b:number):number{
        return a+b
    }
console.log(myadd(10, 20))

// 报错，myadd只能指向一个 接收两个number，返回一个number的函数
// myadd = function(a){}

// 调用ts的函数时，参数列表必须与ts函数声明的参数列表一一对应
// console.log(myadd(10))   对应不上，则报错


// 如果有需求，可能传递一个，也可能传两个或多个参数时，该如何定义？
function sum(a:number, b:number, c?:number):number{
    if(c != undefined)
        return a + b + c
    else 
        return a + b
}
console.log(sum(10, 20))
console.log(sum(10, 20, 30))


