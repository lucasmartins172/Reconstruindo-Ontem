CREATE DATABASE IF NOT EXISTS ReconstruindoOntem
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE ReconstruindoOntem;

CREATE TABLE SuaLembranca (
  Quant INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  Nome VARCHAR(80) NOT NULL,
  Descricao VARCHAR(500) NOT NULL,
  Data_Escrita DATE NOT NULL DEFAULT (CURRENT_DATE), -- Data que a pessoa está fazendo a anotacao
  Hora_Escrita TIME NOT NULL DEFAULT (CURRENT_TIME), -- Hora que a pessoa está fazendo a anotacao
  Criado_Em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  Atualizado_Em TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  
  -- Índice para acelerar buscas por data e por nome
  INDEX idx_data_escrita (Data_Escrita),
  INDEX idx_nome (Nome)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;