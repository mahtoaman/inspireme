import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [quote, setQuote] = useState({
    content: "Loading...",
    author: "Unknown",
  });

  useEffect(() => {
    fetchQuote();
  }, []);

  async function fetchQuote() {
    const localQuote = getRandomQuoteFromDatabase();
    if (localQuote) {
      setQuote(localQuote);
    } else {
      try {
        const response = await fetch("https://api.quotable.io/random");
        const data = await response.json();
        setQuote(data);
      } catch (error) {
        console.error("Error fetching quote:", error);
        setQuote({ content: "Stay motivated!", author: "Unknown" });
      }
    }
  }

  function getRandomQuoteFromDatabase() {
    const quotes = [
      {
        content: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
      },
      {
        content: "Believe you can and you're halfway there.",
        author: "Theodore Roosevelt",
      },
    ];
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="text-center p-6 bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl mb-8">
        <h1 className="text-2xl font-bold text-purple-300">{quote.content}</h1>
        <p className="text-gray-400 mt-2">- {quote.author}</p>
      </div>
      <div className="w-full max-w-3xl mb-8">
        <form
          action="https://www.google.com/search"
          method="GET"
          className="flex items-center border border-gray-700 rounded-full px-4 py-2 bg-gray-800 shadow-md"
        >
          <img
            src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png"
            alt="Google"
            className="w-4 h-4 mr-2"
          />
          <input
            type="text"
            name="q"
            className="flex-grow outline-none px-4 py-2 text-gray-200 bg-gray-800"
            placeholder="Search Google or type a URL"
          />
          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded-r-full hover:bg-purple-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
