let ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade');
let priceElement = document.getElementById("stockId");
let balanceElement = document.getElementById("balanceId");
let highestBalElement = document.getElementById("highestBalId");
let statusElement = document.getElementById("statusId");

let balance = 1000;
let is_trade = false;
let price = 0;
let min_price = 100000000;
let max_price = 0;
let btc_bal = 0;
let max_bal = 0;
let statusVar = "";

ws.onmessage = (event) => {
    let priceObject = JSON.parse(event.data);
    price = parseFloat(priceObject.p).toFixed(2);
    priceElement.innerText = "BTC-USDT: " + price;
    balanceElement.innerText = "Current Balance: " + balance;
    highestBalElement.innerText = "Highest Balance Reached: " + max_bal;
    statusElement.innerText = "Status: " + statusVar;

    if(!is_trade){
        min_price = Math.min(min_price, price);
        if(min_price*1.0004 <= price){
            btc_bal = balance / price;
            statusVar = "Buying..."
            console.log("Buying...");
            max_price = price;
            is_trade = true;
        }
    }else{
        max_price = Math.max(max_price, price);
        if(max_price*0.99993 >= price){
            balance = btc_bal * price;
            statusVar = "Selling..."
            console.log("Selling...");
            max_bal = Math.max(max_bal, balance);
            min_price = price;
            is_trade = false;
        }
    }

}