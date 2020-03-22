---
category: 编程
tags:
  - nginx
date: 2019-05-18
title: 重定向url
---

在做单页面的时候，如果路由没有采用hash模式，而是history模式，这时候就需要在服务端重定向自己的url

 <!--more-->

 Named Locations
Later versions of Nginx (>0.7.x) have Named Locations. These are location blocks that start with an @ symbol, and are treated similar to internal locations except that they preserve the original URI on internal redirects for error_page or try_files directives.
```nginx
location / {

 try_files @joomla index.html;
}
location @joomla {
  rewrite ^(.*)$ /index.php?q=$1 last;

}
```

 也就是说我们可以通过try_files属性来重定向自己的URL, 所以常规配置如下

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```
其中 $uri代表的是当前访问的URL，上面的意思就很清晰了，所有当前的url都指向项目目录下的index.html

* tip
mac 中显示ngnix信息（前提装了brew，whereis也查不到）
 brew info nginx