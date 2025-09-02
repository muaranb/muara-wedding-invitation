import { Toaster } from "sonner";
import "./style.css";
import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="vendors/aframe-master.min.js"
          strategy="beforeInteractive"
        ></Script>
        <Script
          src="vendors/aframe-ar-nft.js"
          strategy="beforeInteractive"
        ></Script>
        {/* <Script
          src="https://cdn.jsdelivr.net/npm/aframe@1.6.0/dist/aframe-master.min.js"
          strategy="beforeInteractive"
        ></Script>
        <Script
          src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar-nft.js"
          strategy="beforeInteractive"
        ></Script> */}
        <Script id="ar-script" strategy="afterInteractive">
          {`
            if (typeof AFRAME !== "undefined") {
              AFRAME.registerComponent('videohandler', {
                init: function () {
                  var marker = this.el;

                  this.vid = document.querySelector("#vid");

                  marker.addEventListener('markerFound', function () {
                    this.vid.play();
                  }.bind(this));

                  marker.addEventListener('markerLost', function() {
                    this.vid.pause();
                    this.vid.currentTime = 0;
                  }.bind(this));
                }
              });
            } else {
              console.error("AFRAME not loaded!");
            }
          `}
        </Script>
      </head>
      <body>
        {children}

        <Toaster position="top-center" richColors theme="dark" />
      </body>
    </html>
  );
}
