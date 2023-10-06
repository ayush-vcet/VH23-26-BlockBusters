// Home.js
import React from "react";
import { useState, useEffect } from "react";
import moment from "moment";
import Web3 from "web3";
import { v4 } from "uuid";
import domtoimage from "dom-to-image";
import axios from "axios";
import "./Home.css";
import { Progress } from "@material-tailwind/react";

function Home1({ state }) {
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
  const [Details, setDetails] = useState("");
  const [Details1, setDetails1] = useState("");

  const [data, setData] = useState();
  const [code, setCode] = useState("");

  const [indexArray, setIndexArray] = useState([]);
  const [imgArray, setImgArray] = useState([]);
  const [ownerArray, setOwnerArray] = useState([]);
  const [eventArray, setEventArray] = useState([]);
  const [nameArray, setNameArray] = useState([]);
  const [codeArray, setCodeArray] = useState([]);
  const [dataArray, setDataArray] = useState([]);

  const [progress, setProgress] = useState(0);

  const connect_to_blockchain = async () => {
    try {
      const { contract, web3 } = state;
      const accounts = await web3.eth.getAccounts();
      await contract.methods
        .contractAddress(ContractAddress)
        .send({ from: accounts[0] });
      console.log("Hiii1");

      const nameText1 = await contract.methods.GetStudentData().call();
      console.log(nameText1);
      setDetails1(nameText1);

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

      tempIndexArray.push(parseInt(nameText[nameText.length - 1][0], 10));
      tempOwnerArray.push(nameText[nameText.length - 1][4]);
      tempEventArray.push(nameText[nameText.length - 1][3]);
      tempNameArray.push(nameText[nameText.length - 1][1]);

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

  const generateCertificate = async (name) => {
    let element = document.getElementById("content2");

    try {
      // Converts the HTML element to a JPEG image using dom-to-image
      const dataUrl = await domtoimage.toJpeg(element);

      // Converts the data URL to a File object
      const arr = dataUrl.split(",");
      const mime = arr[0].match(/:(.*?);/)[1];
      const data = atob(arr[1]);
      const n = data.length;
      const dataArr = new Uint8Array(n);
      for (let i = 0; i < n; i++) {
        dataArr[i] = data.charCodeAt(i);
      }
      const file = new File([dataArr], `${name}.jpg`, { type: mime });

      // Uploads the file to IPFS using the Pinata API
      const formData = new FormData();
      formData.append("file", file);

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
      setImg(resFile.data.IpfsHash);
      console.log(resFile.data.IpfsHash);
      setImg("");
      return resFile.data.IpfsHash;
    } catch (error) {
      console.error(
        "Error generating certificate and uploading to IPFS:",
        error
      );
      alert("Error generating certificate and uploading to IPFS");
    }
  };

  const show1 = async () => {
    const uploadedImageUrls = [];

    for (let index = 0; index <= nameArray.length; index++) {
      let imageUrl;
      try {
        if (index < 0) {
          let id = v4().substring(0, 18);
          setName(nameArray[index]);
          setParticipate(eventArray[index]);
          setAddress(ownerArray[index]);
          setCode(id);
          setData(`https://certifyblockchain.netlify.app/verify/${id}`);
          setCodeArray((prevCodes) => [...prevCodes, id]);
          setDataArray((prevData) => [
            ...prevData,
            `https://certifyblockchain.netlify.app/verify/${id}`,
          ]);
          imageUrl = await generateCertificate(nameArray[index]);
          uploadedImageUrls.push(imageUrl);
        } else if (index > 0) {
          let id = v4().substring(0, 18);
          setName(nameArray[index - 1]);
          setParticipate(eventArray[index - 1]);
          setAddress(ownerArray[index - 1]);
          setCode(id);
          setData(`https://certifyblockchain.netlify.app/verify/${id}`);
          setCodeArray((prevCodes) => [...prevCodes, id]);
          setDataArray((prevData) => [
            ...prevData,
            `https://certifyblockchain.netlify.app/verify/${id}`,
          ]);
          imageUrl = await generateCertificate(nameArray[index - 2]);
          uploadedImageUrls.push(imageUrl);
        }

        const currentProgress = Math.min(
          ((index + 1) / nameArray.length) * 100,
          100
        );
        setProgress(currentProgress);
      } catch (error) {
        console.error(
          "Error generating certificate for Details[index][1]:",
          error
        );
      }
    }

    setImgArray(uploadedImageUrls);
    console.log("Uploaded Image URLs:", uploadedImageUrls);
  };

  const getData = () => {
    nameArray.pop();
    eventArray.pop();
    ownerArray.pop();
    imgArray.shift();
    codeArray.pop();
    dataArray.pop();

    console.log(nameArray);
    console.log(eventArray);
    console.log(ownerArray);
    console.log(imgArray);
    console.log(codeArray);
    console.log(dataArray);

    write_on_blockchain();
  };

  const write_on_blockchain = async () => {
    try {
      const { contract, web3 } = state;
      const accounts = await web3.eth.getAccounts();
      await contract.methods
        .add(codeArray, indexArray, imgArray, ownerArray)
        .send({ from: accounts[0] });
      console.log("Hiii1");
    } catch (error) {
      console.log(error);
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
                  placeholder="Contract Address"
                  required
                  onChange={(e) => {
                    setContractAddress(e.target.value);
                  }}
                  style={{
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
                    height: "50px",
                    backgroundColor: "#8b5cf6",
                  }}
                  onClick={connect_to_blockchain}
                >
                  Connect to Blockchain
                </button>
              </div>
            </div>

            <table
              class="table-auto w-full text-left whitespace-no-wrap"
              style={{ marginTop: "30px" }}
            >
              <thead>
                <tr>
                  <th class="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800 rounded-tl rounded-bl">
                    Index
                  </th>
                  <th class="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">
                    Name
                  </th>
                  <th class="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">
                    Event
                  </th>
                  <th class="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">
                    Owner
                  </th>
                  <th class="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {Details1 !== "" &&
                  Details1.map((val, i) => (
                    <tr>
                      <td class="px-4 py-3 text-white">{val[0]}</td>
                      <td class="px-4 py-3 text-white">{val[1]}</td>
                      <td class="px-4 py-3 text-white">{val[3]}</td>
                      <td class="px-4 py-3 text-white">{val[4]}</td>
                      <td class="px-4 py-3 text-white">{val[5].toString()}</td>
                    </tr>
                  ))}
              </tbody>
            </table>

            <div class="text-center mt-7">
              <button
                class="uppercase px-24 md:px-[118px] lg:px-[140px] py-2 rounded-md text-white bg-violet-500 hover:bg-violet-600  font-medium "
                style={{
                  height: "50px",
                  backgroundColor: "#8b5cf6",
                }}
                onClick={show1}
              >
                Generate Certificate
              </button>
            </div>

            {/* <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
              <div class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style="width: 45%"> 45%</div>
            </div> */}
            <div class="text-center mt-7">
              <Progress value={progress} variant="gradient" size="lg" label="Completed" color="green" />
            </div>

            <div class="text-center mt-7">
              <button
                class="uppercase px-24 md:px-[118px] lg:px-[140px] py-2 rounded-md text-white bg-violet-500 hover:bg-violet-600  font-medium "
                style={{
                  height: "50px",
                  backgroundColor: "#8b5cf6",
                }}
                onClick={getData}
              >
                Upload to Blockchain
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

export default Home1;
