// 根据summary文件来生成相关文件，修改summary文件的链接
let fs = require('fs');
let path = require("path");
let os = require('os');
let data = fs.readFileSync(path.join(__dirname,'./.summary-source.md'), 'utf8');
let arr = data.split(os.EOL);
let summary = '<!-- !此文档是从.summary-source.md生成的，请到.summary-source.md文件编辑 -->' + os.EOL;

arr.forEach(item => {
    if (item.indexOf("+") !== 0) {
        summary += item + os.EOL;
        return;
    };
    item = (item.substr(1)).trim();
    let filePath = path.join(__dirname, `./${item}.md`);
    let exists = fileExist(filePath);

    if (!exists) {
        // 不存在则创建
        fs.readFile(filePath, { flag: 'w' }, res => {
            console.log(`has create article ${item},md`)
        });
    };
    summary += `+ [${item}](./${item}.md) ${os.EOL}`;

})

fs.writeFile(path.join(__dirname,'./SUMMARY.md'), summary, err => {
    if (err) {
        console.error(err)
    } else {
        console.log('SUMMARY.md file 已写入');
    }
});

// 判断给定的路径/文件是否存在
function fileExist(path) {
    if(!fs) {
        throw new Error("fs 模块未加载");
    }
    try {
        fs.accessSync(path);
        return true;
    } catch (err) {
        return false;
    }
}