import math
import random
import matplotlib.pyplot as plt
import time
import numpy as np

def heapsort(arr):
    n = len(arr)
    buildMaxHeap(arr, n)

    for i in range(n-1, 0, -1):
        arr[i], arr[0] = arr[0], arr[i]
        heapify(arr, i, 0)

def buildMaxHeap(arr, n):
    for i in range(n//2, -1, -1):
        heapify(arr, n, i)

def heapify(arr, n, i):

    largest = i
    left = 2*i+1
    right = 2*i+2
    if (left < n) and (arr[left] > arr[largest]):
        largest = left

    if (right < n) and (arr[right] > arr[largest]):
        largest = right

    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)


num_arr = []
arr_size = []
arr_time = []
temp_arr = []
heapsort(num_arr)
n = len(num_arr)

while len(num_arr) < 5000:
    arr_time_temp = []
    num_arr.append(random.randint(0, 100))

    for i in range(300):
        # random.shuffle(num_arr)
        start_time = time.time_ns()
        heapsort(num_arr)
        arr_time_temp.append((time.time_ns() - start_time) / (10 ** 9))
    print("Test", len(num_arr))
    arr_time.append(sum(arr_time_temp)/len(arr_time_temp))
    arr_size.append(len(num_arr))

plt.plot(arr_size, arr_time)
arr_size, arr_time = np.array(arr_size), np.array(arr_time)
m, b = np.polyfit(arr_size, arr_time, 1)
plt.plot(arr_size, m*arr_size + b)
plt.xlabel("Size of arr")
plt.ylabel("Amount of time calculating")
plt.show()

# num_arr = []
# arr_size = []
# arr_time = []
# heapsort(num_arr)
# n = len(num_arr)

# while len(num_arr) < 2000:
#     num_arr.append(0)
#     random.shuffle(num_arr)
#     start_time = time.time_ns()
#     heapsort(num_arr)
#     arr_size.append(len(num_arr))
#     arr_time.append((time.time_ns()-start_time) / (10**9))


# plt.plot(arr_size, arr_time)
# num_arr, arr_time = np.array(num_arr), np.array(arr_time)
# m, b = np.polyfit(arr_size, arr_time, 1)
# plt.plot(arr_size, m*arr_size + b)
# plt.xlabel("Size of arr")
# plt.ylabel("Amount of time calculating")
# plt.show()
