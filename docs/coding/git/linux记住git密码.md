---
category: 编程
tags:
  - git
date: 2019-12-05
title: linux下gitlab的安装
---

在服务器上运行
```sh
git config --global credential.helper store
```

检查是否生效
```sh
cat ~/.gitconfig

# 结果
[credential]
    helper = store
```