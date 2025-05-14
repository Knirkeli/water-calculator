// export default function Header() {
//     return (
//         <header className="fixed top-0 left-0 flex items-center justify-between w-full mx-auto p-4 bg-slate-900 shadow-xl rounded-b-lg">
//             <img src="/Vannlogo.png" alt="Water calculator logo" className="h-16 ml-6 z-10" />
//             <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-white whitespace-nowrap">Water Intake Calculator</h1>
//             <nav>
//                 <p className="text-xl font-bold text-blue-800 mr-6">Stay hydrated!</p>

//                 {/* <ul className="flex space-x-4 mr-6">
//                     <li><a href="#about" className="text-gray-600 hover:text-gray-800">About</a></li>
//                     <li><a href="#contact" className="text-gray-600 hover:text-gray-800">Donate</a></li>
//                 </ul> */}
//             </nav>
//         </header>
//     );
// }
export default function Header() {
    return (
        <header className="fixed top-0 left-0 w-full mx-auto p-4 bg-slate-900 shadow-xl rounded-b-lg z-50">
            <div className="flex items-center justify-between w-full relative">
                <img src="/Vannlogo.png" alt="Water calculator logo" className="h-16 ml-0 md:ml-6 z-10" />
                <div className="flex flex-col items-center flex-1">
                    <h1 className="text-2xl font-bold text-white whitespace-nowrap text-center">
                        Water Intake Calculator
                    </h1>
                </div>
                <nav className="mr-6 hidden md:block">
                    <p className="text-xl font-bold text-blue-800">Stay hydrated!</p>
                    {/* <ul className="flex space-x-4 mr-6">
                        <li><a href="#about" className="text-gray-600 hover:text-gray-800">About</a></li>
                        <li><a href="#contact" className="text-gray-600 hover:text-gray-800">Donate</a></li>
                    </ul> */}
                </nav>
            </div>
        </header>
    );
}