
// This file defines a popup component that displays information about WBGT (Wet Bulb Globe Temperature).

interface WBGTInfoPopupProps {
  onClose: () => void;
}

// export default function WBGTInfoPopup({ onClose }: WBGTInfoPopupProps) {
//   return (
//     <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/50 bg-blur-sm z-50">
//       <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg max-w-md ">
//         <h2 className="text-lg font-bold mb-2">What is WBGT?</h2>
//         <p className="text-sm text-gray-700 dark:text-gray-300">
//           WBGT (Wet Bulb Globe Temperature) measures heat stress by accounting for temperature, humidity, wind speed, and sunlight exposure.
//         </p>
//         <button onClick={onClose} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
//           Close
//         </button>
//       </div>
//     </div>
//   );
// }
export default function WBGTInfoPopup({ onClose }: WBGTInfoPopupProps) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/50 bg-blur-sm z-50">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-white text-2xl font-bold focus:outline-none"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-lg text-center font-bold mb-2">What is WBGT?</h2>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          WBGT (Wet Bulb Globe Temperature) measures heat stress by accounting for temperature, humidity, wind speed, and sunlight exposure.
        </p>
      </div>
    </div>
  );
}