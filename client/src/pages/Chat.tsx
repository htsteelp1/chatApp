import {Chat} from "@/components/chat/chat.tsx";
import {ChatHeader, ChatHeaderMain} from "@/components/chat/chat-header.tsx";
import {ChatMessages} from "@/components/chat/chat-messages.tsx";
import {
    ChatEvent,
    ChatEventAddon, ChatEventAvatar, ChatEventBody,
    ChatEventContent,
    ChatEventTime,
    ChatEventTitle
} from "@/components/chat/chat-event.tsx";
import {useParams} from "react-router";
import {ServerIcon} from "@/components/ServerIcon.tsx";
import {PrimaryMessage} from "@/components/chat/PrimaryMessage.tsx";
import {ChatToolbar, ChatToolbarTextarea} from "@/components/chat/chat-toolbar.tsx";
import {Toolbar} from "@/components/chat/Toolbar.tsx";
import {useEffect, useState} from "react";
import {getServerById} from "@/api/servers.ts";



export function ChatPage() {
    const loadingServer = {name: "Loading", messages:
            [{author: {name: "loading"}, content: "loading", createdAt: "2026-09-17 18:58:08.240823 +00:00"}]}
    let params = useParams();
    const [server, setServer] = useState(loadingServer);
    useEffect(() => {
        async function fetchData() {
            const resServer = await getServerById(params.serverId);
            setServer(resServer);
        }
        fetchData();
        socket
    }, [params]);

    function MapMessages() {
        return server.messages.map((m, i) =>
            <PrimaryMessage key={i} message={m} />)
    }


    return (
        <Chat className={"h-screen"}>
            <ChatHeader>
                <ChatHeaderMain>{server.name}</ChatHeaderMain>
            </ChatHeader>
            <ChatMessages>
                <MapMessages />
            </ChatMessages>
            <Toolbar />
        </Chat>
    )

}