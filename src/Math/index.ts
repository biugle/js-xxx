/*
 * @Author: HxB
 * @Date: 2022-04-26 16:24:34
 * @LastEditors: DoubleAm
 * @LastEditTime: 2023-03-10 09:43:49
 * @Description: 数学常用方法
 * @FilePath: \js-xxx\src\Math\index.ts
 */

/**
 * 除法函数
 * Example:
 * `div(1, 2) => 0.5`
 * `div(0.55, 100) => 0.0055`
 * @param div1 被除数
 * @param div2 除数
 * @returns
 */
export function div(div1: number | string, div2: number | string): number {
  let div1FloatLen = 0,
    div2FloatLen = 0,
    tempDiv1 = div1.toString(),
    tempDiv2 = div2.toString();
  try {
    div1FloatLen = tempDiv1.split('.')[1].length; //获取小数长度
  } catch (e) {}
  try {
    div2FloatLen = tempDiv2.split('.')[1].length;
  } catch (e) {}
  return times(
    Number(tempDiv1.replace('.', '')) / Number(tempDiv2.replace('.', '')),
    Math.pow(10, div2FloatLen - div1FloatLen)
  ); //转换整数计算再使用科学计数法转换小数位
}

/**
 * 乘法函数
 * Example:
 * `times(1, 2) => 2`
 * `times(0.55, 100) => 55`
 * @param mul1 被乘数
 * @param mul2 乘数
 * @returns
 */
export function times(mul1: number | string, mul2: number | string): number {
  let mulFloatLen = 0,
    tempMul1 = mul1.toString(),
    tempMul2 = mul2.toString();
  try {
    mulFloatLen += tempMul1.split('.')[1].length;
  } catch (e) {}
  try {
    mulFloatLen += tempMul2.split('.')[1].length;
  } catch (e) {}
  return (Number(tempMul1.replace('.', '')) * Number(tempMul2.replace('.', ''))) / Math.pow(10, mulFloatLen);
}

/**
 * 加法函数
 * Example:
 * `add(1, 2) => 3`
 * `add(0.1, 0.2) => 0.3`
 * @param add1 被加数
 * @param add2 加数
 * @returns
 */
export function add(add1: number | string, add2: number | string): number {
  let add1FloatLen = 0,
    add2FloatLen = 0,
    multiple = 1;
  try {
    add1FloatLen = add1.toString().split('.')[1].length;
  } catch (e) {}
  try {
    add2FloatLen = add2.toString().split('.')[1].length;
  } catch (e) {}
  multiple = Math.pow(10, Math.max(add1FloatLen, add2FloatLen));
  return (times(add1, multiple) + times(add2, multiple)) / multiple;
}

/**
 * 减法函数
 * Example:
 * `sub(1, 2) => -1`
 * `sub(0.55, 0.1) => 0.45`
 * @param sub1 被减数
 * @param sub2 减数
 * @returns
 */
export function sub(sub1: number | string, sub2: number | string): number {
  let sub1FloatLen = 0,
    sub2FloatLen = 0,
    multiple = 1;
  try {
    sub1FloatLen = sub1.toString().split('.')[1].length;
  } catch (e) {}
  try {
    sub2FloatLen = sub2.toString().split('.')[1].length;
  } catch (e) {}
  multiple = Math.pow(10, Math.max(sub1FloatLen, sub2FloatLen));
  return parseFloat(`${(times(sub1, multiple) - times(sub2, multiple)) / multiple}`);
}

/**
 * 获取平均数
 * Example:
 * `average(1, 2, 3, 4) => 2.5`
 * `average(1, 2, 3, 4.123) => 2.53075`
 * @param args
 * @returns
 */
export function average(...args: any[]) {
  let sum = 0;
  const len = args.length;

  for (let i = 0; i < len; i++) sum = add(sum, args[i]);

  return args.length ? div(sum, len) : 0;
}

/**
 * 获取绝对值
 * Example:
 * `abs(-1) => 1`
 * `abs(1) => 1`
 * @param value
 * @returns
 */
export function abs(value: number): number {
  return Math.abs(value);
}

/**
 * 去尾法获取数值
 * Example:
 * `float(1.135, 0, true) => '1'`
 * `float(1.135, 2, true) => '1.13'`
 * `float(1.135, 1) => 1.1`
 * `float(1.135, 4) => 1.135`
 * `float(1.135, 4, true) => '1.1350'`
 * @param value
 * @param d
 * @param isStr
 * @returns
 */
export function float(value: number, d: number = 0, isStr: boolean = false): number | string {
  const arr = `${value}`.split('.');
  const doubleStr = arr.length > 1 ? arr[1].padEnd(d, '0').substring(0, d) : '0'.padEnd(d, '0');
  const res = d === 0 ? arr[0] : `${arr[0]}.${doubleStr}`;
  return isStr ? res : Number(res);
}
