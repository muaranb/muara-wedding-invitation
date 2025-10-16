"use client";

import { useEffect, useState, useRef } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
  DocumentData,
  Timestamp,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

type Message = {
  id: string;
  name: string;
  message: string;
  createdAt?: Timestamp | null;
};

const PAGE_SIZE = 10;

export function GreetingsCardScrollable() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [lastDoc, setLastDoc] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null); // ref ke ScrollArea utama

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    console.log("🔄 Loading messages...");
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const q = lastDoc
        ? query(
            collection(db, "greetings"),
            orderBy("createdAt", "desc"),
            startAfter(lastDoc),
            limit(PAGE_SIZE)
          )
        : query(
            collection(db, "greetings"),
            orderBy("createdAt", "desc"),
            limit(PAGE_SIZE)
          );

      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        setHasMore(false);
        return;
      }

      const data = snapshot.docs.map((doc) => {
        const raw = doc.data() as DocumentData;
        return {
          id: doc.id,
          name: raw.name || "Anonim",
          message: raw.message || "",
          createdAt: raw.createdAt || null,
        } as Message;
      });

      setMessages((prev) => [...prev, ...data]);
      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
    } catch (err) {
      console.error("❌ Error loading messages:", err);
    } finally {
      setLoading(false);
    }
  };

  // --- Infinite Scroll Event Listener ---
  useEffect(() => {
    if (!scrollAreaRef.current) return;

    // Ambil viewport internal dari Radix ScrollArea
    const viewport = scrollAreaRef.current.querySelector(
      "[data-radix-scroll-area-viewport]"
    ) as HTMLElement | null;

    if (!viewport) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = viewport;
      const bottomReached = scrollTop + clientHeight >= scrollHeight - 50;

      console.log('👀 Scrolling...');
      if (bottomReached && !loading && hasMore) {
        console.log("⬇️ Reached bottom, loading more...");
        loadMessages();
      }
    };

    viewport.addEventListener("scroll", handleScroll);
    return () => viewport.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore, lastDoc]);

  return (
    <ScrollArea
      ref={scrollAreaRef}
      className="relative h-[500px] xs:h-[600px] w-full rounded-md pb-8 pt-4 px-4 caret-red-500"
    >
      <div
        className="space-y-4"
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
              <Card className="card w-full rounded-[34px] shadow-lg relative text-start">
                <CardContent className="font-merriweather flex flex-col items-start pt-6">
                  <h2 className="font-bold mb-1">{msg.name}</h2>
                  <p className="text-xs mb-1">{msg.message}</p>
                  <small className="text-[10px] text-[#BABABA]">
                    {formatTimestamp(msg.createdAt)}
                  </small>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <div className="text-center text-sm text-gray-400 mt-4 mb-2">
            Memuat pesan...
          </div>
        )}

        {!hasMore && !loading && (
          <div className="text-center text-xs text-gray-500 mt-4 mb-2">
            Semua pesan sudah dimuat
          </div>
        )}
      </div>

      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
}

// --- util: format Timestamp Firestore ---
function formatTimestamp(timestamp: Timestamp | null | undefined) {
  if (!timestamp) return "";
  const date = timestamp.toDate();
  return date.toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}
