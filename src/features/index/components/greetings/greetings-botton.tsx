"use client";

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
import { db } from "@/lib/firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function ButtonGreetings() {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [isAttending, setIsAttending] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await addDoc(collection(db, "greetings"), {
                name,
                message,
                isAttending,
                createdAt: Timestamp.now(),
            });

            toast.success("Pesan berhasil dikirim!");

            // Reset form
            setName("");
            setMessage("");
            setIsAttending(true);

            // Tutup dialog
            setIsDialogOpen(false);
        } catch (err) {
            toast.error("Gagal mengirim pesan. " + err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button className="button-1 font-merriweather px-10 py-6 rounded-full bg-[#819BB1] text-white" variant="outline">Kirim Ucapan / RSVP</Button>
            </DialogTrigger>
            <DialogContent className="w-full h-full sm:max-w-[425px] sm:h-auto">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col justify-center gap-3">
                        <div className="mb-10">
                            <DialogTitle className="text-center text-2xl mb-2">Kirim Ucapan</DialogTitle>
                            <DialogDescription className="text-center">Bagikan pesan spesial atau konfirmasi kehadiranmu di hari bahagia kami ✨</DialogDescription>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="name-1">Name</Label>
                            <Input 
                                id="name-1" 
                                className="text-sm" 
                                name="name" 
                                placeholder="Contoh: Bima" 
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-3 mb-4">
                            <Label htmlFor="message-1">Ucapan</Label>
                            <Textarea 
                                id="message-1" 
                                className="text-sm" 
                                name="message" 
                                placeholder="Tulis doa, harapan, atau pesan hangatmu di sini 💌" 
                                onChange={(e) => setMessage(e.target.value)}
                                value={message}
                                required
                            />
                        </div>
                        <div className="flex items-center gap-3 mb-10">
                            <Checkbox 
                                id="rsvp-1" 
                                defaultChecked 
                                checked={isAttending}
                                onCheckedChange={(checked) => setIsAttending(Boolean(checked))}
                            />
                            <Label htmlFor="rsvp-1">Saya dapat hadir di acara</Label>
                        </div>
                        <Button 
                            className="py-5" 
                            type="submit"
                            disabled={!name || !message || isSubmitting}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="animate-spin w-4 h-4" />
                                    Mengirim...
                                </span>
                            ) : (
                                "Kirim"
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
