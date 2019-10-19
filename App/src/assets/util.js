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

export function wordCount(words) {
  let wc = {}
  for(let word of words) {
    let w = word[0];
    if(w in wc) {
      wc[w] += 1
    } else {
      wc[w] = 1
    }
  }

  let wordCount = []

  // Fixme データの持ちかえを修正
  for(let [key,value] of Object.entries(wc)) {
    wordCount.push({
      "str": key,
      "count":value,
      "location":null,
      "date":null
    })
  }

  wordCount.sort((a,b) => {
    if(a["count"] > b["count"]) return 1
    else if (a["count"] > b["count"]) return -1
    return 0
  })

  return wordCount
}