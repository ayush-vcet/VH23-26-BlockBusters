// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.10;

contract App {
    struct Student {
        uint id;
        string name;
        string email;
        string event_name;
        uint time;
        address owner;
        bool status;
        string img;
    }

    uint public Student_Index = 0;

    Student[] public Student_Array;

    function Add_Student(string calldata name, string calldata email, string calldata event_name) public {
        Student memory student;
        student.id = Student_Index;
        student.name = name;
        student.email = email;
        student.event_name = event_name;
        student.owner = msg.sender;
        Student_Array.push(student);
        Student_Index++;
    }

    function Student_Status_Update(uint[] calldata id) public {
        for(uint i = 0; i < id.length; i++) {
            Student_Array[id[i]].status = true;
        }
    }

    function Display() public view returns (Student[] memory) {
        return Student_Array;
    }

    function Get_Student(uint id) public view returns (string memory name, string memory email, string memory event_name) {
        return (Student_Array[id].name, Student_Array[id].email, Student_Array[id].event_name);
    }

    function GetStudentsWithStatusTrue() public view returns (Student[] memory) {
        uint count = 0;
        // Count the number of students with status true
        for(uint i = 0; i < Student_Array.length; i++) {
            if(Student_Array[i].status) {
                count++;
            }
        }

        // Create a new array to store students with status true
        Student[] memory studentsWithStatusTrue = new Student[](count);
        uint currentIndex = 0;

        // Populate the new array with students having status true
        for(uint i = 0; i < Student_Array.length; i++) {
            if(Student_Array[i].status) {
                studentsWithStatusTrue[currentIndex] = Student_Array[i];
                currentIndex++;
            }
        }

        return studentsWithStatusTrue;
    }
}
