SELECT 
    CASE
        WHEN us.idade <= 30 THEN 'Até 30 anos'
        WHEN us.idade BETWEEN 31 AND 60 THEN 'Entre 31 e 60 anos'
        ELSE 'Maior de 60 anos'
    END AS faixa_etaria,
    COUNT(DISTINCT us.id) AS total_pessoas_usuarias,
    COUNT(fav.id_usuario) AS total_favoritadas
FROM
    usuarios AS us
        LEFT JOIN
    favoritas AS fav ON fav.id_usuario = us.id
GROUP BY faixa_etaria
ORDER BY faixa_etaria;