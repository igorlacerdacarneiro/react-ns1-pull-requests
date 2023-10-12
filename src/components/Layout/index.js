import { Outlet } from "react-router-dom"
import Header from "./../Header"

const Layout = () => {
  return (
    <div className="App">
      <div className="page">
        <Header />
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
