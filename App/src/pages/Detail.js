import React ,{ Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Detail.scss';

export default function Detail() {
  const history = useHistory();
  const sentences = useSelector((state) => state.addContent.sentences);
  const targetMuzzle = useSelector((state) => state.setMuzzle.targetMuzzle);

  function transitionPrev() {
    history.goBack();
  } 

  function MakeList (props) {
    console.log(props.sentence);
    if(props.sentence[0] === "" && props.sentence[1] === "" && props.sentence.length === 2){
      return(<span className="span-detail" key = {0} >{targetMuzzle}</span>);
    }else{
      return(props.sentence.map((text, index) => (text==="")?<span className="span-detail" key = {index} >{targetMuzzle}</span>:<Fragment key={index}>{text}</Fragment>));
    }
  } 

  function ShowList() {
    console.log(targetMuzzle)
    console.log(sentences)
    if(targetMuzzle !== undefined && sentences !== undefined){
      //文字列の先頭にtargetMuzzleが含まれるか確認する必要がある
      let j=0;
      let sentencesShow = [];
      for(let i=0;i<sentences.length;i++){
        if(sentences[i].indexOf(targetMuzzle) !== -1){
          const text = sentences[i].trim().replace(/\s+/g, "").split(targetMuzzle);
          sentencesShow[j]=text;
          j++;
        }
      }
      //console.log(sentencesShow);
      return (sentencesShow.map((sentence, index) => <li key = {index}><MakeList sentence={sentence}/></li>));
    }else{
      return <Fragment key={0}></Fragment>
    }
  };

  return (
    <>
    <button onClick={transitionPrev}>
      戻る
    </button>
    <ol>
      <ShowList/>
    </ol>
    </>
  )
}