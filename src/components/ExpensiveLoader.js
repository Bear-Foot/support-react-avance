import { lazy, Suspense } from 'react'

const ExpensiveLoad = lazy(() => import('./ExpensiveLoad'))

export const ExpensiveLoader = () => (
  <Suspense fallback="loading">
    <ExpensiveLoad />
  </Suspense>
)
