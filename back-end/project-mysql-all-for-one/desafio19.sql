SELECT COUNT(*) AS 'orders_count' FROM northwind_test.orders
WHERE (employee_id = 5 OR employee_id = 6) AND shipper_id = 2;