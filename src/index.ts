import Core from './Core/index';
import { Event } from './Core/events/Event';
import { EventDispatcher } from './Core/events/EventDispatcher';
import { EventTest } from './Core/EventTest';
import { EventX } from './Core/events/EventX';
/**
 * 常用工具合集.
 */
const  jsUtilsHelper = {
  /** 事件类型类 */
  EventTest,
  /** 事件类 */
  Event,
  /**
   * 事件监听派发类.
   */
  EventDispatcher,

  /** 通用事件监听派发类 */
  EventX
}
// 打包处理 start ====================
!(function webpackUniversalModuleDefinition(root: any, factory): void|any {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof exports === 'object')
		exports["jsUtilsHelper"] = factory();
  else
		root["jsUtilsHelper"] = factory();
})(global, function() {
  return jsUtilsHelper;
});
// 打包处理 end ====================

export default jsUtilsHelper;



