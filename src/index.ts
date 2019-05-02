import Core from './Core/index';
import { EventDispatcher } from './Core/events/EventDispatcher';
/**
 * 常用工具合集.
 */
const  jsUtilsHelper = {
  /**
   * 事件监听派发类.
   */
  EventDispatcher
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


