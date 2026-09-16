import {SidebarMenu, SidebarMenuButton, SidebarMenuItem} from "@/components/ui/sidebar.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {ServerIcon} from "@/components/ServerIcon.tsx";
import {MoreHorizontal} from "lucide-react";
import {Link, useNavigate} from "react-router";

async function logOut(navigate) {
    try {
        const res = await fetch("/auth/logout", {method: "POST", credentials: "include"})
    }
    catch (e) {
        console.error(e);
    }
    finally {
        window.location.href = "/";
    }
}

export function AvatarBlock({user}) {
    const navigate = useNavigate();
    return (
        <SidebarMenu>
            <SidebarMenuItem>

                <DropdownMenu>
                    <DropdownMenuTrigger render={<SidebarMenuButton />}>
                        <ServerIcon server={user}/>
                        <span>{user.name}</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => logOut(navigate)}>
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}