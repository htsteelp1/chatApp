import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuGroup,
    DropdownMenuItem, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {MoreHorizontal, Trash} from "lucide-react";
import {ChatHeader, ChatHeaderMain} from "@/components/chat/chat-header.tsx";
import {leaveServer} from "@/api/servers.ts";
import {useParams} from "react-router";

export function MainHeader({server, setDialogOpen}) {
    const params = useParams();


    return (
        <>
            <ChatHeader>
                <ChatHeaderMain>{server.name}
                    <DropdownMenu>
                        <DropdownMenuTrigger render={<Button variant={"ghost"}/>}>
                            <MoreHorizontal/>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuGroup>
                                <DropdownMenuItem onClick={() => setDialogOpen(true)}>
                                    Add Members
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator/>
                            <DropdownMenuGroup>
                                <DropdownMenuItem variant={"destructive"} onClick={async () => await leaveServer(params.serverId)}>
                                    <Trash/>
                                    Leave Server
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </ChatHeaderMain>
            </ChatHeader>
        </>

    )
}