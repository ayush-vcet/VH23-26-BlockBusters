// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

// Import the App contract
import "./App.sol";

contract AnotherApp {
    App public appContract;

    struct Owner {
        string[] Certificate_ID;
    }

    mapping(address => Owner) Owner_Own_Certificate;

    mapping(string => App.Student) public Certificate_Detail_Mapping;

    // constructor(address appAddress) {
    //     appContract = App(appAddress);
    // }

    function contractAddress(address contract_Address) public {
        appContract = App(contract_Address);
    }

    // Function to retrieve and return student data from the App contract
    function GetStudentData() public view returns (App.Student[] memory) {
        return appContract.Display();
    }

    function add(string[] calldata id, uint[] calldata index, string[] calldata img, address[] calldata owner) public {
        for(uint i = 0; i < id.length; i++) {
            (string memory name, string memory email, string memory event_name) = appContract.Get_Student(index[i]);
            Certificate_Detail_Mapping[id[i]].id = index[i];
            Certificate_Detail_Mapping[id[i]].name = name;
            Certificate_Detail_Mapping[id[i]].img = img[i];
            Certificate_Detail_Mapping[id[i]].email = email;
            Certificate_Detail_Mapping[id[i]].event_name = event_name;
            Certificate_Detail_Mapping[id[i]].owner = owner[i];
            Certificate_Detail_Mapping[id[i]].status = true;
            Owner_Own_Certificate[owner[i]].Certificate_ID.push(id[i]);
        }
    }

    function getCertificatesByOwner(address owner) public view returns (App.Student[] memory) {
        uint256 length = Owner_Own_Certificate[owner].Certificate_ID.length;
        App.Student[] memory ownerCertificates = new App.Student[](length);

        for (uint256 i = 0; i < length; i++) {
            string memory certId = Owner_Own_Certificate[owner].Certificate_ID[i];
            ownerCertificates[i] = Certificate_Detail_Mapping[certId];
        }

        return ownerCertificates;
    }

    function GetStudentTrueData() public view returns (App.Student[] memory) {
        return appContract.GetStudentsWithStatusTrue();
    }
}
