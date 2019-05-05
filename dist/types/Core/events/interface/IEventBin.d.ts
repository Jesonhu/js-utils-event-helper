import { IEventDispatcher } from './IEventDispatcher';
/**
 * 事件信息对象.
 *
 * @export
 * @interface IEventBin
 */
export interface IEventBin {
    type: string;
    /**
     * 事件处理函数.
     * @private
     */
    listener: Function;
    /**
     * 事件处理函数中的this指向.
     * @private
     */
    thisObject: any;
    /**
     * 优先级.
     * @private
     */
    priority: number;
    /**
     * 事件处理函数中的 this
     * @private
     */
    target: IEventDispatcher;
    /**
     * 是否可以捕获.
     * @private
     */
    useCapture: boolean;
    /**
     * 是否只派发一次, 即 `once` 方式监听的事件处理函数.
     * @private
     */
    dispatchOnce: boolean;
}
