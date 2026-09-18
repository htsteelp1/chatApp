import {Routes, Route} from "react-router";
import {Login} from "./pages/Login.tsx"

import './App.css'
import {ChatSidebar} from "@/components/sidebar/ChatSidebar.tsx";
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar.tsx";
import {ChatPage} from "@/pages/Chat.tsx";

function App() {
    return (<>
            <SidebarProvider>
                <ChatSidebar/>
                <SidebarInset>
                    <Routes>
                        <Route path={"/login"} element={<Login/>}/>
                        <Route path={"*"} element={<div />} />
                        <Route path={"/chat/:serverId"} element={<ChatPage server={{name: "test"}}/>} />
                    </Routes>
                </SidebarInset>
            </SidebarProvider>
        </>
    )
}

export default App
