---
category: 后端
tags:
  - node
date: 2020-02-08
title: linux 安装node
---

采用yum安装的方式进行安装
<!-- more -->

## 第一步
```js
curl --silent --location https://rpm.nodesource.com/setup_10.x | sudo bash
```

## 第二步
```js
sudo yum -y install nodejs
```

如果以上步骤不能安装 最新版 node，执行以下命令后再执行第二步：
```js
sudo yum clean all
```
如果存在多个 nodesoucre，执行以下命令删除，然后重新执行第一第二步：
```js
sudo rm -fv /etc/yum.repos.d/nodesource*
```

官方安装方案 [https://nodejs.org/en/download/package-manager/#enterprise-linux-and-fedora](https://nodejs.org/en/download/package-manager/#enterprise-linux-and-fedora)