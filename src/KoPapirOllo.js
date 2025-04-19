import React, { useState } from "react";

export default function KoPapirOllo() {
  const choices = ["Kő", "Papír", "Olló"];
  const [playerChoice, setPlayerChoice] = useState(""); // játékos választása
  const [computerChoice, setComputerChoice] = useState(""); // számítógép választása
  const [result, setResult] = useState(""); // játék eredménye
  const [score, setScore] = useState(0); // pontszám

  const play = (choice) => {
    const computer = choices[Math.floor(Math.random() * 3)]; // számítógép választása véletlenszerűen
    setPlayerChoice(choice);
    setComputerChoice(computer);

    // játék logika
    if (choice === computer) {
      setResult("Döntetlen!");
    } else if (
      (choice === "Kő" && computer === "Olló") ||
      (choice === "Papír" && computer === "Kő") ||
      (choice === "Olló" && computer === "Papír")
    ) {
      setResult("Nyertél!");
      setScore(score + 1);
    } else {
      setResult("Vesztettél!");
      setScore(score - 1);
    }
  };

  return (
    <div>
      <h2>Kő – Papír – Olló</h2>
      {choices.map((choice) => (
        <button key={choice} onClick={() => play(choice)}>
          {choice}
        </button>
      ))}
      <p>Te: {playerChoice}</p>
      <p>Számítógép: {computerChoice}</p>
      <p>Eredmény: {result}</p>
      <p>Pontszám: {score}</p>
    </div>
  );
}
