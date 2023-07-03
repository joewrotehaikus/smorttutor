const toExclude = [
  "a",
  "an",
  "are",
  "be",
  "can",
  "introduction",
  "intro",
  "the",
  "what",
  "when",
  "at",
  "does",
  "to",
  "you",
  "your",
  "with",
  "following",
  "is",
  "if",
  "for",
  "it",
  "s",
  "consider",
  "considered",
  "both",
  "use",
  "used",
];

const slugMaker = (string) => {
  if (string === null || string === undefined) {
    return new Date().getTime();
  }

  let array = string
    .trim()
    .toLowerCase()
    .split(/\s+|\W+/)
    .filter((x) => {
      return x.length > 2 && toExclude.find((i) => i === x) === undefined;
    })
    .slice(0, 3)
    .map((x, index) => {
      let rtn = x;
      if (index > 0) rtn = x.charAt(0).toUpperCase() + x.slice(1);
      return rtn;
    });
  let fiveDigitRandom = Math.floor(Math.random() * 90000) + 10000;
  return array.join("") + fiveDigitRandom;
};

module.exports = slugMaker;
