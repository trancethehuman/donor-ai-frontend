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
