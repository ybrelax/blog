---
category: 编程
tags:
  - 编程
  - nginx
date: 2019-05-11
title: nginx安装注意事项
---

1. 安装依赖包
```sh
//一键安装上面四个依赖
yum -y install gcc zlib zlib-devel pcre-devel openssl openssl-devel
```

2. 下载并解压安装包
```sh
//创建一个文件夹
cd /usr/local
mkdir nginx
cd nginx
//下载tar包 最新的包可以去官网下载 http://nginx.org/en/download.html
wget http://nginx.org/download/nginx-1.13.7.tar.gz  
tar -xvf nginx-1.13.7.tar.g
```

3. 安装nginx
```sh
//进入nginx目录
cd /usr/local/nginx
//执行命令
./configure
//执行make命令
make
//执行make install命令
make install
```

4. 配置nginx
```sh
vim /usr/local/nginx/conf/nginx.conf
```

5. 启动nginx

```sh
cd usr/local/nginx/sbin
./nginx

# 重启：
cd /usr/local/nginx/sbin
./nginx -s reload
```