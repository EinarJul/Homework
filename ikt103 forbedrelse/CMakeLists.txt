cmake_minimum_required(VERSION 3.21)
project(ikt103_forbedrelse)

set(CMAKE_CXX_STANDARD 14)

add_executable(ikt103_forbedrelse main.cpp menu/menu.cpp menu/menu.h utils/utils.cpp utils/utils.h app/app.cpp app/app.h student/student.cpp student/student.h test/test.cpp test/test.h)
