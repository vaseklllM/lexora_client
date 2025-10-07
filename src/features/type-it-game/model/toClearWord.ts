export const toClearWord = (word: string) => {
  return word
    .toLocaleLowerCase()
    .trim()
    .replaceAll(".", "")
    .replaceAll("?", "")
    .replaceAll(",", "");
};
