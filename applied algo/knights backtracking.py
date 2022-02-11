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

# We create a N x N chess board
def create_board(N):
    new_board = []
    for i in range(N):
        empty = []
        for j in range(N):
            empty.append(0)
        new_board.append(empty)
    return new_board


#Simple printboard
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
            # 0 is the unvisited marking, so we check the single result from res for if the boards position is unvisited
            if (board[res[0]][res[1]] == 0):
                potential.append(res)
    return potential

# we check if any position on the board is not filled
# if all positions are filled we end our program
def checkFinished(board):
    for i in range(len(board)):
        for j in range(len(board)):
                   if (board[i][j] == 0):
                       return False
    return True

# Here we create a loop of appending to our path our current position
# We then set our board to being the move number
# final move will always be the size N x N -1
# we also generate all of the potential knights moves into an array
# We then so long as we have moves and the board is not finished
# arbitrarily try a move that has not been tried before
# and recursively go down until we hit a dead end
# if we hit a dead end we reset the position, remove the position from the path
# we then return False
def solve(board, row, col, nodes, path, num):
    path.append(tuple((row, col)))
    nodes[0] +=1
    board[row][col] = num
    moves = potential_moves(board, row, col)
    if (checkFinished(board)):
        return True
    if len(moves) != 0:
        for i in range(len(moves)):
            nodes[1] += 1
            new_row = moves[i][0]
            new_col = moves[i][1]
            if (solve(board, new_row, new_col, nodes, path, num+1)):
                return True
    board[row][col] = 0
    path.pop()
    return False

# Same concept except here for each point we generate a weighted list
# where if a move has 0 future moves its moved all the way to the back
# and moves with 1 possible move are at the front arbitrarily
# and all other moves are in a sequence of least to most moves
# Notably this does generate solutions faster
# it does not however solve the program staling on boards with no solutions
# as such generating each possible move still gets us stuck
# however this can aggressively solve boards of impressive sizes
# with the only testing limiter being the ides recursive limit
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
            # for each move we check its future possible moves
            temp = len(potential_moves(board, i[0], i[1]))
            if (temp == 0):
                temp += 9
            weights.append(temp)
            # we sort our moves based on the weights
        weighted_list = [x for _, x in sorted(zip(weights, moves))]
        for i in weighted_list:
            nodes[1] += 1
            # we then solve it as a normal backtracking problem
            if (heuristic_solve(board, i[0], i[1], nodes, path, num+1)):
                return True
    board[row][col] = 0
    path.pop()
    nodes[0] += 1
    return False

# new lving method

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

# old solving method
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


#old code, don't look at this
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

