SELECT artista.nome_artista AS 'artista', album.nome_album AS 'album', COUNT(seguidor.id_artista) AS 'pessoas_seguidoras'
FROM SpotifyClone.artistas AS artista
INNER JOIN SpotifyClone.albuns AS album
ON artista.id = album.artista_id
INNER JOIN SpotifyClone.seguindo_artistas AS seguidor
ON artista_id = seguidor.id_artista
GROUP BY album.id
ORDER BY pessoas_seguidoras DESC, artista, album;