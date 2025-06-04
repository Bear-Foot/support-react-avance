import styled from 'styled-components'

import { Layout } from './components/Layout'
import { useToggle } from './hooks/toggle'

export function App() {
  return (
    <Layout />
  )
}

const EmptyLayout = () => {
  const collapsed = useToggle(true)

  return (
    <Wrapper $collapsed={collapsed.state}>
      <Sidebar $collapsed={collapsed.state}>
        sidebar
        <button onClick={collapsed.toggle}>Toggle</button>
      </Sidebar>
      <Content>
        <InnerWrapper>
          <InnerContent>
            <Button>
              <CustomSpan>
                Je clique sur une phrase super longue mais bon je ne peux pas m'afficher en entier parce que voila
              </CustomSpan>
            </Button>
          </InnerContent>
        </InnerWrapper>

        <ButtonWrapper>
          {
            Array(1)
              .fill(null)
              .map((_, i) => (
                <WrappedButton>
                  Button
                  {i + 1}
                </WrappedButton>
              ))
          }
        </ButtonWrapper>
      </Content>
    </Wrapper>
  )
}

const ButtonWrapper = styled.div`
  background-color: pink;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  &> * {
    /* flex: 1; */
  }
  gap: 10px;
`

const WrappedButton = styled.button`
height: 20px;
`

const CustomSpan = styled.div`
  /* text-overflow: "…"; */
  `
const InnerWrapper = styled.div`
  width: 200px;
  height: 100px;
  border: 2px dashed black;
  `
const InnerContent = styled.div`
  width: 300px;
  height: 100px;
  
  border: 2px dashed cyan;
  `
const Button = styled.div`
  background-color: yellow;
  overflow: hidden;
  width: 100%;
  text-overflow: ellipsis;
  height: 20px;
`

const sidebarWidth = 100
const sidebarWidthCollapsed = 50
const remainingWidth = 50

const Wrapper = styled.div`
  position: relative;
  transition: all 0.5s;
  padding-left: ${({ $collapsed }) => ($collapsed ? sidebarWidthCollapsed : sidebarWidth)}px;
`

const Sidebar = styled.div`
  transition: all 0.5s;
  position: fixed;
  top: 0;
  left: 0;
  left: ${({ $collapsed }) => ($collapsed ? -(sidebarWidth - remainingWidth) : 0)}px;

  background-color: grey;
  /* width: ${({ $collapsed }) => ($collapsed ? sidebarWidthCollapsed : sidebarWidth)}px; */
  height: 100vh;
`

const Content = styled.div`
  height: 1200px;
  border: 2px dashed red;
`
