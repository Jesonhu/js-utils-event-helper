# JS 事件监听派发类(JS Event dispacher build with TS)

<p align="center">
  <a href="https://www.npmjs.com/package/js-utils-event-helper"><img src="https://img.shields.io/npm/v/js-utils-event-helper.svg" alt="Version"></a>
</p>

[en](./README.md)|中文文档
## API

### public-公共属性和方法

+ method

|名称|类型|说明|
|--|--|--|
|`addEventListener`|method|添加事件监听|
|`removeListener`|method|移除事件监听|
|`dispatchEvent`|method|派发指定的事件|
|`dispatchEventWith`|method|派发指定的事件, 相比于`dispatchEvent`可以传递参数给事件对象|
|`once`|method|添加一个只进行一次的事件监听|
|`hasEventListener`|method|检查事件派发对象是否拥有派发的事件|
|`notifyListener`|method|核心事件派发实现|


### private-私有属性和方法 

+ method 

|名称|类型|说明
|--|--|--|
|`$addListener`|method|添加事件监,相比于`addEventListener`, 这是一个私有方法|
|`$insertEventBin`|method|将事件添加到事件队列中, 核心事件监听实现|
|`$removeEventBin`|method|将事件从事件队列中移除, 核心事件移除实现|







## 参考资料
+ [egret-core-event](https://github.com/egret-labs/egret-core/tree/master/src/egret/events)