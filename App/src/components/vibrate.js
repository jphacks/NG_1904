//振動するコンポーネント
//min:振動する秒数

export default function vibrate (min) {
    window.navigator.vibrate(min*1000);
}