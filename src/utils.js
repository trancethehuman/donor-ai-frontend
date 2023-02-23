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
