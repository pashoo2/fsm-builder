import { AlphabetNumericSetImpl } from "./numeric-set.js"

const VALID_ALPHABET_ENTRIES = new Set([-1, 0, NaN, Number.MIN_SAFE_INTEGER, Number.MAX_VALUE, Number.POSITIVE_INFINITY])
const INVALID_ALPHABET_ENTRIES = ['a', '', {}, Symbol]

describe('AlphabetNumericSetImpl', () => {
    describe('Constructor', () => {
        it('Should not throw being called with all required parameters', () => {
            expect(() => new AlphabetNumericSetImpl({
                name: 'any',
                alphabetValues: VALID_ALPHABET_ENTRIES,
            })).not.toThrow()
            expect(() => new AlphabetNumericSetImpl({
                name: 'any',
                alphabetValues: new Set<number>(),
            })).not.toThrow()
        })
        it('Should throw being called out without all required parameters', () => {
            expect(() => new (AlphabetNumericSetImpl as any)()).toThrow()
            expect(() => new (AlphabetNumericSetImpl as any)({})).toThrow()
        })
        it.each(INVALID_ALPHABET_ENTRIES)('Should throw is given "%i" as an alphabet item', (v) => {
            expect(() => new AlphabetNumericSetImpl({
                name: 'any',
                alphabetValues: new Set([v as number])
            })).toThrow()
        })
        it('Should instantiate the Alphabet interface', () => {
            expect(new AlphabetNumericSetImpl({
                name: 'any',
                alphabetValues: VALID_ALPHABET_ENTRIES,
            })).toEqual(expect.objectContaining({
                isInAlphabet: expect.any(Function),
            }))
        })
    })

    describe('Instance', () => {
        let instance: AlphabetNumericSetImpl<number>
        beforeEach(() => {
            instance = new AlphabetNumericSetImpl<number>({
                name: 'any',
                alphabetValues: VALID_ALPHABET_ENTRIES,
            })
        })
        describe('"isInAlphabet"', () => {
            it.each([...VALID_ALPHABET_ENTRIES])('Should return true for "%i"', (v: number) => {
                expect(instance.isInAlphabet(v)).toBe(true)
            })
            it.each([...INVALID_ALPHABET_ENTRIES])('Should return false for "%i"', (v: unknown) => {
                expect(instance.isInAlphabet(v)).toBe(false)
            })
        })
    })
})