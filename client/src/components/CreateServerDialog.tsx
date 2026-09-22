import {Dialog, DialogContent, DialogHeader, DialogTrigger} from "@/components/ui/dialog.js";
import {SidebarMenuButton, SidebarMenuItem} from "@/components/ui/sidebar.js";
import {Field, FieldGroup} from "@/components/ui/field.js";
import {Label} from "@/components/ui/label.js";
import {Input} from "@/components/ui/input.js";
import {Button} from "@/components/ui/button.js";

export function CreateServerDialog() {
    return (
        <SidebarMenuItem>
            <Dialog>
                <DialogTrigger asChild>
                    <SidebarMenuButton>Create Server</SidebarMenuButton>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader asChild>Create Server</DialogHeader>
                    <form method="POST" action="/api/servers">
                        <FieldGroup>
                            <Field>
                                <Label htmlFor={"serverName"}>Server Name:</Label>
                                <Input name="serverName" id="serverName" type="text" />
                            </Field>
                            <Field>
                                <Button type="submit">Create Server</Button>
                            </Field>
                        </FieldGroup>
                    </form>
                </DialogContent>
            </Dialog>


        </SidebarMenuItem>
    )
}