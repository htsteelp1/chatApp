import {useState} from 'react'
import {Routes, Route} from "react-router";
import {Login} from "./pages/Login.tsx"

import './App.css'

function App() {
    const [count, setCount] = useState(0)

    return (
        <Routes>
            <Route path={"/login"} element={<Login></Login>}/>
        </Routes>
    )
}

export default App
