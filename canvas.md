## 方法集锦
### canvas
canvas.getContext(), canvas.width, canvas.height    

### ctx
ctx.strokeStyle,  ctx.fillStyle, lineWidth
 矩形:
 ```
 strokeRect(x, y, width, height);
 fillStyle(x, y, width, height);
 clearRect(x, y, width, height);
 rect(x,y,width,height); //绘制的时路径不是独立的图形
```
路径:
```
beginPath(); //开始一段路径,即重新规划一段路径,和closePath()不一定成对出现
closePath(); //关闭一段路径, 如果路径没关闭,则后面调用多少次stroke/fill/就会覆盖多少次,关闭的则只在路径后第一次调用时绘制
			  // closePath() 还会把最后的路径点与起点连接起来
arc(x, y, radius, startAngle, endAngle,counterclockwise) //最后一个为是否为逆时针计算
arcTo(x1, y1, x2, y2, radius); //从上一点开始以半径radius绘制经过x1, y1 终止于 x2,y2的曲线
bezierCurveTo(c1x, c1y, c2x, c2y, x,y) // c1,c2为控制点 绘制一条曲线
quadraticCurveTo(cx,cy,x,y) //绘制二次曲线
lineTo(x,y) 
moveTo(x,y)
rect(x,y,width,height)

fill() //使用fillStyle颜色填充路径
stroke() //使用strokeStyle颜色对路径描边
clip() //在路径上创建一个剪切区域
isPointInPath(x, y); //确定位置x,y是否再路径上
```

绘制文本:
```

```