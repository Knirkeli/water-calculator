// import { useEffect, useState } from "react";

// const COOKIE_NAME = "weather_cookie_consent";

// function setCookie(name: string, value: string, days = 365) {
//   const expires = new Date(Date.now() + days * 864e5).toUTCString();
//   document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
// }

// function getCookie(name: string) {
//   return document.cookie.split("; ").find(row => row.startsWith(name + "="))?.split("=")[1];
// }

// export default function CookieNotifier() {
//   const [show, setShow] = useState(false);

//   useEffect(() => {
//     if (!getCookie(COOKIE_NAME)) setShow(true);
//   }, []);

//   const handleChoice = (choice: "yes" | "no") => {
//     setCookie(COOKIE_NAME, choice);
//     setShow(false);
//   };

//   if (!show) return null;

//   return (
//     <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/50 bg-blur-sm z-50 flex-col gap-4">
//       <div className="bg-white p-6 rounded-lg shadow-lg max-w-md border border-gray-300">
//       <div className="mb-2 text-center text-xl text-gray-800">
//         <p>We are using cookies and location data to let you fill in weather data with a button click. This is activated by the Auto-fill button.</p> <br />
//         <h3 className="font-bold text-2xl">Allow cookies?</h3>
//       </div>
//       <div className="flex gap-4 items center justify-center space-x-4 mt-4">
//         <button
//           className="bg-green-600 hover:bg-green-700 px-4 p-2 rounded"
//           onClick={() => handleChoice("yes")}
//         >
//           Yes
//         </button>
//         <button
//           className="bg-red-600 hover:bg-red-700 px-4 p-2 rounded"
//           onClick={() => handleChoice("no")}
//         >
//           No
//         </button>
//       </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";

const COOKIE_NAME = "weather_cookie_consent";

function setCookie(name: string, value: string, days = 365) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

function getCookie(name: string) {
  return document.cookie.split("; ").find(row => row.startsWith(name + "="))?.split("=")[1];
}

export default function CookieNotifier({ onConsentChange }: { onConsentChange?: (consent: string) => void }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!getCookie(COOKIE_NAME)) setShow(true);
  }, []);

  const handleChoice = (choice: "yes" | "no") => {
    setCookie(COOKIE_NAME, choice);
    setShow(false);
    if (onConsentChange) onConsentChange(choice);
  };

  if (!show) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/50 bg-blur-sm z-50 flex-col gap-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md border border-gray-300">
        <div className="mb-2 text-center text-xl text-gray-800">
          <p>We are using cookies and location data to let you fill in weather data with a button click. This is activated by the Auto-fill button.</p> <br />
          <h3 className="font-bold text-2xl">Allow cookies?</h3>
        </div>
        <div className="flex gap-4 items center justify-center space-x-4 mt-4">
          <button
            className="bg-green-600 hover:bg-green-700 px-4 p-2 rounded"
            onClick={() => handleChoice("yes")}
          >
            Yes
          </button>
          <button
            className="bg-red-600 hover:bg-red-700 px-4 p-2 rounded"
            onClick={() => handleChoice("no")}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}