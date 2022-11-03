export const randomId = (length = 10) => {
  const nums = "0123456789";
  const lowerChars = "zxcvbnmlkjhgfdsaqwertyuiop";
  const upperChars = "AZSXDCFVGBHNJMKLPOIUYTREWQ";
  const symbols = "!@#$%^&*()_+=-~;:]}[{/?.>,<";
  const mix = [...nums, ...lowerChars, ...upperChars, ...symbols];
  return mix
    .sort(() => Math.random() - 0.5)
    .slice(0, length)
    .join("");
};
