# react-ryui
```
react 基础组件库
```

# 如何使用
```
cnpm install react-ryui --save
```

# 项目演示地址
```
http://182.92.240.91/app/react-ryui
```

# 发布流程
```
package.json 版本升级
rm -rf lib/ 删除历史版本
tsc -d 打包
cp -r ./style/ ./lib/ 拷贝样式文件
npm publish 发布
```