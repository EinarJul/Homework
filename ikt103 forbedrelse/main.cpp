#include <iostream>
#include <list>
#include <map>
#include "test/test.h"




int main() {


    Test help(1, "IKT103", "IKT103-ing2022", "2022/02/02");
    help.coursePrint();
    std::list<int> numbers;
    std::map<int, std::string> students;

    numbers.push_back(3);
    numbers.push_back(1);
    numbers.push_back(7);

    std::cout << "The numbers are: ";

    for (auto &number: numbers)
        std::cout << number << " ";

    std::cout << std::endl;
    std::cout << "Hello, World!" << std::endl;
    return 0;
}
