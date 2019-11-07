import React ,{ Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../App.scss';

export default function Detail() {
  const history = useHistory();
  const sentences = useSelector((state) => state.addContent.sentences);
  const targetMuzzle = useSelector((state) => state.setMuzzle.targetMuzzle);

  function transitionPrev() {
    history.goBack();
  } 

  function MakeList (props) {
    console.log(props.sentence);
    const list = [];
    const regexp = new RegExp('(' + targetMuzzle + ')','g');
    const texts = props.sentence.split(regexp);
    var result = texts.filter(function( text ) {
      return text !== '';
    });
    
    result.forEach((text, index) => {
      if(text !== targetMuzzle){
        list.push(
          <span key={index}>{text}</span>
        )
      }else{
        list.push(
          <span key={index} className="span-detail">{targetMuzzle}</span>
        )
      }
    });

    return(<>{list}</>);
  } 

  function ShowList() {
    console.log(targetMuzzle)
    console.log(sentences)

    if(targetMuzzle !== undefined && sentences !== undefined){
      let sentencesShow = [];
      for(let i=0;i<sentences.length;i++){
        if(sentences[i].indexOf(targetMuzzle) !== -1){
          const text = sentences[i].trim().replace(/\s+/g, "");
          sentencesShow.push(text);
        }
      }
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