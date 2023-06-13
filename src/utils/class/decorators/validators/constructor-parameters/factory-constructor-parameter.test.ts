import type { ClassConstructorSingleParameter } from "../../../../../types/index.js"
import { createClassConstructorSingleParameterDecoratorParameterValidator } from "./factory-constructor-parameter.js"
import { type ClassConstructorSingleParameterValidatorFunction } from "./types.js"

describe('createClassConstructorSingleParameterDecoratorParameterValidator', () => {
    describe('The factory parameter validation', () => {
        describe('Should throw an exception if', () => {
            it('the parameter is not a function', () => {
                expect(() => (createClassConstructorSingleParameterDecoratorParameterValidator as any)()).toThrow()
                expect(() => (createClassConstructorSingleParameterDecoratorParameterValidator as any)(null)).toThrow()
            })
            it('the parameter is a function with zero arguments', () => {
                expect(() => createClassConstructorSingleParameterDecoratorParameterValidator(function () { !'foo' })).toThrow()
            })
            it('the parameter is a function with more than one arguments', () => {
                expect(() => (createClassConstructorSingleParameterDecoratorParameterValidator as any)((
                    function (foo: any, bar: any): void { 
                        const fooBar = foo + bar;
                        !fooBar
                    }
                ))).toThrow()
            })
        })
        describe('Should not throw an exception if', () => {
            it('the parameter is an arrow function', () => {
                expect(() => createClassConstructorSingleParameterDecoratorParameterValidator((a) => !a)).not.toThrow()
            })
            it('the parameter is a function accepting one argument', () => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                expect(() => createClassConstructorSingleParameterDecoratorParameterValidator(function (_arg: unknown) {
                    if (!_arg) {
                        console.log('there is no argument');
                    }
                })).not.toThrow()
            })
        })
    })
    describe('Returned value', () => {
        let validatorFunction: ClassConstructorSingleParameterValidatorFunction<unknown>;
        let Decorator: any;
        beforeEach(() => {
            validatorFunction = jest.fn(function (parameter:unknown) {
                if (parameter === 'undefined') {
                    throw new Error('The parameter should be defined');
                }
            })
            Decorator = createClassConstructorSingleParameterDecoratorParameterValidator(validatorFunction)
        })

        // TODO: add more tests
        
        describe('Decorated class', () => {
            let WrappedClass: ClassConstructorSingleParameter<unknown, unknown>;
            let constructorWrappedClassSpy: (...args: unknown[]) => void;
            
            beforeEach(() => {
                constructorWrappedClassSpy = jest.fn()
                @Decorator
                class TestClass {
                    constructor(...parameters: unknown[]) {
                        constructorWrappedClassSpy(...parameters)
                    }
                }
                WrappedClass = TestClass
            })

            it('Should not throw an exception if instantiated with a non-empty argument', () => {
                expect(() => new WrappedClass('a')).not.toThrow()
            })

            it('Should invoke the parameter validator with the first argument of all with which the constructor is being called out', () => {
                const arg1 = {}
                const arg2 = {}
                new (WrappedClass as any)(arg1, arg2)
                expect(validatorFunction).toHaveBeenCalledTimes(1)
                expect(validatorFunction).not.toHaveBeenCalledWith([arg1, arg2])
                expect(validatorFunction).toHaveBeenCalledWith(arg1)
            })

            it('Should call the validation function before the constructor', () => {
                let arg1 = false
                constructorWrappedClassSpy = jest.fn(() => {
                    arg1 = !arg1
                })
                new (WrappedClass as any)(arg1)
                expect(validatorFunction).toHaveBeenCalledWith(false)
                expect(constructorWrappedClassSpy).toHaveBeenCalledTimes(1)
            })
        })
    })
})