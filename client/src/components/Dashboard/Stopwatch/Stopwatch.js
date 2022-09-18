import React, { useState, useEffect } from "react";

export default function Stopwatch () {
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);

  useEffect(() => {
    let interval = null;

    if (timerOn) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000)
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerOn]);

  function switchTimerState () {
    setTimerOn(!timerOn);
  }

  function resetTimer () {
    setTime(0);
  }

  function convertTime () {

  }

  return (
    <div id="stopwatch-container-wrapper">
      <h3> Stopwatch </h3>
      <div id="stopwatch-time-container">
        <span> {("0" + Math.floor(((time / 60) / 60) % 60)).slice(-2)}:</span>
        <span> {("0" + Math.floor((time / 60) % 60)).slice(-2)}:</span>
        <span> {("0" + (time % 60)).slice(-2)}</span>
      </div>
      <div id="stopwatch-button-wrapper">
        { !timerOn && time === 0 &&
            <button onClick={switchTimerState}> Start </button>
        }
        { !timerOn && time > 0 &&
            <button onClick={switchTimerState}> Resume </button>
        }
        { timerOn &&
            <button onClick={switchTimerState}> Stop </button>
        }
        { time > 0 &&
            <button onClick={resetTimer}> Reset </button>
        }
      </div>
    </div>
  );
}
