import {ChatToolbar, ChatToolbarTextarea} from "@/components/chat/chat-toolbar.tsx";
import {useState} from "react";



export function Toolbar() {
    const [input, setInput] = useState()

    function handleSubmit(e) {
        console.log(input);
    }
    return (
    <ChatToolbar>
        <ChatToolbarTextarea value={input}
                             onChange={(e) => setInput(e.target.value)}
                             onSubmit={handleSubmit}/>
    </ChatToolbar>
    )
}