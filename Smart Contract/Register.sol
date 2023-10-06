// SPDX-License-Identifier: MIT
// 0xF002A6bAA358a44647a28EF52808a289f84Df204
pragma solidity ^0.8.10;

contract Register {
    struct Student {
        uint id;
        string name;
        string email;
        address owner;
    }

    uint public Student_Index = 0;
    uint public Total_No_Certificate = 0;

    Student[] public Student_Array;

    mapping (address => Student) public Student_Mapping;

    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function Add_Student(string calldata name, string calldata email) public {
        // require(msg.sender != owner, "Owner is not Allowed");
        // require(keccak256(abi.encodePacked(Student_Mapping[msg.sender].name)) == keccak256(abi.encodePacked("")), "You're already registered");
        Student memory student;
        student.id = Student_Index;
        student.name = name;
        student.email = email;
        student.owner = msg.sender;
        Student_Array.push(student);
        Student_Mapping[msg.sender] = student;
        Student_Index++;
    }

    function Get_Student() public view returns (Student[] memory) {
        return Student_Array;
    }

    function inc() public {
        Total_No_Certificate++;
    }
}
