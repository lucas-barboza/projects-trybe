def is_anagram(first_string, second_string):
    fist_sorted = mergeSort(first_string)
    second_sorted = mergeSort(second_string)
    if (
        fist_sorted == second_sorted and (first_string != ""
                                          or second_sorted != "")
    ):
        return fist_sorted, second_sorted, True

    return fist_sorted, second_sorted, False


def mergeSort(string):
    lower_string = string.lower()
    if len(lower_string) <= 1:
        return lower_string
    middle = len(lower_string) // 2
    half_left = mergeSort(lower_string[:middle])
    half_right = mergeSort(lower_string[middle:])
    return merge(half_left, half_right)


def merge(half_left, half_right):
    sorted_string = []
    i = 0
    j = 0

    while i < len(half_left) and j < len(half_right):
        if half_left[i] <= half_right[j]:
            sorted_string.append(half_left[i])
            i += 1
        else:
            sorted_string.append(half_right[j])
            j += 1

    sorted_string.extend(half_left[i:])
    sorted_string.extend(half_right[j:])

    return ''.join(sorted_string)
