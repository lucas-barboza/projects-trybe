from src.models.ingredient import Ingredient, Restriction   # noqa: F401, E261, E501


# Req 1
def test_ingredient():
    cheese = Ingredient("queijo mussarela")
    ham = Ingredient("presunto")

    assert cheese.name == "queijo mussarela"

    assert hash(cheese) == hash(cheese)
    assert hash(cheese) != hash(ham)
    assert repr(cheese) == "Ingredient('queijo mussarela')"

    assert cheese.restrictions == {
        Restriction.LACTOSE,
        Restriction.ANIMAL_DERIVED,
    }

    assert cheese.__repr__() == "Ingredient('queijo mussarela')"

    assert cheese.__eq__(cheese)
    assert cheese.__eq__(ham) is False
