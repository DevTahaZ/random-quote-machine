import React, { useEffect, useState } from "react";
import "./App.css";
import colors_Array from "./colors-array";

let quotesDBUrl =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

function App() {
  const [quote, setQuote] = useState(
    "The most difficult thing is the decision to act, the rest is merely tenacity."
  );
  const [author, setAuthor] = useState("Amelia Earhart");
  const [randomNumber, setRandomNumber] = useState(0);
  const [quotesArray, setQuotesArray] = useState(null);
  const [accentColor, setAccentColor] = useState("#282c34");

  const fetchQuotes = async (url) => {
    const response = await fetch(url);
    const parseJSON = await response.json();
    setQuotesArray(parseJSON.quotes);
  };
  useEffect(() => {
    fetchQuotes(quotesDBUrl);
  }, [quotesDBUrl]);

  const getRandomNumber = () => {
    let randomIntegar = Math.floor(quotesArray.length * Math.random());
    setRandomNumber(randomIntegar);
    setAccentColor(colors_Array[randomIntegar]);
    setQuote(quotesArray[randomIntegar].quote);
    setAuthor(quotesArray[randomIntegar].author);
  };

  return (
    <div id="App">
      <div id="App-header" style={{ backgroundColor: accentColor }}>
        <div id="quote-box" style={{ color: accentColor }}>
          <i class="fa fa-quote-left"> </i>
          <p id="text">
            &nbsp;&nbsp;
            {quote}
          </p>
          <p id="author">- {author}</p>
          <button id="twitter">
            <a
              id="tweet-quote"
              style={{ backgroundColor: accentColor }}
              href={encodeURI(
                "https://www.twitter.com/intent/tweet?text=${quote} - ${author}"
              )}
            >
              <i class="fa fa-twitter"></i>
            </a>
          </button>
          <button
            id="new-quote"
            style={{ backgroundColor: accentColor }}
            onClick={() => getRandomNumber()}
          >
            New quote
          </button>
        </div>
        <div class="footer">by Taha Zaib</div>
      </div>
    </div>
  );
}

export default App;
