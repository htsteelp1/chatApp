import {Routes, Route} from "react-router";
import {Login} from "./pages/Login.tsx"

import './App.css'
import {ChatSidebar} from "@/components/sidebar/ChatSidebar.tsx";

function App() {
    return (<>
        <ChatSidebar/>
        <Routes>
            <Route path={"/login"} element={<Login></Login>}/>
        </Routes>
        </>
    )
}

export default App
