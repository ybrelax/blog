---
category: 前端
tags:
  - Elasticsearch
date: 2020-06-29
title: Elasticsearch组合查询
---


## 布尔查询

与匹配其他查询的布尔组合的文档相匹配的查询。bool查询映射到Lucene BooleanQuery。它是使用一个或多个布尔子句构建的，每个子句都有一个类型化的事件。发生的类型是：

must
该条款（查询）必须出现在匹配的文件，并将有助于得分。
filter
子句（查询）必须出现在匹配的文档中。然而不像 must查询的分数将被忽略。Filter子句在过滤器上下文中执行，这意味着评分被忽略，子句被考虑用于高速缓存。
should
子句（查询）应该出现在匹配的文档中。如果 bool查询位于查询上下文中并且具有mustor filter子句，则bool即使没有should查询匹配，文档也将匹配该查询 。在这种情况下，这些条款仅用于影响分数。如果bool查询是过滤器上下文 或者两者都不存在，must或者filter至少有一个should查询必须与文档相匹配才能与bool查询匹配。这种行为可以通过设置minimum_should_match参数来显式控制 。
must_not
子句（查询）不能出现在匹配的文档中。子句在过滤器上下文中执行，意味着评分被忽略，子句被考虑用于高速缓存。因为计分被忽略，0所有文件的分数被返回。

## 常用组合查询条件

* filter: 过滤， 不参与打分,
* must: 如果有多个条件，这些条件都必须满足 and 与
* should: 如果有多个田间，满足一个或多个即可， or或
* must_not: 和must 相反，必须都不满足田间才可以匹配到 ！非