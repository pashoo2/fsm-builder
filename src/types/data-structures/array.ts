/**
 * Get the type of an item that may be stored in the array.
 */
export type ArrayItemType<T extends Array<unknown>> = T extends Array<infer I> ? I : never;
