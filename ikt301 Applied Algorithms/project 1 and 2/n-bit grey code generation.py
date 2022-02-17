# solution 1 and 2

nodes = [0, 0]
N = 0
try:
    N = int(input("how many n bit grey codes to generate?  "))
except ValueError:
    print("error occured")

# Solution 3

def generateGray(n):
    nodes[0] += 1
    if (n <= 0):
        return ["0"]
    if (n == 1):
        return ["0", "1"]

    rec = generateGray(n-1)
    main = []

    for i in range(len(rec)):
        nodes[0] += 1
        s = rec[i]
        main.append("0"+s)

    for i in range(len(rec) -1, -1, -1):
        nodes[0] += 1
        s = rec[i]
        main.append("1" + s)
    return main

def greedyAlgo(n):
    L_1 = generateGray(n-1)
    L_2 = L_1[::-1]

    L_1 = ["0" + x for x in L_1]
    L_2 = ["1" + x for x in L_2]
    print(L_1 + L_2)
    

greedyAlgo(N)
