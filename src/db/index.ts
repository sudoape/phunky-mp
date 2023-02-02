import Fuse from 'fuse.js'

import localData_ from './data.json'
import fuseIndex from './fuse-index.json'
import numIndex_ from './num_index.json'
import { Item, LocalData, NumIndex, SubgraphItemNormalized } from '../types/types'
import { MarketplaceState } from 'pages/Marketplace/MarketplaceReducer'
const myIndex = Fuse.parseIndex(fuseIndex)

const localData = localData_ as LocalData
const numIndex = numIndex_ as NumIndex
const localDataFuse = generateFuseIndex(localData)
const fuse = createFuseDb<Item>(localData.items, myIndex)

function createFuseDb<T>(data: T[], index?: Fuse.FuseIndex<T>) {
  return new Fuse(
    data,
    {
      keys: ['attributes.value', 'attributes.trait_type', 'num', 'sale_status'],
      useExtendedSearch: true,
      // tokenize: true,
    },
    index && index
  )
}

function getQuery(state: MarketplaceState) {
  const { bg, clothes, earring, eyes, fur, hat, mouth } = state
  let query = ''
  if (bg) {
    query += `="${bg}" | `
  }
  if (clothes) {
    query += `="${clothes}" | `
  }
  if (earring) {
    query += `="${earring}" | `
  }
  if (eyes) {
    query += `="${eyes}" | `
  }
  if (fur) {
    query += `="${fur}" | `
  }
  if (hat) {
    query += `="${hat}" | `
  }
  if (mouth) {
    query += `="${mouth}" | `
  }

  // remove pipe
  query = query.slice(0, -3)

  return query
}

function generateFuseIndex(localData: LocalData) {
  let currentIndex = 0;
  return localData.items.map((ape) => {
    return { 
      item: ape,
      refIndex: currentIndex++ 
    }
  })
}

export function getApes(
  state: MarketplaceState,
  currentViewFuse: Fuse<Item> | null = null,
  useNonDefaultFuse = false
) {
  if (useNonDefaultFuse) {
    return currentViewFuse?.search(getQuery(state)) || []
  } else {
    return fuse.search(getQuery(state))
  }
}

export function getAllApes(): Fuse.FuseResult<Item>[] {
  return localDataFuse
}

export function getApeByID(id: string) {
  return localData.items.find((ape) => ape.num === parseInt(id))
}

export function createNewFuseDbFromApeIds(apes: SubgraphItemNormalized[]) {
  const apeDataMergedWithLocal: Item[] = apes.map((ape) => {
    return {
      ...numIndex[ape.phunkyApeId],
      ...ape,
      goat: 'goat', // random string to get all data easier lol. probably a better way to do this.
    }
  })
  return createFuseDb(apeDataMergedWithLocal)
}
