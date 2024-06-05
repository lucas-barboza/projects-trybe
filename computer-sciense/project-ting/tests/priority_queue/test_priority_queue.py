from ting_file_management.priority_queue import PriorityQueue
import pytest


def test_basic_priority_queueing():
    priority_queue = PriorityQueue()

    priority_queue.enqueue({"qtd_linhas": 6})
    assert len(priority_queue) == 1

    priority_queue.enqueue({"qtd_linhas": 2})
    priority_queue.enqueue({"qtd_linhas": 3})
    priority_queue.enqueue({"qtd_linhas": 4})
    priority_queue.enqueue({"qtd_linhas": 5})
    priority_queue.enqueue({"qtd_linhas": 7})
    priority_queue.enqueue({"qtd_linhas": 1})

    assert priority_queue.search(0) == {"qtd_linhas": 2}
    assert priority_queue.search(4) == {"qtd_linhas": 6}
    assert priority_queue.search(6) == {"qtd_linhas": 7}

    with pytest.raises(IndexError, match="Índice Inválido ou Inexistente"):
        priority_queue.search(len(priority_queue))
        priority_queue.search(len(priority_queue) + 1)

    assert priority_queue.dequeue() == {"qtd_linhas": 2}
    assert priority_queue.dequeue() == {"qtd_linhas": 3}
    assert priority_queue.dequeue() == {"qtd_linhas": 4}
    assert priority_queue.dequeue() == {"qtd_linhas": 1}
    assert priority_queue.dequeue() == {"qtd_linhas": 6}
    assert priority_queue.dequeue() == {"qtd_linhas": 5}
    assert priority_queue.dequeue() == {"qtd_linhas": 7}
    assert len(priority_queue) == 0
