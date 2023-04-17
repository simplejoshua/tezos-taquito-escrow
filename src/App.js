import { useState, useEffect } from "react";
import React from "react";

// Stylesheet
import './App.css';

// Components
import { connectWallet, getAccount } from "./utils/wallet";
import AddressCard from "./components/address-card";
import ExchangeCost from "./components/exchange-cost";
import Confirm from "./components/confirm";

// Operation
// import { buyTicketOperation, endGameOperation } from "./utils/operation";
import { fetchStorage } from "./utils/tzkt";
import { claimOwnerFundsOperation, claimCounterpartyFundsOperation, addBalanceOwnerOperation, addBalanceCounterpartyOperation, revertFundsOperation } from "./utils/operation";

import Deadline from "./components/deadline";


const App = () => {

  // Players holding lottery tickets
  const [ownerHash, setOwnerHash] = useState("");
  const [counterpartyHash, setCounterpartyHash] = useState("");
  const [adminHash, setAdminHash] = useState("");
  const [ownerBalance, setOwnerBalance] = useState(0);
  const [counterpartyBalance, setCounterpartyBalance] = useState(0);
  const [fromOwner, setFromOwner] = useState(0);
  const [fromCounterparty, setFromCounterparty] = useState(0);
  
  const [deadline, setDeadline] = useState(Date.now());

  const [claimLoading, setClaimLoading] = useState(false);
  const [depositLoading, setDepositLoading] = useState(false);
  const [revertLoading, setRevertLoading] = useState(false);

  const [secretKey, setSecretKey] = useState("");
  const [inputSecretKey, setInputSecretKey] = useState("");

  const [inputFunds, setInputFunds] = useState(1);


  // Set players and tickets remaining
  useEffect(() => {
    // TODO 9 - Fetch parties' hashes and their balances from storage
    (async () => {
      const storage = await fetchStorage();
      setOwnerHash(storage.owner);
      setCounterpartyHash(storage.counterparty);
      setAdminHash(storage.admin);
      setOwnerBalance(storage.ownerBalance);
      setCounterpartyBalance(storage.counterpartyBalance);
      setFromOwner(storage.fromOwner);
      setFromCounterparty(storage.fromCounterparty);
      
      setDeadline(Date.parse(storage.epoch));

      setSecretKey(storage.hashedSecret.toString());
      console.log("secret key " + secretKey);
    })();
  }, []);

  // Get the active account
  useEffect(() => {
    (async () => {
      // TODO 5.b - Get the active account
      const account = await getAccount();
      setAccount(account);
    })();
  }, []);

  const [account, setAccount] = useState("");

  useEffect(() => {
    (async () => {
      // TODO 5.b - Get the active account
      const account = await getAccount();
      setAccount(account);
    })();
  }, []);

  // TODO 4.a - Complete onConnectWallet function
  const onConnectWallet = async () => {
    await connectWallet();
    const account = await getAccount();
    setAccount(account);
  };

  const onClaimFunds = async () => {
    try {
      setClaimLoading(true);
      console.log(account === ownerHash);
      if (account) {
        if (account === ownerHash){
            await claimOwnerFundsOperation();
            alert("Owner claimed!")
        }
        else if (account === counterpartyHash) {
            await claimCounterpartyFundsOperation(inputSecretKey);
            alert("Counterparty claimed!");
        }    
        else {
            console.log(ownerHash);
            console.log(account);
            alert("Warning: Your account is not authorised to claim funds.");
        }
      }
    } catch(err) {
      alert("Error: ", err.message);
    }
    setClaimLoading(false);
  };


  const onDepositFunds = async () => {
    try {
      setDepositLoading(true);
      console.log(account === ownerHash);
      if (account) {
        if (account === ownerHash){
          console.log("Owner trying to deposit.");
            await addBalanceOwnerOperation(inputFunds);
            alert("Success: You have successfully deposited funds!")
        }
        else if (account === counterpartyHash) {
          console.log("Counterparty trying to deposit.");
            await addBalanceCounterpartyOperation(inputFunds);
            alert("Success: You have successfully deposited funds!");
        }    
        else {
            console.log(ownerHash);
            console.log(account);
            alert("Warning: Your account is not authorised to deposit funds.");
        }
      }
    } catch(err) {
      alert("Transaction Failed: ", err.message);
    }
    setDepositLoading(false);
  };

  const onRevertFunds = async() => {
      try {
      setRevertLoading(true);
      await revertFundsOperation();
      setRevertLoading(false);
      } catch(err) {
        alert("Revert funds failed: ", err.message);
      }
  }

  return (
    <>
      
      <div className="navbar navbar-dark bg-dark fixed-top">
        <div className="container py-2">
          <a href="/" className="navbar-brand">
            Tezos Escrow Contract
          </a>
          <div className="d-flex">
            {/* TODO 4.b - Call connectWallet function onClick  */}
            <button onClick={onConnectWallet} className="btn btn-outline-info">
            {/* TODO 5.a - Show account address if wallet is connected */}
            { account ? account : "Connect Wallet"}
            </button>
          </div>
        </div>
      </div>

      

      <div className="vertical-space">  </div>
      <div className="vertical-space">  </div>
      
      <div className="main">
        <AddressCard 
          account={account}
          ownerHash={ownerHash}
          counterpartyHash={counterpartyHash}
          adminHash={adminHash}
        />
        <div className="exchange"> <ExchangeCost fromOwner={fromOwner} fromCounterparty={fromCounterparty} /> </div>

        <div className="exchange"> <Deadline dl={deadline}/> </div>

        <br/><br/>

        <div class="deposit controls">
          <label>
            Amount (in ꜩ):
            <input type="number" min="1" value={inputFunds} prefix="ꜩ" onChange={(e) => setInputFunds(e.target.value)} className="form-control"/>
          </label>
          &nbsp;&nbsp;
          <Confirm action={"Deposit"} func={onDepositFunds} />
        </div>
        <div class="claim controls">
          <label>
            Secret Key:
            <input type="text" value={inputSecretKey} onChange={(e) => setInputSecretKey(e.target.value)} className="form-control"/>
          </label>
          &nbsp;&nbsp;
          <Confirm action={"Claim"} func={onClaimFunds} />
        </div>
        <div class="revert controls">
          <Confirm action={"Revert"} func={onRevertFunds} />
        </div>
      </div>
      
    </>
  );
};

export default App;
