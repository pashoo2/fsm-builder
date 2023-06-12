import { classConstructorSingleParameterValidatorFunction } from "./validate-constructor-parameter-is-object.js"

describe('classConstructorSingleParameterValidatorFunction', () => {
    // TODO: add more tests
    
    describe('Should throw an exception if invoked', () => {
        it('without arguments', () => {
            expect(() => (classConstructorSingleParameterValidatorFunction as any)()).toThrow()
        })
        it('with "null"', () => {
            expect(() => (classConstructorSingleParameterValidatorFunction as any)(null)).toThrow()
        })
        it('with "undefined"', () => {
            expect(() => (classConstructorSingleParameterValidatorFunction as any)(undefined)).toThrow()
        })
        it('with a number', () => {
            expect(() => (classConstructorSingleParameterValidatorFunction as any)(0)).toThrow()
            expect(() => (classConstructorSingleParameterValidatorFunction as any)(10.11111)).toThrow()
        })
        it('with an empty string', () => {
            expect(() => (classConstructorSingleParameterValidatorFunction as any)("")).toThrow()
        })
        it('with a non empty string', () => {
            expect(() => (classConstructorSingleParameterValidatorFunction as any)("non empty")).toThrow()
        })
    })

    describe('Should not throw an exception if invoked with', () => {
        it('an empty object', () => {
            expect(() => classConstructorSingleParameterValidatorFunction({})).not.toThrow()
        })
        it('non-empty object', () => {
            expect(() => classConstructorSingleParameterValidatorFunction({ foo: 'bar' })).not.toThrow()
            expect(() => (classConstructorSingleParameterValidatorFunction as any)(new Date())).not.toThrow()
        })
    })
})