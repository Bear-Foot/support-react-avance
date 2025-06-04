import styled from 'styled-components'
import {
  Suspense, useCallback, useState,
} from 'react'
import { shallowEqual } from 'react-intl/src/utils'

import { mockCrypto } from '../fakeBackend/mocks/crypto'

import { Crypto } from './Perf/Crypto'

const customMemo = (evaluator, deps) => {
  if (shallowEqual(customMemo.deps, deps)) {
    return customMemo.previousResult
  }
  const result = evaluator()
  customMemo.previousResult = result
  customMemo.deps = deps

  return result
}

const customCallback = (callback, deps) => {
  if (shallowEqual(customCallback.deps, deps)) {
    return customCallback.storedCallback
  }

  customCallback.storedCallback = callback
  customCallback.deps = deps

  return callback
}

export const Perf = () => {
  const [nameFilter, setNameFilter] = useState('')
  const [sort, setSort] = useState(false)
  const handleNameFilter = (e) => setNameFilter(e.target.value)
  const handleNameFilterChange = useCallback((e) => setSort(e.target.checked))

  const filteredCryptos = mockCrypto.filter((c) => c.name.indexOf(nameFilter) > -1)
  const sortedCryptos = sort ? filteredCryptos.sort((a, b) => a.name > b.name) : filteredCryptos

  return (
    <Wrapper>
      <FiltersWrapper>
        <TextFilter name="Name" value={nameFilter} onChange={handleNameFilter} />
        <label htmlFor="sort">
          Sort by name
          <input type="checkbox" id="sort" name="sort" checked={sort} onChange={handleNameFilterChange} />
        </label>
      </FiltersWrapper>
      <Suspense fallback="Mouic mouic">
        <CryptoList>
          {sortedCryptos.map((crypto) => <Crypto crypto={crypto} />)}
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
