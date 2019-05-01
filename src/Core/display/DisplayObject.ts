import { EventDispatcher } from '../events/EventDispatcher';
import { Event } from '../events/Event';
import { DisplayObjectContainer } from './DisplayObjectContainer';

/**
 * 创建一个显示对象.
 *
 * @class DisplayObject
 * @extends {EventDispatcher}
 */
export class DisplayObject extends EventDispatcher {
  constructor() {
    super();
  }

  public addEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number, dispatchOnce?: boolean): void {
    super.addEventListener(type, listener, thisObject, useCapture, priority, dispatchOnce);

    // TODO: isEnterFrame
  }

  public removeEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean): void {
    super.removeEventListener(type, listener, thisObject, useCapture);
  }

  public dispatchEvent(event: Event): any {
    if (!event.bubbles) {
      return super.dispatchEvent(event);
    }

    const list = this.$getPropationList(this);
    const targetIndex = list.length * 0.5;
    event.setTarget(this);
    this.$dispatchPropagationEvent(event, list, targetIndex);

    // TODO: return !event.$isDefaultPrevented;

  }

  /**
   * 获取事件流.
   *
   * @private
   * @param {DisplayObject} target
   * @returns {DisplayObject[]}
   * @memberof DisplayObject
   */
  private $getPropationList(target: DisplayObject): DisplayObject[] {
    let list: DisplayObject[] = [];

    while(target) {
      list.push(target);
      target = target.$parent;
    }
    const captureList = list.concat();
    //Notice: 使用一次reverse()方法比多次调用unshift()性能高。
    captureList.reverse();
    list = captureList.concat(list);

    return list;
  }

  private $dispatchPropagationEvent(event: Event, list: DisplayObject[], targetIndex: number): void {
    
  }

  private $parent: DisplayObjectContainer

  public get parent(): DisplayObjectContainer {
    return this.$parent
  }
}