# JS 事件监听派发类(JS Event dispacher build with TS)

<p align="center">
  <a href="https://www.npmjs.com/package/js-utils-event-helper"><img src="https://img.shields.io/npm/v/js-utils-event-helper.svg" alt="Version"></a>
</p>

en|[中文文档](./README_zh-CN.md)
## API

### public 

|name|type|description|
|--|--|--|
|`addEventListener`|method|add event listener|
|`removeListener`|method|remove event listener|
|`dispatchEvent`|method|dispacth an event listener|
|`dispatchEventWith`|method|dispach an event with some event params|
|`once`|method|create once event listener|
|`hasEventListener`|method|check event dispacth target is has expected event|
|`notifyListener`|method|core event dispach handler|


### private 

|name|type|description|
|--|--|--|
|`$addListener`|method|add event listener|
|`$insertEventBin`|method|add the event to event queue|
|`$removeEventBin`|method| remove the event from event queue|







## 参考资料
+ [egret-core-event](https://github.com/egret-labs/egret-core/tree/master/src/egret/events)