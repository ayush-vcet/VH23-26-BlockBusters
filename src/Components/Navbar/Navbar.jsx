import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import ABI from "./ABI.json";
import Web3 from "web3";

function Navbar({ saveState }) {
  const [connected, setConnected] = useState(true);
  const [owner, setOwner] = useState("");
  const [account, setAccount] = useState("");
  const init = async () => {
    try {
      const web3 = new Web3(window.ethereum);
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      const contract = new web3.eth.Contract(
        ABI,
        "0x9fD478BfCFA07A41909e836Dc31a91865ACEEdd4"
      );
      saveState({ web3: web3, contract: contract });
      setConnected(false);
      console.log(contract);

      const nameText = await contract.methods.owner_address().call();
      setOwner(nameText);
      console.log(nameText);
      console.log(accounts[0]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav
      class="nav flex flex-wrap items-center justify-between px-4"
      style={{
        minHeight: "10vh",
        backgroundColor: "rgb(17, 24, 39)",
        color: "white",
      }}
    >
      <div class="flex flex-no-shrink items-center mr-6 py-3 text-grey-darkest">
        <span class="font-semibold text-xl tracking-tight">CertifiedTrustNet</span>
      </div>

      <input class="menu-btn hidden" type="checkbox" id="menu-btn" />
      <label
        class="menu-icon block cursor-pointer md:hidden px-2 py-4 relative select-none"
        for="menu-btn"
      >
        <span class="navicon bg-grey-darkest flex items-center relative"></span>
      </label>

      <ul class="menu border-b md:border-none flex justify-end list-reset m-0 w-full md:w-auto">
        {owner.toLowerCase() === account.toLowerCase() ? (
          <>
            <li className="border-t md:border-none">
              <Link
                to="/"
                className="block md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker font-bold"
                style={{ color: "white", textDecoration: "none" }}
              >
                Home
              </Link>
            </li>

            <li className="border-t md:border-none">
              <Link
                to="/admin"
                className="block md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker font-bold"
                style={{ color: "white", textDecoration: "none" }}
              >
                Admin Panel
              </Link>
            </li>

            <li className="border-t md:border-none">
              <Link
                to="/home"
                className="block md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker font-bold"
                style={{ color: "white", textDecoration: "none" }}
              >
                Generate
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="border-t md:border-none">
              <Link
                to="/"
                className="block md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker font-bold"
                style={{ color: "white", textDecoration: "none" }}
              >
                Home
              </Link>
            </li>
            <li className="border-t md:border-none">
              <Link
                to="/collection"
                className="block md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker"
                style={{ color: "white", textDecoration: "none" }}
              >
                My Certificates
              </Link>
            </li>
          </>
        )}
        <li
          class="border-t md:border-none"
          style={{ display: "flex", alignItems: "center" }}
        >
          <button
            class="inline-flex items-center bg-indigo-500 text-white border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0"
            onClick={init}
            disabled={!connected}
          >
            {" "}
            {connected ? "Connect Metamask" : "Connected"}
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
