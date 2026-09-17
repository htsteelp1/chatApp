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
                <ServerIcon server={message.user}/>
            </ChatEventAddon>
            <ChatEventBody>
                <ChatEventTitle>
                    <span className={"font-medium"}>{message.user.name}</span>
                    <ChatEventTime timestamp={message.timestamp} />
                </ChatEventTitle>
                <ChatEventContent>{message.content}</ChatEventContent>
            </ChatEventBody>
        </ChatEvent>
    )
}