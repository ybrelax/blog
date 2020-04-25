---
category: 编程
tags:
  - typescirpt
date: 2020-03-30
title: typescript错误分析
---

## Typescript 常见问题分析

### 错误信息：can only be default-imported using the 'esModuleInterop' flag"
错误原因：需要在 tsconfig.json 文件中添加 "esModuleInterop": true,;
解释：Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'.
参考文档：https://www.typescriptlang.org/v2/docs/handbook/release-notes/typescript-2-7.html