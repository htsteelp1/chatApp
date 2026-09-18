import {
    ChatEvent,
    ChatEventAddon,
    ChatEventBody,
    ChatEventContent,
    ChatEventTime,
    ChatEventTitle
} from "@/components/chat/chat-event.tsx";
import {ServerIcon} from "@/components/ServerIcon.tsx";

export function PrimaryMessage({message} ) {
    return (
        <ChatEvent className={"mt-4 hover:bg-accent"}>
            <ChatEventAddon>
                <ServerIcon server={message.author}/>
            </ChatEventAddon>
            <ChatEventBody>
                <ChatEventTitle>
                    <span className={"font-medium"}>{message.author.name}</span>
                    <ChatEventTime timestamp={Date.parse(message.createdAt)} />
                </ChatEventTitle>
                <ChatEventContent>{message.content}</ChatEventContent>
            </ChatEventBody>
        </ChatEvent>
    )
}