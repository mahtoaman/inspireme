chrome.runtime.onStartup.addListener(() => {
  fetchQuote();
});

async function fetchQuote() {
  try {
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();
    chrome.storage.local.set({ dailyQuote: data });
  } catch (error) {
    console.error("Error fetching quote:", error);
  }
}
