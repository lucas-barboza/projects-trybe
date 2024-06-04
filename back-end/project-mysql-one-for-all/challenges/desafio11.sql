SELECT album.nome_album AS 'album', COUNT(fav.musica_id) AS 'favoritadas'
FROM albuns AS album
LEFT JOIN musicas AS musica ON musica.albuns_id = album.id
LEFT JOIN favoritas AS fav ON fav.musica_id = musica.id
GROUP BY album.nome_album
ORDER BY favoritadas DESC, album
LIMIT 3;
