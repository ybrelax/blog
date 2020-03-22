---
category: 运维
tags:
  - git
date: 2019-11-05
title: linux下gitlab的安装
---

> 部署方案

1. 配置yum源
```sh
vim /etc/yum.repos.d/gitlab-ce.repo
```

复制以下内容
```sh
[gitlab-ce]
name=gitlab-ce
baseurl=http://mirrors.tuna.tsinghua.edu.cn/gitlab-ce/yum/el6
Repo_gpgcheck=0
Enabled=1
Gpgkey=https://packages.gitlab.com/gpg.key
```

2. 更新本地yum缓存
```sh
 yum makecache
```

3. 安装gitlab
```sh
 yum install gitlab-ce   # 这是社区版
```

4. 配置gitlab文件 && 启动gitlab
```sh
gitlab-ctl reconfigure

gitlab-ctl start
```

以上步骤基本可以成功启动你的gitlab

5. gitlab常用命令
```sh
 gitlab-ctl start # 启动所有 gitlab 组件；
 gitlab-ctl stop # 停止所有 gitlab 组件；
 gitlab-ctl restart # 重启所有 gitlab 组件；
 gitlab-ctl status # 查看服务状态；
 gitlab-ctl reconfigure # 启动服务；
 vim /etc/gitlab/gitlab.rb # 修改默认的配置文件；
 gitlab-rake gitlab:check SANITIZE=true --trace # 检查gitlab；
 gitlab-ctl tail # 查看日志；
```

> 修改默认配置

在通常的情况下，gitlab是启用80端口，所以这里我们需要调整以下
1. 编辑配置文件/etc.gitlab/gitlab.rb
```sh
external_url 'http://172.25.83.1:8090'   # 这个地方可以将端口加上，gitlab-ctl reconfigure之后会自动将配置加到 /var/opt/gitlab/nginx/conf/gitlab-http.conf

# unicorn['port'] = 8080 这个地方将常用的8080端口替换掉
unicorn['port'] = 8070
```
2. 修改配置后，重启
```sh
gitlab-ctl reconfigure

gitlab-ctl restart
```
