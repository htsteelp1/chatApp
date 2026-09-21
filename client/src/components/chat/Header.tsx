import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {MoreHorizontal} from "lucide-react";
import {ChatHeader, ChatHeaderMain} from "@/components/chat/chat-header.tsx";
import {useState} from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog.tsx";
import {Field, FieldGroup} from "@/components/ui/field.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";

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
                            <DropdownMenuItem onClick={() => setDialogOpen(true)}>
                                Add Members
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </ChatHeaderMain>
            </ChatHeader>
            </>

    )
}