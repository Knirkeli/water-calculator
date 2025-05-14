export default function Header() {
    return (
        <header className="fixed top-0 left-0 flex items-center justify-between w-full mx-auto p-4 bg-white shadow-md rounded-b-lg">
            <img src="/Vannlogo.png" alt="Water calculator logo" className="h-16 ml-6" />
            <h1 className="text-2xl font-bold text-gray-800">Water Intake Calculator</h1>
            <nav>
                <p className="text-xl font-bold text-blue-800 mr-6">Stay hydrated!</p>

                {/* <ul className="flex space-x-4 mr-6">
                    <li><a href="#about" className="text-gray-600 hover:text-gray-800">About</a></li>
                    <li><a href="#contact" className="text-gray-600 hover:text-gray-800">Donate</a></li>
                </ul> */}
            </nav>
        </header>
    );
}