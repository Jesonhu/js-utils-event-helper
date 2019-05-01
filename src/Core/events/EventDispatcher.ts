import { HashObject } from "./HashObject";
import { IEventDispatcher } from "./interface/IEventDispatcher";
import { IEventBin } from './interface/IEventBin';
import { Event } from './Event';


const ONCE_EVENT_LIST:IEventBin[] = [];

/** 
 * 事件派发类.
 */
export class EventDispatcher extends HashObject implements IEventDispatcher {
  constructor(target: any = null) {
    super();

    this.init(target);
  }
  private $EventDispatcher: any

  private init(target: IEventDispatcher) {
    this.$EventDispatcher = {
      0: target ? target : this,
      1: {},
      2: {},
      3: 0
    }
  }

  private $addListener(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number, dispatchOnce?: boolean): void {
    const values = this.$EventDispatcher;
    const eventMap: any = useCapture 
      ? values[Keys.captureEventsMap]
      : values[Keys.eventsMap];
    let list: IEventBin[] = eventMap[type];

    if (!list) {
      list = eventMap[type] = [];
    } else if (values[Keys.notifyLevel] !== 0) {
      eventMap[type] = list = list.concat();
    }

    this.$insertEventBin(list, type, listener, thisObject, useCapture, priority, dispatchOnce);
  }
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
  public addEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number, dispatchOnce?: boolean): void {
    this.$addListener(type, listener, thisObject, useCapture, priority);
  }

  public once(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number) {
    this.$addListener(type, listener, thisObject, useCapture, priority, true);
  }

  public removeEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean): void {
    const values = this.$EventDispatcher;
    const eventMap: any = useCapture ? values[Keys.captureEventsMap] : values[Keys.eventsMap];
    let list: IEventBin[] = eventMap[type];

    if (!list) {
      return;
    }

    if (values[Keys.notifyLevel] !== 0) {
      eventMap[type] = list = list.concat();
    }

    this.$removeEventBin(list, listener, thisObject);

    if (list.length == 0) {
      eventMap[type] = null;
    }
  }

  public hasEventListener(type: string): boolean {
    const values = this.$EventDispatcher;

    return !!(values[Keys.eventsMap][type] || values[Keys.captureEventsMap][type]);
  }

  public dispatchEvent(event: Event): boolean {
    event.currentTarget = this.$EventDispatcher[Keys.eventTarget];
    event.setTarget(event.currentTarget);
    return this.notifyListener(event, false);
  }

  /**
   * 派发一个事件，字符串方式派发，可以传递参数.
   *
   * @param {string} string
   * @param {boolean} [bubbles]
   * @param {*} [data]
   * @param {boolean} [cancelable]
   * @memberof EventDispatcher
   */
  public dispatchEventWith(type: string, bubbles?: boolean, data?: any, cancelable?: boolean) {
    if (bubbles || this.hasEventListener(type)) {
      const event: Event = Event.create(Event, type, bubbles, cancelable);
      event.data = data;
      const result = this.dispatchEvent(event);
      Event.release(event);
      return result;
    }
    return true;
  }

  public notifyListener(event: Event, capturePhase: boolean): boolean {
    const values = this.$EventDispatcher;
    const eventMap: any = capturePhase 
      ? values[Keys.captureEventsMap]
      : values[Keys.eventsMap];
    const list: IEventBin[] = eventMap[event.type];

    if (!list) {
      return true;
    }

    const length = list.length;
    if (length == 0) {
      return true;
    }

    const onceList = ONCE_EVENT_LIST;
    values[Keys.notifyLevel]++;

    for (let i = 0; i < length; i++) {
      const eventBin = list[i];
      eventBin.listener.call(eventBin.thisObject, event);

      if (eventBin.dispatchOnce) {
        onceList.push(eventBin);
      }

      // TODO: event.$isPropagationImmediateStopped
    }

    values[Keys.notifyLevel]--;
    while(onceList.length) {
      const eventBin = onceList.pop() as IEventBin;
      eventBin.target.removeEventListener(eventBin.type, eventBin.listener, eventBin.thisObject, eventBin.useCapture);
    }
    return !event.isDefaultPrevented;
  }

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
  private $insertEventBin(list: IEventBin[], type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number, dispatchOnce?: boolean): boolean {
    // Notice: 这是什么操作 ？
    // + 可用于将变量转换为数字
    // priority = +priority | 0;
    // + priority 并不能保证 priority一定为数字，不是数字为0, 下面是可读性修改
    if (!priority) priority = 0;

    const length = list.length;
    let insertIndex = -1;
    for (let i = 0; i < length; i++) {
      const bin = list[i];
      if (bin.listener == listener && bin.thisObject == thisObject && bin.target == this) {
        return false;
      }
      if (insertIndex == -1 && bin.priority < priority) {
        insertIndex = i;
      }
    }
    const eventBin: IEventBin = {
      type: type,
      listener: listener,
      thisObject: thisObject,
      priority: priority,
      target: this,
      useCapture: !!useCapture,
      dispatchOnce: !!dispatchOnce
    }
    if (insertIndex !== -1) {
      list.splice(insertIndex, 0, eventBin);
    } else {
      list.push(eventBin);
    }
    return true;
  }

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
  private $removeEventBin(list: IEventBin[], listener: Function, thisObject: any): boolean {
    const length = list.length;
    for (let i = 0; i < length; i++) {
      const bin = list[i];

      if (bin.listener == listener && bin.thisObject == thisObject && bin.target == this) {
        list.splice(i, 1);
        return true;
      }
    }

    return false;
  }
}

const enum Keys {
  eventTarget,
  eventsMap,
  captureEventsMap,
  notifyLevel
}