import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { ListTodoWithStore } from "./TodoList"
import Footer from "./Footer"


import { themeSelector } from "../store/theme/themeSelectors"
import { resetTodosAction } from "../store/todos/todoActions"


export default function App() {
  const theme = useSelector(themeSelector)
  const dispatch = useDispatch()


  useEffect(() => {

    const checkTime = () => {

      const currentTime = new Date();
      const remainingTime = new Date();
      remainingTime.setHours(23);
      remainingTime.setMinutes(59);
      remainingTime.setSeconds(59);

      if (currentTime >= remainingTime) 
      {
        localStorage.removeItem('mr__todo-list');
        dispatch(resetTodosAction())
      }  
    }      

    const timer = setInterval(checkTime, 1000);

    return () => clearInterval(timer);
  })

  return (
        <div className={theme}>
          <div className="pt-4 px-4 min-h-screen overflow-hidden grid sm:flex sm:items-center sm:justify-center sm:bg-gray-5 dark:bg-slate-800 dark:sm:bg-gray-950 transition-all duration-200">
              <div className="w-full h-screen overflow-hidden sm:h-fit sm:max-w-xl flex flex-col sm:grid sm:items-center">
                  <ListTodoWithStore/>            
                  <Footer/>      
              </div>
          </div>
      </div>
  )
}
