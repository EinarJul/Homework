import sys
from math import radians, sin, cos, asin, sqrt
import csv
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

print()
print("HERE IS TSP")
print()


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

travel_data = getNorwegianCities(data)
# for each in travel_data:
#     print(each)
travel_graph = generateGraph(travel_data)

"""
    DYNAMIC APPROACH
"""

print()
print("HERE IS DYNAMIC TSP")
print()


def dynamicTSP(vertexes, value, traveled_path, memo):
    if len(vertexes) == 1:
        return vertexes[0][0]

    curr_path = traveled_path
    temp_vertexes = vertexes.copy()
    removed_vertex = temp_vertexes.pop(0)
    travel_costs = []


    # to solve the dynamic problem i have to create a script that does this
    # minimum { C_i->k + g(k, s-{k})}}


"""
    GREEDY APPROACH
"""

print()
print("HERE IS GREEDY TSP")
print()

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
print()
print("HERE IS HUFFMAN CODING")
print()
"""
    GENERATE MESSAGE
"""


class huffman_node:
    def __init__(self, key, frequency, left=None, right=None):
        # self.id = next(Node.newid)
        self.left = left
        self.right = right
        self.huff = ""
        self.key = key
        self.frequency = frequency


# Defined dict containing the valid Norwegian characters and space with their ascii counterparts
Norwegian_letters = {"a": "01100001", "b": "01100010", "c": "01100011", "d": "01100100", "e": "01100101",
                     "f": "01100110",
                     "g": "01100111", "h": "01101000", "i": "01101001", "j": "01101010", "k": "01101011",
                     "l": "01101100", "m": "01101101", "n": "01101110", "o": "01101111", "p": "01110000",
                     "q": "01110001",
                     "r": "01110010", "s": "01110011", "t": "01110100", "u": "01110101", "v": "01110110",
                     "w": "01110111", "x": "01111000", "y": "01111001", "z": "01111010", "æ": "10010001",
                     "ø": "11011000", "å": "10001111", " ": "01000001"}

# Simple verification of our message being valid
# We also do some simplification of the encoding by assuming some things about the messages
check_norwegian_characters = True
while check_norwegian_characters:
    message = input("Input message to be encoded")
    # for simplifying the answer we assume all messages to be lowercase and all message to have no spaces
    message = message.lower()
    for char in message:
        if char.lower() not in Norwegian_letters:
            only_norwegian_characters = True
            break
    else:
        break

"""
    FIXED LENGTH ENCODING
"""

print("")
print("         START OF FIXED LENGTH ENCODING         ")
print("")


# Here we generate all the binary's up to n bits for making unique key value pairs
def generateBinary(target_len, arr, pos, memo):
    if pos == target_len:
        memo.append(arr.copy())
        return
    arr[pos] = 0
    generateBinary(target_len, arr, pos + 1, memo)
    arr[pos] = 1
    generateBinary(target_len, arr, pos + 1, memo)


# Here we convert our original message into its binary counterpart
def convertmessagetoBinary(message, keys):
    message_holder = []
    for each in message:
        message_holder.append(keys.get(each))

    return "".join(message_holder)


# Here we convert the original message into its new minimised counterpart
def convertofixedlengthcode(message, keys):
    message_holder = []
    for each in message:
        message_holder.append(keys.get(each))

    return "".join(message_holder)


# same as above but in reverse to get back the original message
def convertbackfromfixedlengthcode(message, keys, intervals):
    message_holder = []

    segmeneted_message = [message[i:i + intervals] for i in range(0, len(message), intervals)]

    # we reverse the search on the dictionary finding the key based on the value
    for each in segmeneted_message:
        message_holder.append(list(keys.keys())[list(keys.values()).index(each)])

    return "".join(message_holder)


# Memo object for storing the n long binary codes
memo = []
# Frequency table for each unique character in our message
frequency_table = {char: message.count(char) for char in set(message)}
# Helper print for seeing the lengths of our messages and the expected n length binary codes
print("Len of frequency table {}. Binary length of same table {}".format(len(frequency_table),
                                                                         len(frequency_table).bit_length()))
unique_bit_length = len(frequency_table).bit_length()
arr = [0] * unique_bit_length
# Generate all binary strings of n length
generateBinary(unique_bit_length, arr, 0, memo)
# print("memo:", memo)
# print("Frequency table", frequency_table)
# Isolating for just the unique characters to assign unique key value pairs
unique_chars = [*frequency_table]
fixed_length_pairs = []
dict_length_pairs = {}
# Technically the huffman object array as it contains the ascii, codes, character representation and frequency
for i in range(len(unique_chars)):
    dict_length_pairs[unique_chars[i]] = "".join(map(str, memo[i]))
    fixed_length_pairs.append((Norwegian_letters[unique_chars[i]], unique_chars[i], "".join(map(str, memo[i])),
                               frequency_table[unique_chars[i]]))
binary_message = convertmessagetoBinary(message, Norwegian_letters)
print("Binary of curr message", binary_message)
print("Binary pairs to letters", dict_length_pairs)
for each in fixed_length_pairs:
    print(each)
converted_message = convertofixedlengthcode(message, dict_length_pairs)
print(converted_message)
print(convertbackfromfixedlengthcode(converted_message, dict_length_pairs, len(frequency_table).bit_length()))
new_message_sum = 0
old_message_sum = 0
for each in fixed_length_pairs:
    new_message_sum += len(each[0]) + len(each[2])
    old_message_sum += len(each[0]) * each[3]
new_message_sum += len(message) * len(fixed_length_pairs[0][2])

print("Bit length before: {}, Bit length with fixed encoding {}".format(old_message_sum, new_message_sum))

"""
    VARIABLE SIZE ENCODING
"""

print("")
print("         START OF VARIABLE SIZED ENCODING         ")
print("")


def constructminimumPairs(node, memo, val=""):
    newVal = val + str(node.huff)
    if node.left:
        constructminimumPairs(node.left, memo, newVal)
    if node.right:
        constructminimumPairs(node.right, memo, newVal)

    if not node.left and not node.right:
        memo.append((node.key, newVal))


def convertfromvariablelengthcode(message, keys):
    message_holder = []

    character_holder = ""
    # we reverse the search on the dictionary finding the key based on the value

    for each in message:
        character_holder += each
        if character_holder in keys.values():
            message_holder.append(list(keys.keys())[list(keys.values()).index(character_holder)])
            character_holder = ""

    return "".join(message_holder)


nodes = []
huffman_memo = []
for i, j in frequency_table.items():
    nodes.append(huffman_node(i, j))

while len(nodes) > 1:
    nodes = sorted(nodes, key=lambda x: x.frequency)

    left = nodes[0]
    right = nodes[1]

    left.huff = 0
    right.huff = 1

    newNode = huffman_node(left.key + right.key, left.frequency + right.frequency, left=left, right=right)

    nodes.remove(left)
    nodes.remove(right)
    nodes.append(newNode)

constructminimumPairs(nodes[0], huffman_memo)

for each in huffman_memo:
    print(each)

huffman_memo = dict(huffman_memo)

huffman_text_encoded = convertofixedlengthcode(message, huffman_memo)
huffman_text_decoded = convertfromvariablelengthcode(huffman_text_encoded, huffman_memo)
print(huffman_text_encoded)
print(huffman_text_decoded)
huffman_encoded_sum = 0
for each in frequency_table.keys():
    huffman_encoded_sum += 8 + len(huffman_memo[each]) + len(huffman_memo[each]) * frequency_table[each]
print("Previous bit length ", old_message_sum)
print("New bit length ", huffman_encoded_sum)

"""
    PROBLEM 4 JOB SCHEDULING
"""

"""

    JOB GENERATOR
    
"""

print("")
print("         START OF JOB SCHEDULING PROBLEM         ")
print("")

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
for each in optimal_sequence:
    print(each)
"""
    PROBLEM 5 KNAPSACK
"""

"""
    INITIAL SCRIPTS
"""

print("")
print("         START OF KNAPSACK PROBLEM         ")
print("")


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


def knapsack_sortbyProfit(items):
    return items[2]


items = []
for i in range(len(items_profit)):
    items.append((items_weight[i], items_profit[i], round(items_profit[i] / items_weight[i], 4)))

items.sort(key=knapsack_sortbyProfit, reverse=True)

"""
    FRACTIONAL KNAPSACK
"""
print("")
print("         START OF FRACTIONAL KNAPSACK PROBLEM         ")
print("")


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
    # for each in product_list:
    #     print(each)
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

print("")
print("         START OF BINARY KNAPSACK PROBLEM         ")
print("")


def altBinaryKnapsack(items, n, W, lookup, path):
    # Base case with negative capacity
    if W < 0:
        return -sys.maxsize

    # base case where either we have run out of items or have exactly no capacity left
    if n < 0 or W == 0:
        return 0

    # To save on computation we memoized the problem
    # We have a unique key for our dict that we pass into each call of this function
    # If the key is not unique then it just skips
    key = (n, W)
    if key not in lookup:
        # Outcome 1 include the item and account for decreased capacity
        include = items[n][1] + altBinaryKnapsack(items, n - 1, W - items[n][0], lookup, path)

        # Outcome 2 exclude item and move to the next item in the list
        exclude = altBinaryKnapsack(items, n - 1, W, lookup, path)

        # Compare if either outcome is better than the other
        lookup[key] = max(include, exclude)

    return lookup[key]


lookup = {}
path = []
# optimal value for the above problem is 13549094
print("Optimal result of the binary knapsack: ",
      altBinaryKnapsack(items, len(items) - 1, knapsack_capacity, lookup, path))


