export interface ModuloThree {
    /**
     * Computes a reminder of a binary number,which is represented by a string,
     * divided by three.
     *
     * @param {string} binaryNumberStringified - a binary number e.g. "10101010".
     * @return {number} - the value of the reminder of "binaryNumberStringified" being divided by "3".
     * @memberof ReminderCalculator
     */
    (binaryNumberStringified: string): number;
}