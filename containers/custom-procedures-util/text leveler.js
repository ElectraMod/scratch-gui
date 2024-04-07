/**
 * creates a string of a given length from a given content
 * @param {Number} length the goal length
 * @param {String} contents what to make the string from
 * @returns {String} a string with contents repeated length times
 */
const makeString = (length, contents) => {
    let array;
    for (array = []; array.length < length; array.push(contents));
    return array.join();
};

/**
 * levels text so its always the same length
 * @param {String} text the text to level
 * @param {Number} length the length to level to
 * @param {String} sus the filler character
 * @returns {String} the leveled text
 */
const levelText = (text, length, sus) => {
    if (text.length === length) return text;
    if (text.length > length) return text.slice(0, length + 1);
    const full = makeString(length, sus);
    return `${full.slice(0, length - text.length)}${text}`;
};

module.exports = levelText;
