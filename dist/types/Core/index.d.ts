import coreError from './error';
import { DisplayObjectContainer } from './display/DisplayObjectContainer';
import { EventDispatcher } from './events/EventDispatcher';
export default class Core {
    /**
     * 显示错误.
     */
    static coreError: typeof coreError;
    /**
     * 用一个对象来扩展另一个对象.
     *
     * @export
     * @param {object} settings 默认设置
     * @param {object} options  参数
     * @returns 两者扩展后的新对象.
     */
    static extend(settings: any, options: any): any;
    static DisplayObjectContainer: typeof DisplayObjectContainer;
    static EventDispatcher: typeof EventDispatcher;
}
