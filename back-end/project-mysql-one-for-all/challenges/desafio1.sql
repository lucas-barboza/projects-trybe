DROP DATABASE IF EXISTS SpotifyClone;

  CREATE DATABASE IF NOT EXISTS SpotifyClone;

  CREATE TABLE SpotifyClone.planos(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome_plano VARCHAR(45) NOT NULL,
    valor DOUBLE NOT NULL
  ) engine = InnoDB;

  CREATE TABLE SpotifyClone.usuarios(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome_usuario VARCHAR(100) NOT NULL,
    idade INT NOT NULL,
    data_assinatura DATETIME NOT NULL,
    planos_id INT NOT NULL,
    FOREIGN KEY (planos_id) REFERENCES SpotifyClone.planos(id)
  ) engine = InnoDB;

  CREATE TABLE SpotifyClone.artistas(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome_artista VARCHAR(100) NOT NULL
  ) engine = InnoDB;

  CREATE TABLE SpotifyClone.albuns(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome_album VARCHAR(100) NOT NULL,
    ano_lancamento YEAR NOT NULL,
    artista_id INT NOT NULL,
    FOREIGN KEY (artista_id) REFERENCES SpotifyClone.artistas(id)
  ) engine = InnoDB;

  CREATE TABLE SpotifyClone.musicas(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome_musica VARCHAR(100) NOT NULL,
    duracao_segundos INT NOT NULL,
    albuns_id INT NOT NULL,
    FOREIGN KEY (albuns_id) REFERENCES SpotifyClone.albuns(id)
  ) engine = InnoDB;

  CREATE TABLE SpotifyClone.historico_reproducoes(
    id_usuario INT NOT NULL,
    id_musica INT NOT NULL,
    data_reproducao DATETIME NOT NULL,
    CONSTRAINT PRIMARY KEY(id_usuario, id_musica),
    FOREIGN KEY (id_usuario) REFERENCES SpotifyClone.usuarios(id),
    FOREIGN KEY (id_musica) REFERENCES SpotifyClone.musicas(id)
  ) engine = InnoDB;

  CREATE TABLE SpotifyClone.seguindo_artistas(
    id_usuario INT NOT NULL,
    id_artista INT NOT NULL,
    CONSTRAINT PRIMARY KEY(id_usuario, id_artista),
    FOREIGN KEY (id_usuario) REFERENCES SpotifyClone.usuarios(id),
    FOREIGN KEY (id_artista) REFERENCES SpotifyClone.artistas(id)
  ) engine = InnoDB;

  INSERT INTO SpotifyClone.planos (nome_plano, valor)
  VALUES
    ('gratuito', 0.00),
    ('pessoal', 6.99),
    ('universitário', 5.99),
    ('familiar', 7.99);

  INSERT INTO SpotifyClone.usuarios (nome_usuario, idade, data_assinatura, planos_id)
  VALUES
    ('Barbara Liskov', 82, '2019-10-20', 1),
    ('Robert Cecil Martin', 58, '2017-01-06', 1),
    ('Ada Lovelace', 37, '2017-12-30', 4),
    ('Martin Fowler', 46, '2017-01-17', 4),
    ('Sandi Metz', 58, '2018-04-29', 4),
    ('Paulo Freire', 19, '2018-02-14', 3),
    ('Bell Hooks', 26, '2018-01-05', 3),
    ('Christopher Alexander', 85, '2019-06-05', 2),
    ('Judith Butler', 45, '2020-05-13', 2),
    ('Jorge Amado', 58, '2017-02-17', 2);

  INSERT INTO SpotifyClone.artistas (nome_artista)
  VALUES
    ('Beyoncé'),
    ('Queen'),
    ('Elis Regina'),
    ('Baco Exu do Blues'),
    ('Blind Guardian'),
    ('Nina Simone');

  INSERT INTO SpotifyClone.albuns (nome_album, ano_lancamento, artista_id)
  VALUES
    ('Renaissance', 2022, 1),
    ('Jazz', 1978, 2),
    ('Hot Space', 1982, 2),
    ('Falso Brilhante', 1998, 3),
    ('Vento de Maio', 2001, 3),
    ('QVVJFA?', 2003, 4),
    ('Somewhere Far Beyond', 2007, 5),
    ('I Put A Spell On You', 2012, 6);

  INSERT INTO SpotifyClone.musicas (nome_musica, duracao_segundos, albuns_id)
  VALUES
    ('BREAK MY SOUL', 279, 1),
    ('VIRGO’S GROOVE', 369, 1),
    ('ALIEN SUPERSTAR', 116, 1),
    ('Don’t Stop Me Now', 203, 2),
    ('Under Pressure', 152, 3),
    ('Como Nossos Pais', 105, 4),
    ('O Medo de Amar é o Medo de Ser Livre', 207, 5),
    ('Samba em Paris', 267, 6),
    ('The Bard’s Song', 244, 7),
    ('Feeling Good', 100, 8);

  INSERT INTO SpotifyClone.historico_reproducoes (id_usuario, id_musica, data_reproducao)
  VALUES
    (1, 8, '2022-02-28 10:45:55'),
    (1, 2, '2020-05-02 05:30:35'),
    (1, 10, '2020-03-06 11:22:33'),
    (2, 10, '2022-08-05 08:05:17'),
    (2, 7, '2020-01-02 07:40:33'),
    (3, 10, '2020-11-13 16:55:13'),
    (3, 2, '2020-12-05 18:38:30'),
    (4, 8, '2021-08-15 17:10:10'),
    (5, 8, '2022-01-09 01:44:33'),
    (5, 5, '2020-08-06 15:23:43'),
    (6, 7, '2017-01-24 00:31:17'),
    (6, 1, '2017-10-12 12:35:20'),
    (7, 4, '2011-12-15 22:30:49'),
    (8, 4, '2012-03-17 14:56:41'),
    (9, 9, '2022-02-24 21:14:22'),
    (10, 3, '2015-12-13 08:30:22');
  
  INSERT INTO SpotifyClone.seguindo_artistas (id_usuario, id_artista)
  VALUES
    (1, 1),
    (1, 2),
    (1, 3),
    (2, 1),
    (2, 3),
    (3, 2),
    (4, 4),
    (5, 5),
    (5, 6),
    (6, 6),
    (6, 1),
    (7, 6),
    (9, 3),
    (10, 2);
  