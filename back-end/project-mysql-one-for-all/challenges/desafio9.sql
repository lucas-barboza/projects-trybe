SELECT COUNT(historico.id_musica) AS 'musicas_no_historico'
FROM SpotifyClone.historico_reproducoes AS historico
INNER JOIN SpotifyClone.usuarios AS usuario
ON historico.id_usuario = usuario.id
WHERE usuario.nome_usuario = 'Barbara Liskov';