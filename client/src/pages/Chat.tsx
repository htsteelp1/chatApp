import {Chat} from "@/components/chat/chat.tsx";
import {ChatMessages} from "@/components/chat/chat-messages.tsx";
import {useParams} from "react-router";
import {PrimaryMessage} from "@/components/chat/PrimaryMessage.tsx";
import {Toolbar} from "@/components/chat/Toolbar.tsx";
import {useEffect, useState} from "react";
import {getServerById} from "@/api/servers.ts";
import {socket} from "@/socket.ts";
import {MainHeader} from "@/components/chat/Header.tsx";
import {AddMemberDialog} from "@/components/ui/AddMemberDialog.tsx";


export function ChatPage() {
    const loadingServer = {
        name: "Loading", messages:
            [{author: {name: "loading"}, content: "loading", createdAt: "2026-09-17 18:58:08.240823 +00:00"}]
    }
    let params = useParams();
    const [server, setServer] = useState(loadingServer);
    const [messages, setMessages] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    useEffect(() => {
        async function fetchData() {
            const resServer = await getServerById(params.serverId);
            setServer(resServer);
            setMessages(resServer.messages);
        }

        fetchData();
        socket.emit("chat:join", params.serverId);
    }, [params]);
    useEffect(() => {
        function onMessage(message) {
            setMessages((prevMessages) => [message, ...prevMessages]);
        }

        socket.on("message", onMessage);
    }, []);

    function MapMessages() {
        return messages.map((m) =>
            <PrimaryMessage key={m.id} message={m}/>)
    }


    return (<>
            <Chat className={"h-screen"}>
                <MainHeader server={server} setDialogOpen={setDialogOpen}/>

                <ChatMessages>
                    <MapMessages/>
                </ChatMessages>
                <Toolbar/>
            </Chat>
            <AddMemberDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen}/>
        </>
    )

}