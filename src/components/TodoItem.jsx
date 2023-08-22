import { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import { useDispatch } from "react-redux"
import { BsCheck, BsFillPencilFill, BsSend, BsTrash } from "react-icons/bs"
import { BiCheckbox } from "react-icons/bi"
import { deleteTodoAction, toggleTodoStateAction, updateTodoAction } from "../store/todos/todoActions"


export default function TodoItem({todo}) {
    const labelInput = useRef(null)

    const [readOnly, setReadOnly] = useState(true)
    const dispatch = useDispatch()

    const toggleCheck = () => {
        dispatch(toggleTodoStateAction(todo.id))
    }

    const deleteTodo = () => {
        dispatch(deleteTodoAction(todo.id))
    }

    const updateTodo = (event) => {
        if(labelInput.current.value.trim() !== "" && event.key === "Enter")
        {
            dispatch(updateTodoAction(todo.id, labelInput.current.value))
            setReadOnly(true)
        }
    }

    useEffect(() => {
        if(!readOnly)
        {
            labelInput.current.focus()
        }

    }, [readOnly])

  return (
        <div className="border-b border-b-gray-500 hover:bg-white hover:shadow-2xl hover:shadow-white dark:border-gray-950 dark:bg-gray-900 p-0.5 my-1">
            <div className=" flex justify-between items-center">
                <div className="flex items-center justify-between w-full">
                    <button onClick={toggleCheck}>
                            {
                                todo.completed ? (
                                    <BsCheck size={18} />
                                ):(
                                    <BiCheckbox size={18} />
                                )
                            }
                    </button>
                    <div className="flex-auto flex items-center w-full">
                        <input ref={labelInput} 
                            type="text" 
                            defaultValue={todo.label} 
                            className="w-full outline-none px-2 mr-2 bg-transparent dark:bg-gray-950 focus:bg-gray-200 rounded-md disabled:white dark:disabled:bg-gray-900" 
                            disabled={readOnly} 
                            onKeyDownCapture={updateTodo}
                        />
                    </div>
                </div>
            <div className="flex justify-end">
                <div className="flex gap-1 justify-center">
                    <button onClick={() => setReadOnly(!readOnly)}>
                        {readOnly ? (
                            <BsFillPencilFill size={20} className="p-0.5 font-bold hover:bg-slate-200 dark:hover:text-black rounded" />
                            ) : (
                            <BsSend size={20} className="p-0.5 font-bold hover:bg-slate-200 dark:hover:text-black rounded" />
                            )
                        }
                    </button>
                    <button onClick={deleteTodo}>
                        <BsTrash size={20} className="p-0.5 font-bold hover:bg-slate-200 dark:hover:text-black rounded" /></button>
                </div>
            </div>
            </div>
        </div>
    
    
  )
}

TodoItem.propTypes = {
    todo: PropTypes.object
}
