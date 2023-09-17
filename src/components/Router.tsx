import App from '@/App'
import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Sentence from './page/Sentence'

const Router = () => {
  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/sentence" element={<Sentence />} />
      </Routes>
    </Suspense>
  )
}

export default Router
