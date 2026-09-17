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
import {ServerIcon} from "@/components/ServerIcon.tsx";
import {PrimaryMessage} from "@/components/chat/PrimaryMessage.tsx";
import {ChatToolbar, ChatToolbarTextarea} from "@/components/chat/chat-toolbar.tsx";
import {Toolbar} from "@/components/chat/Toolbar.tsx";

export function ChatPage({server}) {


    return (
        <Chat className={"h-screen"}>
            <ChatHeader>
                <ChatHeaderMain>{server.name}</ChatHeaderMain>
            </ChatHeader>
            <ChatMessages>
                <PrimaryMessage message={{
                    content: "aadfadfa asdfadfasdfasdfads",
                    user: {name: "Cool"},
                    timestamp: "2026-09-16 16:54:50.652300 +00:00"
                }}/>
                <PrimaryMessage
                    message={{content: "test", user: {name: "Tall"}, timestamp: "2026-09-16 16:55:50.652300 +00:00"}}/>
            </ChatMessages>
            <Toolbar />
        </Chat>
    )

}