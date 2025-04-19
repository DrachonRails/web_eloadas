import React, { useState, useEffect } from "react";

export default function Stopper() {
  const [time, setTime] = useState(0); // idő ezredmásodpercben
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prev) => prev + 10); // növeljük 10ms-mal
      }, 10); // frissítés 10ms-ként
    }
    return () => clearInterval(interval); // tisztítás leállításkor
  }, [running]);

  const formatTime = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const milliseconds = ms % 1000;
    return `${seconds}.${milliseconds.toString().padStart(3, "0")} másodperc`;
  };

  return (
    <div>
      <h2>Stopper</h2>
      <p>{formatTime(time)}</p>
      <button onClick={() => setRunning(true)}>Indít</button>
      <button onClick={() => setRunning(false)}>Megállít</button>
      <button
        onClick={() => {
          setTime(0);
          setRunning(false);
        }}
      >
        Nulláz
      </button>
    </div>
  );
}
