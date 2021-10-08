import csv
import sys
import random
from math import radians, sin, cos, asin, sqrt, acos, floor
import itertools

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
            i += 1
            k += 1

        while j < len(right):
            arr[k] = right[j]
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

        while j < len(right):
            arr[k] = right[j]
            j += 1
            k += 1


#
# # We define our counter for checking merge amounts
# count = [0]
#
# # We copy the data into separate arrays to manipulate
# merge_arr = data.copy()
# merge_arr_shuffle = data.copy()
# merge_arr_tuple = data.copy()
# # We shuffle one of them to verify if it takes longer with shuffled elements
# random.shuffle(merge_arr_shuffle)
# mergeSort(merge_arr, count)
# print(count)
# # We reset the counter
# count = [0]
# mergeSort(merge_arr_shuffle, count)
# print(count)
# # Verify that no elements were lost
# print("Length of non-shuffled: {}, shuffled: {}, original {}".format(len(merge_arr), len(merge_arr_shuffle), len(data)))
# count = [0]
# mergeSortTuple(merge_arr_tuple, count)
# print(count)
#
# for i in range(1, len(merge_arr)):
#     if float(merge_arr[i - 1][2]) != float(merge_arr[i][2]) and float(merge_arr[i-1][2]) > float(merge_arr[i][2]):
#         print(merge_arr[i])

"""
BELOW IS EVERYTHING NEEDED FOR THE QUICK SORT ALGORITHM FOR PROJECT 3
"""


def quick_sort(arr, count):
    """Sort the array by using quicksort."""

    less = []
    greater = []

    if len(arr) > 1:

        pivot = arr.pop(random.randrange(len(arr)))

        for x in arr:
            count[0] += 1
            if float(x[2]) < float(pivot[2]):
                less.append(x)
            else:
                greater.append(x)
        return quick_sort(less, count) + [pivot] + quick_sort(greater, count)
    else:
        return arr


def quick_sort_tuple(arr, count):
    """Sort the array by using quicksort."""

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

print(len(quicksort_tuple_result), len(quicksort_result), len(quicksort_shuffle_result))

# for i in range(1, len(sort_test)):
#     if float(sort_test[i - 1][2]) != float(sort_test[i][2]) and float(sort_test[i-1][2]) > float(sort_test[i][2]):
#         print(sort_test[i])

# for i in range(len(quicksort_result)):
#     print("City: {}, Lat: {}".format(quicksort_result[i][0], quicksort_result[i][2]))

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


# target_city = input("What city are you trying to find? ")
# target_location = float(input("Give its precise lat: "))
# search_result = binarySearch(quicksort_result, [target_location, target_city])
# print(search_result)

"""
BELOW IS EVERYTHING NEEDED FOR THE OPTIMAL BINARY SEARCH ALGORITHM FOR PROJECT 3
"""


class Node:
    newid = itertools.count()

    def __init__(self, city, lat, frequency):
        self.id = next(Node.newid)
        self.left = None
        self.right = None
        self.city = city
        self.lat = lat
        self.frequency = frequency


norway_list = [x for x in quicksort_result if x[4] == "Norway"]
length = len(norway_list)
r = [random.random() for i in range(length)]
s = sum(r)
r = [i / s for i in r]

node_list = []
for i in range(len(norway_list)):
    new_node = Node(norway_list[i][1], norway_list[i][2], r[i])
    node_list.append(new_node)

for each in node_list:
    print(each.frequency)
