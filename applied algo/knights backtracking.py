N = 0
while True:
    try:
        while (N < 3):
            N = int(input("Input nxn dimension for the board: "))
    except ValueError:
        continue
    break


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
        #This will iterate through our knight moves against the row and col
        ## and generate our moves based on that
        # we then check if the element is less than 0 or larger than our board in the x and y direction
        # if it passes then it gets added to our potential moves
        # otherwise we discard it
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

def solve(board, row, col, nodes, path, num):
    path.append(tuple((row, col)))
    nodes[0] +=1
    board[row][col] = num
    moves = potential_moves(board, row, col)
    if (checkFinished(board)):
        return True
    if len(moves) != 0:
        for i in range(len(moves)):
            new_row = moves[i][0]
            new_col = moves[i][1]
            if (solve(board, new_row, new_col, nodes, path, num+1)):
                return True
    board[row][col] = 0
    path.pop()

    return False

def heuristic_solve(board, row, col, nodes, path, num):
    path.append(tuple((row,col)))
    nodes[0] += 1
    board[row][col] = num
    moves = potential_moves(board,row,col)
    if (checkFinished(board)):
        return True
    
    if len(moves) != 0:
        weights = []
        for i in moves:
            temp = len(potential_moves(board, i[0], i[1]))
            if (temp == 0):
                temp += 9
            weights.append(temp)
        weighted_list = [x for _, x in sorted(zip(weights, moves))]
        for i in weighted_list:
            if (heuristic_solve(board, i[0], i[1], nodes, path, num+1)):
                return True
    board[row][col] = 0
    path.pop()
    return False

"""
for i in range(0, N, 1):
    for j in range(0, N, 1):
        board = create_board(N)
        nodes = [0,0]
        print("NEW SOLVE {}{}".format(i, j))
        path = []
        if (heuristic_solve(board, i, j, nodes, path, 1)):
            print(path)
            print(nodes)
            printboard(board)
"""


for i in range(0, N, 1):
    for j in range(0, N, 1):
        board = create_board(N)
        nodes = [0,0]
        print("NEW SOLVE {}{}".format(i, j))
        path = []
        if (solve(board, i, j, nodes, path, 1)):
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

