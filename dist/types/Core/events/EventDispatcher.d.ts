import { HashObject } from "./HashObject";
import { IEventDispatcher } from "./interface/IEventDispatcher";
import { Event } from './Event';
/**
 * 事件派发类.
 */
export declare class EventDispatcher extends HashObject implements IEventDispatcher {
    constructor(target?: any);
    private $EventDispatcher;
    private init;
    private $addListener;
    /**
     * 添加事件监听.
     *
     * @param {string} type
     * @param {Function} listener
     * @param {*} thisObject
     * @param {boolean} [useCapture]
     * @param {number} [priority]
     * @memberof EventDispatcher
     */
    addEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number, dispatchOnce?: boolean): void;
    once(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number): void;
    removeEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean): void;
    hasEventListener(type: string): boolean;
    dispatchEvent(event: Event): boolean;
    /**
     * 派发一个事件，字符串方式派发，可以传递参数.
     *
     * @param {string} string
     * @param {boolean} [bubbles]
     * @param {*} [data]
     * @param {boolean} [cancelable]
     * @memberof EventDispatcher
     */
    dispatchEventWith(type: string, bubbles?: boolean, data?: any, cancelable?: boolean): boolean;
    notifyListener(event: Event, capturePhase: boolean): boolean;
    /**
     * 添加到事件队列中.
     *
     * @private
     * @param {any[]} list
     * @param {string} type
     * @param {Function} listener
     * @param {*} thisObject
     * @param {boolean} [useCapture]
     * @param {number} [priority] 优先级
     * @param {boolean} [dispatchOnce]
     * @returns {boolean}
     * @memberof EventDispatcher
     */
    private $insertEventBin;
    /**
     * 从队列中移除指定的事件.
     *
     * @private
     * @param {IEventBin[]} list
     * @param {Function} listener
     * @param {*} thisObject
     * @returns {boolean}
     * @memberof EventDispatcher
     */
    private $removeEventBin;
}
