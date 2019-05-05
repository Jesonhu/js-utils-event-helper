import { Event } from './Core/events/Event';
import { EventDispatcher } from './Core/events/EventDispatcher';
/**
 * 常用工具合集.
 */
declare const jsUtilsHelper: {
    /** 事件类 */
    Event: typeof Event;
    /**
     * 事件监听派发类.
     */
    EventDispatcher: typeof EventDispatcher;
};
export default jsUtilsHelper;
