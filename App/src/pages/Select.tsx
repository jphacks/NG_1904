import React,{ useState } from 'react';

import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setTargetMuzzle } from '../actions/actions';

export default function Select(props: any) {
  const [ muzzleList, setMuzzleList ]: [ Array<string>, React.Dispatch<Array<string>> ] = useState(['めっちゃ','えーっと','ジェーピーハックス','ゆーて','やばい','無理','どうせ','でも',]);
  const [ muzzleText,setMuzzleText ]: [ string,React.Dispatch<string> ] = useState('');

  const histoy = useHistory();
  const dispatch = useDispatch();

  // 口癖をセットして画面遷移
  function setMuzzle(text: string) {
    dispatch(setTargetMuzzle(text));
    histoy.push({pathname:'home'});
  }


  function changeMuzzleText(e: any) {
    setMuzzleText(e.target.value);
  }

  function pushUserSelectMuzzle() {
    setMuzzleList([...muzzleList,muzzleText]);
    setMuzzleText('');
  }

  const muzzleListElement = muzzleList.map(muzzle => {
    return (
      <li key={muzzle} onClick={() => { setMuzzle(muzzle) }}>
        {muzzle}
      </li>
    )
  })

  return (
    <div>
      現状ボタンには見えないけど，押すと口癖をセットしてホーム画面に戻るよ
      <ul>
        {muzzleListElement}
      </ul>

      <input onChange={changeMuzzleText} value={muzzleText} type="text"/>
      <button onClick={pushUserSelectMuzzle}>
        Submit
      </button>
    </div>
  )
}
