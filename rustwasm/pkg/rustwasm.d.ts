/* tslint:disable */
/* eslint-disable */
/**
* @param {number} x
* @returns {number}
*/
export function add(x: number): number;
/**
* @param {number} x
* @returns {Array<any>}
*/
export function bob(x: number): Array<any>;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly memalloc: (a: number) => number;
  readonly my_alloc: (a: number) => number;
  readonly my_dealloc: (a: number, b: number) => void;
  readonly array_merge: (a: number, b: number) => number;
  readonly add: (a: number) => number;
  readonly bob: (a: number) => number;
  readonly array_sum: (a: number, b: number) => number;
}

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
