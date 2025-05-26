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
        <>
            <p className="text text-1 mb-4 text-sm">THE WEDDING OF</p>
            <h1 className="title font-[Parisienne] text-7xl -mb-1">Bima &nbsp;</h1>
            <h1 className="title font-[Parisienne] text-7xl -mt-1 mb-48">&nbsp; Nafia</h1>
            <p className="text text-2 text-sm mb-3">KEPADA YTH</p>
            <p className="text text-3 text-sm">Bapak Setjito Agus</p>
        </>
    );
}
