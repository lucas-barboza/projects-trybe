SELECT art.nome_artista AS artista,
CASE
	WHEN COUNT(fav.musica_id) >= 5 THEN 'A'
	WHEN COUNT(fav.musica_id) BETWEEN 3 AND 4 THEN 'B'
	WHEN COUNT(fav.musica_id) BETWEEN 1 AND 2 THEN 'C'
	ELSE '-'
END AS ranking
FROM
    artistas AS art
        LEFT JOIN
    albuns AS alb ON alb.artista_id = art.id
        LEFT JOIN
    musicas AS mus ON mus.albuns_id = alb.id
        LEFT JOIN
    favoritas AS fav ON fav.musica_id = mus.id
GROUP BY art.nome_artista
ORDER BY COUNT(fav.musica_id) DESC, art.nome_artista;
