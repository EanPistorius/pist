"use client";

import { useState } from "react";
import RSVPModal from "@/components/RSVPModal";

export default function Hero() {
    const [open, setOpen] = useState(false);

    return (
        <>
        <section className="text-center items-center relative h-[80vh] justify-center py-24 px-6"></section>
        <div className="absolute inset-0"></div>

        <div className="relative text-center px-6">
            <h1 className="text-7xl font-bold mb-6 ">Uitnodiging vir Pistorius troue</h1>
            <p className="text-gray-500 text-2xl max-w-2xl mx-auto mb-18">7 November 2026</p>
            <button onClick={() => setOpen(true)} 
            className="inline-block bg-blue-400 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition">
                RSVP</button>
        </div>

        {open && <RSVPModal close={() => setOpen(false)} />}
        </>
    );
}