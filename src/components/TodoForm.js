//二つ目の子コンポーネントです
import { React, useState, useRef, useEffect } from 'react'

function TodoForm(props) {
    const [input, setInput] = useState(props.edit ? props.edit.value : "");

    const inputRef = useRef(null)

    useEffect(() => {
        inputRef.current.focus()
    });


    //変更があった対象を event の引数で受け取る。その後 "event.target.オブジェクト" イベントを発火させたオブジェクトの参照をします。
    const handleChange = (event) => {
        setInput(event.target.value);
    }
    //上記をコンソールログで確かめる

    //送信された時
    const handleSubmit = (event) => {

        //デフォルトのデータの送信を発生させないようにするため。クライアント側で操作する時によく使用される。
        //これを設定しない場合文字を入力後に値が入力されていない状態で送信される
        event.preventDefault();

        props.onSubmit({
            id: Math.floor(Math.random() * 10000),
            text: input
        });

        //入力した値を再度空文字にしている。
        setInput('');
    }




    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            {props.edit ?
                (
                    <>
                        <input
                            type="text"
                            placeholder="Please update your task"
                            value={input}
                            name="text"
                            className="todo-input edit"
                            onChange={handleChange}
                            ref={inputRef}
                        />
                        <button className="todo-button edit">タスクを編集</button>
                    </>
                ) :
                (
                    <>
                        <input
                            type="text"
                            placeholder="Please write your task"
                            value={input}
                            name="text"
                            className="todo-input"
                            onChange={handleChange}
                            ref={inputRef}
                        />
                        <button className="todo-button">タスクを追加</button>
                    </>
                )
            }

        </form>
    )
}

export default TodoForm

//onChangeは内容に変更が会った時に処理が開始される
//ここのtextは変更があった時に引数にeventを渡すことができます。
//labelのfor内とnameの属性値は一致させる
//文章などを入力するためのフォームはinput要素で作成できます。
// text: 1行を記述できる属性値。必須。value属性はtypeの中身の初期値を設定することができる。
// name: 1行のファイルを記述します。必須
//  "rfce" でreactの雛形をダウンロードすることができます。
// htmlのような記述をしている場合は拡張子をjsxに変更するのが一般的になっています。そうでない場合はjsファイルが推奨されています。
//preventDefaultはイベントのブラウザデフォルト動作を知った上でそれを妨害したいのかを考えなければなりません。