import { useState, useEffect } from "react";
import Web3 from "web3";

function Collection({ state }) {  
  const [detail, setDetail] = useState("");
  const [blobUrl, setBlobUrl] = useState("");
  useEffect(() => {
    const { contract } = state;
    const getDetail = async () => {
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      const nameText = await contract.methods
        .getCertificatesByOwner(accounts[0])
        .call();
      console.log(nameText);
      setDetail(nameText);

      // 

    };
    contract && getDetail();
  }, [state]);

  const handleDownload = async(name, event, img) => {
    const response = await fetch(`https://ipfs.io/ipfs/${img}`);
    console.log(img);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        setBlobUrl(blobUrl);
      const anchor = document.createElement("a");
      anchor.href = blobUrl;
      anchor.download = `${name}_${event}_Certificate.jpg`;
      anchor.click();
  };
  return (
    <>
      <div
        style={{
          minHeight: "90vh",
          backgroundColor: "#111827",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {detail !== "" &&
          detail.map((detail) => {
            console.log(detail);
            return (
              <div
                class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                style={{ marginTop: "10px", marginBottom: "10px" }}
              >
                <a href="#">
                  <img
                    class="rounded-t-lg"
                    src={`https://ipfs.io/ipfs/${detail[6]}`}
                    alt=""
                  />
                </a>
                <div class="p-5">
                  <a href="#">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      Name : {detail[1]}
                    </h5>
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      Event Name : {detail[3]}
                    </h5>
                    {/* <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      Time : {new Date(detail[2] * 1000).toString()}
                    </h5> */}
                  </a>
                  <button
                    href="#"
                    class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    style={{ marginRight: "20px" }}
                    onClick={() => {handleDownload(detail[0], detail[1], detail[4])}}
                  >
                    Download
                    <svg
                      class="w-3.5 h-3.5 ml-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </button>

                  <a
                    href={`https://certifyblockchain.netlify.app/view/${detail[6]}`}
                    class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    View
                    <svg
                      class="w-3.5 h-3.5 ml-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default Collection;
