"use client"
import { useState, useEffect } from "react"

export default function RSVPModal({ close }: {close: () => void}) {
    const [email, setEmail] = useState("");
    const [nickname, setName] = useState("");
    const [consent, setConsent] = useState(false);
    const [attending, setAttendance] = useState("");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        try {
            setError(null);
            const res = await fetch("http://192.168.1.92:8000/subscribe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, nickname, attending, consent }),
                signal: controller.signal,
            })
            clearTimeout(timeoutId);
            if (!res.ok) {
                const errorData = await res.json()
                throw new Error(errorData.detail)
            }

            const errorData = await res.json()
            close();
        } catch (error: any) {
            if ((error as Error).name === "AbortError") {
                alert("Die versoek het te lank geneem. Probeer asseblief weer op 'n ander geleentheid.");
                return;
            }
            //409 is 'n konflik, beteken die e-pos is reeds geregistreer
            if (error.message){
                setError(error.message);
                return;
            }
            console.error("Error met RSVP:", error);
        }

    }

    return (

        <div className="fixed inset-0 flex items-center justify-center bg-black/90">
            <div className="text-gray bg-gray-800 p-8 rounded-xl w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6">RSVP</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="U e-pos adres"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="text-gray w-full border border-gray-500 rounded-lg p-3"
                        required
                    />
                    <input
                        type="text"
                        placeholder="U Noemnaam"
                        value={nickname}
                        onChange={(e) => setName(e.target.value)}
                        className="text-gray w-full border border-gray-500 rounded-lg p-3"
                        required
                    />
                    <div className="flex items-center">
                            <input type="checkbox" id="consent" className="mr-2" required 
                            checked={consent}
                            onChange={(e) => setConsent(e.target.checked)} />
                            <label htmlFor="consent" className="text-gray">Ek gee toestemming om 'n e-pos na my adres te stuur</label>
                    </div>
                    <select
                        value={attending}
                        onChange={(e) => setAttendance(e.target.value)}
                        className="text-gray bg-gray-800 w-full border border-gray-500 rounded-lg p-3"
                        aria-placeholder="Sal U Bywoon?"
                        required
                    >
                        <option className="text-gray" value="" disabled>Sal U bywoon?</option>
                        <option className="text-gray" value="yes">Ja ek kom</option>
                        <option className="text-gray" value="no">Nee ek kom nie</option>
                    </select>
                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={close}
                            className="border text-gray px-4 py-2 rounded-lg hover:text-white hover:bg-gray-400 transition"
                        >
                            Kanselleer
                        </button>
                        
                        {error && (
                            <p className="text-red mt-2">
                            {error}
                            </p>
                        )}
                        <button
                            type="submit"
                            className="border bg-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"

                        >
                            Stuur RSVP
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}