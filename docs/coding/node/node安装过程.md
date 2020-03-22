---
category: 后端
tags:
  - node
date: 2019-05-10
title: node建立服务

---

1. 找到下载链接
去[官网](http://nodejs.cn/download/)找到x64的的下载链接

2. 使用wget下载
```sh
wget https://nodejs.org/dist/v8.11.3/node-v8.11.3-linux-x64.tar.xz
```

3. 解压
```sh
tar -xf node-v8.11.3-linux-x64.tar.xz
```

4. 配置node环境变量
```sh
vim /etc/profile
# 添加以下变量'
export NODE_HOME=`/user/local/node-v8.11.3-linux-x64`{ 这里填解压之后node的路径}
export PATH=$PATH:$NODE_HOME/bin
```

5. 刷新权限
```sh
source /etc/profile
```

