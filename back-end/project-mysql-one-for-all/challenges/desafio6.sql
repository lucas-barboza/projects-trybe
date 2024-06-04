SELECT FORMAT(MIN(plano.valor), 2) AS 'faturamento_minimo', FORMAT(MAX(plano.valor), 2) AS 'faturamento_maximo', FORMAT(AVG(plano.valor), 2) AS 'faturamento_medio', FORMAT(SUM(plano.valor), 2) AS 'faturamento_total'
FROM SpotifyClone.planos AS plano
INNER JOIN SpotifyClone.usuarios as usuario
ON plano.id = usuario.planos_id;