import coreError from './error';

import { DisplayObjectContainer } from './display/DisplayObjectContainer';
import { EventDispatcher } from './events/EventDispatcher';

// const displayObjectContainer1 = new DisplayObjectContainer();

// displayObjectContainer1.addEventListener('hello', () => {
//   console.log('这是hello');
// }, this);

// displayObjectContainer1.dispatchEventWith('hello');

export default class Core {
  /**
   * 显示错误.
   */
  static coreError = coreError

  /**
   * 用一个对象来扩展另一个对象.
   *
   * @export
   * @param {object} settings 默认设置
   * @param {object} options  参数
   * @returns 两者扩展后的新对象.
   */
  static extend(settings: any, options: any) {
    return Object.assign({}, settings, options);

    // or es6 way
    // return { ...settings, options }
  }

  static DisplayObjectContainer = DisplayObjectContainer

  static EventDispatcher = EventDispatcher
}


