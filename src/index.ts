import Core from './Core/index';
/**
 * 常用工具合集.
 */
const  jsUtilsHelper = {
  /**
   * 核心功能.
   *
   * @static
   * @memberof JsUtilsHelper
   */
  core: Core
}

// console.log('对象吗', jsUtilsHelper);

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



