import styled from 'styled-components'
import { useState } from 'react'

import { mockCrypto } from '../fakeBackend/mocks/crypto'

import { Crypto } from './Perf/Crypto'

export const Perf = () => {
  const [nameFilter, setNameFilter] = useState('')
  const [sort, setSort] = useState(false)

  const filteredCryptos = mockCrypto.filter((crypto) => crypto.name.indexOf(nameFilter) > -1)
  const sortedCryptos = sort ? filteredCryptos.sort((a, b) => a.name > b.name) : filteredCryptos

  return (
    <Wrapper>
      <FiltersWrapper>
        <TextFilter name="Name" value={nameFilter} onChange={setNameFilter} />
        <label htmlFor="sort">
          Sort by name
          <input type="checkbox" id="sort" name="sort" checked={sort} onChange={(e) => setSort(e.target.checked)} />
        </label>
      </FiltersWrapper>
      <CryptoList>
        {sortedCryptos.map((crypto) => <Crypto crypto={crypto} key={crypto.id} />)}
      </CryptoList>
    </Wrapper>
  )
}

const TextFilter = ({ value, onChange, name }) => (
  <FilterLabel htmlFor={name}>
    <div>{name}</div>
    <FilterInput value={value} id={name} name={name} onChange={(e) => onChange(e.target.value)} />
  </FilterLabel>
)

const Wrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  padding: 20px;
`

const FiltersWrapper = styled.div`
  display: flex;
  gap: 20px;
`
const FilterInput = styled.input`
  width: 100%;
`
const FilterLabel = styled.label`
  width: 150px;
`

const CryptoList = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`

export default Perf
