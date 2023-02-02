import { useEffect, useState } from "react";
import { paycSubGraphAPI } from "../consts";
import { SubgraphBid, SubgraphItem } from "../types/types";

// wrap fetch with generics support
async function fetchData<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options);
  return response.json() as Promise<T>;
}

export interface SubgraphData {
  data: {
    phunkyApes: SubgraphItem[];
    bids: SubgraphBid[];
  };
}

export const useSubgraphData = () => {
  const [subgraphData, setSubgraphData] = useState<SubgraphData>({} as SubgraphData);

  const fetchSubgraphData = async () => {
    return await fetchData<SubgraphData>(paycSubGraphAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `{
          phunkyApes(where: {isForSale: true}) {
            id
            isForSale
            minValue
            currentOwner
            phunkyApeBids{
              id
              bidAmount
              from
            }
          }
          bids {
            bidAmount
            phunkyApe {
              id
              isForSale
              minValue
              currentOwner
            }
          }
      }`,
      }),
    });
  };

  const fetchSubgraphByHexId = async (hexId: string) => {
    return await fetchData<SubgraphData>(paycSubGraphAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `{
          phunkyApes(first: 1, where: {id: "${hexId}"}) {
            id
            isForSale
            minValue
            currentOwner,
            blockNumberListedForSale,
            phunkyApeTransfers {
              id
              blockNumber
              salePrice
              isSale
              from
              to
            }
            phunkyApeBids(orderBy: bidAmount, orderDirection: desc) {
              id
              bidAmount
              from
            }
          }
        }`,
      }),
    });
  };

  const fetchMyCollection = async (ownerAddress: string) => {
    return await fetchData<SubgraphData>(paycSubGraphAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `{
          phunkyApes(where: {currentOwner: "${ownerAddress}"}) {
            id
            isForSale
            minValue
            currentOwner
            phunkyApeBids {
              id
              bidAmount
              from
            }
          }
        }`,
      }),
    });
  };

  const fetchMyOffers = async (ownerAddress: string) => {
    return await fetchData<SubgraphData>(paycSubGraphAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `{
          bids(where: {from: "${ownerAddress}"}) {
            bidAmount
            from
            phunkyApe {
              id
              isForSale
              minValue
              currentOwner
            }
          }
        }`,
      }),
    });
  };

  useEffect(() => {
    const updateSubgraphData = async () => {
      const data = await fetchSubgraphData();
      setSubgraphData(data);
    };
    updateSubgraphData();
  }, []);

  return {
    subgraphData,
    fetchSubgraphData,
    fetchSubgraphByHexId,
    fetchMyCollection,
    fetchMyOffers,
  };
};
