'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image'
import { Copy } from 'lucide-react';
import { toast } from "sonner"
import { useDispatch } from 'react-redux';
import { openGift } from "@/redux-store/giftSlice";

export default function GiftCard() {
  const accountNumber = "0501191549";
  const [step, setStep] = useState(0);
  const dispatch = useDispatch();

  const variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(accountNumber)
      .then(() => {
        toast("Text copied!");
      })
      .catch((err) => {
        toast("Failed to copy", {
          description: err.message,
        });
      });
  };

  return (
    <Card className="card-1 w-[340px] h-[489px] rounded-[34px] bg-cover bg-center shadow-lg overflow-visible relative">
      <CardContent className="h-full flex flex-col p-8 justify-center">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="intro"
              {...variants}
              transition={{ duration: 0.4 }}
              className="flex flex-col h-full justify-center"
            >
              <h1 className="font-pinyonScript text-5xl mb-10 text-center">Wedding Gift</h1>
              <p className="font-merriweather text-sm mb-6 text-center">
                Kehadiran Anda di pernikahan kami sudah lebih dari cukup.
              </p>
              <p className="font-merriweather text-sm mb-16 text-center">
                Namun, jika Anda ingin memberikan hadiah, kami menyediakan amplop digital untuk memudahkan Anda.
              </p>
              <div className="w-full flex justify-center">
                <Button
                  onClick={() => setStep(2)}
                  className="button-1 font-merriweather rounded-full bg-[#819BB1] text-white py-5 px-16"
                  variant="outline"
                >
                  Kirim Hadiah
                </Button>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="qris"
              {...variants}
              transition={{ duration: 0.4 }}
              className="flex flex-col h-full items-center text-center justify-center"
            >
              {/* <h2 className="font-pinyonScript text-4xl mb-6">QRIS BCA</h2> */}
              <Image
                className="mb-6"
                src="/images/gift/logo-qris.png"
                width={125}
                height={47}
                alt="logo-qris"
              />
              <p className="font-merriweather text-sm mb-4">
                Silakan scan QRIS berikut untuk mengirim hadiah.
              </p>
              <Image
                className="mb-6"
                src="/images/gift/qris.jpg"
                width={160}
                height={160}
                alt="qris"
                onClick={() => dispatch(openGift())}
              />
              <div className="space-y-2 font-merriweather">
                <Button onClick={() => setStep(2)} className="rounded-full bg-[#819BB1] text-white px-8 py-6" variant="outline">
                  Kirim via Transfer Bank
                </Button>
                <Button variant="ghost" onClick={() => setStep(0)} className="rounded-full text-sm underline hover:bg-inherit text-[#BABABA]">
                  Kembali ke Halaman Awal
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="transfer"
              {...variants}
              transition={{ duration: 0.4 }}
              className="flex flex-col h-full items-center justify-center text-center"
            >
              {/* <h2 className="font-pinyonScript text-4xl mb-6">Transfer Bank Mandiri</h2> */}
              <Image
                className="mb-14"
                src="/images/gift/logo-bca.png"
                width={135}
                height={42}
                alt="logo-bca"
              />
              <p className="font-merriweather text-sm mb-2">Rekening a.n.</p>
              <p className="font-merriweather text-md font-bold mb-4">BIMA AURASAKTI ROCHMATULLAH</p>
              <div 
                className="bg-[#0060AF] rounded-lg p-4 text-sm font-merriweather mb-14 shadow text-white flex flex-row items-center"
                onClick={handleCopy}
              >
                <p className="font-semibold text-2xl me-2">0501191549</p>
                <Copy size={24} strokeWidth={3} />
              </div>
              <div className="space-y-3 font-merriweather">
                <Button onClick={() => setStep(1)} className="rounded-full bg-[#819BB1] text-white px-8 py-6" variant="outline">
                  Kirim via QRIS
                </Button>
                <Button variant="ghost" onClick={() => setStep(0)} className="rounded-full text-sm underline hover:bg-inherit text-[#BABABA]">
                  Kembali ke Halaman Awal
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
      <Image
        className="absolute -left-8 -top-6"
        src="/images/gift/flower-2.png"
        width={143}
        height={160}
        alt="flower"
      />
    </Card>
  );
}
