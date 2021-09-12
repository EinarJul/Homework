def printBoard(grid):
    for i in range(M):
        for j in range(N):
            print(board[i][j], end=" ")
        print()




top = [1, -1, -1, 2, 1, -1]
bottom = [2, -1, -1, 2, -1, 3]
left = [2, 3, -1, -1, -1]
right = [-1, -1, -1, 1, -1]

rules = [["L", "R", "L", "R", "T", "T"],
         ["L", "R", "L", "R", "B", "B"],
         ["T", "T", "T", "T", "L", "R"],
         ["B", "B", "B", "B", "T", "T"],
         ["L", "R", "L", "R", "B", "B"]]


def checkRow(grid, col, row, char):
    count = 0
    for i in range(len(grid)):
        if grid[i][col] == char:
            count += 1
    return count
            

def checkCol(grid, col, row, char):
    count = 0
    for i in range(len(grid)):
        if grid[row][i] == char:
            count += 1
    return count
    
def isLegal(grid, col, row, char):
        

def checkTopBottom(grid, col, row):
    
