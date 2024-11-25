import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { routesAsArray } from '../constants/routes'

export const SideBar = () => (
  <Wrapper>
    {routesAsArray.map((route) => (
      <Link to={route.path} key={route.path}>
        <LinkWrapper>
          {route.text}
        </LinkWrapper>
      </Link>
    ))}
  </Wrapper>
)

const LinkWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 10px;
`

export const sideBarWidth = 250

const Wrapper = styled.div`
  background-color: #ccc;
  color: white;
  width: ${sideBarWidth}px;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
`