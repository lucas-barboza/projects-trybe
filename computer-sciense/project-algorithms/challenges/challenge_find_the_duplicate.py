def is_valid_input(nums):
    if not isinstance(nums, list) or len(nums) < 2:
        return False

    for num in nums:
        if not isinstance(num, int) or num < 1:
            return False

    return True


def find_duplicate(nums):
    if not is_valid_input(nums):
        return False

    seen = set()
    for num in nums:
        if num in seen:
            return num
        seen.add(num)

    return False
