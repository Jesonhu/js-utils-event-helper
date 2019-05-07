import { IEventDispatcher } from './IEventDispatcher';
/**
 *
 *
 * @interface IEventX
 * @extends {IEventDispatcher}
 */
export interface IEventX extends IEventDispatcher {
  /**
   * 监听一个事件(快捷方式).
   *
   * @param {string} type 事件的类型
   * @param {Function} listener 事件处理函数
   * @param {*} thisObj 绑定的this
   * @param {*} [options] 可选配置
   * @memberof IEventX
   */
  on(type: string, listener:Function, thisObj: any, options?: IEventOptions): void;
  /**
   * 监听一个事件(快捷方式).
   *
   * @param {string} type 事件的类型
   * @param {Function} listener 事件处理函数
   * @param {*} thisObj 绑定的this
   * @param {Boolean} useCapture 是否可以捕获.
   * @memberof IEventX
   */
  // on(type: string, listener:Function, thisObj: any, useCapture?: Boolean): void;

  /**
   * 移除事件监听(快捷方式)
   *
   * @param {string} type
   * @param {Function} listener
   * @memberof IEventX
   */
  off(type: string, listener: Function, thisObject: any, useCapture?: Boolean): void;

  /**
   * 派发一个事件.(快捷方式)
   *
   * @param {string} type 事件的类型.
   * @param {any} data 传递给事件处理函数的附加参数.
   * @memberof IEventX
   */
  trigger(type: string, data?: any): void;
}

export interface IEventOptions {
  /** 表示 listener 会在该类型的事件捕获阶段传播到该 EventTarget 时触发 */
  useCapture?: boolean;
  /** 表示 listener 在添加之后最多只调用一次。如果是 true， listener 会在其被调用之后自动移除 */
  dispatchOnce?: boolean;
  /** 设置为true时，表示 listener 永远不会调用 preventDefault()。如果 listener 仍然调用了这个函数，客户端将会忽略它并抛出一个控制台警告 */
  passive?: boolean;
  /** 优先级 */
  priority?: number;
}