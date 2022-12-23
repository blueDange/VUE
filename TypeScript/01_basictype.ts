// 测试基本数据类型  demo/01_basictype.ts

// 声明变量描述一个人，声明的语法中通过冒号:指定变量的类型
// 固定类型的变量不能保存不匹配的其他类型的数据
let pName:string = '亮亮';
let pAge:number = 28;
let pMarried:boolean = true;

// 声明变量，描述数组类型数据.   string[]表示字符串数组类型（数组中只能存放字符串）
let pHobby :string[]       = ['摊煎饼', '玩单杠', '擦玻璃']
let pFav   :Array<string>  = ['健身', '游泳', '瑜伽', '拉丁']

// 声明变量，描述一个元组（表示一个已知元素数量和类型的数组）
let params:[string, number, number] = ['杀手', 1, 20]
// params = ['功夫', 2, 30, 1]  错误，数量不匹配
params = ['功夫', 2, 30]
params = ['熊猫', 1, 100]

// 人为指定元素中保存数据的含义，即可使用元组方便的描述一个具体事物
//          阶数     材质
let mofang:[number, string] = [3, '塑料']
mofang = [4, '合金']


// 测试枚举类型
// 声明一个枚举类型Color, 该类型数据的取值一共只有3类：
// Color.Red  Color.Green  Color.Blue
// 在使用的过程中不关心这3类值具体是多少，只关心值种类的不同即可
enum Color {Red, Green, Blue}
console.log(Color.Red)   //  -> 0
console.log(Color.Green) //  -> 1
console.log(Color.Blue)  //  -> 2

// 声明一个元组，描述亮亮今天穿的衣服
let cl = ['皮夹克', Color.Red]
cl = ['棉裤', Color.Blue]

// 声明一个枚举类型，描述性别：Male   Female
enum Gender {Male, Female}
// 描述亮亮：
pName = '成小亮'
// pGender为Gender枚举类型，意味着取值只能是Gender枚举中两个取值之一
let pGender:Gender = Gender.Male

// 定义一个枚举，指定可能会发送请求的目标请求地址
enum BMDURL {
    ACTOR_ADD = '/actor/add',
    MOVIE_LIST = '/movie-infos',
    CINEMA_ADD = '/cinema/add'
}
// 通过枚举，定义大量的常量值，通过友好的名称方便访问
let url1 = 'http://localhost:8080' + BMDURL.ACTOR_ADD
let url2 = 'http://localhost:8080' + BMDURL.MOVIE_LIST
let url3 = 'http://localhost:8080' + BMDURL.CINEMA_ADD
console.log(url1)
console.log(url2)
console.log(url3)

// 何时可以声明枚举类型并合理使用呢？
// 当发现一个变量保存的值，仅仅可能是有限的几个种类中的其中之一时
// 例如：
// 枚举变量描述性别： 男  女
// 枚举变量描述答案： 正确  错误
// 枚举变量描述年龄段： 未成年  青年  中年  老年
// 枚举变量描述成绩： 优秀  良好  及格   不及格

enum Category {Hot=1, Wait=2, Classic=3}
console.log(Category.Hot) // 热映类别的值
console.log(Category[1])  // 类别值1 所对应的类别名称


// 类型断言
/**
 * myaxios.get("/actor/list", params).then(res=>{
 *   //  res.data是一个对象： {code:200, msg:ok, data:[{},{}..]}
 *   //  ts编译器会认为res.data为any类型
 *   //  而具体res.data是什么类型？只有程序员知道，所以程序员
 *   //  可以在此处对any类型的数据进行：类型断言，人为干预ts对代码的解析
 * })
 */

let param:any = 'name=zs&pwd=1234&age=15'

// 调用split方法拆分字符串时，在此没有split方法的提示
// 因为ts人为param是个any类型的数据，没有当字符串来看
console.log(param.split('&'))

// 在此处如果人为确定param就是字符串类型，就可以做一次类型断言
let p2:string = <string>param     // 类型断言语法一   尖括号
let p3:string = param as string   // 类型断言语法二   as
console.log(p2.split('&')) // 在此就有split方法的提示了
console.log(p3.split('&')) // 在此就有split方法的提示了










