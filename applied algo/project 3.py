import csv
import sys
import random
from math import radians, sin, cos, asin, sqrt, acos, floor
import itertools

random.seed(205)
with open("worldcities.csv", encoding="utf-8", newline="") as f:
    reader = csv.reader(f)
    data = list(reader)
# We print and remove our reference for all other values in the array
print(data.pop(0))
print(data[0])
"""
BELOW IS EVERYTHING NEEDED FOR THE MERGE SORT ALGORITHM FOR PROJECT 3
"""

def haversine(lon1, lat1, lon2, lat2):
    lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])
    dlon = (lon2 - lon1)
    dlat = (lat2 - lat1)
    # lat1 = radians(lat1)
    # lat2 = radians(lat2)

    a = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlon / 2) ** 2
    c = 2 * asin(sqrt(a))
    return 6371 * c


def mergeSort(arr, count):
    if len(arr) > 1:

        q = len(arr) // 2
        left = arr[:q]
        right = arr[q:]

        mergeSort(left, count)
        mergeSort(right, count)

        i = j = k = 0

        while i < len(left) and j < len(right):
            if float(left[i][2]) <= float(right[j][2]):
                arr[k] = left[i]
                i += 1
                count[0] += 1
            else:
                arr[k] = right[j]
                j += 1
                count[0] += 1
            k += 1

        while i < len(left):
            arr[k] = left[i]
            count[0] += 1
            i += 1
            k += 1

        while j < len(right):
            arr[k] = right[j]
            count[0] += 1
            j += 1
            k += 1


def mergeSortTuple(arr, count):
    if len(arr) > 1:

        q = len(arr) // 2
        left = arr[:q]
        right = arr[q:]

        mergeSortTuple(left, count)
        mergeSortTuple(right, count)

        i = j = k = 0

        while i < len(left) and j < len(right):
            dist_left = haversine(float(left[i][2]), float(left[i][3]), 0, 0)
            dist_right = haversine(float(right[j][2]), float(right[j][3]), 0, 0)
            if dist_left <= dist_right:
                arr[k] = left[i]
                i += 1
                count[0] += 1
            else:
                arr[k] = right[j]
                j += 1
                count[0] += 1
            k += 1

        while i < len(left):
            arr[k] = left[i]
            i += 1
            k += 1
            count[0] += 1

        while j < len(right):
            arr[k] = right[j]
            j += 1
            k += 1
            count[0] += 1




# We define our counter for checking merge amounts
count = [0]
# We copy the data into separate arrays to manipulate
merge_arr = data.copy()
merge_arr_shuffle = data.copy()
merge_arr_tuple = data.copy()
# We shuffle one of them to verify if it takes longer with shuffled elements
random.shuffle(merge_arr_shuffle)
mergeSort(merge_arr, count)
print(count)
# We reset the counter
count = [0]
mergeSort(merge_arr_shuffle, count)
print(count)
# Verify that no elements were lost
print("Length of non-shuffled: {}, shuffled: {}, original {}".format(len(merge_arr), len(merge_arr_shuffle), len(data)))
count = [0]
mergeSortTuple(merge_arr_tuple, count)
print(count)

"""
    PRINTING MERGE SORT
"""
# for i in merge_arr:
#     print(i[2])
#
# for i in merge_arr_tuple:
#     print(i[2])

print("END OF MERGE SORT")
"""
BELOW IS EVERYTHING NEEDED FOR THE QUICK SORT ALGORITHM FOR PROJECT 3
"""


def quick_sort(arr, count):

    less = []
    greater = []

    if len(arr) > 1:

        pivot = arr.pop(random.randrange(len(arr)))

        for x in arr:
            if float(x[2]) < float(pivot[2]):
                count[0] += 1
                less.append(x)
            else:
                count[0] += 1
                greater.append(x)
        return quick_sort(less, count) + [pivot] + quick_sort(greater, count)
    else:
        return arr


def quick_sort_tuple(arr, count):

    less = []
    greater = []

    if len(arr) > 1:

        pivot = arr.pop(random.randrange(len(arr)))
        pivot_distance = haversine(float(pivot[2]), float(pivot[3]), 0, 0)

        for x in arr:
            count[0] += 1
            x_distance = haversine(float(x[2]), float(x[3]), 0, 0)
            if pivot_distance < x_distance:
                less.append(x)
            else:
                greater.append(x)
        return quick_sort_tuple(less, count) + [pivot] + quick_sort_tuple(greater, count)
    else:
        return arr

print("BEGINNING OF QUICKSORT")

quicksort_arr = data.copy()
quicksort_arr_shuffle = data.copy()
random.shuffle(quicksort_arr_shuffle)
quicksort_arr_tuple = data.copy()
count = [0]
quicksort_result = quick_sort(quicksort_arr, count)
print(count)
count = [0]

quicksort_shuffle_result = quick_sort(quicksort_arr_shuffle, count)
print(count)
count = [0]

quicksort_tuple_result = quick_sort_tuple(quicksort_arr_tuple, count)
print(count)


"""
    PRINTING QUICK SORT
"""

# for each in quicksort_result:
#     print(each[2])
#
# for each in quicksort_tuple_result:
#     print(each[2])

"""
BELOW IS EVERYTHING NEEDED FOR THE BINARY SEARCH ALGORITHM FOR PROJECT 3
"""


def binarySearch(arr, item):
    if len(arr) == 0:
        return False
    else:
        midpoint = len(arr) // 2
        if arr[midpoint][1].lower() == item[1].lower():
            return arr[midpoint]
        else:
            if item[0] < float(arr[midpoint][2]):
                return binarySearch(arr[:midpoint], item)
            else:
                return binarySearch(arr[midpoint + 1:], item)


target_city = input("What city are you trying to find? ")
target_location = float(input("Give its precise lat: "))
search_result = binarySearch(quicksort_result, [target_location, target_city])
print(search_result)

"""
BELOW IS EVERYTHING NEEDED FOR THE OPTIMAL BINARY SEARCH ALGORITHM FOR PROJECT 3
"""


class Node:
    # Made for debugging and keeping track of nodes by id value (creation value)
    newid = itertools.count()
    def __init__(self, city, lat, frequency, val):
        # City, lat and frequency are rather vital for comparisons later
        # val is here to keep as a reference from the original sorted array
        self.id = next(Node.newid)
        self.left = None
        self.right = None
        self.city = city
        self.lat = lat
        self.val = val
        self.frequency = frequency

    # We recursively ask the root node to go through its children until it finds a matching value
    # Since all values on the left are larger and all values on the right are smaller
    # we can use our lat values as a reference for traversing the tree
    def find_val(self, city, lat):
        if self.city.lower() == city.lower() and self.lat == lat:
            print("City: {}, Lat: {}".format(self.city, self.lat))
            print(self.val)
        else:
            if lat > self.lat:
                if self.right is None:
                    print("Value not found")
                else:
                    self.right.find_val(city, lat)
            if lat < self.lat:
                if self.left is None:
                    print("Value not found")
                else:
                    self.left.find_val(city, lat)


# Since each location has its own lat value we get all locations in Norway
# Would have to refine the function if we had a more defined data set due to loss of float point precision
norway_list = [x for x in quicksort_result if x[4] == "Norway"]
# Im not sure if it is accurate but making the frequency sum to 100% feels correct in this case
length = len(norway_list)
r = [random.random() for i in range(length)]
s = sum(r)
r = [i / s for i in r]

# We create each node from our norway list and append it to our array of nodes
node_list = []
for i in range(len(norway_list)):
    new_node = Node(norway_list[i][1], float(norway_list[i][2]), r[i], norway_list[i])
    node_list.append(new_node)

# Built from reference through CLRS (Introduction to Algorithms)
def optimal_tree(nodes):
    n = len(nodes)

    keys = nodes
    freqs = [nodes[i].frequency for i in range(n)]

    # dp stores the overall tree cost
    dp = [[freqs[i] if i == j else 0 for j in range(n)] for i in range(n)]

    # sumkeyfreq stores the sum of frequencies between i and j
    sum_key_freq = [[freqs[i] if i == j else 0 for j in range(n)] for i in range(n)]

    # stores the roots for the tree that is used later as reference for building the tree itself from the nodes
    root = [[i if i == j else 0 for j in range(n)] for i in range(n)]

    # The nested for loop goes through the upper triangle diagonal of our array
    # since our direct diagonal is already defined we put our first range to (2, n+1) instead of (1, n+1)
    for interval in range(2, n + 1):
        for i in range(n - interval + 1):
            j = i + interval - 1

            # we initialise the square with the maximum value
            dp[i][j] = sys.maxsize
            sum_key_freq[i][j] = sum_key_freq[i][j] + freqs[j]

            for r in range(root[i][j - 1], root[i + 1][j] + 1):
                # Here we calculate the cost of the right and left tree and compare it against other configurations
                # for the same node if the iteration is less costly we assign it to the dp and continue
                left = dp[i][r - 1] if r != i else 0
                right = dp[r + 1][j] if r != j else 0
                cost = left + sum_key_freq[i][j] + right

                if dp[i][j] > cost:
                    dp[i][j] = cost
                    root[i][j] = r

    # finally we build the tree and return our root node
    print("Optimal cost is {}".format(dp[0][-1]))
    build_tree(root, keys, 0, n - 1, -1, False)
    return keys[root[0][n - 1]]


def build_tree(root, key, i, j, parent, is_left):
    if i > j or i < 0 or j > len(root) - 1:
        return

    node = root[i][j]
    # All prints here are done to make checking searches faster
    if parent == -1:
        print("{} {} is the root of the binary search tree".format(key[node].city, key[node].lat))
    elif is_left:
        parent.left = key[node]
        print("{} {} is the left child of key {} {}".format(key[node].city, key[node].lat, parent.city, parent.lat))
    else:
        parent.right = key[node]
        print("{} {} is the right child of key {} {}".format(key[node].city, key[node].lat, parent.city, parent.lat))

    build_tree(root, key, i, node - 1, key[node], True)
    build_tree(root, key, node + 1, j, key[node], False)


root_node = optimal_tree(node_list)

# Printing current root_node city for reference
print(root_node.city)
searching = True

while searching:
    target_city = input("What Norwegian city do you want to find? ").lower()
    target_lat = float(input("What lat does the previous city have, be precise in lat: "))
    root_node.find_val(target_city, target_lat)
    contin = input("Search more? (y/n)").lower()
    if contin == "n" or contin == "no":
        searching = False
