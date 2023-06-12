import type { ClassConstructorSingleParameterDecorator } from "../../../../../types/index.js";

/**
 * Validates a value of class constructor parameter against a set of requirements. 
 *
 * @export
 * @interface ClassConstructorSingleParameterValidatorFunction
 * @throws {Error} - throws an error if the constructor parameter value doesn't meet the requirements
 * @template P
 */
export interface ClassConstructorSingleParameterValidatorFunction<P> {
    /**
     * Checks if "classConstructorParameterValue" meets the requirements.
     *
     * @param {P} classConstructorParameterValue
     * @memberof ClassConstructorSingleParameterValidatorFunction
     */
    (classConstructorParameterValue: P): void
}

/**
 * Creates a class decorator.
 * 
 * A function is called withing a class constructor before the original constructor function.
 *
 * @export
 * @interface ClassConstructorSingleParameterDecoratorParameterValidatorFactory
 * @template P
 */
export interface ClassConstructorSingleParameterDecoratorParameterValidatorFactory<P> {
    (validateParametersFunction: ClassConstructorSingleParameterValidatorFunction<P>): ClassConstructorSingleParameterDecorator
}
