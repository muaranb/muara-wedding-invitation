"use client";

import { RootState } from "@/redux-store/store";
import { smoothScrollTo } from "@/utils/smoothScroll";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const isOpen = useSelector((state: RootState) => state.initial.isInvitationOpen);

  useEffect(() => {
    if (isOpen) {
      smoothScrollTo(1000, 2000);
    }
  }, [isOpen]);

  return (
    <div className="text-[#213857] text-center">
      <p className="font-merriweather text-3 font-bold text-lg ms-20 -mb-2">THE WEDDING OF</p>
      <h1 className="font-pinyonScript text-1 text-7xl xs:text-8xl -mb-1 mr-32">Bima</h1>
      <h1 className="font-pinyonScript text-2 text-7xl xs:text-8xl -mt-1 mb-64 ms-32">Nafia</h1>
      <p className="font-merriweather text-4 md:text-sm">Kepada Yth.</p>
      <p className="font-merriweather text-4 text-sm mb-8">Bapak/Ibu Tamu Undangan</p>
      <p className="font-merriweather text-4 text-lg font-bold">Nur Raihan Ramadhan S. Akt</p>
      <p className="font-merriweather text-4 text-lg font-bold">dan Keluarga</p>
    </div>
  );
}
