import "./App.scss"
import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import PullRequests from "./components/PullRequests"

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Layout />}
        >
          <Route
            index
            element={<PullRequests />}
          />
        </Route>
      </Routes>
    </>
  )
}

export default App
