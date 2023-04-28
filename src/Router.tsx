import { Routes, Route } from 'react-router-dom'
import { History } from './pages/History'
import { Home } from './pages/Home'
import { DefaultLayout } from './layouts/DefaultLayout'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/ignite-timer" element={<Home />} />
        <Route path="/ignite-timer/history" element={<History />} />
      </Route>
    </Routes>
  )
}
