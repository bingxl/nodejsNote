# angular git commit

```
<type>(<scope>): <subject>
// 空行
<body>
// 空行
<footer>
```
type, 提交的类型, 是如下类型:
```
feat：新功能（feature）
fix：修补bug
docs：文档（documentation）
style： 格式（不影响代码运行的变动）
refactor：重构（即不是新增功能，也不是修改bug的代码变动）
test：增加测试
chore：构建过程或辅助工具的变动
```

scope: commit的影响范围, subject commit的简短描述

body提交的详细描述

footer 不兼容的标变动时使用 BREAKING CHANGE: 开头, 关闭Issue ` Closes #id1, #id2`
