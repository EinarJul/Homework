import os
import random
import shutil
import math

notation_path = f'{os.getcwd()}/annotations/'
training_path = f'{os.getcwd()}/training/'



fist_path = f'{os.getcwd()}/fist_jpg/'
palm_path = f'{os.getcwd()}/palm_jpg/'
hh_path = f'{os.getcwd()}/hh_jpg/'

dir_elements = len([name for name in os.listdir(hh_path) if os.path.isfile(os.path.join(hh_path, name))])

loop_amount = math.ceil((20*dir_elements)/100)

files = []
print("TESTING")
for i in range(loop_amount):
    file = random.choice(os.listdir(hh_path))
    while (file in files):
        file = random.choice(os.listdir(hh_path)) 
    files.append(file)

    print("/data/obj/" + file)


all_others = [name for name in os.listdir(hh_path) if os.path.isfile(os.path.join(hh_path, name)) and name not in files]
print("TRAINING")
for each in all_others:
    print("/data/obj/" + each)
