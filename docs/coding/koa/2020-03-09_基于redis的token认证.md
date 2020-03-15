---
category: 编程
tags:
  - koa
date: 2020-03-09
title: 基于redis的token的登陆认证
---

实现一个自定义的token认证中间件
<!-- more -->
fdkfd
之前的文章介绍了 **jsonwebtoken** 的中间件流程，其实这个中间件可以自己来完成，接下来就让我来实现一下这个过程。

回到标题，我为什么要拿redis作为token认证得一个载体呢？原因有以下几点

* redis有着很高效得存储效率
* redis可以很方便设置过期时长，这点就和token所需很相似了，token也是需要设置过期时长
* redis 可以存储键值对，这个有点可以在后续中分析到

利用redis的高效性，将token作为作为键名置于redis中

```js
// // 创建token 以id 并且设定用户数据
async function setToken(obj) { // obj - 存放对象
    try {
        let s = obj.uid + ' ' + +new Date()
        let token = Crypto.createHmac('sha256', s.slice(0, 5)).update(s).digest('base64')
        let keyStr = Config.tokenName + ':userlogin:' + token
        if (await redis.setex(keyStr, Config.tokenSaveTime, JSON.stringify(obj)) === 'OK') { // 保存2个小时
            // 删除原先的登录凭证
            await delOldToken(obj.id)
            // 设定新的登录凭证
            await redis.set(Config.tokenName + ':id:' + obj.uid, token)
            return token
        }
        return -1
    } catch (e) {
        console.error(e)
        return -1
    }
}
// // 删除原先的登录凭证
async function delOldToken(id) {
    let ot = await redis.get(Config.tokenName + ':id:' + id)
    if (ot && ot.length > 13) {
        await redis.del(Config.tokenName + ':userlogin:' + ot)
    }
}
```

从上面的代码可以看出，token，我用了**crypto**加密了以下，配上自己得规则。(token的内容可以自定义),然后作为key，至于值的内容，则是存放了用户信息。这样得好处就显而易见了，
登陆之后，我们不需要直接去查库，直接就可以从redis获取用户信息;

接下来就是校验token

```js
module.exports = async (ctx, next) => {
  let needToken = ctx.apiSetting.token
  if (needToken) {
    const token = ctx.header.token
    if (token) {
      const data = await checkToken(token)
      if (!data && needToken) {
        $.log(token + ' 非法用户')
        return ctx.throwCode(401, '请登录!')
      }
      ctx.checkedToken = data
      if (data && ctx.checkedData) {
        ctx.checkedData.token = true
      }
    } else {
      $.log('接口需要token')
      return ctx.throwCode(401, '需要token,或需登录')
    }
  } else { // 兼容微服务
    ctx.checkedToken = { headers: ctx.request.headers }
  }
  next && await next()
}

async function checkToken (token, tokenPre = 'userlogin') {
  try {
    let keyStr = Config.tokenName + ':' + tokenPre + ':' + token
    keyStr = keyStr.trim()
    let o = JSON.parse(await redis.get(keyStr))
    $.log(keyStr, o)
    if (o === null) { return 0 }
    if (o.id) {
      let ot = await redis.get(Config.tokenName + ':id:' + o.id)
      if (ot !== token) {
        return 0
      }
    } else {
      return 0
    }
    switch (tokenPre) {
      case 'userlogin':
        return o.id ? o : 0
      default:
        break
    }
    return 0
  } catch (e) {
    $.err(e.stack)
    return 0
  }
}
```

