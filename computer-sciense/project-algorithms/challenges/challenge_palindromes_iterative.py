def is_palindrome_iterative(word):
    if word == "":
        return False
    inverseWord = word[::-1]
    if inverseWord == word:
        return True
    return False
