/**
 * A class constructor with multiple parameters.
 *
 * @export
 * @interface ClassConstructorMultiParameters
 * @template T - the type of the instantiated class. 
 * @template P - the type of the parameters.
 */
export interface ClassConstructorMultiParameters<T, P extends unknown[]> {
    new (...parameters: P): T
}

/**
 * A class constructor with a single parameter.
 *
 * @export
 * @interface ClassConstructorSingleParameter
 * @template T - the type of the instantiated class. 
 * @template P - the type the parameters.
 */
export interface ClassConstructorSingleParameter<T, P> {
    new (parameter: P): T
}


/**
 * Derive the type of a class constructor single parameter by the given type of the constructor.
 * 
 * @type {ParametersClassConstructorSingleParameter}
 */
export type ParametersClassConstructorSingleParameter<C extends ClassConstructorSingleParameter<unknown, unknown>> = 
    | C extends ClassConstructorSingleParameter<unknown, infer P> ? P : never;
 