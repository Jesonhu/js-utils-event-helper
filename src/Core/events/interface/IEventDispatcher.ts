import HasObject from '../HashObject';
import Event from '../Event';

/**
 * 定义用于添加或删除事件侦听器的方法.
 *
 * @export
 * @interface IEventDispatcher
 * @extends {HasObject}
 */
export interface IEventDispatcher extends HasObject {
  /**
   * 注册事件监听.
   *
   * @param {string} type 事件的类型
   * @param {Function} listener 事件处理函数
   * @param {*} thisObject 事件处理函数绑定的this对象.
   * @param {boolean} [useCapture] 当前事件处于哪个阶段.
   * @param {number} [priority] 事件处理器的优先级.
   * @memberof IEventDispatcher
   */
  addEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number): void;

  /**
   * 仅回调一次的事件处理函数.
   *
   * @param {string} type
   * @param {Function} listener
   * @param {*} thisObject
   * @param {boolean} [useCapture]
   * @param {number} [priority]
   * @memberof IEventDispatcher
   */
  once(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number): void;

  /**
   * 移除指定的事件监听.
   *
   * @memberof IEventDispatcher
   */
  removeEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean): void;

  /**
   * 判断某个对象是否拥有指定的事件处理.
   *
   * @param {string} type 事件的类型.
   * @returns {boolean} 指定的对象是否监听的此事件.
   * @memberof IEventDispatcher
   */
  hasEventListener(type: string): boolean;

  /**
   * 派发指定的事件.
   *
   * @param {Event} event
   * @returns {boolean}
   * @memberof IEventDispatcher
   */
  dispatchEvent(event: Event): boolean;
}

export default IEventDispatcher;
