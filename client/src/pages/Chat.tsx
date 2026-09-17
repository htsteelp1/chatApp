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

export function ChatPage({server}) {

    return (
        <Chat className={"h-screen"}>
            <ChatHeader>
                <ChatHeaderMain>{server.name}</ChatHeaderMain>
            </ChatHeader>
            <ChatMessages>
                <PrimaryMessage message={{content: "aadfadfa asdfadfasdfasdfads", user: {name: "Cool"}, timestamp: 1789590651}} />
                <PrimaryMessage message={{content: "test", user: {name: "Tall"}, timestamp: 1789590651}} />
            </ChatMessages>
        </Chat>
    )

}