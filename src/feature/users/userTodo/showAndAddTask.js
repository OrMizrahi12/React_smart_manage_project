import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostsList from '../userPost/postsList';
import { getUsersTodos, addNewTodo, deleteTodo, changeStatusTodo } from './UserTodoSlice';


const ShowAndAddTask = ({ _id }) => {

    const [newTodo, setNewTodo] = useState({ todo: "", userId: _id, Completed: false });
    const dispatch = useDispatch();
    const todos = useSelector(state => state.userTodosData.todos);

    useEffect(() => {
        dispatch(getUsersTodos());
    }, [dispatch]);

    const sendNewTask = (e) => {
        e.preventDefault();
        dispatch(addNewTodo(newTodo));
    }

    const todoOfId = todos.filter(item => item.userId === _id)
    const chaeckStatus = todoOfId.every(item => item.Completed === true)
    const displayEmpty = todoOfId.length

    return (
        <div>
            <div
             style={{ border: 'solid ', borderColor: chaeckStatus == true ? 'green' : 'red' }}
             >
            <h1 className='display-4 bg-info'>Todos</h1>
            <form className='form-control w-50 mx-auto m-5 '>
                <lable>todo</lable>
                <input
                    type={Text}
                    onChange={e => setNewTodo({ ...newTodo, todo: e.target.value })}
                    className='form-control '
                >
                </input>
                <button
                    className='btn btn-success m-3'
                    onClick={sendNewTask}
                    disabled={!newTodo.todo}
                >
                    Add Task
                </button>

            </form>

            <h4
                className='display-6'
            >
                {displayEmpty === 0 && 'there are no todos...🙄'}
            </h4>

            {
                todos.map(item => item.userId === _id &&
                    <section

                        className='table table-bordered'>
                        <hr />
                        <button
                            className='btn btn-outline float-end'
                            onClick={() => dispatch(deleteTodo(item._id))}
                        >
                            X
                        </button>
                        <button
                            className='btn btn float-end'
                            onClick={() => dispatch(changeStatusTodo(item))}
                        >
                            {item.Completed ? "👍🏻" : "👎🏻"}
                        </button>
                        <h5
                            style={{ color: item.Completed ? 'green' : 'red' }}
                            className='w-25'
                        >{item.todo}
                        </h5>
                        <hr />
                    </section>
                )
            }
           
            </div>
            <PostsList _id={_id} />
        </div>
    )
}

export default ShowAndAddTask