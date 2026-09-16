import {
    Sidebar,
    SidebarContent, SidebarFooter,
    SidebarGroup,
    SidebarMenu, SidebarMenuAction, SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider, SidebarTrigger,
} from "../ui/sidebar.tsx";
import {MoreHorizontal} from "lucide-react";
import {ServerSidebarItem} from "@/components/sidebar/ServerSidebarItem.tsx";
import {AvatarBlock} from "@/components/AvatarBlock.tsx";
import {useEffect} from "react";

export function ChatSidebar() {
    useEffect(async () => {

    }, []);
    return (
        <SidebarProvider>
            <Sidebar collapsible={"icon"} >

                <SidebarContent>
                    <SidebarGroup>
                        <SidebarMenu>
                            <ServerSidebarItem server={{id: 1, name: "Cool"}}/>
                        </SidebarMenu>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                    <AvatarBlock user={{name: "test"}}/>
                </SidebarFooter>
            </Sidebar>
            <SidebarTrigger/>
        </SidebarProvider>

    )
}