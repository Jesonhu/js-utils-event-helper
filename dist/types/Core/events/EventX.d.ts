import { EventDispatcher } from './EventDispatcher';
import { IEventX, IEventOptions } from './interface/IEventX';
/**
 * 通用事件监听派发类.
 *
 * @desc EventDispatcher 虽然也可以做事件的监听和派发，但是.js时 dispatchEvent(event: Event)功能实现, 这里添加了一个兼容类，并添加快捷方式.
 */
export declare class EventX extends EventDispatcher implements IEventX {
    constructor();
    on(type: string, listener: Function, thisObj: any, options?: IEventOptions): void;
    off(type: string, listener: Function, thisObj: any, useCapture?: boolean): void;
    trigger(type: string, data?: {}): void;
}
