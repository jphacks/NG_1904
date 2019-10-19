import kuromoji from "kuromoji"

const GOO_API_URL = 'https://labs.goo.ne.jp/api/morph'

export function morphologicalAnalysis(text) {
  let promise = new Promise((resolve,reject) => {
    kuromoji.builder({ dicPath: "/dict" }).build((err, tokenizer) => {
      const tokens = tokenizer.tokenize(text);
      resolve(tokens);
    })
  })
  return promise
}

export function vibrate() {
  window.navigator.vibrate([500, 100, 500]);
} 

export function gooAPIClient(text) {
  console.log(process.env.REACT_APP_GOO_API_TOKEN)
  return fetch(GOO_API_URL,{
    method: 'POST',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      app_id:process.env.REACT_APP_GOO_API_TOKEN,
      sentence:text
    }), 
  }).then(response => response.json());
}
