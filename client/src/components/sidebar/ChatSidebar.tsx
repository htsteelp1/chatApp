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
import {useEffect, useState} from "react";
import {getServerList} from "@/api/me.ts";


export function ChatSidebar() {
    const [servers, setServers] = useState([{name: "Please Log In", id: 1}])
    useEffect(() => {
        async function fetchData() {
            const resServers = await getServerList();
            if (resServers) {
                setServers(resServers);

            }
            console.log(resServers);
        }
        fetchData();
    }, []);
    const ServerItems = servers.map((server, index) => <ServerSidebarItem key={index} server={server}/>)
    return (
        <>
            <Sidebar collapsible={"icon"} >
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarMenu>
                            {ServerItems}
                        </SidebarMenu>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                    <AvatarBlock user={{name: "test"}}/>
                </SidebarFooter>
            </Sidebar>
            <SidebarTrigger/>
        </>

    )
}