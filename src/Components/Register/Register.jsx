import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Home.css";

function Register({ state }) {
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
  const [email, setEmail] = useState("");

  const Register_User = async () => {
    try {
      const { contract, web3 } = state;
      const accounts = await web3.eth.getAccounts();
      console.log(accounts[0]);
      await contract.methods
        .Register_Student(name, email)
        .send({ from: accounts[0] });
      console.log("Hiii1");
      toast.success(`You are registered now`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
        toast.error("Check all field must need to be fill.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        console.log(error);
    }
  };

  return (
    <>
      <>
      <ToastContainer />
        <div
          class="flex justify-center"
          style={{ backgroundColor: "rgb(17, 24, 39)", height: "90vh" }}
        >
          <div
            class="h-[90%] w-full md:w-3/4 m-4"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div class="text-xl cursor-pointer flex flex-col justify-center items-center mt-5 md:mt-0">
              <h1
                class="font-semibold text-3xl text-gray-700 m-2"
                style={{ color: "white" }}
              >
                Register
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
                    height: "50px",
                    backgroundColor: "white",
                  }}
                  class=" bg-gray-100 rounded-lg px-5 py-2 focus:border border-violet-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"
                />
              </div>

              <div class="">
                <input
                  type="text"
                  placeholder="Email"
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
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
                    onClick={Register_User}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}

export default Register;
