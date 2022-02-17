from PIL import Image
import os
import random
import shutil
import math


fist_path = f'{os.getcwd()}/fist/'
fist_jpg_path = f'{os.getcwd()}/fist_jpg/'
palm_path = f'{os.getcwd()}/palm/'
palm_jpg_path = f'{os.getcwd()}/palm_jpg/'
hh_path = f'{os.getcwd()}/hh/'
hh_jpg_path = f'{os.getcwd()}/hh_jpg/'

dir_elements = [name for name in os.listdir(hh_path) if os.path.isfile(os.path.join(hh_path, name))]

print(dir_elements)
for each in dir_elements:
    im1 = Image.open(hh_path + each)
    im1.save(hh_jpg_path + each[0:-4] +".jpg")



dir_elements = len([name for name in os.listdir(palm_path) if os.path.isfile(os.path.join(palm_path, name))])
loop_amount = math.ceil((20*dir_elements)/100)


all_files = [name for name in os.listdir(palm_path) if os.path.isfile(os.path.join(palm_path, name))]

print(all_files)

files = []
print("TESTING")
for i in range(loop_amount):
    file = random.choice(os.listdir(palm_path))
    while (file in files):
        file = random.choice(os.listdir(palm_path)) 
    files.append(file)

    print("/data/obj/" + file)


all_others = [name for name in os.listdir(palm_path) if os.path.isfile(os.path.join(palm_path, name)) and name not in files]
print("TRAINING")
for each in all_others:
    print("/data/obj/" + each)
