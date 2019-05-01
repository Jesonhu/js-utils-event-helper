import IHashObject from './interface/IHashObject';
/**
 * @private
 * 哈希计数
 */
export declare let $hashCount: number;
/**
 * 顶级对象。框架内所有对象的基类，为对象实例提供唯一的hashCode值。
 */
export declare class HashObject implements IHashObject {
    constructor();
    private $hashCode;
    /**
     * 返回此对象唯一的哈希值,用于唯一确定一个对象。hashCode为大于等于1的整数。
     *
     * @readonly
     * @type {number}
     * @memberof HashObject
     */
    readonly hashCode: number;
}
export default HashObject;
