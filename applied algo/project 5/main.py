import math
import random
import matplotlib.pyplot as plt
import time
import math
import numpy as np


def heapsort(arr, operations=None):
    if operations is None:
        operations = [0]
    n = len(arr)
    buildMaxHeap(arr, n, operations)

    for i in range(n - 1, 0, -1):
        arr[i], arr[0] = arr[0], arr[i]
        heapify(arr, i, 0, operations)


def buildMaxHeap(arr, n, operations=None):
    if operations is None:
        operations = [0]
    for i in range(n // 2, -1, -1):
        heapify(arr, n, i, operations)


def heapify(arr, n, i, operations=None):
    if operations is None:
        operations = [0]
    operations[0] += 1
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2
    if (left < n) and (arr[left] > arr[largest]):
        largest = left

    if (right < n) and (arr[right] > arr[largest]):
        largest = right

    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)


def buildReverseHeap(arr, n):
    for i in range(n // 2, -1, -1):
        min_heapify(arr, n, i)


def min_heapify(arr, n, i):
    smallest = i
    left = 2 * i + 1
    right = 2 * i + 2
    if (left < n) and (arr[left] < arr[smallest]):
        smallest = left

    if (right < n) and (arr[right] < arr[smallest]):
        smallest = right

    if smallest != i:
        arr[i], arr[smallest] = arr[smallest], arr[i]
        heapify(arr, n, smallest)


def runSort(num_keys, num_test, step, key_no, method, operations=None):
    if operations is None:
        operations = []
    num_arr = []
    arr_size = []
    arr_time = []
    standard_dev = []
    total_operations = []
    total_steps = num_keys // step
    for k in range(total_steps):
        arr_time_temp = []
        for j in range(step):
            num_arr.append(key_no)
            key_no += 1
        if method == "b":
            buildMaxHeap(num_arr, len(num_arr))
        if method == "s":
            random.shuffle(num_arr)
        if method == "w":
            buildReverseHeap(num_arr, len(num_arr))
        for i in range(num_test):
            start_time = time.time_ns()
            heapsort(num_arr, operations)
            arr_time_temp.append((time.time_ns() - start_time) / (10 ** 9))
            total_operations.append(operations[0] - (sum(total_operations)))
        print("Test", len(num_arr))
        standard_dev.append(arr_time_temp)
        arr_time.append(sum(arr_time_temp) / len(arr_time_temp))
        arr_size.append(len(num_arr))
        #standard_dev[k] = math.sqrt(((arr_time[k] - (standard_dev[k] / num_test)) ** 2))
    return arr_size, arr_time, num_arr, standard_dev, total_operations


num_keys = 10000
num_test = 30
step_no = 20
key_no = 0
arr_size_s, arr_time_s, num_arr_s, standard_dev_s, operations_s = runSort(num_keys, num_test, step_no, key_no, "s", [0])
arr_size_w, arr_time_w, num_arr_w, standard_dev_w, operations_w = runSort(num_keys, num_test, step_no, key_no, "w", [0])
arr_size_b, arr_time_b, num_arr_b, standard_dev_b, operations_b = runSort(num_keys, num_test, step_no, key_no, "b", [0])

# Together
plt.plot(arr_size_s, arr_time_s, label="Standard case")
plt.plot(arr_size_w, arr_time_w, label="Worst case")
plt.plot(arr_size_b, arr_time_b, label="Best case")
plt.title('Heapsort 0 to {} keys, retest={}, step={}'.format(num_keys, num_test, step_no))
plt.xlabel("Size of tree")
plt.ylabel("Time sorting with an error of +- 16 milliseconds")
plt.legend()
plt.show()

#Seperate
plt.plot(arr_size_s, arr_time_s, label="Standard case")
plt.title('Heapsort standard 0 to {} keys, retest={}, step={}'.format(num_keys, num_test, step_no))
plt.xlabel("Size of tree")
plt.ylabel("Time sorting with an error of +- 16 milliseconds")
plt.show()

plt.plot(arr_size_w, arr_time_w, label="Worst case")
plt.title('Heapsort worst 0 to {} keys, retest={}, step={}'.format(num_keys, num_test, step_no))
plt.xlabel("Size of tree")
plt.ylabel("Time sorting with an error of +- 16 milliseconds")
plt.show()

plt.plot(arr_size_b, arr_time_b, label="Best case")
plt.title('Heapsort best 0 to {} keys, retest={}, step={}'.format(num_keys, num_test, step_no))
plt.xlabel("Size of tree")
plt.ylabel("Time sorting with an error of +- 16 milliseconds")
plt.show()

# Deviation
standard_dev_s = np.array(standard_dev_s)
temp = []
for i in range(len(standard_dev_s)):
    standard_dev_s[i] = standard_dev_s.std()
    temp.append(standard_dev_s[i][0])
plt.title('Heapsort standard 0 to {} keys, retest={}, step={} standard dev'.format(num_keys, num_test, step_no))
plt.errorbar(arr_size_s, arr_time_s, temp, linestyle='None', marker='^')
plt.show()

standard_dev_w = np.array(standard_dev_w)
temp = []
for i in range(len(standard_dev_w)):
    standard_dev_w[i] = standard_dev_w.std()
    temp.append(standard_dev_w[i][0])

plt.title('Heapsort worst 0 to {} keys, retest={}, step={} standard dev'.format(num_keys, num_test, step_no))
plt.errorbar(arr_size_w, arr_time_w, temp, linestyle='None', marker='^')
plt.show()


standard_dev_b = np.array(standard_dev_b)
temp = []
for i in range(len(standard_dev_b)):
    standard_dev_b[i] = standard_dev_b.std()
    temp.append(standard_dev_b[i][0])
plt.errorbar(arr_size_w, arr_time_w, temp, linestyle='None', marker='^')
plt.title('Heapsort best 0 to {} keys, retest={}, step={} standard dev'.format(num_keys, num_test, step_no))
plt.xlabel("Size of tree")
plt.ylabel("Time sorting with an error of +- 16 milliseconds")
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
