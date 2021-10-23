from itertools import combinations
from math import radians, sin, cos, asin, sqrt
import csv
import numpy as np
import random

with open("worldcities.csv", encoding="utf-8", newline="") as f:
    reader = csv.reader(f)
    data = list(reader)
# We print and remove our reference for all other values in the array
print(data.pop(0))
print(data[0])

"""
    SHARED SCRIPTS
"""


def getNorwegianCities(data):
    return [x for x in data if x[4] == "Norway"]


def haversine(lon1, lat1, lon2, lat2):
    lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])
    dlon = (lon2 - lon1)
    dlat = (lat2 - lat1)
    # lat1 = radians(lat1)
    # lat2 = radians(lat2)

    a = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlon / 2) ** 2
    c = 2 * asin(sqrt(a))
    return 6371 * c


class Node:
    # newid = itertools.count()

    def __init__(self, city, lat, frequency):
        # self.id = next(Node.newid)
        self.left = None
        self.right = None
        self.city = city
        self.lat = lat
        self.frequency = frequency


"""
    PROBLEM 1 TRAVELING SALESPERSON TSP WITH NORWEGIAN CITIES
"""


def generateGraph(cities):
    travel_graph = []

    for i in range(len(cities)):
        vertex = []
        for j in range(len(cities)):
            if i == j:
                vertex.append(0)
            else:
                vertex.append(
                    haversine(float(cities[i][2]), float(cities[i][3]), float(cities[j][2]), float(cities[j][3])))

        travel_graph.append(vertex)

    return travel_graph


"""
    DYNAMIC APPROACH
"""

"""
    GREEDY APPROACH
"""

"""
    PROBLEM 2 MINIMUM SPANNING TREE
"""

"""
    PRIMS ALGORITHM
"""

"""
    KRUSKAL'S ALGORITHM
"""

"""
    PROBLEM 3 HUFFMAN CODING
"""

"""
    GENERATE MESSAGE
"""

Norwegian_letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t",
                     "u", "v", "w", "x", "y", "z", "æ", "ø", "å", " "]

# message = input("Input message to be encoded")

"""
    FIXED LENGTH ENCODING
"""

# unique_chars = list(set(message))

"""
    VARIABLE SIZE ENCODING
"""

"""
    PROBLEM 4 JOB SCHEDULING
"""

"""

    JOB GENERATOR
    
"""

jobs = []
id = 1
for i in range(50):
    curr_deadline = random.randint(0, 40)
    curr_profit = random.randint(0, 40)
    jobs.append((id, curr_deadline, curr_profit))
    id += 1


def job_sortbyProfit(tup):
    return tup[2]


def job_sortbyDeadline(tup):
    return tup[1]


jobs.sort(key=job_sortbyProfit, reverse=True)

"""
    JOB SOLVER 
"""


def jobscheduler(arr):
    optimal_sequence = []
    optimal_sequence.append(arr.pop(0))
    for i in range(len(arr)):
        if arr[i][1] not in [x[1] for x in optimal_sequence]:
            optimal_sequence.append(arr[i])

    return optimal_sequence


optimal_sequence = jobscheduler(jobs)
optimal_sequence.sort(key=job_sortbyDeadline)
# for each in optimal_sequence:
#     print(each)
"""
    PROBLEM 5 KNAPSACK
"""

"""
    INITIAL SCRIPTS
"""


class item:
    # newid = itertools.count()

    def __init__(self, weight, value):
        # self.id = next(Node.newid)
        self.weight = weight
        self.value = value


items_profit = open("p08_p.txt", "r").read().split("\n")
items_weight = open("p08_w.txt", "r").read().split("\n")
knapsack_capacity = open("p08_c.txt", "r").read()
knapsack_capacity = int("".join(knapsack_capacity))
items_profit = [int(x) for x in items_profit if x]
items_weight = [int(x) for x in items_weight if x]
print(len(items_profit))
print(len(items_weight))
print(knapsack_capacity)


def knapsack_sortbyProfit(items):
    return items[2]


items = []
for i in range(len(items_profit)):
    items.append((items_weight[i], items_profit[i], round(items_profit[i] / items_weight[i], 4)))

items.sort(key=knapsack_sortbyProfit, reverse=True)

"""
    FRACTIONAL KNAPSACK
"""


def fractional_knapsack(items, W):
    weight = 0
    knapsack = [0] * len(items)
    # items[i][0] is weight, items[i][1] is profit, items[i][2] is the cost ratio
    for i in range(len(items)):
        if weight + items[i][0] <= W:
            knapsack[i] = 1
            weight = weight + items[i][0]
        else:
            knapsack[i] = (W - weight) / items[i][0]
            weight = W
            break

    products = []
    product_list = []
    for i in range(len(knapsack)):
        if (knapsack[i] > 0):
            product_list.append(items[i])
        product = knapsack[i] * items[i][1]
        products.append(product)
    for each in product_list:
        print(each)
    print("Products of the knapsack: {}".format(products))
    print("sum of products: {}".format(sum(products)))
    return knapsack


fractional_solved = fractional_knapsack(items, knapsack_capacity)
# print(fractional_solved)
# total_sum = 0
# total_weight = 0
#
# for i in range(len(fractional_solved)):
#     total_sum += fractional_solved[i] * items[i][1]
#     total_weight += fractional_solved[i] * items[i][0]
#
# print(total_weight)
# print(total_sum)

"""
    BINARY KNAPSACK
"""


# n is the amount of elements
# c is the knapsack capacity
def initializeC(items, W):
    n = len(items)
    cArr = []
    for i in range(n):
        temp = []
        for j in range(W):
            temp.append(None)
        cArr.append(temp)
    return cArr



def binaryKnapsack(items, n, W, arr):
    if arr[n-1][W-1] != None:
        return arr[n-1][W-1]
    if n == 0 or W == 0:
        result = 0
    elif items[n][0] > W:
        result = binaryKnapsack(items, n - 1, W, arr)
    else:
        tmp_1 = binaryKnapsack(items, n - 1, W, arr)
        tmp_2 = binaryKnapsack(items, n - 1, W - items[n][1], arr)
        result = max(tmp_1, tmp_2)

    arr[n-1][W-1] = result
    print(arr[n-1][W-1])
    return result

test_arr = initializeC(items, knapsack_capacity)
print(len(test_arr), len(test_arr[0]))
print(len(items), knapsack_capacity)
yep = binaryKnapsack(items, len(items)-1, knapsack_capacity, test_arr)
print(yep)

if __name__ == '__main__':
    travel_data = getNorwegianCities(data)
    # for each in travel_data:
    #     print(each)
    travel_graph = generateGraph(travel_data)
