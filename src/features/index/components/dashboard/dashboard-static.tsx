"use client";

import { db } from "@/lib/firebase";
import { setGuest } from "@/redux-store/guestSlice";
import { AppDispatch, RootState } from "@/redux-store/store";
import { Guest } from "@/types/opening/guest";
import { smoothScrollTo } from "@/utils/smoothScroll";
import { doc, getDoc } from "firebase/firestore";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  
  const isOpen = useSelector((state: RootState) => state.initial.isInvitationOpen);
  const guest = useSelector((state: RootState) => state.guest);
  
  const searchParams = useSearchParams();
  const guestId = searchParams.get("g");

  if (!guestId) {
    redirect("/not-found"); 
  }

  useEffect(() => {
    if (isOpen) {
      smoothScrollTo(1000, 1000);
    }
  }, [isOpen]);


  useEffect(() => {
    async function fetchData() {
      const data = await getGuestById(guestId!);
      if (data) {
        dispatch(setGuest(data)); // simpan ke redux
      }
    }
    fetchData();
  });

  async function getGuestById(id: string): Promise<Guest | null> {
    try {
      const docRef = doc(db, "guests", id); // ambil dokumen berdasarkan id
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          name: data.name, // pastikan field sesuai di Firestore
        };
      } else {
        throw new Error("user not found!");
      }
    } catch (error) {
      console.error("Error:", error);
      return null
      // redirect("/not-found");
    }
  }

  return (
    <div className="text-[#213857] text-center">
      <p className="font-merriweather text-3 font-bold text-lg ms-20 -mb-2">THE WEDDING OF</p>
      <h1 className="font-pinyonScript text-1 text-7xl xs:text-8xl -mb-1 mr-32">Bima</h1>
      <h1 className="font-pinyonScript text-2 text-7xl xs:text-8xl -mt-1 mb-64 ms-32">Nafia</h1>
      <p className="font-merriweather text-4 md:text-sm">Kepada Yth.</p>
      <p className="font-merriweather text-4 text-sm mb-8">Bapak/Ibu Tamu Undangan</p>
      <p className="font-merriweather text-4 text-lg font-bold">{guest?.name}</p>
    </div>
  );
}
