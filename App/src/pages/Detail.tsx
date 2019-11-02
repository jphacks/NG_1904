import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Detail(props: any) {
  const history = useHistory();

  function transitionPrev() {
    history.goBack();
  } 

  return (
    <button onClick={transitionPrev}>
      戻る
    </button>
  )
}