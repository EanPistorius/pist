import Image from "next/image";

export default function Gallary() {
    return (
        <section className="py-30 px-6">
            <h2 className="text-3xl font-bold mb-12 text-center">Ons Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
                <Image src="/images/carlee_2449_00001.JPG" alt="Gallary Image 1" width={400} height={300} className="rounded-lg object-cover" />
                <Image src="/images/01a36257329235889d95ee9c85573dca6367ebaca3.jpg" alt="Gallary Image 2" width={400} height={300} className="rounded-lg object-cover" />
                <Image src="/images/carlee_2449_00021.JPG" alt="Gallary Image 5" width={400} height={300} className="rounded-lg object-cover" />
                <Image src="/images/carlee_2449_00032.JPG" alt="Gallary Image 6" width={400} height={300} className="rounded-lg object-cover" />
                <Image src="/images/EAN_4828_00040.JPG" alt="Gallary Image 8" width={400} height={300} className="rounded-lg object-cover" />
                <Image src="/images/carlee_2449_00016.JPG" alt="Gallary Image 9" width={400} height={300} className="rounded-lg object-cover" />
            </div>
        </section>
    );
}