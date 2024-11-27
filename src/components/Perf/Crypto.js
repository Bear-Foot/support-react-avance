import { memo } from 'react'
import styled from 'styled-components'

function CryptoComponent({ crypto }) {
  const highestValue = Math.max(...crypto.values)
  const lowestValue = Math.min(...crypto.values)

  return (
    <Wrapper>
      <Values>
        {crypto.values.map((value, i) => (
          <ValueBar
            value={value}
            crypto={crypto}
            highestValue={highestValue}
            lowestValue={lowestValue}
          />
        ))}
      </Values>
      <Infos>
        <CryptoName $color={crypto.color}>
          {crypto.name}
          {' '}
          coin
        </CryptoName>
      </Infos>
    </Wrapper>
  )
}

export const Crypto = memo(CryptoComponent)

const ValueBar = ({
  crypto, value, highestValue, lowestValue,
}) => (
  <div
    style={{
      backgroundColor: crypto.color,
      display: 'inline-block',
      flex: 1,
      height: `${10 + (
        (value - lowestValue) / (highestValue - lowestValue)) * 80}%`,
    }}
  />
)

const CryptoName = styled.h3`
  margin: 0;
  padding: 10px;
  color: ${({ $color }) => $color};
  background-color: #333;
`

const Values = styled.section`
  display: flex;
  flex: 1;
  align-items: flex-end;
`

const Infos = styled.section`
  border-top: 1px solid black;
`

const Wrapper = styled.div`
  width: 200px;
  height: 150px;
  border: 2px solid gray;
  display: flex;
  flex-direction:column;
`
