"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatePresence, motion } from 'framer-motion';

type Message = {
    id: string;
    name: string;
    message: string;
    createdAt: { seconds: number };
};

export function GreetingsCard() {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const q = query(collection(db, "greetings"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => {
                const raw = doc.data() as Omit<Message, "id">;
                return {
                    id: doc.id,
                    ...raw,
                };
            });
            setMessages(data);
        });

        return () => unsubscribe(); // Clean up listener
    }, []);

    return (
        <div
            className="scrollable relative h-[500px] xs:h-[600px] w-full rounded-md pb-8 pt-4 px-4 caret-red-500"
            style={{
                maskImage:
                    "linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.7) 80px, black 120px, black calc(100% - 120px), rgba(0, 0, 0, 0.7) calc(100% - 80px), transparent 100%)",
                WebkitMaskImage:
                    "linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.7) 80px, black 120px, black calc(100% - 120px), rgba(0, 0, 0, 0.7) calc(100% - 80px), transparent 100%)",
            }}
        >
            <AnimatePresence initial={false}>
                {messages.map((msg) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Card
                            key={msg.id}
                            className="card w-full rounded-[34px] shadow-lg relative mt-4"
                        >
                            <CardContent className="font-merriweather h-full flex flex-col pt-6">
                                <div className="flex flex-col items-start">
                                    <h2 className="font-bold mb-1">{msg.name}</h2>
                                    <p className="text text-xs text-left mb-1">{msg.message}</p>
                                    <small className="text-[10px] text-[#BABABA]">
                                        {formatTimestamp(msg.createdAt?.seconds)}
                                    </small>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}

// Util untuk format waktu dari Firestore Timestamp
function formatTimestamp(seconds: number | undefined) {
    if (!seconds) return "";
    const date = new Date(seconds * 1000);
    return date.toLocaleString("id-ID", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
    });
}

