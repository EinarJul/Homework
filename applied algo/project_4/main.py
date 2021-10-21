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

message = input("Input message to be encoded")

"""
    FIXED LENGTH ENCODING
"""

unique_chars = list(set(message))

for each in unique_chars:
    print(each)

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


def sortbyProfit(tup):
    return tup[2]


def sortbyDeadline(tup):
    return tup[1]


jobs.sort(key=sortbyProfit, reverse=True)

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
optimal_sequence.sort(key=sortbyDeadline)
for each in optimal_sequence:
    print(each)
"""
    PROBLEM 5 KNAPSACK
"""

"""
    FRACTIONAL KNAPSACK
"""

"""
    BINARY KNAPSACK
"""

if __name__ == '__main__':
    travel_data = getNorwegianCities(data)
    # for each in travel_data:
    #     print(each)
    travel_graph = generateGraph(travel_data)
