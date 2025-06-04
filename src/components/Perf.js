import styled from 'styled-components'
import {
  useCallback, useDeferredValue, useEffect, useState,
} from 'react'

import { mockCrypto } from '../fakeBackend/mocks/crypto'

import { Crypto } from './Perf/Crypto'

const Spy = () => {
  useEffect(() => {
    console.log('Spy up')

    return () => {
      console.log('Spy down')
    }
  }, [])

  return 5
}

export const Perf = () => {
  const [nameFilter, setNameFilter] = useState('')
  const [sort, setSort] = useState(false)

  const handleNameFilter = useCallback((e) => setNameFilter(e.target.value), [])
  const handleNameFilterChange = useCallback((e) => setSort(e.target.checked))

  const filteredCryptos = mockCrypto.filter((c) => c.name.toUpperCase().indexOf(nameFilter.toUpperCase()) > -1)
  const sortedCryptos = sort ? filteredCryptos.sort((a, b) => a.name > b.name) : filteredCryptos
  const sortedCryptosDeferred = useDeferredValue(sortedCryptos)

  return (
    <Wrapper>
      <Spy key={sort} />
      <FiltersWrapper>
        <TextFilter name="Name" value={nameFilter} onChange={handleNameFilter} />
        <label htmlFor="sort">
          Sort by name
          <input type="checkbox" id="sort" name="sort" checked={sort} onChange={handleNameFilterChange} />
        </label>
      </FiltersWrapper>
      <CryptoList>
        {sortedCryptosDeferred.map((crypto) => <Crypto crypto={crypto} key={crypto.id} handleNameFilter={handleNameFilter} />)}
      </CryptoList>
    </Wrapper>
  )
}

const TextFilter = ({
  value, onChange, name,
}) => (
  <FilterLabel htmlFor={name}>
    <div>{name}</div>
    <FilterInput value={value} id={name} name={name} onChange={onChange} />
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
