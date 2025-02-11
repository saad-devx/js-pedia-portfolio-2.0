import "@/styles/globals.css";
import { useEffect } from "react";
import Lenis from 'lenis';
import { Navbar } from "@/components/ui/navbar";

export default function App({ Component, pageProps }) {

  useEffect(() => {
    const lenis = new Lenis({ duration: 1 })
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [])

  return <>
    <Navbar />
    <Component {...pageProps} />
  </>
}
