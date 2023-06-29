import { isDefined } from "./is-defined.js"

describe('isDefined', () => {
    describe("Should return false if called", () => {
        it('without parameters', () => {
            expect((isDefined as any)()).toBe(false)
        })
    
        it('with "undefined"', () => {
            expect(isDefined(undefined)).toBe(false)
        })
    
        it('with "null"', () => {
            expect(isDefined(null)).toBe(false)
        })

        it('with "NaN"', () => {
            expect(isDefined(NaN)).toBe(false)
        })
    })

    describe("Should return true if called", () => {
        it('with an empty string', () => {
            expect(isDefined('')).toBe(true)
        })
        it('with a string consisting of spaces', () => {
            expect(isDefined(' ')).toBe(true)
            expect(isDefined('   ')).toBe(true)
        })
        it('with a string consisting of tabs', () => {
            expect(isDefined('      ')).toBe(true)
            expect(isDefined('  ')).toBe(true)
        })
        it('with zero', () => {
            expect(isDefined(0)).toBe(true)
        })
        it('with any non-NaN number', () => {
            expect(isDefined(Number.MIN_SAFE_INTEGER)).toBe(true)
            expect(isDefined(Number.MAX_SAFE_INTEGER)).toBe(true)
            expect(isDefined(Number.EPSILON)).toBe(true)
            expect(isDefined(Number.NEGATIVE_INFINITY)).toBe(true)
            expect(isDefined(Number.POSITIVE_INFINITY)).toBe(true)
        })
        it('with an empty object', () => {
            expect(isDefined({})).toBe(true)
        })
        it('with an instance of Date', () => {
            expect(isDefined(new Date())).toBe(true)
        })
    })
})