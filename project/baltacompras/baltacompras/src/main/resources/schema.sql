/* Balta Compras DB
*
*   CREATE DATABASE balta_compras CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
*   USE balta_compras;
*
*   Rodar comando abaixo (após executar o gradle pela primeira vez), deve exibir 21 tabelas criadas
*   SHOW TABLES;
*
*/

CREATE TABLE setor (
     id INT AUTO_INCREMENT
    ,descricao VARCHAR(255)
    ,CONSTRAINT pk__setor PRIMARY KEY AUTO_INCREMENT (id)
);

CREATE TABLE centro_custo (
     id INT AUTO_INCREMENT
    ,descricao VARCHAR(255)
    ,valor_gasto REAL(10,2) NOT NULL
    ,valor_limite REAL(10,2) NOT NULL
    ,id_setor INT NOT NULL
    ,CONSTRAINT pk__centro_custo PRIMARY KEY AUTO_INCREMENT (id)
);

CREATE TABLE permissao (
     id INT AUTO_INCREMENT
    ,descricao VARCHAR(255)
    ,CONSTRAINT pk__permissao PRIMARY KEY AUTO_INCREMENT (id)
);

CREATE TABLE funcao (
     id INT AUTO_INCREMENT
    ,descricao VARCHAR(255)
    ,CONSTRAINT pk__funcao PRIMARY KEY AUTO_INCREMENT (id)
);

CREATE TABLE funcao_permissao (
    id_funcao INT
    ,id_permissao INT
    ,CONSTRAINT pk__funcao_permissao PRIMARY KEY AUTO_INCREMENT (id_funcao, id_permissao)
);

CREATE TABLE usuario (
     id INT AUTO_INCREMENT
    ,nome VARCHAR(255) NOT NULL
    ,email VARCHAR(255) NOT NULL UNIQUE
    ,hash_senha VARCHAR(255) NOT NULL
    ,status INT NOT NULL
    ,id_setor INT NOT NULL
    ,id_funcao INT NOT NULL
    ,CONSTRAINT pk__usuario PRIMARY KEY AUTO_INCREMENT (id)
);

CREATE TABLE grupo_produto (
     id INT AUTO_INCREMENT
    ,descricao VARCHAR(255)
    ,CONSTRAINT pk__grupo_produto PRIMARY KEY AUTO_INCREMENT (id)
);

CREATE TABLE produto (
     id INT AUTO_INCREMENT
    ,descricao VARCHAR(255)
    ,un_medida INT NOT NULL
    ,id_grupo_produto INT NOT NULL
    ,CONSTRAINT pk__produto PRIMARY KEY AUTO_INCREMENT (id)
);

CREATE TABLE requisicao (
     id INT AUTO_INCREMENT
    ,data DATETIME NOT NULL
    ,status INT NOT NULL
    ,observacoes TEXT
    ,id_usuario INT NOT NULL
    ,id_centro_custo INT NOT NULL
    ,CONSTRAINT pk__requisicao PRIMARY KEY AUTO_INCREMENT (id)
);

CREATE TABLE requisicao_produto (
    id_requisicao INT
    ,id_produto INT
    ,quantidade REAL(10, 2) NOT NULL
    ,id_grupo_cotacao_produto INT
    ,CONSTRAINT pk__requisicao_produto PRIMARY KEY AUTO_INCREMENT (id_requisicao, id_produto)
);

CREATE TABLE aprovacao_requisicao (
    id_requisicao INT
    ,id_usuario INT
    ,data DATETIME NOT NULL
    ,status INT NOT NULL
    ,observacoes TEXT
    ,CONSTRAINT pk__aprovacao_requisicao PRIMARY KEY AUTO_INCREMENT (id_requisicao, id_usuario)
);

CREATE TABLE fornecedor (
     id INT AUTO_INCREMENT
    ,cnpj VARCHAR(20) NOT NULL UNIQUE
    ,inscricao_estadual VARCHAR(30) NOT NULL UNIQUE
    ,razao_social VARCHAR(255) NOT NULL
    ,nome_fantasia VARCHAR(255)
    ,status INT NOT NULL
    ,email VARCHAR(255) NOT NULL
    ,telefone VARCHAR(20) NOT NULL
    ,cep VARCHAR(10) NOT NULL
    ,rua VARCHAR(255)
    ,numero INT
    ,complemento VARCHAR(255)
    ,bairro VARCHAR(255)
    ,cidade VARCHAR(255)
    ,estado VARCHAR(2)
    ,CONSTRAINT pk__fornecedor PRIMARY KEY AUTO_INCREMENT (id)
);

CREATE TABLE grupo_produto_fornecedor (
    id_fornecedor INT
    ,id_grupo_produto INT
    ,CONSTRAINT pk__grupoproduto_fornecedor PRIMARY KEY AUTO_INCREMENT (id_fornecedor, id_grupo_produto)
);

CREATE TABLE grupo_cotacao (
     id INT AUTO_INCREMENT
    ,data DATETIME NOT NULL
    ,prazo_solicitado DATE
    ,observacoes TEXT
    ,id_usuario INT
    ,CONSTRAINT pk__grupo_cotacao PRIMARY KEY AUTO_INCREMENT (id)
);

CREATE TABLE grupo_cotacao_produto (
     id INT AUTO_INCREMENT
    ,quantidade_total REAL(10, 2) NOT NULL
    ,id_grupo_cotacao INT NOT NULL
    ,CONSTRAINT pk__requisicao_produto PRIMARY KEY AUTO_INCREMENT (id)
);

CREATE TABLE cotacao (
     id INT AUTO_INCREMENT
    ,frete REAL(10, 2)
    ,desconto REAL(10, 2)
    ,prazo DATE NOT NULL
    ,selecionada BOOL
    ,transportadora VARCHAR(255)
    ,meio_transporte VARCHAR(255)
    ,status INT NOT NULL
    ,observacoes TEXT
    ,id_fornecedor INT NOT NULL
    ,id_grupo_cotacao INT NOT NULL
    ,CONSTRAINT pk__cotacao PRIMARY KEY AUTO_INCREMENT (id)
);

CREATE TABLE grupo_cotacao_produto_cotacao (
    id_cotacao INT
    ,id_grupo_cotacao_produto INT
    ,aliquota_ipi REAL(10, 2)
    ,preco_unitario REAL(10, 2)
    ,CONSTRAINT pk__grupo_cotacao_produto_cotacao PRIMARY KEY AUTO_INCREMENT (id_cotacao, id_grupo_cotacao_produto)
);

CREATE TABLE ordem_compra (
     id INT AUTO_INCREMENT
    ,data DATETIME NOT NULL
    ,tipo_compra INT NOT NULL
    ,status INT NOT NULL
    ,observacoes TEXT
    ,id_cotacao INT NOT NULL
    ,id_usuario INT NOT NULL
    ,CONSTRAINT pk__ordemcompra PRIMARY KEY AUTO_INCREMENT (id)
);

CREATE TABLE forma_pgto (
     id INT AUTO_INCREMENT
    ,descricao VARCHAR(255)
    ,CONSTRAINT pk__forma_pgto PRIMARY KEY AUTO_INCREMENT (id)
);

CREATE TABLE ordem_compra_forma_pgto (
    id_ordem_compra INT
    ,id_forma_pgto INT
    ,valor REAL(10, 2) NOT NULL
    ,observacoes TEXT
    ,CONSTRAINT pk__forma_pgto_ordem_compra PRIMARY KEY AUTO_INCREMENT (id_ordem_compra, id_forma_pgto)
);

CREATE TABLE aprovacao_ordem_compra (
    id_ordem_compra INT
    ,id_usuario INT
    ,data DATETIME NOT NULL
    ,status INT NOT NULL
    ,observacoes TEXT
    ,CONSTRAINT pk__aprovacao_ordem_compra PRIMARY KEY AUTO_INCREMENT (id_ordem_compra, id_usuario)
);

ALTER TABLE centro_custo ADD CONSTRAINT fk__centro_custo__setor
    FOREIGN KEY (id_setor)
    REFERENCES setor (id)
    ON DELETE RESTRICT;

ALTER TABLE usuario ADD CONSTRAINT fk__usuario__setor
    FOREIGN KEY (id_setor)
    REFERENCES setor (id)
    ON DELETE CASCADE;

ALTER TABLE usuario ADD CONSTRAINT fk__usuario__funcao
    FOREIGN KEY (id_funcao)
    REFERENCES funcao (id)
    ON DELETE CASCADE;

ALTER TABLE funcao__permissao ADD CONSTRAINT fk__funcao_permissao__permissao
    FOREIGN KEY (id_permissao)
    REFERENCES permissao (id)
    ON DELETE RESTRICT;

ALTER TABLE funcao__permissao ADD CONSTRAINT fk__funcao_permissao__funcao
    FOREIGN KEY (id_funcao)
    REFERENCES funcao (id);

ALTER TABLE produto ADD CONSTRAINT fk__produto__grupo_produto
    FOREIGN KEY (id_grupo_produto)
    REFERENCES grupo_produto (id)
    ON DELETE CASCADE;

ALTER TABLE requisicao ADD CONSTRAINT fk__requisicao__usuario
    FOREIGN KEY (id_usuario)
    REFERENCES usuario (id)
    ON DELETE CASCADE;

ALTER TABLE requisicao ADD CONSTRAINT fk__requisicao__centro_custo
    FOREIGN KEY (id_centro_custo)
    REFERENCES centro_custo (id)
    ON DELETE CASCADE;

ALTER TABLE requisicao_produto ADD CONSTRAINT fk__requisicao_produto__grupo_cotacao_produto
    FOREIGN KEY (id_grupo_cotacao_produto)
    REFERENCES grupo_cotacao_produto (id)
    ON DELETE CASCADE;

ALTER TABLE requisicao_produto ADD CONSTRAINT fk__requisicao_produto__produto
    FOREIGN KEY (id_produto)
    REFERENCES produto (id);

ALTER TABLE requisicao_produto ADD CONSTRAINT fk__requisicao_produto__requisicao
    FOREIGN KEY (id_requisicao)
    REFERENCES requisicao (id);

ALTER TABLE aprovacao_requisicao ADD CONSTRAINT fk__aprovacao_requisicao__requisicao
    FOREIGN KEY (id_requisicao)
    REFERENCES requisicao (id);

ALTER TABLE aprovacao_requisicao ADD CONSTRAINT fk__aprovacao_requisicao__usuario
    FOREIGN KEY (id_usuario)
    REFERENCES usuario (id);

ALTER TABLE grupo_cotacao ADD CONSTRAINT fk__grupo_cotacao__usuario
    FOREIGN KEY (id_usuario)
    REFERENCES usuario (id)
    ON DELETE CASCADE;

ALTER TABLE grupo_cotacao_produto ADD CONSTRAINT fk__grupo_cotacao_produto__grupo_cotacao
    FOREIGN KEY (id_grupo_cotacao)
    REFERENCES grupo_cotacao (id)
    ON DELETE RESTRICT;

ALTER TABLE cotacao ADD CONSTRAINT fk__cotacao__fornecedor
    FOREIGN KEY (id_fornecedor)
    REFERENCES fornecedor (id);

ALTER TABLE cotacao ADD CONSTRAINT fk__cotacao__grupo_cotacao
    FOREIGN KEY (id_grupo_cotacao)
    REFERENCES grupo_cotacao (id);

ALTER TABLE grupo_produto_fornecedor ADD CONSTRAINT fk__grupo_produto_fornecedor__grupo_produto
    FOREIGN KEY (id_grupo_produto)
    REFERENCES grupo_produto (id)
    ON DELETE RESTRICT;

ALTER TABLE grupo_produto_fornecedor ADD CONSTRAINT fk__grupo_produto_fornecedor__fornecedor
    FOREIGN KEY (id_fornecedor)
    REFERENCES fornecedor (id);

ALTER TABLE grupo_cotacao_produto_cotacao ADD CONSTRAINT fk__grupo_cotacao_produto_cotacao__grupo_cotacao_produto
    FOREIGN KEY (id_grupo_cotacao_produto)
    REFERENCES grupo_cotacao_produto (id)
    ON DELETE RESTRICT;

ALTER TABLE grupo_cotacao_produto_cotacao ADD CONSTRAINT fk__grupo_cotacao_produto_cotacao__cotacao
    FOREIGN KEY (id_cotacao)
    REFERENCES cotacao (id);

ALTER TABLE ordem_compra ADD CONSTRAINT fk__ordem_compra__cotacao
    FOREIGN KEY (id_cotacao)
    REFERENCES cotacao (id)
    ON DELETE CASCADE;

ALTER TABLE ordem_compra ADD CONSTRAINT fk__ordem_compra__usuario
    FOREIGN KEY (id_usuario)
    REFERENCES usuario (id)
    ON DELETE CASCADE;

ALTER TABLE ordem_compra_forma_pgto ADD CONSTRAINT fk__ordem_compra_forma_pgto__ordem_compra
    FOREIGN KEY (id_ordem_compra)
    REFERENCES ordem_compra (id);

ALTER TABLE ordem_compra_forma_pgto ADD CONSTRAINT fk__ordem_compra_forma_pgto__forma_pgto
    FOREIGN KEY (id_forma_pgto)
    REFERENCES forma_pgto (id);

ALTER TABLE aprovacao_ordem_compra ADD CONSTRAINT fk__aprovacao_ordem_compra__usuario
    FOREIGN KEY (id_usuario)
    REFERENCES usuario (id);

ALTER TABLE aprovacao_ordem_compra ADD CONSTRAINT fk__aprovacao_ordem_compra__ordem_compra
    FOREIGN KEY (id_ordem_compra)
    REFERENCES ordem_compra (id);