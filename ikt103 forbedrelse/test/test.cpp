//
// Created by einar on 10.02.2022.
//

#include <iostream>
#include "test.h"

Test::Test(int id) : id(id){};

Test::Test(int id, const std::string& courseName, const std::string& testName, const std::string& datetime): id(id){
    this->courseName = courseName;
    this->testName = testName;
    this->datetime = datetime;
}

void Test::coursePrint() {
    std::cout << this->id << std::endl;
    std::cout << this->courseName + "\n";
    std::cout << this->testName + "\n";
    std::cout << this->datetime <<std::endl;

}
