import { connect } from "react-redux"
import PropTypes from "prop-types"
import { todosSortedByTimeSelector } from "../store/todos/todoSelectors"
import TodoItem from "./TodoItem"
import Navmenu from "./Navmenu"
import FormWithStore from "./Form"
import { useEffect } from "react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"

function TodoList({todos}) {
    const todoList = todos.length === 0 ? null : todos

    const onDragEnd = (result) => {
        if (!result.destination) return; // Item was dropped outside of a droppable area

        console.log("src/components/TodoList.jsx line 16", result)
    }

    useEffect(() => {
        if(todoList) console.log("src/components/TodoList.jsx line 21", todoList)
    }, [todoList])
    
    return (
        <>
            <Navmenu todosLength={todos.length}/>
            <div className="bg-gray-50 shadow my-2 border p-1 dark:bg-slate-800 sm:h-fit rounded-xl dark:text-white transition-none">
                <FormWithStore/>
            </div>
            <div className="flex-1 overflow-y-auto py-2 mt-2 bg-gray-200 border shadow-lg">
            <div className="p-1 sm:h-64 overflow-auto todo--container h-full">
                <div className="mx-auto h-full">
                {
                    todoList ? (
                        <div className="overflow-y-auto">
                            <div> 
                                {todoList.map((todo, index) => (
                                    <TodoItem key={todo.id} todo={todo} />
                                ))}     
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex justify-center items-center">
                            <span>vide</span>
                        </div>
                    )
                }
                </div>
            </div>

            </div>
    </>
    )
}

TodoList.propTypes = {
    todos: PropTypes.array,
    filters: PropTypes.array
}


export const ListTodoWithStore = connect(
    (state) => ({
        todos: todosSortedByTimeSelector(state),
    })
)(TodoList)
