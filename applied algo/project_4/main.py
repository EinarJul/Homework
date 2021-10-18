import itertools
from math import radians, sin, cos, asin, sqrt
import csv

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
    newid = itertools.count()

    def __init__(self, city, lat, frequency):
        self.id = next(Node.newid)
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
            if i != j:
                vertex.append(haversine(float(cities[i][2]), float(cities[i][3]), float(cities[j][2]), float(cities[j][3])))

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
    FIXED LENGTH ENCODING
"""

"""
    VARIABLE SIZE ENCODING
"""

"""
    PROBLEM 4 JOB SCHEDULING
"""

"""
    PROBLEM 5 KNAPSACK
"""

if __name__ == '__main__':
    travel_data = getNorwegianCities(data)
    # for each in travel_data:
    #     print(each)
    travel_graph = generateGraph(travel_data)
    for each in travel_graph:
        print(each)

    print(len(travel_data))
    print(len(travel_graph))
    print(len(travel_graph[0]))
