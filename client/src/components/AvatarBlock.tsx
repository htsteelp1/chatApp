import {SidebarMenu, SidebarMenuButton, SidebarMenuItem} from "@/components/ui/sidebar.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {ServerIcon} from "@/components/ServerIcon.tsx";
import {MoreHorizontal} from "lucide-react";
import {Link} from "react-router";

export function AvatarBlock({user}) {
    return (
        <SidebarMenu>
            <SidebarMenuItem>

                <DropdownMenu>
                    <DropdownMenuTrigger render={<SidebarMenuButton />}>
                        <ServerIcon server={user}/>
                        <span>{user.name}</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem render={<a href={"/auth/logout"} />}>
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}