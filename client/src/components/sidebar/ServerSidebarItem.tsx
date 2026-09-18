import {SidebarMenuButton, SidebarMenuItem} from "@/components/ui/sidebar.tsx";
import {ServerIcon} from "@/components/ServerIcon.tsx";
import {Link} from "react-router";

export function ServerSidebarItem({server}) {


    return (
        <SidebarMenuItem>
            <SidebarMenuButton className={"overflow-visible mb-2"} render={<Link to={`/chat/${server.id}`}/>}>
                <ServerIcon server={server}/>
                <span>{server.name}</span>
            </SidebarMenuButton>
        </SidebarMenuItem>
    )
}