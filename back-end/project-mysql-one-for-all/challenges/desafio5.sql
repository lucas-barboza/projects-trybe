SELECT musica.nome_musica AS 'cancao', COUNT(historico.id_musica) AS 'reproducoes'
FROM SpotifyClone.musicas AS musica
INNER JOIN SpotifyClone.historico_reproducoes as historico
ON musica.id = historico.id_musica
GROUP BY musica.id
ORDER BY reproducoes DESC, cancao 
LIMIT 2;