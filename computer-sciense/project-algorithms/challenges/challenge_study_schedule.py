def study_schedule(permanence_period, target_time):
    if verify_permanence_and_target(permanence_period, target_time) is False:
        return None
    count = 0
    for entrency, exit in permanence_period:
        if (entrency <= target_time <= exit):
            count += 1
    return count


def verify_permanence_and_target(permanence_period, target_time):
    if target_time is None or target_time < 0:
        return False
    for entrency, exit in permanence_period:
        if exit is None or entrency is None:
            return False
        if type(exit) is not int or type(entrency) is not int:
            return False
    return True
