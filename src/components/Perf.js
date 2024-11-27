import styled from 'styled-components'
import {
  forwardRef, Suspense, useCallback, useEffect, useMemo, useRef, useState,
} from 'react'

import { mockCrypto } from '../fakeBackend/mocks/crypto'
import { useToggle } from '../hooks/toggle'

import { Crypto } from './Perf/Crypto'

const createFilter = (key) => (value) => (obj) => obj[key].indexOf(value) > -1
const nameFiltering = createFilter('name')

const idFiltering = createFilter('id')

const myIdFiltering = idFiltering('45345241412412')

export const Perf = () => {
  const [nameFilter, setNameFilter] = useState('')
  const [sort, setSort] = useState(false)
  const uppercaseToggle = useToggle(false)
  const handleNameFilter = useCallback((e) => setNameFilter(uppercaseToggle.state
    ? e.target.value.toUpperCase() : e.target.value), [uppercaseToggle.state])
  const nameFilterWithValue = nameFiltering(nameFilter)
  const handleNameFilterChange = useCallback((e) => setSort(e.target.checked))

  const filteredCryptos = mockCrypto.filter(nameFilterWithValue)
  const sortedCryptos = sort ? filteredCryptos.sort((a, b) => a.name > b.name) : filteredCryptos

  return (
    <Wrapper>
      <FiltersWrapper>
        <TextFilter name="Name" value={nameFilter} onChange={handleNameFilter} />
        <label htmlFor="sort">
          Sort by name
          <input type="checkbox" id="sort" name="sort" checked={sort} onChange={handleNameFilterChange} />
        </label>
        <label htmlFor="uppercase">
          uppercase ?
          <input
            type="checkbox"
            id="uppercase"
            name="uppercase"
            checked={uppercaseToggle.state}
            onChange={uppercaseToggle.toggle}
          />
        </label>
      </FiltersWrapper>
      <Suspense fallback="Mouic mouic">
        <CryptoList>
          {sortedCryptos.map((crypto) => <Crypto crypto={crypto} key={crypto.id} />)}
        </CryptoList>
      </Suspense>
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
