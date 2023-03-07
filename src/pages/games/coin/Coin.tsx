import React, { useEffect } from "react";
import CoinGame from "../../../components/games/coin/coinGame/CoinGame"
import CoinPanel from "../../../components/games/coin/coinPanel/CoinPanel";
import {
  changeIsLoading,
  checkCoinGameStatus,
} from "../../../effector/coin/coin";
import "./Coin.scss";

const Coin = () => {
  useEffect(() => {
    changeIsLoading(true);
    const coinGameId = window.localStorage.getItem("coinGameId");
    const data = {
      gameID: coinGameId,
    };
    if (coinGameId && coinGameId !== "undefined") {
      checkCoinGameStatus(data);
    }
    changeIsLoading(false);
  }, []);

  return (
    <main className="coin">
      <div className="coin__container">
        <CoinGame />
        <CoinPanel />
      </div>
    </main>
  );
};

export default Coin;
