export interface Txn {
  id: string;
  nft: unknown; // TODO: find what this shit is
  type: string;
  displayEther: string;
  isPending: boolean;
}

export enum TraitEnum {
  Bg = "bg",
  Clothes = "clothes",
  Earring = "earring",
  Eyes = "eyes",
  Fur = "fur",
  Hat = "hat",
  Mouth = "mouth",
  // None = "none",
}

export enum ViewEnum {
  ViewAll,
  ForSale,
  HasBids,
}

export interface Attribute {
  trait_type: TraitEnum;
  value: string;
}

// TODO: Split/ improve this type?
// This is different to subgraphItem.
// Firstly, it contains a normalized phunkyApeId
// instead of the hex id. Also the subgraph contains
// only apes that have been minted. Also, information like
// isForSale, etc will not always be present
export interface Item extends SubgraphItemNormalized {
  attributes: Attribute[];
  image: string;
  num: number;
  goat: string;
}

export interface LocalData {
  items: Item[];
}

export type NumIndex = { [code: number]: Item };

export interface SubgraphItem {
  id: string; // this is in the form of hex (0x)
  isForSale: boolean;
  minValue: string | null;
  currentOwner: string; // the address
  blockNumberListedForSale: string | null;
  phunkyApeTransfers: SubgraphItemTransfer[];
  phunkyApeBids: SubgraphBid[];
}

export interface SubgraphItemNormalized extends SubgraphItem {
  phunkyApeId: number;
}

export interface SubgraphItemTransfer {
  id: string;
  blockNumber?: string;
  isSale: boolean;
  salePrice?: string;
  from: string; // address
  to: string; // address
  phunkyApe: SubgraphItem;
}

export interface SubgraphBid {
  id: string;
  bidAmount: string;
  blockNumber?: string;
  phunkyApe: SubgraphItem;
  from: string; // address of bidder
}
