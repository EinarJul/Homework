sudoku = [[0,0,0,2,6,0,7,0,1],
          [6,8,0,0,7,0,0,9,0],
          [1,9,0,0,0,4,5,0,0],
          [8,2,0,1,0,0,0,4,0],
          [0,0,4,6,0,2,9,0,0],
          [0,5,0,0,0,3,0,2,8],
          [0,0,9,3,0,0,0,7,4],
          [0,4,0,0,5,0,0,3,6],
          [7,0,3,0,1,8,0,0,0]]

nodes = [0, 0]

def printSudoku(sudoku):
    for i in range(len(sudoku)):
        for j in range(len(sudoku)):
            print(sudoku[i][j], end=" ")
        print()


def is_valid(sudoku, row, col, num):
    for i in range(len(sudoku)):
        if (sudoku[row][i] == num):
            return False

        if (sudoku[i][col] == num):
            return False
        
    start_row = row - row%3
    start_col = col - col%3
    for i in range(3):
        for j in range(3):
            if sudoku[i+start_row][j+start_col] == num:
                return False

        
    return True

def solve(sudoku, row, col, nodes):
    nodes[0] += 1
    if (col == 9 and row == 8):
        return True


    if (col == 9):
        col = 0
        row += 1

    if (sudoku[row][col] > 0):
        return solve(sudoku, row, col+1, nodes)
    for i in range(1, 10, 1):
        if (is_valid(sudoku, row, col, i)):
            sudoku[row][col] = i
            nodes[1] += 1
            if solve(sudoku, row, col+1, nodes):
                return True

        sudoku[row][col] = 0
    return False

if (solve(sudoku, 0, 0, nodes)):
    printSudoku(sudoku)
    print(nodes)
else:
    print("No solution?")
            

    
