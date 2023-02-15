import { Routes, Route } from 'react-router-dom'
import { History } from './home/History'
import { Home } from './home/Home'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/history" element={<History />} />
    </Routes>
  )
}
