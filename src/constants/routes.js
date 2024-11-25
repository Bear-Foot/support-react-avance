import { map } from 'lodash'

import { Home } from '../components/Home'
import { NewsLetter } from '../components/NewsLetter'
import { Profile } from '../components/Profile'

export const routes = {
  home: {
    component: Home,
    path: '/',
    text: 'Home',
  },
  newsLetter: {
    component: NewsLetter,
    path: 'newsletter',
    text: 'News Letter',
  },
  profile: {
    component: Profile,
    path: '/profile',
    text: 'Profile',
  },
}

export const routesAsArray = map(routes)
