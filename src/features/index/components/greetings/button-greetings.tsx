import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ButtonGreetings() {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button className="button-1 font-merriweather px-10 py-6 rounded-full bg-[#819BB1] text-white" variant="outline">Kirim Ucapan / RSVP</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Kirim Ucapan</DialogTitle>
                        <DialogDescription>
                            
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Name</Label>
                            <Input id="name-1" name="name" placeholder="Hai, siapa namamu" />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="message-1">Ucapan</Label>
                            <Textarea id="message-1" name="message" placeholder="Kirim ucapanmu disini!" />
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox id="rsvp-1" checked />
                            <Label htmlFor="rsvp-1">Saya dapat hadir di acara</Label>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button className="mb-2 md:mb-0" type="submit">Kirim</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}
