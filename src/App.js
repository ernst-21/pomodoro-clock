import React, { useState, useEffect, useMemo } from 'react';
import SessionBreakSetter from './components/SessionBreakSetter';
import Clock from './components/Clock';
import { Switch } from 'antd';

let path = './assets/default.mp3';

function App() {
  const [breakCounter, setBreakCounter] = useState(3);
  const [sessionCounter, setSessionCounter] = useState(10);
  const [minutes, setMinutes] = useState(10);
  const [seconds, setSeconds] = useState(0);
  const [isBreak, setIsBreak] = useState(false);
  const [isSession, setIsSession] = useState(true);
  const [isCounting, setIsCounting] = useState(false);
  const [counter, setCounter] = useState(600);
  const [percent, setPercent] = useState(100);
  const [whiteTheme, setWhiteTheme] = useState(true);
  const audio = useMemo(
    () =>
      new Audio('https://onlineclock.net/audio/options/default.mp3' || path),
    []);

  function onChange() {
    setWhiteTheme(!whiteTheme);
  }

  useEffect(() => {
    let intervalCount;
    if (isCounting) {
      intervalCount = setInterval(() => {
        const computedSecond = counter % 60;
        const computedMinute = Math.floor(counter / 60);

        setSeconds(computedSecond);
        setMinutes(computedMinute);

        setCounter((counter) => counter - 1);
        setPercent(
          Math.round(
            isSession
              ? (counter / (sessionCounter * 60)) * 100
              : (counter / (breakCounter * 60)) * 100
          )
        );
      }, 1000);
    }
    if (isSession && counter < 0) {
      audio.play();
      setIsSession(false);
      setCounter(breakCounter * 60);
      setIsBreak(true);
    } else if (isBreak && counter < 0) {
      audio.play();
      setIsBreak(false);
      setCounter(sessionCounter * 60);
      setIsSession(true);
    }
    return () => clearInterval(intervalCount);
  }, [
    isCounting,
    isBreak,
    isSession,
    counter,
    breakCounter,
    sessionCounter,
    audio
  ]);

  const handleDecrease = () => {
    setBreakCounter((prevState) => {
      if (prevState <= 1) {
        return 1;
      }
      return prevState - 1;
    });
  };

  const handleIncrease = () => {
    setBreakCounter((prevState) => prevState + 1);
  };

  const handleSessionDecrease = () => {
    setSessionCounter((prevState) => {
      if (prevState <= 1) {
        return 1;
      }
      return prevState - 1;
    });
    setMinutes((prevState) => {
      if (prevState <= 1) {
        return 1;
      }
      return prevState - 1;
    });
    if (sessionCounter > 1) {
      setCounter((sessionCounter - 1) * 60);
    }
  };

  const handleSessionIncrease = () => {
    setSessionCounter((prevState) => prevState + 1);
    setMinutes((prevState) => prevState + 1);
    setCounter((sessionCounter + 1) * 60);
  };

  const handleReset = () => {
    setIsCounting(false);
    setBreakCounter(3);
    setSessionCounter(10);
    setMinutes(10);
    setSeconds(0);
    setIsSession(true);
    setIsBreak(false);
    setCounter(600);
    setPercent(100);
  };

  return (
    <div
      className="pomo-container"
      style={{ backgroundColor: whiteTheme ? '#fff' : '#242424' }}
    >
      <Clock
        reset={handleReset}
        running={isCounting}
        onPlay={() => setIsCounting(true)}
        onPause={() => setIsCounting(false)}
        counterType={isBreak ? 'Break' : 'Session'}
        percent={percent}
        theme={whiteTheme}
      >
        {minutes < 10 ? '0' + minutes : minutes} : {seconds < 10 ? '0' + seconds : seconds}
      </Clock>
      <Switch checkedChildren='black' unCheckedChildren="white" onChange={onChange} defaultChecked />
      <div className="counters-container">
        <SessionBreakSetter
          increase={handleIncrease}
          decrease={handleDecrease}
          theme={whiteTheme}
          child='Break'>
          {breakCounter}
        </SessionBreakSetter>
        <SessionBreakSetter
          increase={handleSessionIncrease}
          decrease={handleSessionDecrease}
          theme={whiteTheme}
          child='Session'
        >
          {sessionCounter}
        </SessionBreakSetter>
      </div>
    </div>
  );
}

export default App;
