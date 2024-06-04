SELECT artista.nome_artista AS 'artista', album.nome_album AS 'album'
FROM SpotifyClone.artistas AS artista
INNER JOIN SpotifyClone.albuns AS album
ON artista.id = album.artista_id
WHERE artista.nome_artista = 'Elis Regina';