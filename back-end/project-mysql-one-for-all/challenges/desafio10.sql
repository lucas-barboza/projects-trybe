USE SpotifyClone;

CREATE TABLE favoritas (
    id_usuario INT NOT NULL,
    musica_id INT NOT NULL,
    CONSTRAINT PRIMARY KEY (id_usuario , musica_id),
    FOREIGN KEY (id_usuario) REFERENCES SpotifyClone.usuarios(id),
    FOREIGN KEY (musica_id) REFERENCES musicas (id)
)  ENGINE=INNODB;

INSERT INTO favoritas (id_usuario, musica_id)
VALUES
  (1,3),
  (1,6),
  (1,10),
  (2,4),
  (3,1),
  (3,3),
  (4,7),
  (4,4),
  (5,10),
  (5,2),
  (8,4),
  (9,7),
  (10,3);