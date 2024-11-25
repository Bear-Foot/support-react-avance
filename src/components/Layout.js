import styled from 'styled-components'
import { Route, Routes } from 'react-router-dom'

import { routesAsArray } from '../constants/routes'

import { SideBar, sideBarWidth } from './SideBar'

export const Layout = () => (
  <Wrapper>
    <SideBar />
    <ContentWrapper>
      <Routes>
        {routesAsArray.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            Component={route.component}
          />
        ))}
      </Routes>
    </ContentWrapper>
  </Wrapper>
)

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`
const Wrapper = styled.div`
  min-height: 100vh;
  padding-left: ${sideBarWidth}px;
`
