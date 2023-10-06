// Home.js
import React from "react";
import { useState, useEffect } from "react";
import moment from "moment";
import Web3 from "web3";
import { v4 } from "uuid";
import domtoimage from "dom-to-image";
import axios from "axios";
import "./Home.css";

function Home2({ state }) {
  const inputStyle = {
    "::placeholder": {
      color: "red",
      opacity: 1, // Firefox
    },
  };

  const divStyle = {
    fontSize: "30pt",
    fontWeight: "bold",
    fontFamily:
      '"Abril Fatface", "Noto Serif SC", Katibeh, "ZCOOL QingKe HuangYou", Gugi',
    textAlign: "center",
    fontStyle: "normal",
    textDecoration: "none",
    color: "rgb(6, 11, 51)",
    marginBottom: "5px",
  };

  const divStyle1 = {
    fontSize: "11pt",
    fontWeight: "normal",
    // fontFamily:
    //   'Roboto, "Noto Sans JP", Harmattan, "Noto Sans SC", "Noto Sans KR"',
    textAlign: "center",
    fontStyle: "normal",
    textDecoration: "none",
    color: "rgb(76, 81, 99)",
    marginTop: "0px",
  };

  const spanStyle = {
    fontSize: "14pt",
    fontFamily: "georgia, palatino, serif",
  };

  const divStyle3 = {
    fontSize: "11pt",
    fontWeight: "normal",
    fontFamily:
      'Roboto, "Noto Sans JP", Harmattan, "Noto Sans SC", "Noto Sans KR"',
    textAlign: "left",
    fontStyle: "normal",
    textDecoration: "none",
    color: "rgb(76, 81, 99)",
  };

  const tableStyle = {
    height: "88px",
    width: "100%",
  };

  const imgStyle = {
    height: "90px",
    width: "180px",
  };

  const signatureStyle = {
    borderTop: "1px solid #000000",
    width: "80%",
    textAlign: "center",
    fontFamily: "georgia, palatino, serif",
    fontSize: "12pt",
  };

  const [name, setName] = useState("");
  const [participate, setParticipate] = useState("");
  const [address, setAddress] = useState("");
  const [img, setImg] = useState("");

  const [ContractAddress, setContractAddress] = useState("");

  const [Details, setDetails] = useState();

  // const [url, setUrl] = useState();
  const handleDownload = () => {
    const element = document.getElementById("content2");
    let img1 = "";
    domtoimage
      .toJpeg(element)
      .then(async function (dataUrl) {
        console.log(dataUrl);
        // setUrl(dataUrl);
        // url to file && file upload to pinata
        if (dataURLtoFile(dataUrl)) {
          try {
            const formData = new FormData();
            formData.append("file", dataURLtoFile(dataUrl));

            const resFile = await axios({
              method: "post",
              url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
              data: formData,
              headers: {
                pinata_api_key: `34aa1017c28fbfe90870`,
                pinata_secret_api_key: `6cd99831cc77f59e5d880987114052367433472ca31e4736424114f3661890b4`,
                "Content-Type": "multipart/form-data",
              },
            });
            alert("Successfully Image Uploaded : ");
            setImg(resFile.data.IpfsHash);
            img1 = resFile.data.IpfsHash;
            console.log(resFile.data.IpfsHash);

            // Upload to Blockchain
            // console.log("Hiii");
            // const { contract } = state;
            // const web3 = new Web3(window.ethereum);
            // const accounts = await web3.eth.getAccounts();
            // console.log(accounts[0]);
            // console.log(img1);
            // await contract.methods
            //   .add(code, name, participate, img1, address)
            //   .send({ from: accounts[0] });
            // console.log("Hiii1");
          } catch (e) {
            alert("Unable to upload image to Pinata");
          }
        }
      })
      .catch(function (error) {
        console.error("Error converting HTML to image:", error);
      });
  };

  // url to file
  // const dataURLtoFile = (dataURL) => {
  //   const arr = dataURL.split(",");
  //   const mime = arr[0].match(/:(.*?);/)[1];
  //   const data = atob(arr[1]);
  //   const n = data.length;
  //   const dataArr = new Uint8Array(n);
  //   for (let i = 0; i < n; i++) {
  //     dataArr[i] = data.charCodeAt(i);
  //   }
  //   console.log(dataArr);
  //   let file = new File([dataArr], `${name}.jpg`, { type: mime });
  //   console.log(file);
  //   return file;
  // };

  const [data, setData] = useState();
  const [code, setCode] = useState("");

  const show = async () => {
    let id = v4().substring(0, 18);
    setCode(id);
    console.log(id);
    setData("https://certifyblockchain.netlify.app/verify/" + id);
    handleDownload();
    // upload_to_blockchain();
  };

  const upload_to_blockchain = async () => {
    // if(img !== "") {
    console.log("Hiii");
    const { contract } = state;
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    console.log(accounts[0]);
    console.log(img);
    await contract.methods
      .add(code, name, participate, img, address)
      .send({ from: accounts[0] });
    console.log("Hiii1");
    // }
    // else {
    //   console.log("Byee");
    // }
  };

  // Data Collection
  const [idArray, setIdArray] = useState([]);
  const [indexArray, setIndexArray] = useState([]);
  const [imgArray, setImgArray] = useState([]);
  const [ownerArray, setOwnerArray] = useState([]);
  const [eventArray, setEventArray] = useState([]);
  const [nameArray, setNameArray] = useState([]);

  // Connect to Blockchain
  // const connect_to_blockchain = async () => {
  //   try {
  //     const { contract, web3 } = state;
  //     const accounts = await web3.eth.getAccounts();
  //     await contract.methods
  //       .contractAddress(ContractAddress)
  //       .send({ from: accounts[0] });
  //     console.log("Hiii1");

  //     const nameText = await contract.methods.GetStudentTrueData().call();
  //     console.log(nameText);
  //     setDetails(nameText);

  //     for (let index = 0; index < Details.length; index++) {
  //       setIndexArray([...indexArray, parseInt(Details[0], 10)]);
  //       setOwnerArray([...ownerArray, Details[4]]);
  //       setEventArray([...eventArray, Details[3]]);
  //       setNameArray([...nameArray, Details[1]]);
  //     }

  //     console.log("indexArray:", indexArray);
  //     console.log("ownerArray:", ownerArray);
  //     console.log("eventArray:", eventArray);
  //     console.log("nameArray:", nameArray);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const connect_to_blockchain = async () => {
    try {
      const { contract, web3 } = state;
      const accounts = await web3.eth.getAccounts();
      await contract.methods
        .contractAddress(ContractAddress)
        .send({ from: accounts[0] });
      console.log("Hiii1");

      const nameText = await contract.methods.GetStudentTrueData().call();
      console.log(nameText);
      setDetails(nameText);

      // Temporary arrays to store values
      let tempIndexArray = [];
      let tempOwnerArray = [];
      let tempEventArray = [];
      let tempNameArray = [];

      for (let index = 0; index < nameText.length; index++) {
        tempIndexArray.push(parseInt(nameText[index][0], 10));
        tempOwnerArray.push(nameText[index][4]);
        tempEventArray.push(nameText[index][3]);
        tempNameArray.push(nameText[index][1]);
      }

      // Update state after the loop
      setIndexArray(tempIndexArray);
      setOwnerArray(tempOwnerArray);
      setEventArray(tempEventArray);
      setNameArray(tempNameArray);

      console.log("indexArray:", tempIndexArray);
      console.log("ownerArray:", tempOwnerArray);
      console.log("eventArray:", tempEventArray);
      console.log("nameArray:", tempNameArray);
    } catch (error) {
      console.log(error);
    }
  };

  // Upload to Pinata
  // const upload_to_pinata = (name, event, address, code, data) => {
  //   setName(name);
  //   setParticipate(event);
  //   setAddress(address);
  //   setCode(code);
  //   setData(data);
  //   const element = document.getElementById("content2");
  //   let img1 = "";
  //   domtoimage
  //     .toJpeg(element)
  //     .then(async function (dataUrl) {
  //       console.log(dataUrl);
  //       if (dataURLtoFile1(dataUrl)) {
  //         try {
  //           const formData = new FormData();
  //           formData.append("file", dataURLtoFile(dataUrl));

  //           const resFile = await axios({
  //             method: "post",
  //             url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
  //             data: formData,
  //             headers: {
  //               pinata_api_key: `34aa1017c28fbfe90870`,
  //               pinata_secret_api_key: `6cd99831cc77f59e5d880987114052367433472ca31e4736424114f3661890b4`,
  //               "Content-Type": "multipart/form-data",
  //             },
  //           });
  //           alert("Successfully Image Uploaded : ");
  //           setImg(resFile.data.IpfsHash);
  //           img1 = resFile.data.IpfsHash;
  //           console.log(resFile.data.IpfsHash);

  //           setName("");
  //           setParticipate("");
  //           setAddress("");
  //           setCode("");
  //           setData("");

  //           return(resFile.data.IpfsHash);
  //         } catch (e) {
  //           alert("Unable to upload image to Pinata");
  //         }
  //       }
  //     })
  //     .catch(function (error) {
  //       console.error("Error converting HTML to image:", error);
  //     });
  // };

  // url to file

  const upload_to_pinata = async (name, event, address) => {
    try {
      setName(name);
      setParticipate(event);
      setAddress(address);
      let id = v4().substring(0, 18);
      setCode(id);
      setData("https://certifyblockchain.netlify.app/verify/" + id);

      setCodeArray((prevCodes) => [...prevCodes, id]);
      setDataArray((prevData) => [...prevData, "https://certifyblockchain.netlify.app/verify/" + id,]);
      
      const element = document.getElementById("content2");
      const dataUrl = await domtoimage.toJpeg(element);
      console.log(dataUrl);

      if (dataURLtoFile1(dataUrl, name)) {
        // Pass the unique identifier (code) here
        const formData = new FormData();
        formData.append("file", dataURLtoFile1(dataUrl, code)); // Pass the unique identifier (code) here

        const resFile = await axios.post(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          formData,
          {
            headers: {
              pinata_api_key: `34aa1017c28fbfe90870`,
              pinata_secret_api_key: `6cd99831cc77f59e5d880987114052367433472ca31e4736424114f3661890b4`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // alert("Successfully Image Uploaded: ");
        setImg(resFile.data.IpfsHash);
        console.log(resFile.data.IpfsHash);

        setName("");
        setParticipate("");
        setAddress("");
        setCode("");
        setData("");
      }
    } catch (error) {
      alert("Unable to upload image to Pinata");
      console.error("Error uploading image:", error);
    }
  };

  const dataURLtoFile1 = (dataURL, name) => {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const data = atob(arr[1]);
    const n = data.length;
    const dataArr = new Uint8Array(n);
    for (let i = 0; i < n; i++) {
      dataArr[i] = data.charCodeAt(i);
    }
    console.log(dataArr);
    let file = new File([dataArr], `${name}.jpg`, { type: mime }); // Use the unique identifier (code) for the file name
    console.log(file);
    return file;
  };

  // const show1 = async () => {
  //   let id = v4().substring(0, 18);
  //   setCode1(id);
  //   console.log(id);
  //   setData1("https://certifyblockchain.netlify.app/verify/" + id);
  // };

  // // For Loop
  // const For_Loop = async () => {
  //   console.log(indexArray.length);
  //   for (let index = 0; index < indexArray.length; index++) {
  //     show1();
  //   }
  // };

  const [data1, setData1] = useState();
  const [code1, setCode1] = useState("");
  const [codeArray, setCodeArray] = useState([]);
  const [dataArray, setDataArray] = useState([]);

  // const show1 = async () => {
  //   let id = v4().substring(0, 18);
  //   setCode1(id);
  //   setData1("https://certifyblockchain.netlify.app/verify/" + id);
  //   setCodeArray((prevCodes) => [...prevCodes, id]);
  //   setDataArray((prevData) => [
  //     ...prevData,
  //     "https://certifyblockchain.netlify.app/verify/" + id,
  //   ]);

  //   console.log(id);
  // };

  // For Loop
  const For_Loop = async () => {
    console.log("Hiii");

    for (let index = 0; index < codeArray.length; index++) {
      console.log(codeArray[index]);
      console.log(dataArray[index]);
    }
  };

  // const For_Loop1 = async () => {
  //   console.log(nameArray.length);
  //   for (let index = 0; index < nameArray.length; index++) {
  //     const app = await upload_to_pinata(
  //       nameArray[index],
  //       eventArray[index],
  //       ownerArray[index],
  //       codeArray[index],
  //       dataArray[index]
  //     );
  //   }
  // };

  const For_Loop1 = async () => {
    console.log(nameArray.length);
    for (let index = 0; index < nameArray.length; index++) {
      await upload_to_pinata(
        nameArray[index],
        eventArray[index],
        ownerArray[index],
      );
    }
  };
  
  return (
    <>
      <>
        <div
          class="flex justify-center"
          style={{ backgroundColor: "rgb(17, 24, 39)" }}
        >
          <div class="h-[90%] w-full md:w-3/4 m-4">
            <div class="text-xl cursor-pointer flex flex-col justify-center items-center mt-5 md:mt-0">
              <h1
                class="font-semibold text-3xl text-gray-700 m-2"
                style={{ color: "white" }}
              >
                Log In
              </h1>
            </div>
            <div class="flex flex-col justify-center items-center mt-10 md:mt-4 space-y-6 md:space-y-8">
              <div class="">
                <input
                  type="text"
                  placeholder="Name"
                  required
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  style={{
                    // boxShadow: "7px 10px 5px #bdbdbd",
                    height: "50px",
                    backgroundColor: "white",
                  }}
                  class=" bg-gray-100 rounded-lg px-5 py-2 focus:border border-violet-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"
                />
              </div>
              <div class="">
                <input
                  type="text"
                  placeholder="Participate"
                  required
                  onChange={(e) => {
                    setParticipate(e.target.value);
                  }}
                  style={{
                    // boxShadow: "7px 10px 5px #bdbdbd",
                    height: "50px",
                    backgroundColor: "white",
                  }}
                  class=" bg-gray-100 rounded-lg px-5 py-2 focus:border border-violet-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"
                />
              </div>
              <div class="">
                <input
                  type="text"
                  placeholder="User Wallet Address"
                  required
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                  style={{
                    // boxShadow: "7px 10px 5px #bdbdbd",
                    height: "50px",
                    backgroundColor: "white",
                  }}
                  class=" bg-gray-100 rounded-lg px-5 py-2 focus:border border-violet-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"
                />
              </div>
            </div>
            <div class="text-center mt-7">
              <button
                class="uppercase px-24 md:px-[118px] lg:px-[140px] py-2 rounded-md text-white bg-violet-500 hover:bg-violet-600  font-medium "
                style={{
                  // boxShadow: "7px 10px 5px #bdbdbd",
                  height: "50px",
                  backgroundColor: "#8b5cf6",
                }}
                onClick={show}
              >
                Upload to IPFS
              </button>
            </div>

            <div class="text-center mt-7">
              <button
                class="uppercase px-24 md:px-[118px] lg:px-[140px] py-2 rounded-md text-white bg-violet-500 hover:bg-violet-600  font-medium "
                style={{
                  // boxShadow: "7px 10px 5px #bdbdbd",
                  height: "50px",
                  backgroundColor: "#8b5cf6",
                }}
                onClick={upload_to_blockchain}
              >
                Upload to Blockchain
              </button>
            </div>

            <div class="">
              <input
                type="text"
                placeholder="Contract Address"
                required
                onChange={(e) => {
                  setContractAddress(e.target.value);
                }}
                style={{
                  // boxShadow: "7px 10px 5px #bdbdbd",
                  height: "50px",
                  backgroundColor: "white",
                }}
                class=" bg-gray-100 rounded-lg px-5 py-2 focus:border border-violet-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"
              />
            </div>

            <div class="text-center mt-7">
              <button
                class="uppercase px-24 md:px-[118px] lg:px-[140px] py-2 rounded-md text-white bg-violet-500 hover:bg-violet-600  font-medium "
                style={{
                  // boxShadow: "7px 10px 5px #bdbdbd",
                  height: "50px",
                  backgroundColor: "#8b5cf6",
                }}
                onClick={connect_to_blockchain}
              >
                Connect to Blockchain
              </button>
            </div>

            <div class="text-center mt-7">
              <button
                class="uppercase px-24 md:px-[118px] lg:px-[140px] py-2 rounded-md text-white bg-violet-500 hover:bg-violet-600  font-medium "
                style={{
                  // boxShadow: "7px 10px 5px #bdbdbd",
                  height: "50px",
                  backgroundColor: "#8b5cf6",
                }}
                onClick={For_Loop}
              >
                Loop
              </button>
            </div>

            <div class="text-center mt-7">
              <button
                class="uppercase px-24 md:px-[118px] lg:px-[140px] py-2 rounded-md text-white bg-violet-500 hover:bg-violet-600  font-medium "
                style={{
                  // boxShadow: "7px 10px 5px #bdbdbd",
                  height: "50px",
                  backgroundColor: "#8b5cf6",
                }}
                onClick={For_Loop1}
              >
                Loop1
              </button>
            </div>
          </div>
        </div>
      </>

      <div className="container">
        <div class="cert-container print-m-0">
          <div id="content2" class="cert">
            <img
              src="https://files.jotform.com/jufs/wliyam/form_files/cert-background.61e9015433d612.34457768.png?md5=Tncl-zVJwBGWngrxcvgdkg&amp;expires=1694122911&amp;height=790"
              class="cert-bg"
              alt=""
            />
            <div class="cert-content">
              <h1 class="other-font h1">Certificate of Completion</h1>

              <p
                class="p"
                style={{ textAlign: "center", marginBottom: "-5px" }}
              >
                <span
                  style={{
                    fontSize: "14pt",
                    fontFamily: "georgia, palatino, serif",
                    marginBottom: "10px",
                  }}
                >
                  <strong>This Certificate is awarded to</strong>
                </span>
              </p>

              <div style={divStyle} class="abril">
                {name}
              </div>

              <div style={divStyle1}>
                <p class="p" style={{ lineHeight: "1" }}>
                  <span style={spanStyle}>
                    For participating in the {participate} held in{" "}
                    {moment().format("MMMM Do YYYY")}. This serves as a
                    testament to the competence and excellence in the
                    performance shown by the abovementioned on the said event.
                    This certification is awarded on the {moment().format("Do")}{" "}
                    of the {moment().format("MMMM")}, in the year{" "}
                    {moment().format("YYYY")}.
                  </span>
                </p>
              </div>

              <div style={divStyle3}>
                <table style={tableStyle}>
                  <tbody>
                    <tr>
                      <td valign="bottom" align="center">
                        <img
                          src="https://www.jotform.com/uploads/wliyam/form_files/signature-sample.6024a2f3e75586.71158835.png"
                          style={imgStyle}
                          alt="Signature"
                        />
                        <br />
                        <div style={signatureStyle}>
                          <strong>Joseph C. McGregor</strong>
                          <br />
                          Event Manager
                          <br />
                        </div>
                      </td>
                      <td valign="bottom" align="center">
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=90x90&data=${data}`}
                          style={{
                            ...imgStyle,
                            position: "relative",
                            width: "90px",
                          }}
                          alt="Signature"
                        />
                        <div style={signatureStyle}>
                          <strong>(Scan this QR Code)</strong>
                          <br />
                          {code}
                          <br />
                          {/* Center for Culinary Arts */}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home2;