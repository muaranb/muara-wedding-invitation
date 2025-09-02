
import { Button } from "@/components/ui/button";
import { openInvitation } from "@/redux-store/initialSlice";
import { RootState } from "@/redux-store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from 'framer-motion';

export default function Opening() {
    const dispatch = useDispatch();
    const isOpen = useSelector((state: RootState) => state.initial.isInvitationOpen);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "auto";
        } else {
            document.body.style.overflow = "hidden";
        }
    }, [isOpen]);


    return (
        <div className="text-[#213857] text-center">
            <p className="font-merriweather text-3 font-bold text-lg ms-20 -mb-2 mt-6">THE WEDDING OF</p>
            <h1 className="font-pinyonScript text-1 text-7xl xs:text-8xl -mb-1 mr-32">Bima</h1>
            <h1 className="font-pinyonScript text-2 text-7xl xs:text-8xl -mt-1 mb-10 ms-32">Nafia</h1>
            <p className="font-merriweather text-4 font-bold tracking-[0.25rem] mb-44 md:text-lg">25 . 10 . 2025</p>
            <div className="h-20 flex justify-center items-center">
                <AnimatePresence>
                    {!isOpen && (
                        <motion.div
                            key="box"
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            <Button 
                                className="font-merriweather button-1 rounded-full bg-[#819BB1] px-16 py-6 text-white" 
                                variant="outline" 
                                onClick={() => dispatch(openInvitation())}
                                type="button"
                            >
                                Open Invitation
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
