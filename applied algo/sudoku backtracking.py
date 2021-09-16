#Start of program, we declare a sudoku. The sudoku can be any dimensions
#but a NxN sized array would be preferd

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

# Nodes is a list with two parameters, the first is the traversed nodes
# the second one is the promising nodes
nodes = [0, 0]

# For loop to go through positions in the sudoku array and print them out
def printSudoku(sudoku):
    for i in range(len(sudoku)):
        for j in range(len(sudoku)):
            print(sudoku[i][j], end=" ")
        print()

# Checks if the number is valid for the position in the grid
def is_valid(sudoku, row, col, num):
    for i in range(len(sudoku)):
        #We check both the column and row at the same time
        # Does not work for M x N sized sudokus
        if (sudoku[row][i] == num):
            return False

        if (sudoku[i][col] == num):
            return False
    # need little trick to get the 3x3 square based on the position
    
    start_row = row - row%3
    start_col = col - col%3
    for i in range(3):
        for j in range(3):
            if sudoku[i+start_row][j+start_col] == num:
                return False
    return True
                        
def solve(sudoku, row, col, nodes):
    # For every node we visit we iterate upwards for visited nodes
    nodes[0] += 1
    # If we reach the end without backtracking then we have succeeded and return
    # true
    if (col == 9 and row == 8):
        return True

    # if we reach the end of our column we go to the next row
    if (col == 9):
        col = 0
        row += 1

    # if our position already has a number we just push to the next col
    if (sudoku[row][col] > 0):
        return solve(sudoku, row, col+1, nodes)
    # If we reach a square with no number in it, we iterate through all the numbers
    # that could be valid in the position and place one once we have it
    # Once we have put a number  we move to the next col
    # if a function returns false up to the previous function
    # it will still have its pointer for the number it was on
    # and will therefore keep going through the next numbers available
    for i in range(1, 10, 1):
        if (is_valid(sudoku, row, col, i)):
            sudoku[row][col] = i
            nodes[1] += 1
            if solve(sudoku, row, col+1, nodes):
                return True
    # if no number is available then we set our position to 0 and return false    
    sudoku[row][col] = 0
    nodes[0] += 1
    return False


def possibleMoves(grid):
    # Here we define a helper and valid moves
    # helper takes for every full loop a empty array representing a row in the sudoku array
    # valid_moves takes in values that are valid for a square in the sudoku
    # this technically works as the heuristic as we only care if a valid_moves has 1 or less
    # available moves. Otherwise we just give that square a empty value
    # at the end of every column loop we append the values to our helper and then
    # reset our valid_moves array

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

# Based on the return of our previous array we basically go through it
# and check if any row is not empty
# if any row is not empty we return True
# otherwise we return false
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
    # For every loop of the while state we update our current available moves
    # we check if the available moves is not empty
    # if it is empty the loop will finish and return to a solve backtracking loop
    # otherwise it keeps assigning guaranteed values from top left to bottom right
    # and checking if the placements are valid along the way
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
print(nodes)
"""
if (solve(sudoku, 0, 0, nodes)):
    printSudoku(sudoku)
    print(nodes)
else:
    print("No solution?")
"""
