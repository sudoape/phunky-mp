import NFTCard from "../NFTCard/NFTCard";
const NFTLoadingCards = () => {
  const cards = [];
  for (let i = 0; i < 20; i++) {
    cards.push(
      <NFTCard
        nft={{}}
        onClick={() => {
          undefined;
        }}
        isLoading={true}
        dispatch={() => {
          undefined;
        }}
      />,
    );
  }

  return <>{cards.map((nft) => nft)}</>;
};

export default NFTLoadingCards;
