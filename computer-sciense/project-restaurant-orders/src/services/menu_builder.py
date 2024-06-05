from typing import Dict, List

from services.inventory_control import InventoryMapping
from services.menu_data import MenuData

DATA_PATH = "data/menu_base_data.csv"
INVENTORY_PATH = "data/inventory_base_data.csv"


class MenuBuilder:
    def __init__(self, data_path=DATA_PATH, inventory_path=INVENTORY_PATH):
        self.menu_data = MenuData(data_path)
        self.inventory = InventoryMapping(inventory_path)

    def make_order(self, dish_name: str) -> None:
        try:
            curr_dish = [
                dish
                for dish in self.menu_data.dishes
                if dish.name == dish_name
            ][0]
        except IndexError:
            raise ValueError("Dish does not exist")

        self.inventory.consume_recipe(curr_dish.recipe)

    # Req 4
    def get_main_menu(self, restriction=None) -> List[Dict]:
        dishes_in_dict = []
        dishes_in_set = self.menu_data.dishes
        for dishe_in_set in dishes_in_set:
            if not restriction and self.inventory.check_recipe_availability(dishe_in_set.recipe):
                dishes_in_dict.append(
                    {
                        "dish_name": dishe_in_set.name,
                        "ingredients": dishe_in_set.recipe,
                        "price": dishe_in_set.price,
                        "restrictions": dishe_in_set.get_restrictions(),
                    }
                )
            else:
                if restriction not in dishe_in_set.get_restrictions() and self.inventory.check_recipe_availability(dishe_in_set.recipe):
                    dishes_in_dict.append(
                        {
                            "dish_name": dishe_in_set.name,
                            "ingredients": dishe_in_set.recipe,
                            "price": dishe_in_set.price,
                            "restrictions": dishe_in_set.get_restrictions(),
                        }
                    )
        return dishes_in_dict