from src.models.dish import Dish
from src.models.ingredient import Ingredient
import csv


# Req 3
class MenuData:
    def __init__(self, source_path: str) -> None:
        pass
        self.dishes = self.add_dishes(source_path)

    def add_dishes(self, path):
        dishes = {}

        with open(path, "r") as file:
            reader = csv.reader(file)
            next(reader)

            for i in reader:
                dish, price, ingredient, recipe_amount = i

                if dish not in dishes:
                    dishes[dish] = Dish(dish, float(price))

                ingredient = Ingredient(ingredient)
                dishes[dish].add_ingredient_dependency(
                    ingredient, int(recipe_amount)
                )

        return set(dishes.values())
