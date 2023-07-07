import { Dispatch } from "react";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import { MarketplaceAction } from "pages/Marketplace/MarketplaceReducer";

interface ConfettiContainerProps {
  dispatch: Dispatch<MarketplaceAction>;
  isLocal?: boolean;
  onComplete?: () => void;
}

const ConfettiContainer = ({
  dispatch,
  isLocal = false,
  onComplete = () => null,
}: ConfettiContainerProps) => {
  const { width, height } = useWindowSize();
  return (
    <Confetti
      width={width}
      height={height}
      numberOfPieces={700}
      gravity={0.3}
      tweenDuration={20000}
      recycle={false}
      onConfettiComplete={(confetti) => {
        if (isLocal) {
          onComplete();
        } else {
          dispatch({ type: "TURN_CONFETTI_OFF" });
        }
        confetti?.reset();
      }}
    />
  );
};

export default ConfettiContainer;
