//
// Created by einar on 10.02.2022.
//

#include "menu.h"
#include <iostream>

Menu::Menu(const std::string& name) : name(name){};



int Menu_project(){
    int i;
    std::cout << "Please choose:" << std::endl;
    std::cout << "1. Add student" << std::endl;
    std::cout << "2. Edit student" << std::endl;
    std::cout << "3. Remove student\n" << std::endl;
    std::cout << "4. Add test" << std::endl;
    std::cout << "5. Edit test" << std::endl;
    std::cout << "6. Remove test\n" << std::endl;
    std::cout << "7. Add test result" << std::endl;
    std::cout << "8. Edit test result" << std::endl;
    std::cout << "9. Remove test result\n" << std::endl;
    std::cout << "10. Show all info" << std::endl;
    std::cout << "11. Exit" << std::endl;

    std::cin >> i;

    return i;
}