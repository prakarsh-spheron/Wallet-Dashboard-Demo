import React, { useState } from "react";
import { TokenBalances } from '@covalenthq-tools/web3-components';
import {
  BrowserRouter as Router,
  Link,
  Route,
} from "react-router-dom";
import { Input, Menu } from 'antd';
const { Search } = Input;


const items = [
  {
    label: (
      <Link to="/">Web3 Wallet</Link>
    ),
    key: 'web3',
  },
  {
    label: (
      <Link to="/web2">Web2 Wallet</Link>
    ),
    key: 'web2'
  }
]

export default function App() {
  const [current, setCurrent] = useState("web3")

  const onClick = (e) => {
    setCurrent(e.key)
  }
  
  return (
    <Router>
      <div>
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
        <Route exact path="/web2">
          <Web2 />
        </Route>
        <Route exact path="/">
          <MetaMask />
        </Route>
      </div>
    </Router>
  );
}

function MetaMask() {
  const [address, setAddress] = useState("")
  const [chainId, setChainId] = useState("")
  
  if (window.ethereum) {
    // res[0] for fetching a first wallet
    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((res) => setAddress(res[0]));

    window.ethereum
      .request({ method: "eth_chainId" })
      .then((res) => setChainId(parseInt(res, 16)));
  } else {
    alert("Please install the MetaMask extension!!");
  }

  
  return(
    <div className="App" style={{ width: "100vw", padding: "25px" }}>
      <div>
        <br></br>
        <p><b>Injected Web3 Address:</b> {address}</p>
        <p><b>Injected Web3 Chain Id:</b> {chainId}</p>
        <br></br>
        <TokenBalances apikey="ckey_3bdabb7325ee47cc9bcc1e5f3d7" address={address} chainId={chainId} />
      </div>
      
    </div>
    
  )
}

function Web2() {
  const [address, setAddress] = useState("")
  const [chainId, setChainId] = useState(1)

  const onSearch = (value) => setAddress(value);
  
  return(
    <div className="App" style={{ width: "100vw", padding: "25px" }}>
      <Search
        placeholder="Enter an Ethereum wallet address or ENS"
        onSearch={onSearch}
        style={{
          width: 350,
        }}
      />
      <div>
        <br></br>
        <p><b>Provided Address:</b> {address}</p>
        <p><b>Set Chain Id:</b> {chainId}</p>
        <TokenBalances apikey="ckey_3bdabb7325ee47cc9bcc1e5f3d7" address={address} chainId={chainId} />
      </div>
    </div>
    
  )
}