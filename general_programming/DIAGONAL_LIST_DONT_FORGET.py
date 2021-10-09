list_list = [[1,2,3,4,5],
             [6,7,8,9,10],
             [11,12,13,14,15],
             [16,17,18,19,20],
             [21,22,23,24,25]]

n = len(list_list)
for interval_length in range(1, n + 1):
        for i in range(n - interval_length + 1):
            j = i + interval_length - 1
            print(list_list[i][j])

# n = the length of the list
# this will traverse through a list of lists, ex: [[1,2,3],[4,5,6],[7,8,9]]
# in a diagonal -> 2, 5, 3
# dont forget this cause oh my god this sucked to figure out
