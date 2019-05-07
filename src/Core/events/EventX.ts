import { Event } from './Event';
import { EventDispatcher } from './EventDispatcher';
import { IEventX, IEventOptions } from './interface/IEventX';

/**
 * 通用事件监听派发类.
 * 
 * @desc EventDispatcher 虽然也可以做事件的监听和派发，但是.js时 dispatchEvent(event: Event)功能实现, 这里添加了一个兼容类，并添加快捷方式.
 */
export class EventX extends EventDispatcher implements IEventX {
  constructor() {
    super();
  }

  public on(type: string, listener:Function, thisObj: any, options?: IEventOptions): void {
    // let { useCapture, priority, dispatchOnce} as IEventOptions = options;
    const useCapture = (options && options.useCapture) || false;
    const priority = (options && options.priority) || Event.DEFAULT_PRIORITY_LEVEL;
    const dispatchOnce = (options && options.dispatchOnce) || false;
    super.addEventListener(type, listener, thisObj, useCapture, priority, dispatchOnce);
  }

  public off(type: string, listener: Function, thisObj: any, useCapture: boolean = false): void {
    super.removeEventListener(type, listener, thisObj, useCapture);
  }

  public trigger(type: string, data = {}) {
    /** 不冒泡 */
    const bubbles:boolean = false;
    super.dispatchEventWith(type, bubbles, data);
  }

}