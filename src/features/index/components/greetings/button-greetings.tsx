import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogDescription,
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
                <DialogContent className="w-full h-full sm:max-w-[425px] sm:h-auto">
                    <div className="flex flex-col justify-center gap-3">
                        <div className="mb-10">
                            <DialogTitle className="text-center text-2xl mb-2">Kirim Ucapan</DialogTitle>
                            <DialogDescription className="text-center">Bagikan pesan spesial atau konfirmasi kehadiranmu di hari bahagia kami ✨</DialogDescription>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="name-1">Name</Label>
                            <Input id="name-1" className="text-sm" name="name" placeholder="Contoh: Bima" />
                        </div>
                        <div className="flex flex-col gap-3 mb-4">
                            <Label htmlFor="message-1">Ucapan</Label>
                            <Textarea id="message-1" className="text-sm" name="message" placeholder="Tulis doa, harapan, atau pesan hangatmu di sini 💌" />
                        </div>
                        <div className="flex items-center gap-3 mb-10">
                            <Checkbox id="rsvp-1" defaultChecked />
                            <Label htmlFor="rsvp-1">Saya dapat hadir di acara</Label>
                        </div>
                        <Button className="py-5" type="submit">Kirim</Button>
                    </div>

                </DialogContent>
            </form>
        </Dialog>
    );
}
