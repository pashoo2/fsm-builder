import type { ClassConstructorSingleParameterDecorator } from "../../../../../../types/index.js";
import { createClassConstructorSingleParameterDecoratorParameterValidator } from "../factory-constructor-parameter.js";
import { classConstructorSingleParameterValidatorFunction } from "./validate-constructor-parameter-is-object.js";

/**
 * A class decorator that verifies that the parameter of the constructor is an object.
 */
export const DecoratorValidateConstructorParameterIsObject: ClassConstructorSingleParameterDecorator = createClassConstructorSingleParameterDecoratorParameterValidator(classConstructorSingleParameterValidatorFunction)