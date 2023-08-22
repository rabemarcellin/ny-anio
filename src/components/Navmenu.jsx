import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import { updateFilter } from "../store/filter/filterActions"
import { filterSelector } from "../store/filter/filterSelectors"
import { lengthTodosFilteredSelector } from "../store/todos/todoSelectors"

const NON_FILTER = {value: "", label: "tous"}
const COMPLETED_FILTER = {value: true, label:"completées"}
const WAITING_FILTER = {value: false, label:"en attente"}

const filters = [NON_FILTER, COMPLETED_FILTER, WAITING_FILTER]

function FilterButton({filter}) {
  const filterState = useSelector(filterSelector)
  const todosLength = useSelector(
    ({todos}) => lengthTodosFilteredSelector({todos, filter:filter.value})
  )
  const dispatch = useDispatch()

  const setFilter = () => {
    dispatch(updateFilter(filter.value))
  }

  return (<button onClick={setFilter} className={`px-4 rounded-md py-2 ${ filter.value === filterState ? "bg-white text-black shadow dark:bg-gray-950" : ""}`}>
    <span className="mx-1">{filter.label}</span>
    <span className={`${todosLength > 0 ? "inline":"hidden"}`}>| {todosLength}</span>
    </button>)
}

FilterButton.propTypes = {
  filter: PropTypes.object || PropTypes.bool
}

export default function TodoFilters({todosLength}) {
  return (
    <div className="flex my-2 rounded-lg bg-gray-500 text-white dark:bg-gray-900 p-1">
      {filters.map((filter, index) => <FilterButton key={"filter"+index} todosLength={todosLength} filter={filter} active={index === 0} /> )}
    </div>
  )
}

TodoFilters.propTypes = {
  todosLength: PropTypes.number
}
