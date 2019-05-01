import { EventDispatcher } from '../events/EventDispatcher';
import { Event } from '../events/Event';
import { DisplayObjectContainer } from './DisplayObjectContainer';
/**
 * 创建一个显示对象.
 *
 * @class DisplayObject
 * @extends {EventDispatcher}
 */
export declare class DisplayObject extends EventDispatcher {
    constructor();
    addEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number, dispatchOnce?: boolean): void;
    removeEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean): void;
    dispatchEvent(event: Event): any;
    /**
     * 获取事件流.
     *
     * @private
     * @param {DisplayObject} target
     * @returns {DisplayObject[]}
     * @memberof DisplayObject
     */
    private $getPropationList;
    private $dispatchPropagationEvent;
    private $parent;
    readonly parent: DisplayObjectContainer;
}
