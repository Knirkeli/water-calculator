
// This file defines a popup component that displays information about WBGT (Wet Bulb Globe Temperature).

interface WBGTInfoPopupProps {
  onClose: () => void;
}

export default function WBGTInfoPopup({ onClose }: WBGTInfoPopupProps) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/50 bg-blur-sm z-50">
      <div className="bg-white dark:bg-black p-6 rounded-lg shadow-lg max-w-md border border-gray-300 dark:border-white-700">
        <h2 className="text-lg font-bold mb-2">What is WBGT?</h2>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          WBGT (Wet Bulb Globe Temperature) measures heat stress by accounting for temperature, humidity, wind speed, and sunlight exposure.
        </p>
        <button onClick={onClose} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
          Close
        </button>
      </div>
    </div>
  );
}