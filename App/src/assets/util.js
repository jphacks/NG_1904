import kuromoji from "kuromoji"

export function morphologicalAnalysis(text) {
  let promise = new Promise((resolve,reject) => {
    kuromoji.builder({ dicPath: "/dict" }).build((err, tokenizer) => {
      const tokens = tokenizer.tokenize(text);
      resolve(tokens);
    })
  })
  return promise
}
