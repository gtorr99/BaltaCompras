/* BaltaCompras_DB */

/* Instalar MySQL */
-- Linux    - https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04
-- Windows  - https://dev.mysql.com/downloads/installer/

-- Ao final, rodar "show tables;" para confirmar 21 tabelas criadas

CREATE DATABASE balta_compras;
USE balta_compras;

CREATE TABLE Setor (
    id_setor INT
    ,descricao VARCHAR(255)
    ,CONSTRAINT PK__Setor PRIMARY KEY AUTO_INCREMENT (id_setor)
);

CREATE TABLE CentroCusto (
    id_centro_custo INT
    ,descricao VARCHAR(255)
    ,valor_gasto REAL(10,2) NOT NULL
    ,valor_limite REAL(10,2) NOT NULL
    ,id_setor INT NOT NULL
    ,CONSTRAINT PK__CentroCusto PRIMARY KEY AUTO_INCREMENT (id_centro_custo)
);

CREATE TABLE Permissao (
    id_permissao INT
    ,descricao VARCHAR(255)
    ,CONSTRAINT PK__Permissao PRIMARY KEY AUTO_INCREMENT (id_permissao)
);

CREATE TABLE Funcao (
    id_funcao INT
    ,descricao VARCHAR(255)
    ,CONSTRAINT PK__Funcao PRIMARY KEY AUTO_INCREMENT (id_funcao)
);

CREATE TABLE Funcao_Permissao (
    id_funcao INT
    ,id_permissao INT
    ,CONSTRAINT PK__Permissao_Funcao PRIMARY KEY AUTO_INCREMENT (id_funcao, id_permissao)
);

CREATE TABLE Usuario (
    id_usuario INT
    ,nome VARCHAR(255) NOT NULL
    ,email VARCHAR(255) NOT NULL UNIQUE
    ,hash_senha VARCHAR(255) NOT NULL
    ,status CHAR(1) NOT NULL
    ,id_setor INT NOT NULL
    ,id_funcao INT NOT NULL
    ,CONSTRAINT PK__Usuario PRIMARY KEY AUTO_INCREMENT (id_usuario)
);

CREATE TABLE GrupoProduto (
    id_grupo_produto INT
    ,descricao VARCHAR(255)
    ,CONSTRAINT PK__GrupoProduto PRIMARY KEY AUTO_INCREMENT (id_grupo_produto)
);

CREATE TABLE Produto (
    id_produto INT
    ,descricao VARCHAR(255)
    ,un_medida CHAR(1) NOT NULL
    ,id_grupo_produto INT NOT NULL
    ,CONSTRAINT PK__Produto PRIMARY KEY AUTO_INCREMENT (id_produto)
);

CREATE TABLE Requisicao (
    id_requisicao INT
    ,data DATETIME NOT NULL
    ,status CHAR(1) NOT NULL
    ,observacoes TEXT
    ,id_usuario INT NOT NULL
    ,id_centro_custo INT NOT NULL
    ,CONSTRAINT PK__Requisicao PRIMARY KEY AUTO_INCREMENT (id_requisicao)
);

CREATE TABLE Requisicao_Produto (
    id_requisicao INT
    ,id_produto INT
    ,quantidade REAL(10, 2) NOT NULL
    ,id_grupo_cotacao_produto INT
    ,CONSTRAINT PK__Requisicao_Produto PRIMARY KEY AUTO_INCREMENT (id_requisicao, id_produto)
);

CREATE TABLE Aprovacao_Requisicao (
    id_requisicao INT
    ,id_usuario INT
    ,data DATETIME NOT NULL
    ,status CHAR(1) NOT NULL
    ,observacoes TEXT
    ,CONSTRAINT PK__Aprovacao_Requisicao PRIMARY KEY AUTO_INCREMENT (id_requisicao, id_usuario)
);

CREATE TABLE Fornecedor (
    id_fornecedor INT
    ,cnpj VARCHAR(20) NOT NULL UNIQUE
    ,inscricao_estadual VARCHAR(30) NOT NULL UNIQUE
    ,razao_social VARCHAR(255) NOT NULL
    ,nome_fantasia VARCHAR(255)
    ,status CHAR(1) NOT NULL
    ,email VARCHAR(255) NOT NULL
    ,telefone VARCHAR(20) NOT NULL
    ,cep VARCHAR(10) NOT NULL
    ,rua VARCHAR(255)
    ,numero INT
    ,complemento VARCHAR(255)
    ,bairro VARCHAR(255)
    ,cidade VARCHAR(255)
    ,estado CHAR(2)
    ,CONSTRAINT PK__Fornecedor PRIMARY KEY AUTO_INCREMENT (id_fornecedor)
);

CREATE TABLE GrupoProduto_Fornecedor (
    id_fornecedor INT
    ,id_grupo_produto INT
    ,CONSTRAINT PK__GrupoProduto_Fornecedor PRIMARY KEY AUTO_INCREMENT (id_fornecedor, id_grupo_produto)
);

CREATE TABLE GrupoCotacao (
    id_grupo_cotacao INT
    ,data DATETIME NOT NULL
    ,prazo_solicitado DATE NOT NULL
    ,observacoes TEXT
    ,id_usuario INT NOT NULL
    ,CONSTRAINT PK__GrupoCotacao PRIMARY KEY AUTO_INCREMENT (id_grupo_cotacao)
);

CREATE TABLE GrupoCotacao_Produto (
    id_grupo_cotacao_produto INT
    ,quantidade_total REAL(10, 2) NOT NULL
    ,id_grupo_cotacao INT NOT NULL
    ,CONSTRAINT PK__Requisicao_Produto PRIMARY KEY AUTO_INCREMENT (id_grupo_cotacao_produto)
);

CREATE TABLE Cotacao (
    id_cotacao INT
    ,frete REAL(10, 2)
    ,desconto REAL(10, 2)
    ,prazo DATE NOT NULL
    ,selecionada BOOL
    ,transportadora VARCHAR(255)
    ,meio_transporte VARCHAR(255)
    ,status CHAR(1) NOT NULL
    ,observacoes TEXT
    ,id_fornecedor INT NOT NULL
    ,id_grupo_cotacao INT NOT NULL
    ,CONSTRAINT PK__Cotacao PRIMARY KEY AUTO_INCREMENT (id_cotacao)
);

CREATE TABLE GrupoCotacao_Produto_Cotacao (
    id_cotacao INT
    ,id_grupo_cotacao_produto INT
    ,aliquota_ipi REAL(10, 2)
    ,preco_unitario REAL(10, 2)
    ,CONSTRAINT PK__GrupoCotacao_Produto_Cotacao PRIMARY KEY AUTO_INCREMENT (id_cotacao, id_grupo_cotacao_produto)
);

CREATE TABLE OrdemCompra (
    id_ordem_compra INT
    ,data DATETIME NOT NULL
    ,tipo_compra CHAR(1) NOT NULL
    ,status CHAR(1) NOT NULL
    ,observacoes TEXT
    ,id_cotacao INT NOT NULL
    ,id_usuario INT NOT NULL
    ,CONSTRAINT PK__OrdemCompra PRIMARY KEY AUTO_INCREMENT (id_ordem_compra)
);

CREATE TABLE FormaPgto (
    id_forma_pgto INT
    ,descricao VARCHAR(255)
    ,CONSTRAINT PK__FormaPgto PRIMARY KEY AUTO_INCREMENT (id_forma_pgto)
);

CREATE TABLE OrdemCompra_FormaPgto (
    id_ordem_compra INT
    ,id_forma_pgto INT
    ,valor REAL(10, 2) NOT NULL
    ,observacoes TEXT
    ,CONSTRAINT PK__FormaPgto_OrdemCompra PRIMARY KEY AUTO_INCREMENT (id_ordem_compra, id_forma_pgto)
);

CREATE TABLE Aprovacao_OrdemCompra (
    id_ordem_compra INT
    ,id_usuario INT
    ,data DATETIME NOT NULL
    ,status CHAR(1) NOT NULL
    ,observacoes TEXT
    ,CONSTRAINT PK__Aprovacao_OrdemCompra PRIMARY KEY AUTO_INCREMENT (id_ordem_compra, id_usuario)
);
 
ALTER TABLE CentroCusto ADD CONSTRAINT FK__CentroCusto__Setor
    FOREIGN KEY (id_setor)
    REFERENCES Setor (id_setor)
    ON DELETE RESTRICT;
 
ALTER TABLE Usuario ADD CONSTRAINT FK__Usuario__Setor
    FOREIGN KEY (id_setor)
    REFERENCES Setor (id_setor)
    ON DELETE CASCADE;
 
ALTER TABLE Usuario ADD CONSTRAINT FK__Usuario__Funcao
    FOREIGN KEY (id_funcao)
    REFERENCES Funcao (id_funcao)
    ON DELETE CASCADE;

ALTER TABLE Funcao_Permissao ADD CONSTRAINT FK__Funcao_Permissao__Permissao
    FOREIGN KEY (id_permissao)
    REFERENCES Permissao (id_permissao)
    ON DELETE RESTRICT;
 
ALTER TABLE Funcao_Permissao ADD CONSTRAINT FK__Funcao_Permissao__Funcao
    FOREIGN KEY (id_funcao)
    REFERENCES Funcao (id_funcao);

ALTER TABLE Produto ADD CONSTRAINT FK__Produto__GrupoProduto
    FOREIGN KEY (id_grupo_produto)
    REFERENCES GrupoProduto (id_grupo_produto)
    ON DELETE CASCADE;
 
ALTER TABLE Requisicao ADD CONSTRAINT FK__Requisicao__Usuario
    FOREIGN KEY (id_usuario)
    REFERENCES Usuario (id_usuario)
    ON DELETE CASCADE;
 
ALTER TABLE Requisicao ADD CONSTRAINT FK__Requisicao__CentroCusto
    FOREIGN KEY (id_centro_custo)
    REFERENCES CentroCusto (id_centro_custo)
    ON DELETE CASCADE;
 
ALTER TABLE Requisicao_Produto ADD CONSTRAINT FK__Requisicao_Produto__GrupoCotacao_Produto
    FOREIGN KEY (id_grupo_cotacao_produto)
    REFERENCES GrupoCotacao_Produto (id_grupo_cotacao_produto)
    ON DELETE CASCADE;
 
ALTER TABLE Requisicao_Produto ADD CONSTRAINT FK__Requisicao_Produto__Produto
    FOREIGN KEY (id_produto)
    REFERENCES Produto (id_produto);
 
ALTER TABLE Requisicao_Produto ADD CONSTRAINT FK__Requisicao_Produto__Requisicao
    FOREIGN KEY (id_requisicao)
    REFERENCES Requisicao (id_requisicao);

ALTER TABLE Aprovacao_Requisicao ADD CONSTRAINT FK__Aprovacao_Requisicao__Requisicao
    FOREIGN KEY (id_requisicao)
    REFERENCES Requisicao (id_requisicao);

ALTER TABLE Aprovacao_Requisicao ADD CONSTRAINT FK__Aprovacao_Requisicao__Usuario
    FOREIGN KEY (id_usuario)
    REFERENCES Usuario (id_usuario);

ALTER TABLE GrupoCotacao ADD CONSTRAINT FK__GrupoCotacao__Usuario
    FOREIGN KEY (id_usuario)
    REFERENCES Usuario (id_usuario)
    ON DELETE CASCADE;
 
ALTER TABLE GrupoCotacao_Produto ADD CONSTRAINT FK__GrupoCotacao_Produto__GrupoCotacao
    FOREIGN KEY (id_grupo_cotacao)
    REFERENCES GrupoCotacao (id_grupo_cotacao)
    ON DELETE RESTRICT;
 
ALTER TABLE Cotacao ADD CONSTRAINT FK__Cotacao__Fornecedor
    FOREIGN KEY (id_fornecedor)
    REFERENCES Fornecedor (id_fornecedor);
 
ALTER TABLE Cotacao ADD CONSTRAINT FK__Cotacao__GrupoCotacao
    FOREIGN KEY (id_grupo_cotacao)
    REFERENCES GrupoCotacao (id_grupo_cotacao);
 
ALTER TABLE GrupoProduto_Fornecedor ADD CONSTRAINT FK__GrupoProduto_Fornecedor__GrupoProduto
    FOREIGN KEY (id_grupo_produto)
    REFERENCES GrupoProduto (id_grupo_produto)
    ON DELETE RESTRICT;
 
ALTER TABLE GrupoProduto_Fornecedor ADD CONSTRAINT FK__GrupoProduto_Fornecedor__Fornecedor
    FOREIGN KEY (id_fornecedor)
    REFERENCES Fornecedor (id_fornecedor);
 
ALTER TABLE GrupoCotacao_Produto_Cotacao ADD CONSTRAINT FK__GrupoCotacao_Produto_Cotacao__GrupoCotacao_Produto
    FOREIGN KEY (id_grupo_cotacao_produto)
    REFERENCES GrupoCotacao_Produto (id_grupo_cotacao_produto)
    ON DELETE RESTRICT;
 
ALTER TABLE GrupoCotacao_Produto_Cotacao ADD CONSTRAINT FK__GrupoCotacao_Produto_Cotacao__Cotacao
    FOREIGN KEY (id_cotacao)
    REFERENCES Cotacao (id_cotacao);

ALTER TABLE OrdemCompra ADD CONSTRAINT FK__OrdemCompra__Cotacao
    FOREIGN KEY (id_cotacao)
    REFERENCES Cotacao (id_cotacao)
    ON DELETE CASCADE;
 
ALTER TABLE OrdemCompra ADD CONSTRAINT FK__OrdemCompra__Usuario
    FOREIGN KEY (id_usuario)
    REFERENCES Usuario (id_usuario)
    ON DELETE CASCADE;
 
ALTER TABLE OrdemCompra_FormaPgto ADD CONSTRAINT FK__OrdemCompra_FormaPgto__OrdemCompra
    FOREIGN KEY (id_ordem_compra)
    REFERENCES OrdemCompra (id_ordem_compra);

ALTER TABLE OrdemCompra_FormaPgto ADD CONSTRAINT FK__OrdemCompra_FormaPgto__FormaPgto
    FOREIGN KEY (id_forma_pgto)
    REFERENCES FormaPgto (id_forma_pgto);

ALTER TABLE Aprovacao_OrdemCompra ADD CONSTRAINT FK__Aprovacao_OrdemCompra__Usuario
    FOREIGN KEY (id_usuario)
    REFERENCES Usuario (id_usuario);
 
ALTER TABLE Aprovacao_OrdemCompra ADD CONSTRAINT FK__Aprovacao_OrdemCompra__OrdemCompra
    FOREIGN KEY (id_ordem_compra)
    REFERENCES OrdemCompra (id_ordem_compra);