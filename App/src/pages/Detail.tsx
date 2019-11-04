import React ,{ Fragment, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Detail() {
  const history = useHistory();
  const sentences = useSelector((state: any) => state.addContent.sentences);
  const targetMuzzle = useSelector((state: any) => state.setMuzzle.targetMuzzle);
/*
  useEffect(()=> {
    console.log("useEffect is called");
    if(targetMuzzle === undefined || sentences === undefined){

    }
  },[]);
*/
  function transitionPrev() {
    history.goBack();
  } 

  //const highlightedText = "";

  const showList = sentences.map((sentence: string,index : number) =>
    (sentence.indexOf(targetMuzzle) === -1) ? <Fragment key = {index}></Fragment>:<li key = {index}>{sentence}</li>
  );

  return (
    <>
    <button onClick={transitionPrev}>
      戻る
    </button>
    <ol>
      {showList}
    </ol>
    </>
  )
}