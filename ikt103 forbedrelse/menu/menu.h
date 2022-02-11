//
// Created by einar on 10.02.2022.
//

#ifndef IKT103_FORBEDRELSE_MENU_H
#define IKT103_FORBEDRELSE_MENU_H
#include "string"
#include "vector"

class Menu {
    friend Menu& operator<<(Menu& menu, const std::string& choice);

public:
    explicit Menu(const std::string & name);
    int choice();
    size_t size();

protected:
    std::string name;
    std::vector<std::string> choices;
};

Menu& operator<<(Menu& menu, std::string& choice);
std::ostream& operator<<(std::ostream&stream, const Menu& menu);

#endif //IKT103_FORBEDRELSE_MENU_H
