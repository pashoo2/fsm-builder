import { Alphabet } from "../../../types/alphabet.js";
import { AlphabetImpl } from "../../abstract.js";

import { AlphabetBinaryBitImplName, AlphabetBinaryBitImplValues } from './constants.js'
import { AlphabetBinaryBitItem } from './types.js';


/**
 * Represents possible figures of a binary number, which are 0 and 1.
 *
 * @export
 * @class AlphabetBinaryBitImpl
 * @extends {AlphabetImpl<AlphabetBinaryBitItemType>}
 * @implements {Alphabet<AlphabetBinaryBitItemType>}
 * @template AlphabetBinaryBitItemType
 */
export class AlphabetBinaryBitImpl extends AlphabetImpl<AlphabetBinaryBitItem> implements Alphabet<AlphabetBinaryBitItem> {
    constructor() {
        super({ 
            alphabetValues: AlphabetBinaryBitImplValues as Set<AlphabetBinaryBitItem>, // TODO: resolve the type cast
            name: AlphabetBinaryBitImplName
        })
    }
}
