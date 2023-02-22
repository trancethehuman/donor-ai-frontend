export const getRandomLettersSequence = () => {
  let letters = "abcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < 9; i++) {
    let randomIndex = Math.floor(Math.random() * letters.length);
    result += letters[randomIndex];
  }
  return result;
};
