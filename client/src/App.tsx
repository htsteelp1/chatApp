import {Routes, Route} from "react-router";
import {Login} from "./pages/Login.tsx"

import './App.css'
import {ChatSidebar} from "@/components/sidebar/ChatSidebar.tsx";
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar.tsx";

function App() {
    return (<>
            <SidebarProvider>
                <ChatSidebar/>
                <SidebarInset>
                    <Routes>
                        <Route path={"/login"} element={<Login/>}/>
                    </Routes>
                </SidebarInset>
            </SidebarProvider>
        </>
    )
}

export default App
