---
category: 编程
tags:
  - 后端
  - go
date: 2019-05-14
title: 通过go建立web服务器
---

> 如何通过go来创建一个web服务器

对于go的了解有一段时间了，随着了解的深入，越发感觉这门语言还挺强大的，所以也打算继续往前推进

> http包

首先引入 net/http包；

http包提供了HTTP客户端和服务端的实现。这一点有点像node，非常的方便快捷


```go
package main

import (
	"fmt"
	"net/http"
	"strings"
	"log"
)

func sayHelloName(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	fmt.Println(r.Form)
	fmt.Println("path", r.URL.Path)
	fmt.Println("scheme", r.URL.Scheme)
	for k, v := range r.Form{
		fmt.Println("key:", k)
		fmt.Println("val:", strings.Join(v, ""))
	}
	fmt.Fprintf(w, "Hello astaxie!") // 可以写入到客户端
}

func main() {
	http.HandleFunc("/", sayHelloName)  // 设置访问路由，和回调函数
	err := http.ListenAndServe(":9000", nil) 
	if (err != nil) {
		log.Fatal("ListerenAndServe:", err)
	}
}
```

大致阅读上面的代码基本还是好理解，就是通过http创建了一个9000端口的服务器

分析如下

首先看一下http源码中的一个关键函数
```go
func (srv *Server) Serve(l net.Listener) error {
    defer l.Close()
    var tempDelay time.Duration // how long to sleep on accept failure
    for {
        rw, e := l.Accept()
        if e != nil {
            if ne, ok := e.(net.Error); ok && ne.Temporary() {
                if tempDelay == 0 {
                    tempDelay = 5 * time.Millisecond
                } else {
                    tempDelay *= 2
                }
                if max := 1 * time.Second; tempDelay > max {
                    tempDelay = max
                }
                log.Printf("http: Accept error: %v; retrying in %v", e, tempDelay)
                time.Sleep(tempDelay)
                continue
            }
            return e
        }
        tempDelay = 0
        c, err := srv.newConn(rw)
        if err != nil {
            continue
        }
        go c.serve()
    }
}
```

这部分代码是通过Serve函数创建一个服务，每当一个请求发送进来的时候，就会创建一次连接，这里面的机制其实是一个循环，所以，当多个请求发进来的时候（高并发），其实请求是互相不影响的。

建立的 connet(连接)就会去取request的内容，同时调用handle函数 handler:handler := c.server.Handler， 这个函数就是我们之前创建服务的 	err := http.ListenAndServe(":9000", nil)  这段代码， 如果为nil就会去调用 handler = DefaultServeMux 这个函数，而这个函数又会去执行什么呢？

这个（DefaultServeMux）是一个路由匹配器，用来匹配对应的路由来执行对应的函数。然后在开始的代码 http.HandleFunc("/", sayhelloName)。这个作用就是注册了请求/的路由规则，当请求uri为"/"，路由就会转到函数sayhelloName，DefaultServeMux会调用ServeHTTP方法，这个方法内部其实就是调用sayhelloName本身，最后通过写入response的信息反馈到客户端。

> ServeHTTP

这个方法需要说明下，在http包里定义了一个类型HandlerFunc, 

```go
type HandlerFunc func(ResponseWriter, *Request)
```

HandlerFunc type是一个适配器，通过类型转换让我们可以将普通的函数作为HTTP处理器使用。如果f是一个具有适当签名的函数，HandlerFunc(f)通过调用f实现了Handler接口。

同时这个类型默认实现了ServeHTTP接口，即我们调用了HandlerFunc(f), f(自己的签名函数)就拥有了ServeHTTP方法。

func (HandlerFunc) ServeHTTPP
```go
func (f HandlerFunc) ServeHTTP(w ResponseWriter, r *Request)
```
ServeHTTP方法会调用f(w, r)


> 如何解决服务器跨域问题

简而言之就是设置请求头
```go
func addFormData(w http.ResponseWriter, r *http.Request) {
	
	w.Header().Set("Access-Control-Allow-Origin", "*")             //允许访问所有域
	w.Header().Add("Access-Control-Allow-Headers", "Content-Type") //header的类型
  w.Header().Set("content-type", "application/json")  
}
```

* 设置服务端管理行为

```go
s := &http.Server{
	Addr:           ":8080",
	Handler:        myHandler,
	ReadTimeout:    10 * time.Second,
	WriteTimeout:   10 * time.Second,
	MaxHeaderBytes: 1 << 20,
}
s.listenAndServe()
```