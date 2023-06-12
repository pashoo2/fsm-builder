import { strict as assert } from "assert";
import type { ClassConstructorSingleParameter, ClassConstructorSingleParameterDecorator, ParametersClassConstructorSingleParameter } from "../../../../../types/index.js";
import type { ClassConstructorSingleParameterValidatorFunction } from "./types.js";

/**
 * Crates a class decorator that has a purpose of checking its constructor parameter with a given "validation" function. 
 *
 * @export
 * @template C
 * @param {ClassConstructorSingleParameterValidatorFunction<ParametersClassConstructorSingleParameter<C>>} validateConstructorParameters - a function that is called out before the decorated class constructor function with an argument that
 * is passed into the constructor to check it against a set of requirements.
 * @return {ClassConstructorSingleParameterDecorator<unknown, ParametersClassConstructorSingleParameter<C>>}
 */
export function createClassConstructorSingleParameterDecoratorParameterValidator<C extends ClassConstructorSingleParameter<unknown, unknown>>(
  validateConstructorParameters: ClassConstructorSingleParameterValidatorFunction<ParametersClassConstructorSingleParameter<C>>
): ClassConstructorSingleParameterDecorator {
  assert(typeof validateConstructorParameters === 'function', 'The argument should be a function')
  // eslint-disable-next-line @typescript-eslint/ban-types
  assert((validateConstructorParameters as Function).length === 1, 'The function should accept exactly one parameter')

  return function DecoratorValidateConstructorParameters(WrappedClass: C, context): C {
    assert(context?.kind === "class", 'The decorator is applicable only to a class')
    // TODO: add a utility to check if the value is a "ES6" class.
    assert(Boolean(WrappedClass), 'A ES6 class value expected')

    const TargetWrappedClass = WrappedClass as any
    return class extends TargetWrappedClass {
        constructor(parameter: ParametersClassConstructorSingleParameter<C>) {
          validateConstructorParameters(parameter);
          super(parameter);
        }
      } as C;
  }
}