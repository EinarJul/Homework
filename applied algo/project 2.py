import time
import itertools

incidence_matrix = [
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


def printMatrix(incidence):
    for i in range(len(incidence)):
        for j in range(len(incidence[0])):
            print(incidence[i][j], end=" ")
        print("")


def generateallStrings(nodes, curr_node, maxlength, string):
    # Strings = {"accepted": [], "rejected": []}
    all_strings = []
    current_node = curr_node

    if len(string) >= maxlength:
        if curr_node[0] == 1:
            # Strings["accepted"].append(string)
            all_strings.append([string, 1])
        else:
            all_strings.append([string, 0])
            # Strings["rejected"].append(string)
        # Strings.append(string)
        return all_strings

    for i in range(1, len(nodes[0])):
        successor = nodes[current_node[i] - 1]
        transition = str(currentDFALogic(i))
        method = generateallStrings(nodes, successor, maxlength, string + transition)
        if bool(method):
            method = [item for sublist in method for item in sublist]
            all_strings.append(method)
            # Strings = {key: Strings.get(key, []) + method.get(key, []) for key in
            #           set(list(Strings.keys()) + list(method.keys()))}
    return all_strings


def currentDFALogic(numb):
    # for our 8 state DFA it only translates 0's or 1's
    # since we know what index of our list corresponds to
    # we can use the modulo to return the correct value
    if 1 % numb == 0:
        return 0
    else:
        return 1


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

for i in range(0, max_length + 1):
    curr_result = generateallStrings(incidence_matrix, incidence_matrix[0], i, "")
    curr_result = [item for sublist in curr_result for item in sublist]
    curr_strings.append(curr_result)

curr_strings = [item for sublist in curr_strings for item in sublist]
curr_strings = [(curr_strings[i], curr_strings[i + 1]) for i in range(0, len(curr_strings), 2)]

# Example of a search in our tuple array
# print([item for item in curr_strings if item[0] == "0"])


print("program took", time.time() - start_time, "to run")

start_time = time.time()


class Nodes:
    newid = itertools.count()

    def __init__(self, state):
        self.id = next(Nodes.newid)
        # The node class will contain whether or not it is an accepting state or not
        self.state = state
        # The first node is connected via a 0, the second node is connected via a 1
        self.connected = []
        # val contains the associated string

    def traverseTree(self):
        if bool(self.connected):
            for node in self.connected:
                print("ID: {} Val: {} State: {}".format(node[1].id, node[0], node[1].state))
                node[1].traverseTree()

    def getChildrenStates(self):
        return [x.val for x in self.connected]

    def giveValues(self):
        return self.state,


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
            newNode = Nodes(state)
            node.connected.append([char, newNode])
            node = newNode


def findString(root: Nodes, word):
    node = root
    str = ""
    for char in word:
        char_not_found = True
        for child in node.connected:
            if char in child[0]:
                char_not_found = False
                str += child[0]
                node = child[1]
                break
        if char_not_found:
            return False

    print(str)
    return True


all_positive = [x[0] for x in curr_strings if 1 in x]
print(all_positive)
first_node = Nodes(0)
for each in curr_strings:
    buildTrie(first_node, each[0], each[1])
print("program took", time.time() - start_time, "to run")

for i in all_positive:
    print(findString(first_node, i))


# first_node.traverseTree()


def TrakhtenbrotandBarzdin(root: Nodes):
    unique_nodes = [root]
    breadth_first = []
    breadth_first.extend(unique_nodes[0].connected)

    for unique in unique_nodes:
        for candidate in breadth_first:
            if not bool(candidate.connected):
                if unique.state == candidate.state:
                    #no clue what to do here
                    unique_nodes[-1]

        curr_node = each
        curr_node_states = []

        # for unique in unique_nodes:
        #     for children in curr_node.connected:
        #         if not bool(children.connected):
        #             if unique.state == children.state:
        #                 unique.val.extend(children)
        #             unique_nodes[-1].val.extend(children.val)
        #
        #         elif len(children.connected) == len(curr_node.connected):
        #             if curr_node.getChildrenStates() == children.getChildrenStates():
        #                 curr_node.val.extend(children.val)
        #                 curr_node.connected = [curr_node if x == children else x for x in curr_node.connected]

# Old code here

# print(generateallStrings(incidence_matrix, incidence_matrix[0], ""))
# print(len(generateallStrings(incidence_matrix, incidence_matrix[0], "")["accepted"]) + len(generateallStrings(incidence_matrix, incidence_matrix[0], "")["rejected"]))

# Old tree solution, far less efficient and cannot handle values above approx 12
# def buildTree(states, longestl):
#     #
#     first_node = Nodes(0, "")
#     iternodes = [first_node]
#     for each in iternodes:
#         current_string = each.val
#         if len(current_string) == longestl:
#             break
#         for suffix in states:
#             new_string = current_string + suffix
#             if bool([item for item in curr_strings if item[0] == new_string]):
#                 state = [item for item in curr_strings if item[0] == new_string][0][1]
#             else:
#                 state = None
#             new_node = Nodes(state, new_string)
#             iternodes.append(new_node)
#             each.connected.append(new_node)
#     nodestate, nodeval = first_node.giveValues()
#     print(len(iternodes))
