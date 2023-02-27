/**
 * It returns a string of 9 random letters from the alphabet.
 * @returns A string of 9 random letters.
 */
export const getRandomLettersSequence = () => {
  let letters = "abcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < 9; i++) {
    let randomIndex = Math.floor(Math.random() * letters.length);
    result += letters[randomIndex];
  }
  return result;
};

/**
 * It removes the first character from a string if it's a dot. Sometimes OpenAI's API response has a dot at the beginning of the result.
 * @param string - The string to be trimmed.
 * @returns the string with the beginning dot removed.
 */
export const removeBeginningDotFromString = (string) => {
  return string.trim().startsWith(".") ? string.trim().slice(1) : string.trim();
};

/**
 * It takes an array of objects and an array of keys to keep, and returns a new array of objects with
 * only the keys specified in the array of keys to keep
 * @param array - [{a: 1, b: 2, c: 3}, {a: 4, b: 5, c: 6}, {a: 7, b: 8, c: 9}]
 * @param keysToKeepArray - ['id', 'name', 'age']
 * @returns An array of objects with only the keys specified in the keysToKeepArray.
 */
export const keepCertainKeysForEachObjectOfArray = (array, keysToKeepArray) => {
  return array.map(({ ...rest }) => {
    const filteredRest = Object.keys(rest)
      .filter((key) => keysToKeepArray.includes(key))
      .reduce((obj, key) => {
        obj[key] = rest[key];
        return obj;
      }, {});
    return { ...filteredRest };
  });
};
