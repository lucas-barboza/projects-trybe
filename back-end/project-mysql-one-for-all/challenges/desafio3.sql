SELECT usuario.nome_usuario AS 'pessoa_usuaria', COUNT(historico.id_usuario) as 'musicas_ouvidas', ROUND(SUM(musica.duracao_segundos) / 60, 2) AS 'total_minutos'
FROM SpotifyClone.usuarios AS usuario
INNER JOIN SpotifyClone.historico_reproducoes AS historico
ON usuario.id = historico.id_usuario
INNER JOIN SpotifyClone.musicas AS musica
ON historico.id_musica = musica.id
GROUP BY usuario.id
ORDER BY usuario.nome_usuario;