from src.models.dish import Dish  # noqa: F401, E261, E501
from src.models.ingredient import Ingredient
import pytest


# Req 2
def test_dish():
    pizza = Dish("pizza", 25.00)
    barbecue = Dish("churrasco", 150.00)

    assert barbecue.name == "churrasco"
    assert barbecue.__eq__(barbecue)
    assert barbecue.__eq__(pizza) is False
    assert hash(barbecue) == hash(barbecue)
    assert hash(barbecue) != hash(pizza)
    assert repr(barbecue) == "Dish('churrasco', R$150.00)"

    with pytest.raises(TypeError):
        Dish("churrasco", "1.50")
    with pytest.raises(ValueError):
        Dish("churrasco", -1.50)

    feat = Ingredient("carne")
    barbecue.add_ingredient_dependency(feat, 2)

    assert barbecue.get_restrictions() == feat.restrictions
    assert barbecue.get_ingredients() == {feat}
    assert barbecue.recipe == {feat: 2}
