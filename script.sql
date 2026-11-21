CREATE DATABASE IF NOT EXISTS ReconstruindoOntem
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE ReconstruindoOntem;

DROP TABLE IF EXISTS SuaLembranca;

CREATE TABLE SuaLembranca (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  Nome VARCHAR(80) NOT NULL,
  Descricao VARCHAR(500) NOT NULL,
  Data_Escrita DATE NOT NULL,
  Hora_Escrita TIME NOT NULL,
  Criado_Em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  Atualizado_Em TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_data_escrita (Data_Escrita),
  INDEX idx_nome (Nome)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO SuaLembranca (Nome, Descricao, Data_Escrita, Hora_Escrita) VALUES
('Cheiro de café coado', 'Acordar cedo na casa dos meus avós com o som do rádio baixo na cozinha e o aroma de café passado na hora.', '2026-11-10', '08:15:00'),
('Chuva no telhado de zinco', 'Ficar na varanda observando a chuva forte de verão cair enquanto conversávamos sem pressa sobre o futuro.', '2026-11-12', '17:42:10'),
('Tarde jogando bola na rua', 'Ficar até escurecer jogando gol a gol com os amigos da vizinhança antes de entrar para jantar.', '2026-11-15', '18:30:00');
