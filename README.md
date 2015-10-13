# ssr

将一个目录设置成一个静态服务器。。

## 全局安装

```
npm install -g ssr 
```

命令帮助。

```
Usage: ssr [options]

选项：

  --help, -h         output usage information.
  --version, -V, -v  output the version number. 
  --port, -p         Set the port!

```

命令使用 `ssr`  

```bash
$ ssr           # 默认 端口 1987   访问地址：=> http://localhost:1987
$ ssr -p 2015   # 端口设置 2015   访问地址：=> http://localhost:2015
```


## 当前目录安装

```
npm install ssr
```

nodejs 中应用

```js
var ssr = require('ssr');
    ssr(1998);
```
