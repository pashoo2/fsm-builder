import type { ClassConstructorSingleParameter, ClassConstructorSingleParameterDecorator } from "../../../../../../types/index.js";
import { createClassConstructorSingleParameterDecoratorParameterValidator } from "../factory-constructor-parameter.js";
import type { ClassParameterExpectedType } from "./types.js";
import { classConstructorSingleParameterValidatorFunction } from "./validate-constructor-parameter-is-object.js";

/**
 * A class decorator that verifies that the parameter of the constructor is an object.
 */
export const DecoratorValidateConstructorParameterIsObject: ClassConstructorSingleParameterDecorator<unknown, ClassParameterExpectedType> = createClassConstructorSingleParameterDecoratorParameterValidator<ClassConstructorSingleParameter<unknown, ClassParameterExpectedType>>(classConstructorSingleParameterValidatorFunction)