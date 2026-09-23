import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuGroup,
    DropdownMenuItem, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {MoreHorizontal, Trash} from "lucide-react";
import {ChatHeader, ChatHeaderMain} from "@/components/chat/chat-header.tsx";

export function MainHeader({server, setDialogOpen}) {


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
                                <DropdownMenuItem variant={"destructive"}>
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