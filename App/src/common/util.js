// 形態素解析を行うためにAPIのエンドポイント
// 実態はFirebase FunctionsをクッションにしてGooAPIを叩いている
const MORPHOLOGICAL_API = ' https://us-central1-polished-zephyr-258013.cloudfunctions.net/doMorphological'
//名詞などの口癖に関係のない形態素要素を削除
//https://labs.goo.ne.jp/api/jp/morphological-analysis-pos_filter/
//"名詞接尾辞"は”わかりみが深い”の”み”などの検出に使うのでフィルタしてない
const POS_FILTER_MUST = ["名詞","格助詞","括弧","句点","読点","空白","助数詞","助助数詞","冠数詞","英語接尾辞"]
const POS_FILTER_MAYBE = ["引用助詞","連用助詞","終助詞"];
const POS_FILTER = POS_FILTER_MUST.concat(POS_FILTER_MAYBE);

export function vibrate() {
  window.navigator.vibrate([500, 100, 100,50,100]);
}

export function morphologicalAPIClient(text) {
  return fetch(MORPHOLOGICAL_API,{
    method: 'POST',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify({
      sentence:text
    }), 
  }).then(response => response.json());
}

export function wordCount(words) {
  let wc = {}
  for(let word of words) {
    let w = word[0];
    let t = word[1];

    if(POS_FILTER.indexOf(t) !== -1) continue;
    
    if(w in wc) {
      wc[w]["count"] += 1
    } else {
      wc[w] = {
        "count":1,
        "type":t
      }
    }
  }

  let wordCount = []

  // Fixme データの持ちかえを修正
  for(let [key,value] of Object.entries(wc)) {
    wordCount.push({
      "str": key,
      "count":value["count"],
      "type":value["type"],
      "location":null,
      "date":null
    })
  }

  wordCount.sort((a,b) => {
    if(a["count"] > b["count"]) return -1
    else if (a["count"] < b["count"]) return 1
    return 0
  })

  return wordCount.slice(0,5);
}