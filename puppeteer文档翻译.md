# puppeteer
> puppeteer 是一个通过DevTools 协议提供高级API 来控制 chrome,chromium 的 NODE库; puppeteer默认运行在 headless 模式, 也可配置后运行在全模式(non-headless).

## puppeteer可以做什么
大部分在浏览器里手动执行的动作都可以通过puppeteer实现! 这里有几个列子来让你开始.
- 生成页面截图和PDF.
- 爬取单页面应用生成提前渲染的内容(例如 SSR).
- 自动提交表单, UI测试, 键盘输入等.
- 创建最新的自动化的测试环境,在最新的 chrome 里使用 js 和浏览器的最新特性来运行你的测试.
- 捕获网站的跟踪时间线以帮助诊断性能问题.

## 开始
### 安装
为了在你的项目里使用puppeteer, 执行:
```bash
npm i puppeteer
# 或者 yarn add puppeteer
```
提示: 安装puppeteer是,会下载最新版本的chromium(Mac下170 M, Windows下282M))以保证API正常工作. 要跳过这一步,请参阅环境变量().

### 例子
提示: puppeteer需要 Node V6.4.0及以上版本, 但以下例子中使用了在Node V7.60及以上版本中的 async/await .

使用过其它浏览器测试框架的人对puppeteer也会熟悉. 创建Browser实列, 打开页面,然后使用puppeteer API操作页面.

#### Example - 导航到 https://example.com 截图后保存为example.png.
保存如下文件为 example.js
```JavaScript
const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({path: 'example.png'});

  await browser.close();
})();
```
执行下面命令 `node example.js`

puppeteer 设置出时页面尺寸为 800 x 600px ,截图尺寸也是这个. 通过Page.setViewport() 设置个性化页面尺寸.

#### Example - 创建PDF
文件保存为hn.js
```JavaScript
const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://news.ycombinator.com', {waitUntil: 'networkidle2'});
  await page.pdf({path: 'hn.pdf', format: 'A4}');

  await browser.close();
})();
```
执行如下命令 `node hn.js`, 查看 Page.pdf() API 寻找更多关于创建PDF的信息.

#### Example - 在页面上下文中执行js
保存为 get-dimensions.js
```javascript
const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');

  const dimensions = await page.evaluate(() => {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio
    }
  })
})()

```
执行如下命令 `node get-dimensions.js`, 查看Page.evaluate() API 获取关于evaluate和相关方法 (如:evaluateOnNewDocument, exposeFunction)的详细信息.

### 运行时的默认设置
1. 使用无头浏览器模式(headless)

puppeteer 运行chromium 在headless模式下. 当运行浏览器时设置'headless' 选项使chromium运行在全模式下.
```javascript
const browser = await puppeteer.launch({headless: false});
```
2. 绑定特定版本的chromium

默认情况下,puppeteer下载使用指定版本的 chromium 以保证所有的API正常工作. 创建Browser实例时指定 executablePath值来以使用不同浏览器.
```javascript
const browser = await puppeteer.launch({executablePath: '/path/to/Chrome'})
```
查看puppeteer.launch() API了解更多信息.


阅读[这篇文章](https://www.howtogeek.com/202825/what%E2%80%99s-the-difference-between-chromium-and-chrome/)了解chromium和 Chrome 的不同, [](而这篇文章https://chromium.googlesource.com/chromium/src/+/lkcr/docs/chromium_browser_vs_google_chrome.md)描述了Chrome和 chromium 在Linux下的不同.

3. 创建一个新用户

puppeteer每次运行时先创建一个 chromium 用户, 运行结束后就清除用户信息.

## API文档
探索API 文档和例子来学习更多.

## 调试技巧
1. 关闭无头模式 - 有时观看浏览器的显示是有用的. 使浏览器运行在全模式而不是无头模式下, 使用headless: false:
```javascript
const browser = await puppeteer.launch({headless: false,})
```
2. 慢下来 - slowMo 选项减慢puppeteer 执行速度, 减慢指定的总毫秒数. 这是帮助观察发生什么的另一个途径.
```javascript
const browser = await puppeteer.launch({
  headless: false,
  slowMo: 250 //减慢puppeteer 250ms
});
```
3. 捕获控制台输出 - 监听console事件. 当调试page.evaluate() 内部代码时比较便利.
```javascript
page.on('console', msg => console.log('页面log', msg.text()));
await page.evaluate(() => console.log(`url is ${location.href}`))
```

4. 停止执行测试,在浏览器内使用debugger
+ 运行puppeteer时使用 {devtools: true}:
```javascript
const browser = await puppeteer.launch({devtools: true});
```

+ 改变测试超时时间:
  - jest: `jest.setTimeout(100000);`
  - jasmine: `jasmine.DEFAULT_TIME_INTERVAL = 100000;`
  - mocha: `this.timeout(100000);` (改变测试时使用 function 不能使用箭头函数)

+ 在evaluate内部使用 `debugger` 语句, 在已存在的evaluate环境中添加 `debugger`
```javascript
await page.evaluate(() => {
  debugger;
});
```
puppeteer测试将会停止在上面这条语句, chromium也将停留在 debugger 模式.

5. 打开详细记录 - 调用所有公共API 和内部传输协议将会被`puppeteer`命名空间下的 `debug `模块记录
```bash
# 基本的详细记录
 env DEBUG="puppeteer:*" node script.js

 # 调试输出可通过命名空间来开关
 env DEBUG="puppeteer:*,-puppeteer:protocol" node script.js # 记录除了协议信息的所有信息
 env DEBUG="puppeteer:session" node script.js # 记录会话协议(protocol messages)
 env DEBUG="puppeteer:mouse,puppeteer:keyboard" node script.js # 只记录鼠标和键盘API调用

 # 传输协议记录的比较繁杂. 下面例子过滤所有网络信息.
 env DEBUG="puppeteer:*" env DEBUG_COLORS=true node script.js 2>&1 | grep -v '"Network'
```

## 为puppeteer贡献
查看[贡献指南](https://github.com/GoogleChrome/puppeteer/blob/master/CONTRIBUTING.md) 以了解puppeteer开发概述

## FAQ(常见问题)
#### 谁维护puppeteer?
Chrome DevTools团队维护这个库, 同时欢迎大家的参与!

#### puppeteer的目标和职责是什么?
这个项目的目标是:
+ 提供一个精简和权威的库以突出 DevTools Protocol 的能力
+ 为类似的测试库提供实现参考. 最终其它框架可以采用puppeteer作为基础层.
+ 发展采用 无头,自动化 浏览器测试.
+ 帮助DevTools Protocol 新特性做 dogfood 测试, 捕获bug
+ 寻找浏览器自动化测试的痛点, 然后帮助解决这些差别.

我们采用chromium职责来帮助我们驱动产品做决定:
+ 快速: puppeteer在一个自动化测试页面的性能开销几乎为0.
+ 安全: puppeteer在 Chromium 操作过程中,自动使潜在的恶意页面安全.
+ 稳定: puppeteer不是脆弱的,也不会有内存泄漏
+ 简易: puppeteer 提供易用易理解和调试的高级API.

#### Puppeteer是用来取代Selenium/webDriver的吗?
不是, 这两个项目因为一些不同的原因都是有价值的.
+ Selenium/WebDriver 集中于自动跨浏览器; 它的价值在于提供一个在所有主要浏览器里工作的单一标准API.
+ Puppeteer 专注于Chromium;它的价值在于丰富的功能和高可靠性.
也就是说,你可以使用puppeteer在非Chromium浏览器里运行测试. 例如使用community-driver jest-puppeteer. 虽然puppeteer不是你唯一可用的解决方案,但确实有几分比web Driver好的特点:
+ puppeteer 可以零设置,附带特定版本的chromium是其更好的工作,puppeteer开始使用非常容易,在一天结束时只在chromium上运行几个测试比不测试好.
+ puppeteer 是事件驱动架构, 移除大量潜在脆弱环节. 不需要在puppeteer脚本调用邪恶的"sleep(1000)"
+ puppeteer 默认运行在headless模式下,使得启动非常快. puppeteer V1.5.0 也暴露出浏览器上下文, 使高效的并行执行测试成为可能.
+ puppeteer 在调试时高亮: 翻转headless位 false ,设置slowMo选项, 将会看到浏览器的行为. 甚至可以打开Chrome DevTools来检查测试环境.

#### 为什么puppeteer V.xxx 不能和Chromium V.yyy一同工作?
puppeteer作为 chromium 不可分割的一部分. 每个版本的puppeteer绑定于一个特定版本的 chromium以保证 puppeteer工作.

着并不是通过人工来约束,许多puppeteer工作确实在 chromium 仓库里.下面时典型故事:
+ puppeteer bug报告 https://github.com/GoogleChrome/puppeteer/issues/2709
+ 这原本是DevTools protocol的 issue, 然后在chromium里修复 https://chromium-review.googlesource.com/c/chromium/src/+/1102154
+ 当bug修复后,滚动更新chromium到 puppeteer

然而,通常人们更愿意将puppeteer 和官方的Google Chrome一同使用.这种情况下需要选择特定版本的puppeteer以使chromium版本接近chrome.

#### puppeteer使用哪个版本的 chromium?
在puppeteer相关版本的package.json文件里查看.

#### 什么是导航(navigation)?
在puppeteer观点中, '导航(navigation)' 是所有改变页面URL的事物. 除了常规的导航外,在浏览器中点击网络从web服务器中获取新文档, 包含a标签导航和history API

在这个navigation定义中, puppeteer和单页面应用无缝衔接.

#### 信任的和不信任的输入事件有什么不同?
在浏览器中输入事件被分为两大类: 信任的和不被信任的.
+ 信任事件: 通过页面的用户接口产生. 例如使用鼠标和键盘.
+ 非信任事件: 通过web API产生. 例如document.createEvent 或者 element.click() 方法.

网站能够区分这两类事件:
+ 使用 `Event.isTrusted`事件标志.
+ 嗅探伴随事件. 例如每一个可信任的点击事件之前都是'moussedown' 和'mouseup'事件.

为了自动化的目的, 生成可信任事件是比较重要的. 通过puppeteer生成的输入事件都是可信任事件和触发适当的伴随事件.如果需要非信任事件,需要通过`page.evaluate` 在页面上下文中生成模拟事件:
```javascript
await page.evaluate(() => {
  document.querySelector('button[type=submit]').click();
})
```

### puppeteer不支持什么特性?
你也许会发现当puppeteer控制包含audio和video的页面时一些行为不是预期的.(例如, [视频播放时截图会失败](https://github.com/GoogleChrome/puppeteer/issues/291)), 这有以下两个原因:
+ Puppeteer 是和chromium绑定的,并不是chrome, 所以puppeteer继承了 chromium所有限制.  这意味着puppeteer 不支持一些许可格式例如: AAC和 H.264(然而也可能强制puppeteer使用, 当 通过executablePath选项使用chrome替代chromium时. 只有在官方发布的chrome支持这些媒体格式时才能使用这些配置)
+ 自从puppeteer控制chromium/chrome的桌面版后,只在手机版本里的chrome特性不被支持. 这意味着puppeteer不支持 http Live Streaming(HLS).

#### 在测试环境中安装运行puppeteer时存在问题?
我们有一份针对不同操作系统的[排错指南](https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md)需求列表.

#### 如何使用puppeteer的提前版本?
```bash
npm i --save puppeteer@next
```

提示: 提前版本可能不稳定和包含bugs.

#### 还有更多问题,到哪里寻求帮助?
这里有许多关于puppeteer帮助的路径:
+ [bugtracker](https://github.com/GoogleChrome/puppeteer/issues)
+ [stackoverflowh](ttps://stackoverflow.com/questions/tagged/puppeteer)
+ [slack channel](https://join.slack.com/t/puppeteer/shared_invite/enQtMzU4MjIyMDA5NTM4LTM1OTdkNDhlM2Y4ZGUzZDdjYjM5ZWZlZGFiZjc4MTkyYTVlYzIzYjU5NDIyNzgyMmFiNDFjN2UzNWU0N2ZhZDc)

确保在提交你的问题之前在这些频道里搜索问题.