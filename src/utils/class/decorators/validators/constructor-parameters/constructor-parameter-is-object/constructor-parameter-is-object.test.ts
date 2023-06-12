import { ClassConstructorSingleParameter } from "../../../../../../types/index.js"
import { DecoratorValidateConstructorParameterIsObject } from "./constructor-parameter-is-object.js"

describe('DecoratorValidateConstructorParameterIsObject', () => {
    // TODO: add more tests
    describe('Decorator', () => {
        describe('Should throw if', () => {
            it('is used to wrap a function', () => {
                expect(() => {
                    (DecoratorValidateConstructorParameterIsObject as any)(() => {});
                }).toThrow()
            })
        })
        describe('Should not throw if', () => {
            it('is used to wrap a class', () => {
                expect(() => {
                    @DecoratorValidateConstructorParameterIsObject
                    class WrappedClass {
                        constructor(_parameter) {}
                    }

                    new WrappedClass({})
                }).not.toThrow()
            })
        })
    })

    describe('Wrapped class', () => {
        let WrappedClass: ClassConstructorSingleParameter<unknown, unknown>
        beforeEach(() => {
            @DecoratorValidateConstructorParameterIsObject
            class TestClass {
                constructor(_parameter: any) {}
            }

            WrappedClass = TestClass
        })

        describe('constructor', () => {
            describe('Should throw if', () => {
                it('invoked without arguments', () => {
                    expect(() => new (WrappedClass as any)()).toThrow()
                })
                it('invoked with "null"', () => {
                    expect(() => new (WrappedClass as any)(null)).toThrow()
                })
            })
            describe('Should not throw if', () => {
                it('invoked with an empty object', () => {
                    expect(() => new WrappedClass({})).not.toThrow()
                })
            })
        })
    })
})