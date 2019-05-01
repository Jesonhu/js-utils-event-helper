import HashObject from './HashObject';
import IEventDispatcher from './interface/IEventDispatcher';
/**
 * Event 类作为创建事件实例的基类
 *
 * @class Event
 * @extends {HashObject}
 */
export declare class Event extends HashObject {
    constructor(type: string, bubbles?: boolean, cancelable?: boolean, data?: any);
    private init;
    static create<T extends Event>(EventClass: {
        new (type: string, bubbles?: boolean, cancelable?: boolean): T;
        eventPool?: Event[];
    }, type: string, bubbles?: boolean, cancelable?: boolean): T;
    static getPropertyData(EventClass: any): any;
    /**
     * 派发指定的事件.
     *
     * @static
     * @param {IEventDispatcher} target
     * @param {string} type
     * @param {boolean} [bubbles=false]
     * @param {*} [data]
     * @returns
     * @memberof Event
     */
    static dispatchEvent(target: IEventDispatcher, type: string, bubbles?: boolean, data?: any): boolean;
    /**
     * 释放一个事件.
     *
     * @static
     * @param {Event} event
     * @memberof Event
     */
    static release(event: Event): void;
    /**
     * 事件的类型.
     *
     * @private
     * @type {string}
     * @memberof Event
     */
    private $type;
    /**
     * 返回事件的类型.
     *
     * @readonly
     * @type {string}
     * @memberof Event
     */
    readonly type: string;
    /**
     * 事件是否可以冒泡.
     *
     * @private
     * @type {boolean}
     * @memberof Event
     */
    private $bubbles;
    readonly bubbles: boolean;
    /**
     * 事件是否可以取消.
     *
     * @private
     * @type {boolean}
     * @memberof Event
     */
    private $cancelable;
    /**
     * 触发事件的对象.
     *
     * @private
     * @type {*}
     * @memberof Event
     */
    private $currentTarget;
    currentTarget: any;
    /**
     * 事件传递的参数.
     *
     * @type {*}
     * @memberof Event
     */
    data: any;
    private $isDefaultPrevented;
    isDefaultPrevented: boolean;
    /**
     * 事件流中的当前阶段。
     *
     * @private
     * @type {number}
     * @memberof Event
     */
    private $eventPhase;
    /**
     * 事件要操作的对象.
     *
     * @private
     * @type {*}
     * @memberof Event
     */
    private $target;
    readonly eventPhase: number;
    protected clean(): void;
    private $setTarget;
    setTarget(target: any): boolean;
}
export default Event;
