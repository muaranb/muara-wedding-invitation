import { useEffect } from "react";

export default function Dashboard() {
    useEffect(() => {
        // Auto scroll after page and user loaded
        const handleScroll = () => {
            const targetY = 1900;
            const threshold = 10;
            let scrolling = false;
            
            const scroll = () => {
                if (scrolling) return;

                const currentY = window.scrollY;
                if (Math.abs(currentY - targetY) <= threshold) {
                    console.log('Reached target scroll position:', currentY);
                    scrolling = false;
                    return;
                }

                window.scrollTo({ top: targetY, behavior: 'smooth' });
                setTimeout(scroll, 200);
            };
            scroll(); 
        };
        handleScroll()
    })

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
