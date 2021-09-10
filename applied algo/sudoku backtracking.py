sudoku = [[0,3,0,0,0,4,9,0,0],
          [2,4,0,6,0,0,0,0,5],
          [0,5,0,0,8,9,0,7,0],
          [0,0,2,0,0,1,4,9,0],
          [0,0,0,0,6,0,0,0,8],
          [0,0,6,8,0,0,0,5,0],
          [5,2,7,0,1,8,0,0,0],
          [0,0,0,0,9,0,0,2,0],
          [0,9,0,0,2,0,0,3,0],]

sudoku_helper = []

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
        nodes[0] += 1
        if (is_valid(sudoku, row, col, i)):
            sudoku[row][col] = i
            nodes[1] += 1
            if solve(sudoku, row, col+1, nodes):
                return True
        sudoku[row][col] = 0
    return False


def possibleMoves(grid):
    helper = []
    valid_moves = []
    for k in range(len(sudoku)):
        helper.append([])
        for j in range(len(sudoku)):
            valid_moves = []
            helper[k].append([])
            if (grid[k][j] > 0):
                continue
            for i in range(1, 10, 1):
                if (is_valid(grid, k, j,i)):
                    valid_moves.append(i)
            if (len(valid_moves) <= 1):
                helper[k][j] = [el for el in valid_moves]
            else:
                helper[k][j] = []
    return helper

def available_move(helper_grid):
    for i in range(len(helper_grid)):
        for j in range(len(helper_grid)):
            if (len(helper_grid[i][j]) > 0):
                return True
        if (i == len(helper_grid)-1 and j == len(helper_grid)-1):
            return False
    return True

def newSolve(grid, helper_grid, row, col, nodes):
    nodes[0] += 1
    state = True
    helper_grid = possibleMoves(grid)
    while(state):
        state = available_move(helper_grid)
        helper_grid = possibleMoves(grid)
        for i in range(len(grid)):
            for j in range(len(grid)):
                nodes[0] += 1
                if len(helper_grid[i][j]) ==  1:
                    if (is_valid(grid, i, j, helper_grid[i][j][0])):
                        nodes[1] += 1
                        grid[i][j] = helper_grid[i][j][0]

    if(solve(grid, 0, 0, nodes)):
        printSudoku(grid)
                
                
newSolve(sudoku, sudoku_helper, 0, 0, nodes)
print(nodes[0])
print(nodes[1])

"""
if (solve(sudoku, 0, 0, nodes)):
    printSudoku(sudoku)
    print(nodes)
else:
    print("No solution?")
"""

