import { sentences } from '@/constants'
import React, { useState, useEffect } from 'react'

const Sentence = () => {
  const [randomIndex, setRandomIndex] = useState<number | null>(null)
  const [choices, setChoices] = useState<string[]>([])
  const [feedback, setFeedback] = useState<string | null>(null)
  const [showNext, setShowNext] = useState<boolean>(false)
  const [count, setCount] = useState(0)

  const generateQuestion = () => {
    setFeedback(null)
    setShowNext(false)

    const newIndex = Math.floor(Math.random() * sentences.length)
    setRandomIndex(newIndex)

    const wrongChoices = sentences.filter((_, index) => index !== newIndex).map((s) => s.korean)

    const randomWrongChoices = wrongChoices.sort(() => 0.5 - Math.random()).slice(0, 4)
    setChoices([...randomWrongChoices, sentences[newIndex].korean].sort(() => 0.5 - Math.random()))
  }

  const checkAnswer = (choice: string) => {
    if (sentences[randomIndex!].korean === choice) {
      setCount((prev) => prev + 1)
      setFeedback('정답입니다!')
    } else {
      setFeedback(`오답입니다! 정답은 '${sentences[randomIndex!].korean}' 입니다.`)
    }
    setShowNext(true)
  }

  useEffect(() => {
    generateQuestion()
  }, [])

  return (
    <div className="p-4 w-full container justify-center">
      <h1 className="text-2xl mb-4">일본어 문장 공부 점수: {count}점</h1>
      {randomIndex !== null && (
        <>
          <div className="w-full">
            <h2 className="text-xl mb-4">{sentences[randomIndex].japanese}</h2>
            <div className="flex w-full gap-5">
              <span className="text-lg mb-4 text-gray-500">
                {sentences[randomIndex].pronunciation}
              </span>
              <a
                target="_blank"
                href={`https://papago.naver.com/?sk=ja&tk=ko&hn=0&st=${sentences[randomIndex].japanese}`}
                rel="noreferrer"
              >
                파파고 바로가기
              </a>
            </div>
          </div>
          {choices.map((choice) => (
            <button
              type="button"
              key={choice}
              className="bg-blue-500 text-white rounded-lg p-2 m-2 text-base"
              onClick={() => checkAnswer(choice)}
              disabled={!!feedback}
            >
              {choice}
            </button>
          ))}
          {feedback && (
            <div className="text-red-500 mt-4">
              {feedback}
              {sentences[randomIndex].relatedWords.map((v) => (
                <p key={v} className="text-blue">
                  {v}
                </p>
              ))}
            </div>
          )}
          {showNext && (
            <button
              type="button"
              className="bg-green-500 text-white rounded-lg p-2 mt-4"
              onClick={generateQuestion}
            >
              다음 문제
            </button>
          )}
        </>
      )}
    </div>
  )
}

export default Sentence
