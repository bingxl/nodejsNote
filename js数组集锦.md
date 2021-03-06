# 设计数组的函数方法
toString, toLocaleString, valueOf,    
concat, splice, slice     
indexOf,lastIndexOf,    
push, pop, shift, unshift,    
sort, reverse    
map, reduce, reduceRight, filter, every, some, forEach

ES6中新增：of, from, copyWithin, find, findIndex, fill, keys, values, entries, includes
<!-- more -->
# 创建数组
+ 数组字面量创建：`var arr = [val1, val2, val3];`
+ 数组构造函数：
```
  var arr = new Array();
  var arr = new Array(1, 2, 3, 5);//返回[1, 2, 3, 4, 5]
  var arr = new Array(2);// 返回 [ , , ]  一个参数时是数组的长度length
```

# 清空数组
清空数组有两种方法
+ arr.length = 0;
+ arr = [];

两者区别：js 中数组是对象，所以arr是一个指向数组值的链接，arr.length = 0时，把数组所有值清除，执行速度慢；arr = []时把arr的链接指向一个新的空数组，原数组值存在于内存中如果未被其它变量引用时则被回收。

```
var arr1 = [1, 2, 3];
var arr2 = arr1;
arr2 = [];
console.log(arr1);// [1, 2, 3] arr1 还在
arr2 = arr1;
arr2.length = 0;
console.log(arr1); // [] arr1同时也被清空了
```
# 转换方法
arr.toString() 返回由数组中的每个值的字符串形式拼接(以逗号分隔)的字符串    
arr.toLocaleString() 和toString作用相同，不同之处在于对数组的每一项调用toString方法    
arr.valueOf() 和toString类似，不过返回数组最适合的原始类型    
arr.join()  toString只能使用逗号分隔字符串，而join可以指定分隔符
```
var arr1 = ['h', ['e', 'g'], 'n'];
var arr2 = [1, 2, 3, 4];
arr1.toString();//"h,e,g,n"
arr1.toLocaleString();// "h,e,g,n"
arr2.valueOf();//[1, 2, 3, 4]
arr2.toString();//"1,2,3,4"
arr1.valueOf();//["h", Array(2), "n"]
arr2.join('-');//"1-2-3-4" 指定 - 分隔符
```
# 堆栈、队列方法
push(item)  在数组末尾压入数组项，可以是多项 ，返回修改后的数组长度   
pop() 弹出并返回数组最后一项     
shift() 弹出并返回数组第一项  
unshift() 在数组前端压入数组项并返回数组长度

```
var arr = [4, 5, 6];
arr.push(7, 8);
arr; //[4, 5, 6, 7, 8]
arr.push([9, 10]);
arr; //[4, 5, 6, 7, 8, [9, 10]]

arr.pop();
arr; //[4, 5, 6, 7, 8]
arr.shift() ;// arr  [5, 6 ,7, 8]
arr,unshift(1, 2, 3, 4); //arr [1, 2, 3, 4, 5, 6, 7, 8]
```

# 重排序 sort和reverse
arr.reverse() 反转数组，第一项变最后一项，最后一项变第一项，依次类推    
sort()  对数组重排序，默认从小到大排序(按字符比较而非数值 如 2 > 100) ,可以传入排序函数    
sort的函数参数里面，value1是之前排好的最近一个数，value2是新传入的参数，当函数返回负值时不调换位置，当返回正值是调换位置
```
var arr = [1, 2, 3, 100];
arr.reverse(); //[100, 3, 2, 1]
arr.sort();//[1, 100, 2, 3]
arr.sort(compare);  //[1, 2, 3, 100]
function compare(value1, currentValue){
  console.log(value1, currentValue);
  return value1 - currentValue;
}
/*
排序函数打印出来的,可以看出是插入排序// 当数组过长时排序方法已不在是插入排序
1 100
100 2
1 2
100 3
 2 3
*/
```

# 操作方法与位置方法 concat，slice,  splice， indexOf ，lastIndexOf
arr.concat() 基于当前数组的所有项创建一个新数组，传入的项被添加到数组末尾构成新数组    
arr.slice(start, end ) 基于当前数组中的一项或多项创建新数组,start为开始位置，end为结束位置，end没有的话默认为到数组结束
arr.splice(start, num, arr1, arr2......)  从start位置开始删除num项数组，然后在start位置插入arr1 ，arr2 ,,,,,,,,,。num为0时没有删除项， arr1, arr2 ,,,,,可以没有      
arr.indexOf(value, start) 搜索value值在数组中的索引值  ,start为开始项默认为0，未找到返回 -1    
arr.lastIndexOf(value, start) 从数组的末尾开始查找(倒序查找)，没找到返回 -1
```
var arr1 = [1, 2];
var arr2 = arr1.concat(3, [4, 5]);//[ 1, 2, 3, 4, 5 ]
arr2.slice()
//[ 1, 2, 3, 4, 5 ]
 arr2.slice(1)
//[ 2, 3, 4, 5 ] 
arr2.slice(1,4)
//[ 2, 3, 4 ]

 arr2
//[ 1, 2, 3, 4, 5 ]

//以下为node环境下， > 为js表达式，回车后是输出
> arr2.slice(1)
[ 2, 3, 4, 5 ]
> arr2.slice(1,2)
[ 2 ]
> arr2.slice(1,4)
[ 2, 3, 4 ]
> arr2
[ 1, 2, 3, 4, 5 ]
> arr2.splice(0,1)
[ 1 ]
> arr2
[ 2, 3, 4, 5 ]
> arr2.splice(0,1,1)
[ 2 ]
> arr2
[ 1, 3, 4, 5 ]
> arr2.splice(1,0,2)
[]
> arr2
[ 1, 2, 3, 4, 5 ]
> arr2.splice(5,0,6, 7, 8)
[]
> arr2
[ 1, 2, 3, 4, 5, 6, 7, 8 ]
> arr2.indexOf(8)
7
> arr2.lastIndexOf(8)
7
// 当查找的值在数组中有多个时indexOf 和lastIndexOf返回不同

```

# 迭代方法 map, filter, every, some, forEach, reduce, reduceRight
arr.map() 对数组中的每一项运行给定的函数，返回每次调用的结果组成的数组。    
arr.filter() 对数组中的每一项运行给定的函数，返回由给定函数返回ture的项组成的新数组。    
arr.every()对数组中的每一项运行给定的函数，如果该函数对每一项都返回true则返回true    
arr.some()对数组中的每一项运行给定的函数，如果该函数对任一项返回true则返回true    
arr.forEach()对数组中的每一项运行给定的函数，没有返回值      
以上5个方法传入的函数有三个参数 分别是item、index、arr，分别是当前项，当前项的索引，数组


arr.reduce()，arr.reduceRight()
迭代所有项，然后构建一个最终返回值，只是迭代的顺序不同，reduce从左到右，reduceRight从右到左。传入的函数的参数有prev、cur、index、arr，分别是前一项迭代的结果，当前项，当前项的索引，数组arr

```
var arr = [1, 2, 3, 4, 5];

arr.map(function(item, index, arr){
  return item * 2;
}); //数组的每项都乘2 ，返回 [2, 4, 6, 8, 10]

arr.filter(function(item, index, arr){
  return item % 2 == 0;
}); // 返回偶数项 [2, 4]

arr.every(function(item, index, arr){
    return item > 0;
}); // 数组所有项都大于0 ，返回 true   

arr.some(function(item, index, arr){
  return item < 2;
});//  数组里有小于2的项？ 返回true

arr.forEach(function( item, index, arr){
    console.log(item, index, arr);
});// 没有返回项
/*
forEach打印出来的
1 0 [ 1, 2, 3, 4, 5 ]
2 1 [ 1, 2, 3, 4, 5 ]
3 2 [ 1, 2, 3, 4, 5 ]
4 3 [ 1, 2, 3, 4, 5 ]
5 4 [ 1, 2, 3, 4, 5 ]
*/

arr.reduce(function(prev, cur, index, array){
  console.log(prev,cur);
  return prev * cur;
});// 返回数组所有项相乘的结果120
/*
打印结果
1 2
2 3
6 4
24 5
*/

arr.reduceRight(function(prev, cur, index, array){
  console.log(prev,cur);
  return prev * cur;
});// 返回数组所有项相乘的结果120
/*
打印结果
5 4
20 3
60 2
120 1
*/
```


# ES6中新增
`Array.from(array-like)` 将类数组、可遍历对象转换为真正的数组，返回一个数组。   
`Array.of(1, 2, 3, 4)`将一组值转换为数组，当传入一个值时是数组的第一项(弥补了Array()构造函数的不一致行为)
`array.copyWithin(target, start = 0, end = this.length)` 在当前数组内部指定的位置[start~end) 的成员复制到target开始的位置，会覆盖原数据   
`array.find(callback(value,index, arr))` 找出第一个满足条件的成员，依次把数组成员传入回调函数，当函数第一次返回true时返回此时的数组成员,否则返回undefined。    
`array.findIndex(callback(value, index, arr))` 与find方法类似，不同在于返回的是索引值，没有符合条件的则返回 -1。 find 和 findIndex可以发现 NAN。    
`array.fill(value, start=0, end=this.length)` 用value填充源数组。   
`array.keys()/ values()/ entries()` 对数组的键/值/键值对 遍历
`array.includes(value, start=0)` 此方法是ES7中增加的，判断数组是否包含给定的值

# 数组的空位
数组空位是指数组某个位置没有任何值，比如 Array(3) 返回 [,,,] 。ES5中不同的数组方法对空位的处理不同，`forEach,filter, every, some`会跳过空； `map`会跳过空位，但保留这个值；`join, toString`会将空位视为undefined，而undefined和null被处理成空字符串。

ES6新增的方法将所有空位视为undefined处理，同时 for...of 循环也将空位处理成undefined