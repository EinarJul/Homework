import time
import random
import itertools
import sys

"""
Hey okay so this whole file is a mess and I'm sorry for that
The general structure here is that this first part is our incidence matrixes
then below here we have our functions which will be commented
and below that you will find more large comment blocks that indicate which incidence matrix is being used
for which part
anyways, this works pretty quickly astonishingly and I hope this code can help you
"""
ten_incidence_matrix = [
    # first value indicates if it is accepting or not
    # all values afterwards indicate the connected node given an input
    # from the alphabet
    # as such for the basic 10 state DFA the second and third indexes are
    # 0 and 1 respectively and point to where node x points to when given that
    # input
    # node 1
    [0, 6, 7],
    # node 2
    [0, 10, 7],
    # node 3
    [0, 4, 4],
    # node 4
    [0, 10, 1],
    # node 5
    [1, 9, 3],
    # node 6
    [1, 6, 5],
    # node 7
    [1, 7, 10],
    # node 8
    [1, 2, 2],
    # node 9
    [0, 9, 1],
    # node 10
    [0, 8, 4]]

new_incidence_matrix = [
    # taken from solutions3 in ma224-g
    # node A
    [1, 2, 4],
    # node B
    [0, 5, 3],
    # node C
    [1, 2, 6],
    # node D
    [0, 1, 5],
    # node E
    [0, 5, 5],
    # node F
    [0, 3, 5]
]

grammatical_inference_matrix = [
    # node 1
    [0, 1, 2],
    # node 2
    [1, 1, 3],
    # node 3
    [0, 1, 1]
]

eight_incidence_matrix = [
    # node 1
    [1, 3, 2, 5],
    # node 2
    [0, 4, 1, 6],
    # node 3
    [0, 1, 4, 7],
    # node 4
    [0, 2, 3, 8],
    # node 5
    [0, 7, 6, 1],
    # node 6
    [0, 8, 5, 2],
    # node 7
    [0, 5, 8, 3],
    # node 8
    [0, 6, 7, 4]
]


# sorting for both int and str
# Not actually necessary since the DFA logic functions below return strings
# but hey its nice to have
def mixs(num):
    try:
        ele = int(num)
        return 0, ele, ''
    except ValueError:
        return 1, num, ''


# Basic print matrix for our incidence matrix, just to check if everything is alright quickly
# optional and was just here for early debugging
def printMatrix(incidence):
    for i in range(len(incidence)):
        for j in range(len(incidence[0])):
            print(incidence[i][j], end=" ")
        print("")


# Given an incidence matrix this will generate all strings of a certain length
# We for loop this later so that we generate all strings up to a certain string length
# ex, this will generate all strings of length 1, 2, 3 and then we merge those lists together
# The old implementation of this was to just make a python dictionary and sort based on rejected or accepted
# this however made building the node tree difficult later
# so a simpler tag and list system is used with a lot of list comprehension

# The general gist of this function however is that it recursively moves through our incidence matrix
# node 1 -> node 2, 3, 2 -> 4, 5 and so on and each layer is passed a string with an attached
# transition element, then when our string is equal to the max length we return upwards all our
# strings in an array with each recursive layer returning a larger and larger array
# this is depth first right hand favoured and the build Trie function is dependent on that in some ways
def generateallStrings(nodes, curr_node, maxlength, string):
    all_strings = []
    current_node = curr_node

    if len(string) >= maxlength:
        if curr_node[0] == 1:
            all_strings.append([string, 1])
        else:
            all_strings.append([string, 0])
        return all_strings

    for i in range(1, len(nodes[0])):
        successor = nodes[current_node[i] - 1]
        # This can be changed depending on the DFA in question
        # transition = str(currentDFALogic(i))
        transition = eightDFALogic(i)
        # transition = alternativeDFALogic(i)
        method = generateallStrings(nodes, successor, maxlength, string + transition)
        if bool(method):
            method = [item for sublist in method for item in sublist]
            all_strings.append(method)
    return all_strings


# The functions here describe the logic of our DFA, basically dependent on the transition elements
# This does mean that if for whatever reason we also wanted to handle NFA's with arbitrary
# numbers of transition elements this and the above function should be able to handle that
# It also allows us to handle any arbitrary amount of transitions from each node as we just add more clauses to our
# DFA logic
def currentDFALogic(numb):
    # for our 8 state DFA it only translates 0's or 1's
    # since we know what index of our list corresponds to
    # we can use the modulo to return the correct value
    if 1 % numb == 0:
        return 0
    else:
        return 1


def eightDFALogic(numb):
    if numb == 1:
        return "0"
    elif numb == 2:
        return "1"
    elif numb == 3:
        return "2"


def alternativeDFALogic(numb):
    if 1 % numb == 0:
        return "a"
    else:
        return "b"


# This class is the center to our solution as it is all the nodes that get generated later
# each node handles it own state, its value and it has a pointer to its parent for merging later
class Nodes:
    newid = itertools.count()

    def __init__(self, state, val, parent):
        self.id = next(Nodes.newid)
        # The node class will contain whether or not it is an accepting state or not
        self.state = state
        # The first node is connected via a 0, the second node is connected via a 1
        self.connected = []
        # val contains the associated string
        self.val = val
        # parent leads to the parent node
        self.parent = parent

    # Here we get to see the node tree in depth first search order, allowing us to quickly verify if the contents of
    # the tree are accurate or not Also dont use this if you have used the reduction algorithm because this will
    # infinitely loop from self pointing nodes
    def traverseTree(self):
        print("ID: {} Val: {} State: {}".format(self.id, self.val, self.state))
        children_nodes = self.returnNodes()
        print("My children: ID: {}, val: {}".format([x.id for x in children_nodes], [x[0] for x in self.connected]))
        if bool(self.connected):
            for node in self.connected:
                # connected is stored as a list of lists with char [0] and the next node [1]
                node[1].traverseTree()

    # Here we grab the children states of the node sorted by their values if they are out of order for whatever reason
    # ex: node 0 has in its connected array [["0", node1], ["1", node2], ["2", node3]]
    # and node 1 has [["1", node3], ["0", node4], ["2", node5]] and we wanted to compare them we would first need to
    # sort their arrays to make sure all transition elements are lined up in the return array
    def getChildrenStates(self):
        res = sorted(self.connected, key=lambda ele: (0, int(ele[0])) if ele[0].isdigit() else (1, ele[0]))
        states = []
        for each in res:
            states.append(each[1].state)
        # print(states)
        return states

    # This returns all the children nodes of the current node
    def returnNodes(self):
        return [x[1] for x in self.connected]

    # This is the key to our reduction algorithm, basically if our current node is not a leaf node
    # ((bool(self.connected) checks if it is an empty array or not) if it does have children we
    # go through each child generating the traversal tree further down but with the child's transition element added
    # ex: L=1 node0 would get a traversal array of ["0", "1"] and if it was L=2 we get ["00", "01", "0", "11", "10", "1"]
    # Once we hit a leaf node we just return all the string_arr upwards to the top like we did with our string
    # generation

    def generateTraversal(self, string, string_arr):
        if bool(self.connected):
            for node in self.connected:
                updated_string = string
                updated_string += node[0]
                node[1].generateTraversal(updated_string, string_arr)
        else:
            string_arr.append(string)
        return string_arr


# This quickly builds a Trie based on the accepting and rejecting states of our previous code
# Essentially given a "Word" and a state this will traverse through all the children of the tree if the child
# has the appropriate character transition value, eks: 010110 would require going from the root node to a node
# containing a 0, that node requires a transition of 1 and so on
# If at any point it fails to reach a character in the word it creates a new node and puts it into the
# children of the node it traversed too, this means that repeated words are traversed very quickly
# and new words are added quickly as well.
# This however is dependent on the order the words are given in because if a word like "01010" is added first
# with the state 0 then every new node along that path becomes that value
# This will be fixed by adding a check for if the current word has been finished and then adding the state
def buildTrie(root: Nodes, word, state):
    node = root
    for char in word:
        found_in_children = False
        for child in node.connected:
            # ["0", node_element1]
            # ["1", node_element2]
            if char in child[0]:
                node = child[1]
                found_in_children = True
                break
        if not found_in_children:
            newNode = Nodes(state, char, node)
            node.connected.append([char, newNode])
            node = newNode


# This lets us verify that once we have done DFA reduction that we can still generate all valid strings
# it works similarly to the build function only here it does not append new nodes
def findString(root: Nodes, word):
    node = root
    str = ""
    last_nodes_state = 0
    for char in word:
        char_not_found = True
        for child in node.connected:
            if char in child[0]:
                char_not_found = False
                str += child[0]
                node = child[1]
                last_nodes_state = node.state
                break
        if char_not_found:
            print("Either string is not in language")
            print("Or it is too long for the language")
            return False
    # print(str)
    return True, last_nodes_state


# Here is where we match the labels of our previously generated node tree, we pass in our unique and candidate nodes
# and a empty array at the start then if we are not at a leaf node we check if our current candidate and unique
# nodes from the same transitions go to the same states, if they do we add True to our array and otherwise
# if they do not match we add False and return early as they do not match
def matchlabels(unique: Nodes, candidate: Nodes, returned_states):
    curr_states = returned_states
    if bool(candidate.connected):
        if candidate.getChildrenStates() == unique.getChildrenStates():
            # print("TRUE")
            # print(candidate.id)
            # print(unique.id)
            curr_states.append(True)
            for i in range(len(candidate.connected)):
                curr_states = matchlabels(unique.connected[i][1], candidate.connected[i][1], curr_states)
        else:
            # print("FALSE")
            # print(candidate.id)
            # print(unique.id)
            curr_states.append(False)
            return curr_states

    return curr_states


def TrakhtenbrotandBarzdin(root: Nodes):
    # Steps
    # For each node we assume it is unique at the start, we then check all the criteria for if it is not unique
    # if its suffix and the unique node are the same and the candidates children lead to the same outcome
    # then we have a non unique node that can be merged upwards.
    # Otherwise the node is unique and will be added to the unique nodes and its nodes will be added to the
    # breadth first search array.
    # if at any point we hit a leaf node we just merge it to the next matching state unique node
    # Also a lot of debugging code is commented out here, feel free to uncomment it and see how it goes
    unique_nodes = [root]
    breadth_first = []
    breadth_first.extend(unique_nodes[0].returnNodes())
    is_unique = True
    for candidate in breadth_first:
        # print("Current bredth first search Id: {}, Val: {}".format([x.id for x in breadth_first],
        #                                                            [x.val for x in breadth_first]))
        # print("Current candidate id: {}".format(candidate.id))
        for unique in unique_nodes:
            # print("Current unique id: {}".format(unique.id))
            if bool(candidate.connected):
                if candidate.state == unique.state:
                    # print("This was reached somehow")
                    if is_unique:
                        # print("Current unique and candidate: {} {}".format(unique.id, candidate.id))
                        matched_labels = matchlabels(unique, candidate, [])
                        # print(matched_labels)
                        # print(all(matched_labels))
                        if all(matched_labels):
                            # print("NODE IS MERGED")
                            index = candidate.parent.connected.index([candidate.val, candidate])
                            candidate.parent.connected[index] = [candidate.val, unique]
                            is_unique = False
                            break

            else:
                # print("Current candidate and unique states {} {}".format(candidate.state, unique.state))
                # print("Current candidates parents nodes {}".format(candidate.parent.connected))
                if candidate.state == unique.state:
                    is_unique = False
                    index = candidate.parent.connected.index([candidate.val, candidate])
                    candidate.parent.connected[index] = [candidate.val, unique]
                    # print("ID: {} is a leaf node".format(candidate.id))
                    break
                continue

        # print("Is currently unique: {}".format(is_unique))
        if is_unique:
            # print("Compared against unique {}".format(unique.id))
            # print("Current node is unique {}".format(candidate.id))
            unique_nodes.append(candidate)
            breadth_first.extend(candidate.returnNodes())
            # print(is_unique)

        is_unique = True
    # print([x.id for x in unique_nodes])

    return unique_nodes


"""
THIS IS WHERE PART 3 OF THE PROBLEM STARTS  
"""


def generateaString(incidence_matrix, root_node, maxlength, string):
    current_node = root_node
    if (len(string) >= maxlength):
        if current_node[0] == 1:
            return [string, 1]
        else:
            return [string, 0]

    next_index = random.randint(1, len(current_node)-1)
    next_node = incidence_matrix[current_node[next_index]-1]
    transition = eightDFALogic(next_index)
    finished_string = generateaString(incidence_matrix, current_node, maxlength, string + transition)

    return finished_string



"""
HERE IS THE INPUT FOR MAX LENGTH OF STRING
"""
max_length = int(input("How long should the strings be? \n"))
curr_strings = []
start_time = time.time()
# Here we iterate through string lengths up to L = input
# We then append those elements to a list of curr_strings (formerly all_strings)
# we flatten the elements of the arrays first due to how our return from the function works
# we then also flatten curr_strings as it has an array of each returned element length
# ex: i= 0 ["", 0], i=1 [["0", 1], ["1",1]] with the curr_array then being [["", 0], [["0", 1], ["1", 1]]]
# so we flatten that out to just being a singular matrix of the ordered elements
# finally to simplify future searches we make every second element a tuple with the previous element
# giving us a final array of [("", 0), ("0", 1), ("1", 0)]

""""

BELOW IS THE EXAMPLE OF HOW TO USE AN INCIDENCE MATRIX TO GENERATE STRINGS
THEN TO FOLLOW UP WITH MAKING A TREE
AND FINALLY USING THE ALGORITHM
THE DFA USED IS BASED ON THE ONE FOUND IN SURVEY OF GRAMMATICAL INFERENCE ALGORITHMS

"""
# for i in range(0, max_length + 1):
#     curr_result = generateallStrings(grammatical_inference_matrix, grammatical_inference_matrix[0], i, "")
#     curr_result = [item for sublist in curr_result for item in sublist]
#     curr_strings.append(curr_result)
#
# curr_strings = [item for sublist in curr_strings for item in sublist]
# curr_strings = [(curr_strings[i], curr_strings[i + 1]) for i in range(0, len(curr_strings), 2)]
#
# example_first_node = Nodes(0, "", None)
#
# for each in curr_strings:
#     buildTrie(example_first_node, each[0], each[1])
#
# #example_first_node.traverseTree()
# test = TrakhtenbrotandBarzdin(example_first_node)
# for each in test:
#     print("Current Node Values (id {}, children, transition and state {})".format(each.id,
#                                                                                   [[x[0] for x in each.connected],
#                                                                                    [x[1].id for x in each.connected],
#                                                                                    [x[1].state for x in
#                                                                                     each.connected]]))

"""
 BELOW IS THE INCIDENCE MATRIX FROM SOLUTIONS 3 IN MA 224 G 21H
"""
# for i in range(0, max_length + 1):
#     curr_result = generateallStrings(new_incidence_matrix, new_incidence_matrix[0], i, "")
#     curr_result = [item for sublist in curr_result for item in sublist]
#     curr_strings.append(curr_result)
#
# curr_strings = [item for sublist in curr_strings for item in sublist]
# curr_strings = [(curr_strings[i], curr_strings[i + 1]) for i in range(0, len(curr_strings), 2)]
#
# example_first_node = Nodes(0, "", None)
#
# for each in curr_strings:
#     buildTrie(example_first_node, each[0], each[1])
#
# #example_first_node.traverseTree()
# test = TrakhtenbrotandBarzdin(example_first_node)
# for each in test:
#     print("Current Node Values (id {}, children, transition and state {})".format(each.id,
#                                                                                   [[x[0] for x in each.connected],
#                                                                                    [x[1].id for x in each.connected],
#                                                                                    [x[1].state for x in
#                                                                                     each.connected]]))


"""
 BELOW IS THE INCIDENCE MATRIX FOR THE 8 STATE 3 TRANSITION DFA
"""
# for i in range(0, max_length + 1):
#     curr_result = generateallStrings(eight_incidence_matrix, eight_incidence_matrix[0], i, "")
#     curr_result = [item for sublist in curr_result for item in sublist]
#     curr_strings.append(curr_result)
#
# curr_strings = [item for sublist in curr_strings for item in sublist]
# curr_strings = [(curr_strings[i], curr_strings[i + 1]) for i in range(0, len(curr_strings), 2)]
#
# first_node = Nodes(0, "", None)
#
# for each in curr_strings:
#     buildTrie(first_node, each[0], each[1])
#
# # example_first_node.traverseTree()
# print("GREEDY ALGORITHM <--------->")
# test = TrakhtenbrotandBarzdin(first_node)
#
# print("NEW TREE <----------->")
# print(test)
# for each in test:
#     print("Current Node Values (id {}, children, transition and state {})".format(each.id,
#                                                                                   [[x[0] for x in each.connected],
#                                                                                    [x[1].id for x in each.connected],
#                                                                                    [x[1].state for x in
#                                                                                     each.connected]]))

# sys.setrecursionlimit(1005)
# string_arr = []
# for i in range(1000):
#     generated_string = generateaString(eight_incidence_matrix, eight_incidence_matrix[0], max_length, "")
#     string_arr.append(generated_string)
#
# print(string_arr)
# print(len(string_arr))
# print(len(string_arr[0][0]))

"""
BELOW IS THE ACTUAL SOLUTION WE NEED
"""

for i in range(0, max_length + 1):
    curr_result = generateallStrings(ten_incidence_matrix, ten_incidence_matrix[0], i, "")
    curr_result = [item for sublist in curr_result for item in sublist]
    curr_strings.append(curr_result)

curr_strings = [item for sublist in curr_strings for item in sublist]
curr_strings = [(curr_strings[i], curr_strings[i + 1]) for i in range(0, len(curr_strings), 2)]
print(len(curr_strings))
# All strings have been generated successfully
print("program took", time.time() - start_time, "to run")
start_time = time.time()

first_node = Nodes(0, "", None)
for each in curr_strings:
    buildTrie(first_node, each[0], each[1])

print("program took", time.time() - start_time, "to run")

# first_node.traverseTree()

print("GREEDY ALGORITHM <--------->")
test = TrakhtenbrotandBarzdin(first_node)
print("NEW TREE <----------->")
print(test)
for each in test:
    print("Current Node Values (id {}, children, transition and state {})".format(each.id,
                                                                                  [[x[0] for x in each.connected],
                                                                                   [x[1].id for x in each.connected],
                                                                                   [x[1].state for x in
                                                                                    each.connected]]))

all_positive = [x[0] for x in curr_strings if 1 in x]
all_negative = [x[0] for x in curr_strings if 0 in x]

print("CHECKING ALL POSITIVE STRINGS")
for i in all_positive:
    print(findString(first_node, i))

print("CHECKING ALL NEGATIVE STRINGS")
for i in all_negative:
    print(findString(first_node, i))
