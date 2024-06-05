from challenges.challenge_encrypt_message import encrypt_message
import pytest


def test_encrypt_message():
    with pytest.raises(TypeError, match="tipo inválido para message"):
        encrypt_message(2, 4)

    with pytest.raises(TypeError, match="tipo inválido para key"):
        encrypt_message(2, "CruzeiroCabuloso")

    assert encrypt_message("LucasOliveira", 5) == "sacuL_arievilO"
    assert encrypt_message("LucasOliveira", 6) == "arievil_OsacuL"
    assert encrypt_message("LucasOliveira", 90) == "arievilOsacuL"