//一つ目の子コンポーネントです。

import React,{useCallback} from 'react'
import TodoForm from './TodoForm';
import Todo from './Todo';


const TodoList = () => {
    //空配列 [] で初期化している
    const [toDos, setToDos] = React.useState([]);

    //タスクの追加の処理
    const addTodo = (todo) => {
        //正規表現    一致:true   不一致:false　?
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return;
        }
        // console.log(/^\s*$/.test(todo.text));


        const newToDos = [
            todo,
            ...toDos,
        ];


        setToDos(newToDos);
        console.log(...toDos);
    };

    //タスクが完了した時の処理
    // const completeTodo = (id) => {
    //     let updatedToDos = toDos.map((todo) => {
    //         if (todo.id === id) {
    //             todo.isComplete = !todo.isComplete;
    //         }
    //         return todo;
    //     });

    //     setToDos(updatedToDos);
    // };

    const completeTodo = useCallback( (id) => {
            let updatedToDos = toDos.map((todo) => {
                if (todo.id === id) {
                    todo.isComplete = !todo.isComplete;
                }
                return todo;
            });　setToDos(updatedToDos)
        }, [toDos]);

    //タスクの更新の処理
    const updateTodo = (todoId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return;
        }

        setToDos(prev => prev.map(item => (item.id === todoId ? newValue : item))
        );
    };

    //タスクの削除の処理
    const removeTodo = id => {
        const removeArr = [...toDos].filter(todo => todo.id !== id);

        setToDos(removeArr);
    };



    return (
        <React.Fragment>
            <h2>What's your plan today</h2>
            <TodoForm onSubmit={addTodo} />
            <Todo
                toDos={toDos}
                completeTodo={completeTodo}
                removeTodo={removeTodo}
                updateTodo={updateTodo}
            />
        </React.Fragment>
    )
}
//クラスコンポーネントの際に子コンポーネントへ関数を渡す時はアロー関数で記述する
//<Todo/>
export default TodoList
