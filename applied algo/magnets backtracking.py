def printBoard(grid):
    for i in range(M):
        for j in range(N):
            print(grid[i][j], end=" ")
        print()


def checkCol(grid, row, char):
    count = 0
    for i in range(M):
        if grid[i][row] == char:
            count += 1
    return count

def checkRow(grid, col, char):
    count = 0
    for i in range(N):
        if grid[col][i] == char:
            count += 1
    return count

def isLegal(grid, row, col, char, top, bottom, left, right):

    if ((row - 1 >= 0 and grid[row - 1][col] == char) or
            (col + 1 < N and grid[row][col + 1] == char) or
            (row + 1 < M and grid[row + 1][col] == char) or
            (col - 1 >= 0 and grid[row][col - 1] == char)):
        return False


    rowCounter = checkRow(grid,row, char)

    colCounter = checkCol(grid, col, char)


    if char == "+":

        if top[col] != -1 and colCounter >= top[col]:
            return False

        if left[row] != -1 and rowCounter >= left[row]:
            return False

    if char == "-":

        if bottom[col] != -1 and colCounter >= bottom[col]:
            return False

        if right[row] != -1 and rowCounter >= right[row]:
            return False

    return True
        

def validateConfiguration(grid, top, bottom, left, right, solutions):
    for i in range(N):
        if top[i] != -1 and checkCol(grid, i, "+") != top[i]:
            return False

        if bottom[i] != -1 and checkCol(grid, i, "-") != bottom[i]:
            return False

    for j in range(M):
        if left[j] != -1 and checkRow(grid, j, "+") != left[j]:
            return False

        if right[j] != -1 and checkRow(grid, j, "-") != right[j]:
            return False

    return True


def solve(grid, row, col, top, bottom, left, right, rules, nodes, solutions):
    nodes[0] += 1

    if row >= M-1 and col >= N-1:
        return validateConfiguration(grid, top, bottom, left, right, solutions)

    if col>= N:
        col = 0
        row += 1

    if rules[row][col] == "R" or rules[row][col] == "B":
        if solve(grid, row, col+1, top, bottom, left, right, rules, nodes, solutions):
            return True

    if rules[row][col] == "L" and rules[row][col+1] == "R":
        if (isLegal(grid, row, col, "+", top, bottom, left, right) and (isLegal(grid, row, col+1, "-", top, bottom, left, right))):
            grid[row][col] = "+"
            grid[row][col+1]= "-"

            nodes[1] += 1
            
            if solve(grid,row,col+2, top, bottom, left, right, rules, nodes, solutions):
                return True

            nodes[0] += 1
            grid[row][col] = "X"
            grid[row][col+1] = "X"

        if (isLegal(grid, row, col, "-", top, bottom, left, right) and (isLegal(grid, row, col+1, "+", top, bottom, left, right))):

            grid[row][col] = "-"
            grid[row][col+1]="+"
            nodes[1] += 1
            

            if solve(grid,row,col+2, top, bottom, left, right, rules, nodes, solutions):
                return True

            nodes[0] += 1
            grid[row][col] = "X"
            grid[row][col+1] = "X"

    if rules[row][col] == "T" and rules[row +1][col] == "B":
        if (isLegal(grid, row, col, "+", top, bottom, left, right) and (isLegal(grid, row+1, col, "-", top, bottom, left, right))):

            grid[row][col] = "+"
            grid[row+1][col]="-"
            nodes[1] += 1

            if solve(grid,row,col+1, top, bottom, left, right, rules, nodes, solutions):
                return True

            nodes[0] += 1
            grid[row][col] = "X"
            grid[row+1][col] = "X"

            
        if (isLegal(grid, row, col, "-", top, bottom, left, right) and (isLegal(grid, row+1, col, "+", top, bottom, left, right))):
            grid[row][col] = "-"
            grid[row+1][col]="+"
            nodes[1] += 1

            if solve(grid,row,col+1, top, bottom, left, right, rules, nodes, solutions):
                return True

            nodes[0] += 1
            grid[row][col] = "X"
            grid[row+1][col] = "X"

    if solve(grid, row, col+1, top, bottom, left, right, rules, nodes, solutions):
        return True

    return False



def puzzle(top, bottom, left , right, rules, nodes):
    solution_array = []

    board = [["X" for x in range(N)] for y in range(M)]

    if not solve(board, 0, 0, top, bottom, left, right, rules, nodes, solution_array):
        print("No solution")
        return

    else:
        printBoard(board)
        print(nodes)



top = [1, -1, -1, 2, 1, -1]
bottom = [2, -1, -1, 2, -1, 3]
left = [2, 3, -1, -1, -1]
right = [-1, -1, -1, 1, -1]

rules = [["L", "R", "L", "R", "T", "T"],
         ["L", "R", "L", "R", "B", "B"],
         ["T", "T", "T", "T", "L", "R"],
         ["B", "B", "B", "B", "T", "T"],
         ["L", "R", "L", "R", "B", "B"]]


(M,N) = (len(rules), len(rules[0]))


nodes = [0, 0]
puzzle(top, bottom ,left, right ,rules, nodes)
    
