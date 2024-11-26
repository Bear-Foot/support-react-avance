import { map, mapValues } from 'lodash'
import { lazy, Suspense } from 'react'

const routesTmp = {
  home: {
    componentLoader: () => import('../components/Home'),
    path: '/',
    tradId: 'linkHome',
  },
  newsLetter: {
    componentLoader: () => import('../components/NewsLetter'),
    path: 'newsletter',
    tradId: 'linkNL',
  },
  perf: {
    componentLoader: () => import('../components/Perf'),
    path: '/perf',
    tradId: 'linkPerf',
  },
  profile: {
    componentLoader: () => import('../components/Profile'),
    path: '/profile',
    tradId: 'linkProfile',
  },
}

const routes = mapValues(routesTmp, (route) => {
  // eslint-disable-next-line prefer-template, no-path-concat
  const LazyComp = lazy(route.componentLoader)

  const CompLoader = (props) => (
    <Suspense>
      <LazyComp {...props} />
    </Suspense>
  )

  return {
    ...route,
    component: CompLoader,
  }
})
export const routesAsArray = map(routes)
