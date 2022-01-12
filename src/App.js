import React, { useState, useEffect } from "react";
import { interval, scan, startWith } from "rxjs";
import FormatTime from "./components/FormatTime";
// import { Container, Button } from "@material-ui/core";
import Container from "./components/Container";
import s from "./App.module.css";

const stream$ = interval(1000);
function App() {
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);

  const start = () => {
    setTimerOn(true);
  };
  const wait = () => {
    setTimerOn(false);
  };
  const stop = () => {
    setTimerOn(false);
    setTime(0);
  };
  const doubleClick = () => {
    if (time > 0) {
      setTimerOn(true);
    }
  };

  const resetTimer = () => {
    setTime(0);
  };

  useEffect(() => {
    if (timerOn) {
      const sub = stream$
        .pipe(
          startWith(time),
          scan((value) => value + 1)
        )
        .subscribe(setTime);
      return () => sub.unsubscribe();
    }
  }, [time, timerOn]);

  return (
    <Container>
      <div className={s.wrapper}>
        <FormatTime time={time} />
        <div className={s.buttons}>
          {!timerOn && time === 0 && (
            <button onClick={start} className={s.button}>
              Start
            </button>
          )}
          {(time || timerOn) && (
            <button onClick={stop} className={s.button}>
              Stop
            </button>
          )}
          {(time || timerOn) && (
            <button
              onDoubleClick={wait}
              onClick={doubleClick}
              className={s.button}
            >
              {timerOn ? "Wait" : "Start"}
            </button>
          )}
          {(time || timerOn) && (
            <button onClick={resetTimer} className={s.button}>
              Reset
            </button>
          )}
        </div>
      </div>
    </Container>
  );
}

export default App;
