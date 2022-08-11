import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostsList from '../workerPost/postsList';
import { getWorkersTodos, addNewTodo, deleteTodo, changeStatusTodo } from './WorkerTodoSlice';


const ShowAndAddTask = ({ _id }) => {

    const dispatch = useDispatch();
    const todos = useSelector(state => state.workerTodosData.todos);
    const todoOfId = todos.filter(item => item.userId === _id)
    const chaeckStatus = todoOfId.every(item => item.Completed === true)
    const [newTodo, setNewTodo] = useState({ todo: "", userId: _id, Completed: "false" });
    const displayEmpty = todoOfId.length

    useEffect(() => {
        dispatch(getWorkersTodos());
    }, [dispatch]);



    const sendNewTask = (e) => {
        e.preventDefault();
        dispatch(addNewTodo(newTodo));
       
    }


    return (
        <div >
            <h1  className="display-5 m-3 border-ligth">Todos</h1>
            <div
                className='rounded p-3'
                style={{
                    border: 'solid ',
                    borderColor: chaeckStatus == true ? 'green' : 'red',
                    backgroundColor: 'silver',
                }}
            >
                <h1 className='display-4 bg-info'></h1>
                <form className='form-control mx-auto m-4  '>
                    <div>todo</div>
                    <input
                        type={Text}
                        onChange={e => setNewTodo({ ...newTodo, todo: e.target.value })}
                        className='form-control '
                    />
                    
                    <button
                        className='btn btn-outline-success m-3'
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
                            key={item._id}
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
            <hr />
            <PostsList _id={_id} />
        </div>
    )
}

export default ShowAndAddTask