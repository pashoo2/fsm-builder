import { isObject } from "./is-object.js"

describe('isObject', () => {
    describe('Should return "false" if the argument is', () => {
        it('"null"', () => {
            expect(isObject(null)).toBe(false)
        })
        it('"undefined"', () => {
            expect(isObject(undefined)).toBe(false)
        })
        it('"NaN"', () => {
            expect(isObject(NaN)).toBe(false)
        })
        it('a number', () => {
            expect(isObject(-0)).toBe(false)
            expect(isObject(1)).toBe(false)
            expect(isObject(-1.2232332323)).toBe(false)
            expect(isObject(Number.MAX_VALUE)).toBe(false)
            expect(isObject(Number.MIN_VALUE)).toBe(false)
            expect(isObject(Number.NEGATIVE_INFINITY)).toBe(false)
            expect(isObject(Number.POSITIVE_INFINITY)).toBe(false)
        })
        it('a string', () => {
            expect(isObject('')).toBe(false)
            expect(isObject(' ')).toBe(false)
            expect(isObject('abc')).toBe(false)
        })
        it('a Symbol', () => {
            expect(isObject(Symbol.for(''))).toBe(false)
        })
        it('a BigInt', () => {
            expect(isObject(BigInt('0x1fffffffffffff'))).toBe(false)
        })
        it('a function', () => {
            expect(isObject(() => ({}))).toBe(false)
            expect(isObject(function () { return {} })).toBe(false)
            expect(isObject(new Function('a', 'b', 'return a + b'))).toBe(false)
        })
        it('a class', () => {
            expect(isObject(class Test { a: 'b' })).toBe(false)
        })
    })
    describe('Should return "true" if the argument is', () => {
        it('an empty object', () => {
            expect(isObject({})).toBe(true)
        })
        it('an empty date', () => {
            expect(isObject(new Date())).toBe(true)
        })
    })
})