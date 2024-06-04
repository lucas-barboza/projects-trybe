SELECT usuario.nome_usuario AS 'pessoa_usuaria', IF(MAX(YEAR(historico.data_reproducao)) >= 2021, 'Ativa', 'Inativa') AS 'status_pessoa_usuaria'
FROM SpotifyClone.usuarios AS usuario
INNER JOIN SpotifyClone.historico_reproducoes AS historico
ON usuario.id = historico.id_usuario
GROUP BY pessoa_usuaria
ORDER BY usuario.nome_usuario;