import { DecoratorValidateConstructorParameterIsObject } from "../../../../utils/index.js";
import { Alphabet } from '../types/index.js';
import { strict as assert } from 'assert';

export interface AlphabetImplConstructorParameters<T> {
    /**
     * Set of all the possible values of the alphabet
     *
     * @type {Set<T>}
     * @memberof AlphabetImplConstructorParameters
     */
    alphabetValues: Set<T>;
    /**
     * The name of this alphabet.
     *
     * @type {string}
     * @memberof AlphabetImplConstructorParameters
     */
    name: string;
}

@DecoratorValidateConstructorParameterIsObject
export class AlphabetImpl<T> implements Alphabet<T> {
    public get name(): string {
        return this._name;
    }
    protected readonly _alphabetValues: Set<T>;
    protected readonly _name: string;
    constructor(parameters: AlphabetImplConstructorParameters<T>) {
        const { alphabetValues, name } = parameters

        assert(typeof name === 'string', 'The name of the alphabet should be a string')
        assert(name.length, 'The name of the alphabet should not be an empty string')
        assert(alphabetValues instanceof global.Set, '"alphabetValues" parameter is expected to be an instance of the Set')
        this._alphabetValues = alphabetValues;
    }
    public isInAlphabet(value: unknown): value is T {
        return this._alphabetValues.has(value as T);
    }
}