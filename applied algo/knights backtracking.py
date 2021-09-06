N = 0
while (N < 3):
    N = int(input("Input nxn dimension for the board: "))


board = []
path = []

def create_board(N):
    new_board = []
    for i in range(N):
        empty = []
        for j in range(N):
            empty.append(0)
        new_board.append(empty)
    return new_board



def printboard(board):
    for i in range(N):
        for j in range(N):
            print(board[i][j], end=" ")
        print()


def potential_moves(board, row, col):
    knight_move = [(1, 2), (-1, 2), (2, -1), (-2, -1), (-1, -2), (1, -2), (-2, 1), (2, 1)]
    potential = []
    for i in range(len(knight_move)):
        res = tuple(map(lambda i, j: i-j, (row, col), knight_move[i]))
        if (not any(map(lambda ele: ele<0 or ele > N-1, res))):
            if (board[res[0]][res[1]] == 0):
                potential.append(res)
    return potential

def checkFinished(board):
    for i in range(len(board)):
        for j in range(len(board)):
                   if (board[i][j] == 0):
                       return False
    return True

def solve(board, row, col, nodes, path):
    path.append(tuple((row, col)))
    nodes[0] +=1
    board[row][col] = 1
    moves = potential_moves(board, row, col)
    if (checkFinished(board)):
        return True
    if len(moves) != 0:
        for i in range(len(moves)):
            new_row = moves[i][0]
            new_col = moves[i][1]
            if (solve(board, new_row, new_col, nodes, path)):
                return True
    board[row][col] = 0
    path.pop()

    return False
"""    
    if (len(moves) != 0):
        board[row][col] = 1
        for i in range(len(moves)):
            new_row = moves[i][0]
            new_col = moves[i][1]
            if (solve(board, new_row, new_col, nodes)):
                return True
    board[row][col] = 0
    return False
"""

nodes = [0, 0]

for i in range(0, N, 1):
    for j in range(0, N, 1):
        board = create_board(N)
        nodes[0] = 0
        print("NEW SOLVE {}{}".format(i, j))
        path = []
        if (solve(board, i, j, nodes, path)):
            print(path)
            print(nodes)
            printboard(board)
"""
for j in range(N):
    print("current j" + str(j))
    for y in range(N):
        print("current y" + str(y))
        if (solve(board,j,i,nodes)):
            printBoard(board)

    for i in range(len(potential)):
        if (board[potential[i][0]][potential[i][1]] == 0):
            real_moves.append(potential[i])
    print(real_moves)
    """

