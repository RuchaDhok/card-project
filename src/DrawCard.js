import React, { useState } from "react";

const DrawCard = () => {
  const signs = ["Heart", "Diamond", "Club", "Spade"];
  const numbers = ["A", 1, 2, 3, 4, 5, 6, 7, 8, 9, "J", "Q", "K"];

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  let deck = [];
  for (let i = 0; i < signs.length; i++) {
    for (let j = 0; j < numbers.length; j++) {
      deck.push(signs[i] + "-" + numbers[j]);
    }
  }

  const shuffledDeck = shuffleArray([...deck]);
  const [cardsSpliced, setCardSpliced] = useState([]);
  const [deckOfCards, setDeckOfCard] = useState(shuffledDeck);

  function handleClick() {
    if (deckOfCards.length >= 5) {
      const splicedCards = deckOfCards.splice(0, 5);
      setCardSpliced((prev) => [prev + splicedCards + ","]);
    } else {
      alert("Deck have only 2 cards. Can't draw the cards!!");
    }
    if (deckOfCards.length === 0) {
      setDeckOfCard(shuffledDeck);
    }
  }

  function handleCardClick(e) {
    const filteredList = cardsSpliced[0]
      .split(",")
      .filter((t) => t !== e.target.id);
    setCardSpliced([filteredList.join(",")]);

    if (deckOfCards.indexOf(e.target.id) === -1) {
      setDeckOfCard((prev) => [...prev, e.target.id + ","]);
    }
  }

  return (
    <>
      <div className="p-1 cursor-pointer" onClick={handleClick}>
        <div className="h-52 w-36 shadow-lg bg-gray-300 rounded-lg flex items-center justify-center">
          <p>Draw Card</p>
        </div>
      </div>

      <div className="flex flex-row flex-wrap">
        {cardsSpliced[0]?.split(",").map(
          (item) =>
            item !== "" && (
              <div
                key={item}
                id={item}
                onClick={handleCardClick}
                className="h-52 w-36 shadow-lg bg-gray-300 rounded-lg p-2 m-1 cursor-pointer flex items-center justify-center"
              >
                <p>{item}</p>
              </div>
            )
        )}
      </div>
    </>
  );
};

export default DrawCard;
