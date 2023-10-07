import { useState, useEffect } from "react";

function Admin({ state }) {
  const [Detail, setDetail] = useState("");
  const [Certificate, setCertificate] = useState("");
  useEffect(() => {
    const { contract, web3 } = state;
    const getDetail = async () => {
      const nameText = await contract.methods.Get_Student().call();
      console.log(nameText);
      setDetail(nameText);

      const Total_No_of_Certificate = await contract.methods
        .Get_Total_No_of_Certificate()
        .call();
      console.log(Total_No_of_Certificate);
      setCertificate(Total_No_of_Certificate);
    };
    contract && getDetail();
  }, [state]);

  return (
    <>
      <div
        class="flex justify-center"
        style={{
          backgroundColor: "rgb(17, 24, 39)",
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div class="h-[90%] w-full md:w-3/4 m-4">
          <div class="text-xl cursor-pointer flex flex-col justify-center items-center mt-5 md:mt-0">
            <h1
              class="font-semibold text-3xl text-gray-700 m-2"
              style={{ color: "white" }}
            >
              Admin Panel
            </h1>
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
                  Email
                </th>
                <th class="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">
                  Owner
                </th>
              </tr>
            </thead>
            <tbody>
              {Detail !== "" &&
                Detail.map((val, i) => (
                  <tr>
                    <td class="px-4 py-3 text-white">{val[0]}</td>
                    <td class="px-4 py-3 text-white">{val[1]}</td>
                    <td class="px-4 py-3 text-white">{val[2]}</td>
                    <td class="px-4 py-3 text-white">{val[3]}</td>
                  </tr>
                ))}
            </tbody>
          </table>

          <div
            class="flex flex-wrap -m-4 text-center"
            style={{ marginTop: "40px", marginBottom: "20px" }}
          >
            <div class="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div
                class="border-2 border-gray-800 px-4 py-6 rounded-lg"
                style={{
                  color: "#818cf8",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#818cf8"
                  style={{ width: '65px' }}
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path d="M23 1v18h-3v-1h2V2H2v16h8v1H1V1zm-7 2H8v1h8zm-2 3V5h-4v1zm-7 5H3v1h4zm0 2H3v1h4zm-4 3h2v-1H3zm14-3a2 2 0 1 1-2-2 2.002 2.002 0 0 1 2 2zm-1 0a1 1 0 1 0-1 1 1.001 1.001 0 0 0 1-1zm.002-4.293a.965.965 0 0 0 1.32.55 1.08 1.08 0 0 1 1.213.207 1.066 1.066 0 0 1 .21 1.21.966.966 0 0 0 .548 1.324 1.064 1.064 0 0 1 0 2.004.965.965 0 0 0-.549 1.323A1.05 1.05 0 0 1 18 16.816v7.046l-3-2.538-3 2.538v-7.046a1.05 1.05 0 0 1-.744-1.49.965.965 0 0 0-.549-1.324 1.064 1.064 0 0 1 0-2.004.966.966 0 0 0 .549-1.324 1.066 1.066 0 0 1 .209-1.21 1.08 1.08 0 0 1 1.212-.206.965.965 0 0 0 1.32-.551 1.064 1.064 0 0 1 2.005 0zm.998 13v-5.04a.93.93 0 0 0-.998.625 1.064 1.064 0 0 1-2.004 0 .93.93 0 0 0-.998-.625v5.039l2-1.692zm-1.94-4.749a1.967 1.967 0 0 1 1.853-1.308 2.12 2.12 0 0 1 .87.197l.058-.091a1.964 1.964 0 0 1 1.116-2.695v-.122a1.966 1.966 0 0 1-1.116-2.695l-.087-.084a1.965 1.965 0 0 1-2.694-1.117h-.12a1.965 1.965 0 0 1-2.694 1.117l-.087.084a1.966 1.966 0 0 1-1.116 2.695v.122a1.964 1.964 0 0 1 1.116 2.695l.058.09a2.12 2.12 0 0 1 .87-.196 1.967 1.967 0 0 1 1.853 1.308L15 17z"></path>
                    <path fill="none" d="M0 0h24v24H0z"></path>
                  </g>
                </svg>
                <h2 class="title-font font-medium text-3xl text-white">
                  {Certificate}
                </h2>
                <p class="leading-relaxed" style={{ color: "white" }}>
                  Total no of Certificate
                </p>
              </div>
            </div>
            <div class="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div class="border-2 border-gray-800 px-4 py-6 rounded-lg">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="text-indigo-400 w-12 h-12 mb-3 inline-block"
                  viewBox="0 0 24 24"
                >
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"></path>
                </svg>
                <h2 class="title-font font-medium text-3xl text-white">
                  {Detail.length}
                </h2>
                <p class="leading-relaxed" style={{ color: "white" }}>
                  Total no of Users
                </p>
              </div>
            </div>
            <div class="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div class="border-2 border-gray-800 px-4 py-6 rounded-lg" style={{
                  color: "#818cf8",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#818cf8" style={{ width: '65px' }}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#818cf8" stroke-width="2"></path> <path d="M12 17L9.12186 14.1219V14.1219C9.07689 14.0769 9.11206 13.9992 9.17562 13.9971C13.9993 13.8351 13.9408 7 9 7H15" stroke="#818cf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 10.5H15" stroke="#818cf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                <h2 class="title-font font-medium text-3xl text-white">
                  0.000045
                </h2>
                <p class="leading-relaxed" style={{ color: "white" }}>
                  Base Price
                </p>
              </div>
            </div>
            <div class="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div class="border-2 border-gray-800 px-4 py-6 rounded-lg" style={{
                  color: "#818cf8",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}>
              <svg viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#818cf8" style={{ width: '65px' }}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M200.99 814.55c-23.52-39.54-24.45-87.29-2.48-127.71l214.17-394.27h127.24l119.46 218.25 64.14-35.11-100.24-183.14h35.02v-73.14h-33.39l69.95-146.29H256l76.33 146.29h-39.76v73.14h36.84l-195.2 359.34c-34.39 63.34-32.93 138.11 3.91 200.04s101.86 98.91 173.91 98.91h89.3v-73.14h-89.3c-46-0.01-87.52-23.61-111.04-63.17z m175.68-668.26h202.14l-34.98 73.14H414.84l-38.17-73.14z" fill="#818cf8"></path><path d="M914.29 731.43V548.57H475.44v109.71H402.3v182.86h73.14v109.71H914.29V768h-73.14v-36.57h73.14z m-73.14-109.72v36.57h-36.57v-36.57h36.57z m-292.57 0h182.86v36.57H548.58v-36.57z m-73.14 109.72H658.3V768H475.44v-36.57z m73.14 146.28v-36.57h182.85v36.57H548.58z m292.57 0h-36.57v-36.57h36.57v36.57zM731.44 768v-36.57h36.57V768h-36.57z" fill="#818cf8"></path></g></svg>
                <h2 class="title-font font-medium text-3xl text-white">
                  {Certificate * 0.000045}
                </h2>
                <p class="leading-relaxed" style={{ color: "white" }}>
                  Total Cost
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;
