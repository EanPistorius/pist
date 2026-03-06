export default function Navbar() {
    return (
        <nav className="w-full border-b border-gray-500 p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Pistorius troue</h1>
            <div className="space-x-6">
                <a href="#" className="hover:text-blue-600">Tuis</a>
                <a href="#" className="hover:text-blue-600">Fan page</a>
                <a href="#" className="hover:text-blue-600">Pryslys</a>
                <a href="#" className="hover:text-blue-600">Kontakbesonderhede</a>
            </div>
        </nav>
    );
}