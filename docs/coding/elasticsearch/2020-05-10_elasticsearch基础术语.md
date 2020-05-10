---
category: 前端
tags:
  - design
date: 2020-04-10
title: Elasticsearch基础术语
---

## 基础搜索

### 分页查询

可以通过 from size 组合来进行

- from 表示从第几行开始， 默认是 0
- size 表示查询多少文档，默认是 10

```js
{
    "from": 0,
    "size": 0,
    "query": {
        "term": {
            "type": "xxx"
        }
    }
}
```

### 排序

有多个字段时，可以指定字段进行排序

```js
{
    "sort": [
        {
            "type": {"order": "asc"},
            "message": {"order": "desc"}
        }
    ]
}
```

上面这段代码的意思时说首先对 type 字段进行排序，然后对 message 字段进行排序

### 数据列过滤

数据列过滤允许在查询的时候不显示原始数据，或者显示部分原始数据

```js
{
    "_source": false,
    // or
    "_source": "id*",
    //or
    "_source": ["id*", "name*"]
    // or
    "_source": {
        "include": ["id*", "name*"],
        "exclude": [".y"]
    }
}
```

### 脚本支持

对于搜索时支持脚本操作的。
```js
  "script_fields": {
    	"gender": {
    		"script": "doc['gender'].value * 2"
    	}
    }
```

这里的操作等于是将结果的数据中 gender 的值 * 2



## 滚动查询

我们在查询分页的时候，由于一次只能查到一条数据，这很不方便，当我们查到第n页的时候，其实是抛弃了前面的n-1页面的内容

滚动查询恰好帮我们解决了这以痛点，其实可以这样说，当处理比较多的数据的时候，，其实就是创建了一个索引

```js
https://surface-api.yuekedata.shop/es/pasngers_fallow/_doc/_search?scroll=1m
```

我们在请求地址后面加上了**scroll**参数来告诉Elasticsearch需要保持搜索上下文多长的事件

格式如下
* y => 年
* M => 月
* d => 天
* h => 小时
* m => 分钟
* s => 秒

返回结果集中会存在一个scroll_id字段，可将这个Id传递给scroll API 来搜索下一个批次的内容。
```js
{
    "_scroll_id": "DXF1ZXJ5QW5kRmV0Y2gBAAAAAAAAAPYWRUNBMlU1RVJRNmlCc3RManQ0bHhydw==",
    "took": 615,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total":
        ...
    }
}
```

下次查询
```js
// url:
https://surface-api.yuekedata.shop/es/pasngers_fallow/_doc/_search/scroll
{
    "scroll": "1m",
    "scrool_id:" "DXF1ZXJ5QW5kRmV0Y2gBAAAAAAAAAPYWRUNBMlU1RVJRNmlCc3RManQ0bHhydw=="
}
```

注意：第一次搜索请求和每个后续滚动请求返回一个新的_scroll_id, 只有新得_scroll_id才能被使用