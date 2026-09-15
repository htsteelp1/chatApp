import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarMenu, SidebarMenuAction, SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider, SidebarTrigger,
} from "../ui/sidebar.tsx";
import {MoreHorizontal} from "lucide-react";
import {ServerSidebarItem} from "@/components/sidebar/ServerSidebarItem.tsx";

export function ChatSidebar() {
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
            </Sidebar>
            <SidebarTrigger />
        </SidebarProvider>

    )
}