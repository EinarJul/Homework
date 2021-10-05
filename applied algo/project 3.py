import csv
import sys
import random

random.seed(52)
with open("worldcities.csv", encoding="utf-8", newline="") as f:
    reader = csv.reader(f)
    data = list(reader)


count = [0]
print(data.pop(0))
merge_arr = data.copy()
merge_arr_shuffle = data.copy()

def mergeSort(arr, merge_count):
    if len(arr) > 1:
        curr_count = merge_count

        mid = len(arr) // 2

        left_arr = arr[:mid]
        right_arr = arr[mid:]
        mergeSort(left_arr, curr_count)
        mergeSort(right_arr, curr_count)

        i = j = k = 0

        while i < len(left_arr) and j < len(right_arr):
            if left_arr[i][2] > right_arr[j][2]:
                curr_count[0] += 1
                arr[k] = left_arr[i]
                i += 1
            else:
                curr_count[0] += 1
                arr[k] = right_arr[j]
                j += 1
            k += 1

        while i < len(left_arr):
            curr_count[0] += 1
            arr[k] = left_arr[i]
            i += 1
            k += 1

        while j < len(right_arr):
            curr_count[0] += 1
            arr[k] = right_arr[j]
            j += 1
            k += 1


random.shuffle(merge_arr_shuffle)
print(merge_arr == merge_arr_shuffle)
mergeSort(data, count)
print(merge_arr == merge_arr_shuffle)
print(count)
count = [0]
mergeSort(merge_arr, count)
print(count)
# for i in range(len(data)):
#     print("City: {} Lat: {} Lng: {}".format(data[i][1], data[i][2], data[i][3]), end="\n")

