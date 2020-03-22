---
category: 编程
tags:
  - 编程
  - nginx
date: 2019-05-11
title: nginx安装注意事项
---

## 安装依赖包

```sh
//一键安装上面四个依赖
yum -y install gcc zlib zlib-devel pcre-devel openssl openssl-devel
```

## 下载并解压安装包

```sh
//创建一个文件夹
cd /usr/local
mkdir nginx
cd nginx
//下载tar包 最新的包可以去官网下载 http://nginx.org/en/download.html
wget http://nginx.org/download/nginx-1.13.7.tar.gz
tar -xvf nginx-1.13.7.tar.g
```

## 安装 nginx

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

## 配置 nginx

```sh
vim /usr/local/nginx/conf/nginx.conf
```

## 启动 nginx

```sh
cd usr/local/nginx/sbin
./nginx

# 重启：
cd /usr/local/nginx/sbin
./nginx -s reload
```

## 配置 service

在 /etc/init.d 路径下添加脚本文件，名称为 nginx,并添加文件的可执行权限

```sh
#!/bin/bash
#Startup script for the nginx Web Server
nginx=/usr/local/nginx/sbin/nginx
conf=/usr/local/nginx/conf/nginx.conf
case $1 in
start)
echo -n "Starting Nginx"
$nginx -c $conf
echo " done."
;;
stop)
echo -n "Stopping Nginx"
killall -9 nginx
echo " done."
;;
test)
$nginx -t -c $conf
echo "Success."
;;
reload)
echo -n "Reloading Nginx"
ps auxww | grep nginx | grep master | awk '{print $2}' | xargs kill -HUP
echo " done."
;;
restart)
$nginx -s reload
echo "reload done."
;;
*)
echo "Usage: $0 {start|restart|reload|stop|test|show}"
;;
esac
```

问题描述
```sh
env: /etc/init.d/nginx: Permission denied

# 增加权限
chmod a+x nginx
```
 
