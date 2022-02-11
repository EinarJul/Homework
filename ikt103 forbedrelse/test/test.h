//
// Created by einar on 10.02.2022.
//

#ifndef IKT103_FORBEDRELSE_TEST_H
#define IKT103_FORBEDRELSE_TEST_H


#include <string>

class Test {
public:
    explicit Test(int id);
    Test(int id, const std::string& courseName, const std::string& testName, const std::string& datetime);
    const int id;
    std::string courseName;
    std::string testName;
    std::string datetime;
    void coursePrint();
};


#endif //IKT103_FORBEDRELSE_TEST_H
