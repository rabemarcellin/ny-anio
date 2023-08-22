import { useRef } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { useSelector } from "react-redux"
import { BsArrowReturnLeft } from "react-icons/bs"
import { MdDarkMode, MdLightMode } from "react-icons/md"
import { createNewTodoAction } from "../store/todos/todoActions"
import { errorSelector } from "../store/error/errorSelectors"
import { todosSortedByTimeSelector } from "../store/todos/todoSelectors"
import { setErrorAction } from "../store/error/errorActions"
import { switchThemeAction } from "../store/theme/themeActions"
import { themeSelector } from "../store/theme/themeSelectors"


function Form({onSubmit, theme, onSwitchTheme, error, onError})
{
    const todos = useSelector(todosSortedByTimeSelector)
    const textAreaRef = useRef(null)

    const onKeyEnter = (event) => {
        if(event.key !== "Enter")
        {
            return false
        }
        createNewTodo(event)
    }

    const createNewTodo = (event) => {
        event.preventDefault()
        const label = textAreaRef
            .current
            .value
            .trim()

        if(0 >= label.length)
            return false
        else if(label.length < 4)
            onError("Ecris au moins 4 caractères")
        else if(todos.filter(todo => todo.label === label).length > 0) {
            onError("Cette tâche existe déjà")
        } else {
            onSubmit(label)
            clear()
        }
    }

    const checkError = () => {
        const exist = todos.filter(todo => todo.label === textAreaRef.current.value).length > 0
        if(!exist && error.isError)
            onError("")
        return false
    }

    const clear = () => {
        textAreaRef.current.value = ""
        onError("")
    }

    const switchTheme = () => {
        onSwitchTheme()
        textAreaRef.current.focus()
    }

    return (
        <form onSubmit={createNewTodo} onKeyDownCapture={onKeyEnter} className="">
            <>
                <input type="text"
                    ref={textAreaRef}
                    cols="10"
                    className="rounded-md w-full outline-none p-2 dark:bg-slate-800 border shadow-md"
                    placeholder="Une nouvelle tâche"
                    onChange={checkError}
                />           
            </>
            <div className="flex items-center justify-between my-2">
                <div className="flex gap-2 items-center">
                    <div className="btn btn--blue p-1 px-2 text-white flex items-center" type="submit"><BsArrowReturnLeft /></div>
                    <div className="text-gray-500 text-base">pour ajouter</div>
                </div>
                {/* dark mode off
                
                <div className="flex-none flex justify-end items-center">
                    <button className="btn" onClick={switchTheme}>{theme === "light" ? <MdDarkMode size={18} className="text-gray-900" /> : <MdLightMode size={18} className="text-yellow-500" /> }</button>
                </div> */}
            </div>
            <div className="flex justif-between w-full gap-2">
                <div id="error-field" className={`flex-1 flex items-center justify-center`}>
                    <span className="text-red-500 text-sm">
                        {error.isError ? error.errorText : ""} 
                    </span>
                </div> 
            </div>
        </form>
    )
}

Form.propTypes = {
    onSubmit: PropTypes.func,
    theme: PropTypes.string,
    onSwitchTheme: PropTypes.func,
    error: PropTypes.object,
    onError: PropTypes.func
}

const FormWithStore = connect(
    (state) => ({
        error: errorSelector(state),
        theme: themeSelector(state)
    }), 
    (dispatch) => ({
        onSubmit: (label) => dispatch(createNewTodoAction(label)),
        onError: (errorText) => dispatch(setErrorAction(errorText)),
        onSwitchTheme: () => dispatch(switchThemeAction())
    }))(Form)

export default FormWithStore