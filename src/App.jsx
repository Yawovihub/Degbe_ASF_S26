import {BrowserRouter as Router} from "react-router-dom"
import NavBar from "./components/NavBar.jsx";
import AppRoutes from "./components/AppRoutes.jsx";
import UserManagement from "./components/UserManagement.jsx";

const App=()=> {
  return (
      <>
      <Router>
          <NavBar/>
          <AppRoutes/>
      </Router>
      {/*<GridCell/>*/}
          <UserManagement/>
    </>
  )
}

export default App
