import type { ClassConstructorSingleParameterValidatorFunction } from "../types.js";
import { isDefined, isObject } from '../../../../../checkers/index.js';
import type { ClassParameterExpectedType } from "./types.js";

/**
 * Validates that the given value is an object.
 *
 * @template P
 * @param {P} constructorParameter
 */
export const classConstructorSingleParameterValidatorFunction: ClassConstructorSingleParameterValidatorFunction<ClassParameterExpectedType> = function classConstructorSingleParameterValidatorFunctionImpl<P extends ClassParameterExpectedType>(
    constructorParameter: P
): void {
    if (!isDefined(constructorParameter)) {
        throw new Error('The constructor parameter should be defined')
    }
    if (!isObject(constructorParameter)) {
        throw new Error('The constructor parameter should be an object')
    }
}