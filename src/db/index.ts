import Fuse from 'fuse.js'

import localData_ from './data.json'
import fuseIndex from './fuse-index.json'
import numIndex_ from './num_index.json'
import { Item, LocalData, NumIndex, SubgraphItemNormalized } from '../types/types'
import { MarketplaceState } from 'pages/Marketplace/MarketplaceReducer'
const myIndex = Fuse.parseIndex(fuseIndex)

const localData = localData_ as LocalData
const numIndex = numIndex_ as unknown as NumIndex
const localDataFuse = generateFuseIndex(localData)
const fuse = createFuseDb(localData.items, myIndex)

function getItemTraitWithName(item: Item) {
  // to handle cases where a value may exist in multiple traits
  // (e.g. Blue bg, Blue Fur) we use as value for search 'traitName:traitValue'
  const traitsWithValues: string[] = []
  item.attributes.forEach(attribute => {
    traitsWithValues.push(`${attribute.trait_type}:${attribute.value}`);
  });
  return traitsWithValues
}

// TODO: recreate index
function createFuseDb(data: Item[], index?: Fuse.FuseIndex<Item>) {
  return new Fuse(
    data,
    {
      keys: [
        { name: 'num', getFn: (item) => item.num.toString() },
        { name: 'trait', getFn: (item) => getItemTraitWithName(item)},
      ],
      useExtendedSearch: true,

      sortFn: (a, b) => {
        // Return results with NFTs sorted by their id (num)
        const numA = a.item.num;
        const numB = b.item.num;
        
        // Compare the 'num' values for sorting
        if (numA < numB) return -1;
        if (numA > numB) return 1;
        return 0;
      }
      // tokenize: true,
    },
    index && index
  )
}

function getQuery(state: MarketplaceState) {
  const { bg, clothes, earring, eyes, fur, hat, mouth } = state;
  const properties:  { [key: string]: string[] } = {
    "Background": bg,
    "Clothes": clothes,
    "Earring": earring,
    "Eyes": eyes,
    "Fur": fur,
    "Hat": hat,
    "Mouth": mouth
  };

  const query = {
    $and: Object.keys(properties)
      .filter((traitType) => properties[traitType].length > 0)
      .map((traitType) => {
        return {
          $or: properties[traitType].map((value) => ({trait: `="${traitType}:${value}"`})),
        };
      }),
  };

  console.log(`Query is: ${query}`)
  return query.$and.length > 0 ? query : 'goat';
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
