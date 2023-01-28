export interface Txn {
  id: string;
  nft: unknown; // TODO: find what this shit is
  type: string;
  displayEther: string;
  isPending: boolean;
}
