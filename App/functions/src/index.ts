const functions = require('firebase-functions');
const rp = require('request-promise');
const cors = require('cors')({origin: true});

const GOO_API_URL: string = 'https://labs.goo.ne.jp/api/morph';
const TOKEN: string = functions.config().api.token;

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


exports.doMorphological = functions.https.onRequest(async (req: any,res : any) => {
  return cors(req,res, async () => {
    const sentence: string = req.body.sentence;

    if (req.method !== "POST" || ! (sentence)) {
      res.json({
        'type': 'error',
        'message':'Bad request! Your method is not post or the sentence may be empty'
      })
      res.end();
      return;
    }
    try {
      const apiResult = await postToGooAPI(sentence);
      res.json({
        ...apiResult,
        'type':'success',
        'message':'Success'
      });
    } catch (e) {
      console.error(e);
      res.json({
        'type': 'error',
        'message':'Failed to use Goo API'
      });
    }
    res.end();
  })
})

function postToGooAPI(sentence: string) {
  return rp({
    method:'POST',
    uri:GOO_API_URL,
    body: {
      app_id:TOKEN,
      sentence:sentence,
    },
    json: true,
  });
}