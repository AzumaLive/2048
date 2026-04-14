import {RouterProvider} from "react-router-dom";
import {routes} from "@/app/providers/router/index.js";
import './styles'

const App = () => {
  return (
    <RouterProvider router={routes} />
  )
}

export default App