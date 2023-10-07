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

      const Total_No_of_Certificate = await contract.methods.Get_Total_No_of_Certificate().call();
      setCertificate(Total_No_of_Certificate);
    };
    contract && getDetail();
  }, [state]);

  return (
    <>
      <div
        class="flex justify-center"
        style={{ backgroundColor: "rgb(17, 24, 39)", minHeight: "90vh", display: "flex",alignItems: "center" }}
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

          <div class="flex flex-wrap -m-4 text-center" style={{ marginTop: "40px", marginBottom: "20px" }}>
      <div class="p-4 md:w-1/4 sm:w-1/2 w-full">
        <div class="border-2 border-gray-800 px-4 py-6 rounded-lg">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="text-indigo-400 w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
            <path d="M8 17l4 4 4-4m-4-5v9"></path>
            <path d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29"></path>
          </svg>
          <h2 class="title-font font-medium text-3xl text-white">{Certificate}</h2>
          <p class="leading-relaxed">Downloads</p>
        </div>
      </div>
      <div class="p-4 md:w-1/4 sm:w-1/2 w-full">
        <div class="border-2 border-gray-800 px-4 py-6 rounded-lg">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="text-indigo-400 w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"></path>
          </svg>
          <h2 class="title-font font-medium text-3xl text-white">{Detail.length}</h2>
          <p class="leading-relaxed">Users</p>
        </div>
      </div>
      <div class="p-4 md:w-1/4 sm:w-1/2 w-full">
        <div class="border-2 border-gray-800 px-4 py-6 rounded-lg">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="text-indigo-400 w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
            <path d="M3 18v-6a9 9 0 0118 0v6"></path>
            <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"></path>
          </svg>
          <h2 class="title-font font-medium text-3xl text-white">74</h2>
          <p class="leading-relaxed">Files</p>
        </div>
      </div>
      <div class="p-4 md:w-1/4 sm:w-1/2 w-full">
        <div class="border-2 border-gray-800 px-4 py-6 rounded-lg">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="text-indigo-400 w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
          <h2 class="title-font font-medium text-3xl text-white">46</h2>
          <p class="leading-relaxed">Places</p>
        </div>
      </div>
    </div>

        </div>
      </div>
    </>
  );
}

export default Admin;
