import React, { useState, useEffect } from 'react';
import './App.css';
import { hiraganaSet } from './constants';

type Hiragana = {
  character: string,
  romanization: string
};

const App: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [options, setOptions] = useState<string[]>([]);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [shake, setShake] = useState<boolean>(false);
  const [randomIndices, setRandomIndices] = useState<number[]>([]);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [actualAnswer, setActualAnswer] = useState<string>('');
  const [wrongAnswers, setWrongAnswers] = useState<Hiragana[]>([]);

  useEffect(() => {
    const newRandomIndices = [...Array(hiraganaSet.length).keys()].sort(() => Math.random() - 0.5);
    setRandomIndices(newRandomIndices);
  }, []);

  useEffect(() => {
    if (randomIndices.length === 0) return;

    const wrongOptions = hiraganaSet
      .filter((_, idx) => idx !== randomIndices[currentIndex])
      .sort(() => 0.5 - Math.random())
      .slice(0, 4)
      .map((item) => item.romanization);

    const correctOption = hiraganaSet[randomIndices[currentIndex]].romanization;

    const newOptions = [...wrongOptions, correctOption].sort(() => 0.5 - Math.random());

    setOptions(newOptions);
    setActualAnswer(correctOption);
  }, [currentIndex, randomIndices]);

  const nextRandomIndex = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % hiraganaSet.length);
  };

  const checkAnswer = (selectedOption: string) => {
    setShowAnswer(true);

    if (selectedOption !== actualAnswer) {
      setShake(true);
      setWrongAnswers([...wrongAnswers, hiraganaSet[randomIndices[currentIndex]]]);
    } else {
      setCorrectCount((prevCount) => prevCount + 1);
    }
  };

  const onClickNextButton = () => {
    setTimeout(() => {
      setShowAnswer(false);
      setShake(false);
      nextRandomIndex();
    }, 1000); // 2초 후에 다음 문제로 넘어갑니다.
  };

  return (
      <div className="App">
        <div className="character-display">
          <h1>{hiraganaSet[randomIndices[currentIndex]]?.character || ''}</h1>
          {showAnswer && <div className="answer">정답은 {actualAnswer} 입니다.</div>}
          {showAnswer && <button className="answer" onClick={onClickNextButton}>다음</button>}
        </div>
        <div className={`options ${shake ? 'shake-animation' : ''}`}>
          {options.map((option, idx) => (
            <button key={idx} onClick={() => checkAnswer(option)}>
              {option}
            </button>
          ))}
        </div>
        <div className="score">점수: {correctCount}</div>
        <div className="wrong-answers">
          <h2>틀린 단어:</h2>
          <ul>
            {wrongAnswers.map((item, idx) => (
              <li key={idx} title={`정답은 ${item.romanization} 입니다.`}>
                {item.character}: {item.romanization}
              </li>
            ))}
          </ul>
        </div>
      </div>
  );
};

export default App;
