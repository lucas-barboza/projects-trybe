SELECT COUNT(DISTINCT musica.id)	AS 'cancoes', COUNT(DISTINCT artista_id) AS 'artistas', COUNT(DISTINCT album.id) AS 'albuns'
FROM SpotifyClone.musicas AS musica
INNER JOIN SpotifyClone.albuns AS album
ON musica.albuns_id = album.id
INNER JOIN SpotifyClone.artistas AS artista
ON album.artista_id = artista.id;