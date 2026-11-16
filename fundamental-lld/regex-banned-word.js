function clean(text, banned) {
  for (word of banned) {
    // const reg = new RegExp(`/\b${word}`);
    const reg = new RegExp("\\b" + word, "gi");

    // console.log(reg);
    text = text.replaceAll(reg, "*".repeat(word.length));
  }
  return text;
}

console.log(clean("This is Bad, really BAD. Classy stuff", ["bad", "ass"]));
// expected: This is ***, really ***. Classy stuff.
