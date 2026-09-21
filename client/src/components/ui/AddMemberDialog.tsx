import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {Field, FieldGroup} from "@/components/ui/field.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useParams} from "react-router";

export function AddMemberDialog({dialogOpen, setDialogOpen}) {
    const params = useParams();

    return (
        <>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogContent>
                        <form method={"post"} action={`/api/servers/${params.serverId}/members`}>
                        <DialogHeader>
                            <DialogTitle>Add Member</DialogTitle>
                        </DialogHeader>
                        <FieldGroup>
                            <Field>
                                <Label htmlFor={"name"}>User: </Label>
                                <Input id={"name"} name={"name"}/>
                            </Field>
                            <Field>
                                <Button type={"submit"}>Add User</Button>
                            </Field>
                        </FieldGroup>
                        </form>
                    </DialogContent>
            </Dialog>
        </>)
}