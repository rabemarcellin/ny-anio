import { connect } from "react-redux"
import PropTypes from "prop-types"
import { todosSortedByTimeSelector } from "../store/todos/todoSelectors"
import TodoItem from "./TodoItem"
import TodoFilters from "./TodoFilters"
import FormWithStore from "./Form"
import BreakLine from "./BreakLine"
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
    
    return  <div className="flex flex-col h-screen bg-white dark:bg-slate-800 sm:h-fit dark:text-white shadow-2xl sm:rounded-xl sm:pb-2 transition-none">
        <div className="m-4 rounded-md bg-gray-200 dark:bg-gray-900 shadow">
            <FormWithStore/>
            <BreakLine/>
            <TodoFilters todosLength={todos.length}/>
        </div>
        <div className="flex-1 overflow-y-auto">
        <div className="p-4 sm:h-64 overflow-auto todo--container">
            <div className="mx-auto h-full">
            {
                todoList ? (
                    <DragDropContext onDragEnd={onDragEnd}>
                        <div className="h-[500px] overflow-y-auto">
                        <Droppable droppableId="todos">
                        {(provided, snapshot) => (
                            <div ref={provided.innerRef} {...provided.droppableProps}> 
                                {todoList.map((todo, index) => (
                                    <Draggable  key={todo.id} draggableId={todo.id.toString()} index={index}>
                                    {(provided) => (
                                        <TodoItem 
                                            key={todo.id} 
                                            todo={todo} 
                                            provided={provided}
                                        />
                                    )}
                                    </Draggable>
                                )
                                )
                                } 
                            {provided.placeholder}  
                            </div>
                        )}
                        </Droppable>

                        </div>
                       
                    </DragDropContext >

                    
                ) : (
                    <div className="h-full flex justify-center items-center">
                        <span>vide</span>
                    </div>
                )
            }
            </div>
          </div>

        </div>
    </div>
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
