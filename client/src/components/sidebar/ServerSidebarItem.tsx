import {SidebarMenuButton, SidebarMenuItem} from "@/components/ui/sidebar.tsx";
import {ServerIcon} from "@/components/ServerIcon.tsx";

export function ServerSidebarItem({server}) {


    return (
        <SidebarMenuItem>
            <SidebarMenuButton className={"overflow-visible"} render={<a href={`/chat/${server.id}`}/>}>
                <ServerIcon server={server}/>
                <span>{server.name}</span>
            </SidebarMenuButton>
        </SidebarMenuItem>
    )
}