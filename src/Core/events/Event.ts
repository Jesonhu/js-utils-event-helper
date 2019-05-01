import HashObject from './HashObject';
import EventPhase from './EventPhase';
import IEventDispatcher from './interface/IEventDispatcher';

/**
 * Event 类作为创建事件实例的基类
 *
 * @class Event
 * @extends {HashObject}
 */
export class Event extends HashObject {
  constructor(type: string, bubbles?: boolean, cancelable?: boolean, data?: any) {
    super();

    this.init(type, bubbles, cancelable, data)
  }
  private init(type: string, bubbles?: boolean, cancelable?: boolean, data?: any) {
    this.$type = type
    this.$bubbles = !!bubbles
    this.$cancelable = !!cancelable
    this.data = data
  }
  // 静态方法和属性 start ===============================================
  
  public static create<T extends Event>(
    EventClass: { new(type: string, bubbles?: boolean, cancelable?: boolean): T, eventPool?: Event[] },
    type: string,
    bubbles?: boolean,
    cancelable?: boolean
  ):T {
    let eventPool: Event[];
    let hasEventPool = (EventClass as any).hasOwnProperty("eventPool");
    if (hasEventPool) {
      eventPool = EventClass.eventPool as Event[];
    } else {
      console.log('not have eventPoll');
      eventPool = EventClass.eventPool = [];
    }

    // Notice: 上面采取了 else 方式，避免 ts(2454) 报错.
    // if (!eventPool) {
    //   console.log('not have eventPoll');
    //   eventPool = EventClass.eventPool = [];
    // }
    if (eventPool.length) {
      let event: T = <T>eventPool.pop();
      event.$type = type;
      event.$bubbles = !!bubbles;
      event.$cancelable = !!cancelable;
      event.$isDefaultPrevented = false;
      event.$eventPhase = EventPhase.AT_TARGET;
      return event;
    }
    return new EventClass(type, bubbles, cancelable)
  }

  public static getPropertyData(EventClass: any): any {
    let props: any = EventClass._props;
    if (!props) {
      props = EventClass._props = {};
    }
    return props;
  }

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
  public static dispatchEvent(target: IEventDispatcher, type: string, bubbles: boolean = false, data?: any ) {
    const event = Event.create(Event, type, bubbles);
    const props = Event.getPropertyData(Event);

    if (data != undefined) {
      props.data = data;
    }

    const result = target.dispatchEvent(event);
    Event.release(event);

    return result;
  }

  /**
   * 释放一个事件.
   *
   * @static
   * @param {Event} event
   * @memberof Event
   */
  public static release(event: Event): void {
    event.clean();
    const EventClass: any = Object.getPrototypeOf(event).constructor;

    console.log('EventClass.eventPool', EventClass.eventPool);
    EventClass.eventPool.push(event);
  }
  // 静态方法和属性 end ===============================================

  /**
   * 事件的类型.
   *
   * @private
   * @type {string}
   * @memberof Event
   */
  private $type: string

  /**
   * 返回事件的类型.
   *
   * @readonly
   * @type {string}
   * @memberof Event
   */
  public get type(): string {
    return this.$type;
  }
  /**
   * 事件是否可以冒泡.
   *
   * @private
   * @type {boolean}
   * @memberof Event
   */
  private $bubbles: boolean

  public get bubbles():boolean {
    return this.$bubbles;
  }
  /**
   * 事件是否可以取消.
   *
   * @private
   * @type {boolean}
   * @memberof Event
   */
  private $cancelable: boolean
  /**
   * 触发事件的对象.
   *
   * @private
   * @type {*}
   * @memberof Event
   */
  private $currentTarget: any = null

  public set currentTarget(value) {
    this.$currentTarget = value;
  }
  public get currentTarget(): any {
    return this.$currentTarget;
  }
  /**
   * 事件传递的参数.
   *
   * @type {*}
   * @memberof Event
   */
  public data: any

  /**
   * 是否阻止默认事件.
   *
   * @private
   * @type {boolean}
   * @memberof Event
   */
  private $isDefaultPrevented: boolean = false;

  public get isDefaultPrevented(): boolean {
    return this.$isDefaultPrevented;
  }

  public set isDefaultPrevented(value: boolean) {
    this.$isDefaultPrevented = value;
  }

  /**
   * 事件流中的当前阶段。
   *
   * @private
   * @type {number}
   * @memberof Event
   */
  private $eventPhase: number = EventPhase.AT_TARGET

  /**
   * 事件要操作的对象.
   *
   * @private
   * @type {*}
   * @memberof Event
   */
  private $target: any = null

  public get eventPhase(): number {
    return this.$eventPhase;
  }

  protected clean(): void {
    this.data = this.$currentTarget = null;
    this.setTarget(null);
  }

  private $setTarget(target: any): boolean {
    this.$target = target;
    return true;
  }

  public setTarget(target: any): boolean {
    this.$target = target;
    return true;
  }
}

export default Event;