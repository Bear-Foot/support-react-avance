import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import { routesAsArray } from '../constants/routes'
import { useSetLocale } from '../intl/IntlContext'

export const SideBar = () => {
  const toggleLocale = useSetLocale()

  return (
    <Wrapper>
      {routesAsArray.map((route) => (
        <Link to={route.path} key={route.path}>
          <LinkWrapper>
            <FormattedMessage id={route.tradId} values={{ test: 5 }} />
          </LinkWrapper>
        </Link>
      ))}
      <ChangeLocale onClick={toggleLocale}>Change language</ChangeLocale>
    </Wrapper>
  )
}

const ChangeLocale = styled.button`
  position: absolute;
  bottom: 0px;
  height: 50px;
`

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
