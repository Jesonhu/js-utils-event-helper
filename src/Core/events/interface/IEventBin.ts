import { IEventDispatcher } from './IEventDispatcher';
/**
 * 事件信息对象.
 *
 * @export
 * @interface IEventBin
 */
export interface IEventBin {
  type: string;
  /**
   * @private
   */
  listener: Function;
  /**
   * @private
   */
  thisObject: any;
  /**
   * @private
   */
  priority: number;
  /**
   * @private
   */
  target: IEventDispatcher;
  /**
   * @private
   */
  useCapture: boolean;
  /**
   * @private
   */
  dispatchOnce: boolean;
}