import { AlphabetBinaryBitImpl } from "./binary-bit.js"

describe('AlphabetBinaryBitImpl', () => {
    describe('Constructor', () => {
        it('Should not throw being called out without parameters', () => {
            expect(() => new AlphabetBinaryBitImpl()).not.toThrow()
        })
        it('Should instantiate the Alphabet interface', () => {
            expect(new AlphabetBinaryBitImpl()).toEqual(expect.objectContaining({
                isInAlphabet: expect.any(Function),
            }))
        })
    })

    describe('Instance', () => {
        let instance: AlphabetBinaryBitImpl
        beforeEach(() => {
            instance = new AlphabetBinaryBitImpl()
        })
        describe('"isInAlphabet"', () => {
            it('Should return true for the number "0"', () => {
                expect(instance.isInAlphabet(0)).toBe(true)
            })
            it('Should return true for the number "1"', () => {
                expect(instance.isInAlphabet(1)).toBe(true)
            })
            it('Should return false for the string "0"', () => {
                expect(instance.isInAlphabet("0")).toBe(false)
            })
            it('Should return false for the string "1"', () => {
                expect(instance.isInAlphabet("1")).toBe(false)
            })
        })
    })
})