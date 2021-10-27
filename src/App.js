import logo from './logo.svg';
import axios from "axios";
import './App.css';
import React, {useState, useEffect} from 'react'

function App() {

  const [ethCoinbaseBuy, setEthCoinbaseBuy] = useState(null)
  const [ethCoinbaseSell, setEthCoinbaseSell] = useState(null)

  const [btcCoinbaseBuy, setbtcCoinbaseBuy] = useState(null)
  const [btcCoinbaseSell, setbtcCoinbaseSell] = useState(null)

  const [ethBinanceBuy, setEthBinanceBuy] = useState(null)
  const [ethBinanceSell, setEthBinanceSell] = useState(null)

  const [btcBinanceBuy, setbtcBinanceBuy] = useState(null)
  const [btcBinanceSell, setbtcBinanceSell] = useState(null)

  let buyBitcoin = ""
  let sellBitcoin = ""
  let buyEthereum = ""
  let sellEthereum = ""

  if(btcCoinbaseBuy <= btcBinanceBuy) {
    buyBitcoin = "Coinbase"
    if(btcBinanceSell > btcCoinbaseSell) {
      sellBitcoin = "Binance"
    }
    else {
      sellBitcoin = "Coinbase"
    }
  }
  else {
    buyBitcoin = "Binance"
    if(btcBinanceSell < btcCoinbaseSell) {
      sellBitcoin = "Coinbase"
    }
    else {
      sellBitcoin = "Binance"
    }
  }

  if(ethCoinbaseBuy <= ethBinanceBuy) {
    buyEthereum = "Coinbase"
    if(ethBinanceSell > ethCoinbaseSell) {
      sellEthereum = "Binance"
    }
    else {
      sellEthereum = "Coinbase"
    }
  }
  else {
    buyEthereum = "Binance"
    if(ethBinanceSell < ethCoinbaseSell) {
      sellEthereum = "Coinbase"
    }
    else {
      sellEthereum = "Binance"
    }
  }



  useEffect(() => {
    axios.get("https://api.coinbase.com/v2/prices/ETH-USD/buy")
    .then((response)=>{
      setEthCoinbaseBuy(response.data.data.amount)
    })
  }, [])
  useEffect(() => {
    axios.get("https://api.coinbase.com/v2/prices/ETH-USD/sell")
    .then((response)=>{
      setEthCoinbaseSell(response.data.data.amount)
    })
  }, [])

  useEffect(() => {
    axios.get("https://api.coinbase.com/v2/prices/BTC-USD/buy")
    .then((response)=>{
      setbtcCoinbaseBuy(response.data.data.amount)
    })
  }, [])
  useEffect(() => {
    axios.get("https://api.coinbase.com/v2/prices/BTC-USD/sell")
    .then((response)=>{
      setbtcCoinbaseSell(response.data.data.amount)
    })
  }, [])

  useEffect(() => {
    axios.get("https://api.binance.com/api/v3/ticker/bookTicker?symbol=ETHUSDT")
    .then((response)=>{
      setEthBinanceBuy(response.data.askPrice)
    })
  }, [])
  useEffect(() => {
    axios.get("https://api.binance.com/api/v3/ticker/bookTicker?symbol=ETHUSDT")
    .then((response)=>{
      setEthBinanceSell(response.data.bidPrice)
    })
  }, [])

  useEffect(() => {
    axios.get("https://api.binance.com/api/v3/ticker/bookTicker?symbol=BTCUSDT")
    .then((response)=>{
      setbtcBinanceBuy(response.data.askPrice)
    })
  }, [])
  useEffect(() => {
    axios.get("https://api.binance.com/api/v3/ticker/bookTicker?symbol=BTCUSDT")
    .then((response)=>{
      setbtcBinanceSell(response.data.bidPrice)
    })
  }, [])

  
  return (
    <div className="App">
      <header className="App-header">
        <h2>Binance: </h2>
        <p>Bitcoin (BTC): Buy Price = ${btcBinanceBuy}, Sell Price = ${btcBinanceSell}</p>
        <p>Ethereum (ETH): Buy Price = ${ethBinanceBuy}, Sell Price = ${ethBinanceSell}</p>
        <h2>Coinbase: </h2>
        <p>Bitcoin (BTC): Buy Price = ${btcCoinbaseBuy}, Sell Price = ${btcCoinbaseSell}</p>
        <p>Ethereum (ETH): Buy Price = ${ethCoinbaseBuy}, Sell Price = ${ethCoinbaseSell}</p>
        <h2>Arbitrage: </h2>
        <p>According to current prices, you should buy bitcoin from {buyBitcoin} and sell it on {sellBitcoin}</p>
        <p>According to current prices, you should buy ethereum from {buyEthereum} and sell it on {sellEthereum}</p>
       
      </header>
    </div>
  );
}

export default App;
