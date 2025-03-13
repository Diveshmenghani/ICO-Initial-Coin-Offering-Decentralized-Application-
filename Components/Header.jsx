import React,{useState,useEffect} from "react";
//internal
import Button from "./Button";
import { shortenAddress } from "../Context/constants";

const Header = ({
  accountBalance,
  setAddress,
  address,
  connectWallet,
  ICO_MARKETPLACE_ADDRESS,
  setopenallICOs,
  openallICOs,
  setopenTokenCreator,
  openTokenCreator,
  setopenTokenHistory,
  openTokenHistory,
  setopenICOMarketplace,
  openICOMarketplace,
}) => {
  const [ISMetaMaskedInstalled,setISMetaMaskedInstalled]=useState(false);
  useEffect(() =>{
    if(typeof window.ethereum !=="undefined"){
      setISMetaMaskedInstalled(true);
      window.ethereum.on("accountsChanged",handeAccountsChanged);
    }

return()=>{
  if(typeof window.ethereum !== "undefined"){
    window.ethereum.removeListener(
      "accountChanged",
      handeAccountsChanged
    );
  }
  };
},[address]);

const handeAccountsChanged =(accounts) =>{
  setAddress(accounts[0]);
};
  return (
    <header className="header">
      <nav>
        <div className="logo">
          <a href="/">
          ICO.<span>MARKET</span>
          </a>
        </div>

        <input type="checkbox" name="" id="menu-toggle"/>
        <label htmlFor="menu-toggle">
          &#9776;
        </label>
        <ul className="menu">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a onClick={()=>
              openICOMarketplace
              ?setopenICOMarketplace(false)
              :setopenICOMarketplace(true)
            }> ICO Marketplace</a>
          </li>
          <li>
            <a onClick={()=>
              openallICOs
              ?setopenallICOs(false)
              :setopenallICOs(true)
            }> CreatedICO</a>
          </li>
          <li>
            <a onClick={()=>
              openTokenHistory
              ?setopenTokenHistory(false)
              :setopenTokenHistory(true)
            }> History</a>
          </li>
          <li>
            <a onClick={()=>
              openTokenCreator
              ?setopenTokenCreator(false)
              :setopenTokenCreator(true)
            }> Create Token</a>
          </li>
          {
            address ? (
          <li>
                <Button name={`${shortenAddress(address)}:
                ${accountBalance?.slice(0,5)}`}/>
          </li>
            ) : (
          <li>
             <Button name="Connect Wallet" handleClick={connectWallet}/>
          </li>
          )}
        </ul>
      </nav>
    </header>
  )
};

export default Header;
