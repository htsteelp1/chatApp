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
import {getMe, getServerList} from "@/api/me.ts";
import {Link} from "react-router";


export function ChatSidebar() {
    const [servers, setServers] = useState([{name: "Please Log In", id: 1}]);
    const [user, setUser] = useState({name: "none", id: "2"});
    const [auth, setAuth] = useState(false)
    useEffect(() => {
        async function fetchData() {
            const resServers = await getServerList();
            if (resServers) {
                setServers(resServers);

            }
            const resMe = await getMe();
            if (resMe) {
                setUser(resMe);
                setAuth(true);
            }
            console.log(resMe)
            console.log(auth)

        }

        fetchData();
    }, []);
    const ServerItems = servers.map((server, index) => <ServerSidebarItem key={index} server={server}/>)
    return (
        <>
            <Sidebar collapsible={"icon"}>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarMenu>
                            {auth && ServerItems}
                        </SidebarMenu>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                    {auth && <AvatarBlock user={user}/>}
                    {!auth && <SidebarMenuItem>
                        <SidebarMenuButton render={<Link to={"/login"}/>}>
                            Log In
                        </SidebarMenuButton>
                    </SidebarMenuItem>}
                </SidebarFooter>
            </Sidebar>
            <SidebarTrigger/>
        </>

    )
}