export const getRandomFourDigitsString = () => {
  const randomNumber = window.crypto.getRandomValues(new Uint16Array(1))[0];
  const firstFourDigitsString = randomNumber.toString().slice(0, 4);

  return firstFourDigitsString;
};
