SELECT submitted_date FROM northwind_test.purchase_orders
WHERE DATE(submitted_date) = '2006-04-26';