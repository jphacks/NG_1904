import React from 'react';

import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setTargetMuzzle } from '../actions/actions';

export default function Select(props: any) {
  const majorMuzzleList: Array<string> = ['めっちゃ','えーっと','ジェーピーハックス','ゆーて','やばい','無理','どうせ','でも',];
  const histoy = useHistory();
  const dispatch = useDispatch();

  // 口癖をセットして画面遷移
  function setMuzzle(text: string) {
    dispatch(setTargetMuzzle(text));
    histoy.push({pathname:'home'})
  }

  const muzzleList = majorMuzzleList.map(muzzle => {
    return (
      <li onClick={() => {setMuzzle(muzzle)}}>
        {muzzle}
      </li>
    )
  })

  return (
    <div>
      現状ボタンには見えないけど，押すと口癖をセットしてホーム画面に戻るよ
      <ul>
        {muzzleList}
      </ul>
    </div>
  )
}
