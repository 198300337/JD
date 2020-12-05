// 定义函数的一般方式
function fnRs(a, b) {
    var rs = a + b;
    alert(rs);
}
fnRs(1, 2);


// 通过匿名函数赋值来定义函数
var fnRs = function(a, b) {
    var rs = a + b;
    alert(rs);
}
fnRs(1, 2);


// 通过箭头函数的写法定义
var fnRs = (a, b) => {
    var rs = a + b;
    alert(rs);
}
fnRs(1, 2)

// 一个参数可以省略小括号
var fnRs2 = a => {
    alert(a);
}
fnRs2('haha!');


// 箭头函数的作用，可以绑定对象中的this
var person = {
    name: 'tom',
    age: 18,
    showName: function() {
        setTimeout(() => {
            alert(this.name);
        }, 1000)
    }
}
person.showName();