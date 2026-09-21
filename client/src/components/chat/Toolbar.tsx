import {ChatToolbar, ChatToolbarTextarea} from "@/components/chat/chat-toolbar.tsx";
import {useState} from "react";
import {sendMessage} from "@/sockets/messageSocket.ts";



export function Toolbar() {
    const [input, setInput] = useState()

    function handleSubmit() {
        const mes = input.trim();
        if (mes === "") {
            return;
        }
        sendMessage(mes);
        setInput("");
    }
    return (
    <ChatToolbar>
        <ChatToolbarTextarea value={input}
                             onChange={(e) => setInput(e.target.value)}
                             onSubmit={handleSubmit}/>
    </ChatToolbar>
    )
}