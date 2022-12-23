// 测试自定义类型：03_class.ts

// 声明一个自定义类型，用于描述一个人，其中有属性与方法
class Person {
    name: string;
    age: number;
    married?: boolean;

    // 构造器 通过new创建对象时调用，常用于为属性赋值，构造一个具体的对象
    constructor(name:string, age:number=18, married?: boolean){
        this.name = name;
        this.age = age;
        this.married = married;
    }
}

// 创建Person对象
let p1:Person = new Person('张三')
let p2:Person = new Person('李四', 25)
let p3:Person = new Person('成亮', 28, false)