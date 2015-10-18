# ssr

将一个目录设置成一个静态服务器。。大家肯定遇到过，当后端 API 没有编写完成时，前端无法进行调试，这就导致了前端会被后端阻塞的情况。而ssr相当于是搭建了一个 Mock Server ，构建假数据，然后把这些假数据存到 JSON 文件上，Mock Server 可以响应请求或者生成页面，当然也可以顺便生成 API 文档。


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

**注意：** 默认不传端口，起多个服务不会发生端口冲突，尽情玩耍吧。

## 当前目录安装

```
npm install ssr
```

nodejs 中应用

```js
var ssr = require('ssr');
    ssr(1998);
```
