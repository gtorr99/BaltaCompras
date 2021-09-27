-- Setores
INSERT INTO Setor(id_setor, descricao) VALUES(1, 'Compras');
INSERT INTO Setor(id_setor, descricao) VALUES(2, 'Almoxarifado');
INSERT INTO Setor(id_setor, descricao) VALUES(3, 'TI');

-- Centros de custo
INSERT INTO CentroCusto(id_centro_custo, descricao, valor_gasto, valor_limite, id_setor) VALUES(1, 'Controle de compras', 10000, 20000, 1);

INSERT INTO CentroCusto(id_centro_custo, descricao, valor_gasto, valor_limite, id_setor) VALUES(2, 'Controle de entradas e saídas', 10000, 15000, 2);

INSERT INTO CentroCusto(id_centro_custo, descricao, valor_gasto, valor_limite, id_setor) VALUES(3, 'Big data', 5000, 10000, 3);

INSERT INTO CentroCusto(id_centro_custo, descricao, valor_gasto, valor_limite, id_setor) VALUES(4, 'Help desk', 0, 1000, 3);

-- Permissões
INSERT INTO Permissao(id_permissao, descricao) VALUES(1, 'Administrador');

INSERT INTO Permissao(id_permissao, descricao) VALUES(2, 'Criar Requisição');
INSERT INTO Permissao(id_permissao, descricao) VALUES(3, 'Ler Requisição');
INSERT INTO Permissao(id_permissao, descricao) VALUES(4, 'Aprovar Requisição');

INSERT INTO Permissao(id_permissao, descricao) VALUES(5, 'Criar Cotação');
INSERT INTO Permissao(id_permissao, descricao) VALUES(6, 'Ler Cotação');

INSERT INTO Permissao(id_permissao, descricao) VALUES(7, 'Criar Ordem');
INSERT INTO Permissao(id_permissao, descricao) VALUES(8, 'Ler Ordem');
INSERT INTO Permissao(id_permissao, descricao) VALUES(9, 'Aprovar Ordem');


-- Funções
INSERT INTO Funcao(id_funcao, descricao) VALUES(1, 'Administrador');
INSERT INTO Funcao(id_funcao, descricao) VALUES(2, 'Comprador');
INSERT INTO Funcao(id_funcao, descricao) VALUES(3, 'Requisitante');
INSERT INTO Funcao(id_funcao, descricao) VALUES(4, 'Aprovador requisição');
INSERT INTO Funcao(id_funcao, descricao) VALUES(5, 'Aprovador ordem');

-- Funcao_Permissao
--Admin
INSERT INTO Funcao_Permissao(id_funcao, id_permissao) VALUES(1, 1);

-- Comprador
INSERT INTO Funcao_Permissao(id_funcao, id_permissao) VALUES(2, 3);
INSERT INTO Funcao_Permissao(id_funcao, id_permissao) VALUES(2, 5);
INSERT INTO Funcao_Permissao(id_funcao, id_permissao) VALUES(2, 6);
INSERT INTO Funcao_Permissao(id_funcao, id_permissao) VALUES(2, 7);
INSERT INTO Funcao_Permissao(id_funcao, id_permissao) VALUES(2, 8);

-- Requisitante
INSERT INTO Funcao_Permissao(id_funcao, id_permissao) VALUES(3, 2);
INSERT INTO Funcao_Permissao(id_funcao, id_permissao) VALUES(3, 3);

-- Aprovador Req
INSERT INTO Funcao_Permissao(id_funcao, id_permissao) VALUES(4, 2);
INSERT INTO Funcao_Permissao(id_funcao, id_permissao) VALUES(4, 3);
INSERT INTO Funcao_Permissao(id_funcao, id_permissao) VALUES(4, 4);

-- Aprovador Ordem
INSERT INTO Funcao_Permissao(id_funcao, id_permissao) VALUES(5, 3);
INSERT INTO Funcao_Permissao(id_funcao, id_permissao) VALUES(5, 6);
INSERT INTO Funcao_Permissao(id_funcao, id_permissao) VALUES(5, 7);
INSERT INTO Funcao_Permissao(id_funcao, id_permissao) VALUES(5, 8);
INSERT INTO Funcao_Permissao(id_funcao, id_permissao) VALUES(5, 9);

-- Usuarios
INSERT INTO Usuario(id_usuario, nome, email, hash_senha, status, id_setor, id_funcao) VALUES(1, 'Joel Nathan', 'joel_nathan@fatec.com', '00xFF-Hex', '1', 3, 1);

INSERT INTO Usuario(id_usuario, nome, email, hash_senha, status, id_setor, id_funcao) VALUES(2, 'Caue da Viola', 'caue_viola@fatec.com', '00xFF-Hex', '1', 3, 1);

INSERT INTO Usuario(id_usuario, nome, email, hash_senha, status, id_setor, id_funcao) VALUES(3, 'Gabriel Towers', 'gabriel_towers@fatec.com', '00xFF-Hex', '1', 3, 1);

INSERT INTO Usuario(id_usuario, nome, email, hash_senha, status, id_setor, id_funcao) VALUES(4, 'Vitor Valoroso', 'vitor_valoroso@fatec.com', '00xFF-Hex', '1', 1, 2);

INSERT INTO Usuario(id_usuario, nome, email, hash_senha, status, id_setor, id_funcao) VALUES(5, 'Jorge Ivelson', 'jorge_ivelson@fatec.com', '00xFF-Hex', '1', 2, 3);

INSERT INTO Usuario(id_usuario, nome, email, hash_senha, status, id_setor, id_funcao) VALUES(6, 'Boss do Ivelson', 'boss_ivelson@fatec.com', '00xFF-Hex', '1', 2, 4);

INSERT INTO Usuario(id_usuario, nome, email, hash_senha, status, id_setor, id_funcao) VALUES(7, 'Boss do Valoroso', 'boss_valoroso@fatec.com', '00xFF-Hex', '1', 1, 5);

-- Grupo produto
INSERT INTO GrupoProduto(id_grupo_produto, descricao) VALUES(1, 'Eletrônicos');
INSERT INTO GrupoProduto(id_grupo_produto, descricao) VALUES(2, 'Material de limpeza');

-- Produtos
INSERT INTO Produto(id_produto, descricao, un_medida, id_grupo_produto) VALUES(1, 'PS5', '1', 1);
INSERT INTO Produto(id_produto, descricao, un_medida, id_grupo_produto) VALUES(2, 'SSD Intel 1TB', '1', 1);
INSERT INTO Produto(id_produto, descricao, un_medida, id_grupo_produto) VALUES(3, 'Água sanitária', '2', 2);
INSERT INTO Produto(id_produto, descricao, un_medida, id_grupo_produto) VALUES(4, 'Sabão em pó', '3', 2);

-- Requisições
INSERT INTO Requisicao(id_requisicao, data, observacoes, status, id_usuario, id_centro_custo) VALUES(1, (select now()), 'Precisamos de um PS5 URGENTE na produção!', '1', 5, 2);

INSERT INTO Requisicao(id_requisicao, data, observacoes, status, id_usuario, id_centro_custo) VALUES(2, (select now()), 'Partiu uns SSDs topzeira', '1', 2, 4);

-- Requisição Produto
INSERT INTO Requisicao_Produto(id_requisicao, id_produto, quantidade) VALUES(1, 1, 2);
INSERT INTO Requisicao_Produto(id_requisicao, id_produto, quantidade) VALUES(1, 3, 10);
INSERT INTO Requisicao_Produto(id_requisicao, id_produto, quantidade) VALUES(1, 4, 15);

INSERT INTO Requisicao_Produto(id_requisicao, id_produto, quantidade) VALUES(2, 1, 5);
INSERT INTO Requisicao_Produto(id_requisicao, id_produto, quantidade) VALUES(2, 2, 20);
INSERT INTO Requisicao_Produto(id_requisicao, id_produto, quantidade) VALUES(2, 3, 5);

-- Aprovacao Requisição
INSERT INTO Aprovacao_Requisicao(id_requisicao, id_usuario, data, status) VALUES(1, 6, (select now()), '1');

-- Fornecedores
INSERT INTO Fornecedor(id_fornecedor, cnpj, inscricao_estadual, razao_social, nome_fantasia, status, email, telefone, cep, rua, numero, complemento, bairro, cidade, estado) VALUES(1, '00.000.000/0000-00', 'SP-SONY', 'Sony Inc.', 'Sony', '1', 'sony_ps5@gmail.com', '(00) 00000-0000', '18000-000', 'Rua dos Alfeneiros', 4, 'Em frente à Azkaban', 'Godrics Hollow', 'Sorocaba', 'SP');

INSERT INTO Fornecedor(id_fornecedor, cnpj, inscricao_estadual, razao_social, nome_fantasia, status, email, telefone, cep, rua, numero, complemento, bairro, cidade, estado) VALUES(2, '11.111.111/1111-11', 'SP-AMZ', 'Amazon', 'Amazon', '1', 'amazon5@gmail.com', '(00) 00000-0000', '18000-000','Rua dos Alfeneiros', 4, 'Em frente à Azkaban', 'Godrics Hollow', 'Sorocaba', 'SP');

INSERT INTO Fornecedor(id_fornecedor, cnpj, inscricao_estadual, razao_social, nome_fantasia, status, email, telefone, cep, rua, numero, complemento, bairro, cidade, estado) VALUES(3, '22.222.222/2222-22', 'SP-EXT', 'Extra Hipermercado', 'Extra', '1', 'extra@gmail.com', '(00) 00000-0000', '18000-000','Rua dos Alfeneiros', 4, 'Em frente à Azkaban', 'Godrics Hollow', 'Sorocaba', 'SP');

INSERT INTO Fornecedor(id_fornecedor, cnpj, inscricao_estadual, razao_social, nome_fantasia, status, email, telefone, cep, rua, numero, complemento, bairro, cidade, estado) VALUES(4, '33.333.333/3333-33', 'SP-RDL', 'Rede limpa', 'Rede Limpa', '1', 'rede_limpa@gmail.com', '(00) 00000-0000', '18000-000','Rua dos Alfeneiros', 4, 'Em frente à Azkaban', 'Godrics Hollow', 'Sorocaba', 'SP');

-- GrupoProduto Fornecedor
INSERT INTO GrupoProduto_Fornecedor(id_fornecedor, id_grupo_produto) VALUES(1, 1);

INSERT INTO GrupoProduto_Fornecedor(id_fornecedor, id_grupo_produto) VALUES(2, 1);
INSERT INTO GrupoProduto_Fornecedor(id_fornecedor, id_grupo_produto) VALUES(2, 2);

INSERT INTO GrupoProduto_Fornecedor(id_fornecedor, id_grupo_produto) VALUES(3, 1);
INSERT INTO GrupoProduto_Fornecedor(id_fornecedor, id_grupo_produto) VALUES(3, 2);

INSERT INTO GrupoProduto_Fornecedor(id_fornecedor, id_grupo_produto) VALUES(4, 2);

-- Grupo cotação
INSERT INTO GrupoCotacao(id_grupo_cotacao, data, prazo_solicitado, id_usuario) VALUES(1, (select now()), (select now()), 4);

INSERT INTO GrupoCotacao(id_grupo_cotacao, data, prazo_solicitado, id_usuario) VALUES(2, (select now()), (select now()), 4);

-- GrupoCotacao Produto
INSERT INTO GrupoCotacao_Produto(id_grupo_cotacao_produto, quantidade_total, id_grupo_cotacao) VALUES(1, 7, 1);
INSERT INTO GrupoCotacao_Produto(id_grupo_cotacao_produto, quantidade_total, id_grupo_cotacao) VALUES(2, 20, 1);
INSERT INTO GrupoCotacao_Produto(id_grupo_cotacao_produto, quantidade_total, id_grupo_cotacao) VALUES(3, 15, 2);
INSERT INTO GrupoCotacao_Produto(id_grupo_cotacao_produto, quantidade_total, id_grupo_cotacao) VALUES(4, 15, 2);

-- Atualiza Requisições Produto com o GrupoCotacao_Produto que agrupa o somatório das quantidades por produto
UPDATE Requisicao_Produto SET id_grupo_cotacao_produto = 1 WHERE id_produto = 1;
UPDATE Requisicao_Produto SET id_grupo_cotacao_produto = 2 WHERE id_produto = 2;
UPDATE Requisicao_Produto SET id_grupo_cotacao_produto = 3 WHERE id_produto = 3;
UPDATE Requisicao_Produto SET id_grupo_cotacao_produto = 4 WHERE id_produto = 4;

-- Cotacao
INSERT INTO Cotacao(id_cotacao, frete, desconto, prazo, selecionada, status, transportadora, meio_transporte, id_fornecedor, id_grupo_cotacao) VALUES(1, 515.9, 200, (select now()), false, '1', 'FedEx', 'Carro', 1, 1);

INSERT INTO Cotacao(id_cotacao, frete, desconto, prazo, selecionada, status, transportadora, meio_transporte, id_fornecedor, id_grupo_cotacao) VALUES(2, 200, 0, (select now()), true,  '3', 'UPS', 'Drone', 2, 1);

INSERT INTO Cotacao(id_cotacao, frete, desconto, prazo, selecionada, status, transportadora, meio_transporte, id_fornecedor, id_grupo_cotacao) VALUES(3, 100, 0, (select now()), false, '1', 'Aviação', 'Avião', 3, 1);

INSERT INTO Cotacao(id_cotacao, frete, desconto, prazo, selecionada, status, transportadora, meio_transporte, id_fornecedor, id_grupo_cotacao) VALUES(4, 200, 100, (select now()), false, '1', 'UPS', 'Drone', 2, 2);

INSERT INTO Cotacao(id_cotacao, frete, desconto, prazo, selecionada, status, transportadora, meio_transporte, id_fornecedor, id_grupo_cotacao) VALUES(5, 150, 50, (select now()), false, '1', 'Insiders', 'Submarino', 3, 2);

INSERT INTO Cotacao(id_cotacao, frete, desconto, prazo, selecionada, status, transportadora, meio_transporte, id_fornecedor, id_grupo_cotacao) VALUES(6, 0, 0, (select now()), true, '3', 'TransLimpa', 'Furgão da Limpeza', 4, 2);

-- GrupoCotacao_Produto_Cotacao
INSERT INTO GrupoCotacao_Produto_Cotacao(id_cotacao, id_grupo_cotacao_produto, aliquota_ipi, preco_unitario) VALUES(1, 1, 15, 5000);

INSERT INTO GrupoCotacao_Produto_Cotacao(id_cotacao, id_grupo_cotacao_produto, aliquota_ipi, preco_unitario) VALUES(1, 2, 10, 2000);

INSERT INTO GrupoCotacao_Produto_Cotacao(id_cotacao, id_grupo_cotacao_produto, aliquota_ipi, preco_unitario) VALUES(2, 1, 15, 6000);

INSERT INTO GrupoCotacao_Produto_Cotacao(id_cotacao, id_grupo_cotacao_produto, aliquota_ipi, preco_unitario) VALUES(2, 2, 10, 1500);

INSERT INTO GrupoCotacao_Produto_Cotacao(id_cotacao, id_grupo_cotacao_produto, aliquota_ipi, preco_unitario) VALUES(3, 1, 15, 6500);

INSERT INTO GrupoCotacao_Produto_Cotacao(id_cotacao, id_grupo_cotacao_produto, aliquota_ipi, preco_unitario) VALUES(3, 2, 10, 1800);

INSERT INTO GrupoCotacao_Produto_Cotacao(id_cotacao, id_grupo_cotacao_produto, aliquota_ipi, preco_unitario) VALUES(4, 3, 0.5, 4.25);

INSERT INTO GrupoCotacao_Produto_Cotacao(id_cotacao, id_grupo_cotacao_produto, aliquota_ipi, preco_unitario) VALUES(4, 4, 1, 25);

INSERT INTO GrupoCotacao_Produto_Cotacao(id_cotacao, id_grupo_cotacao_produto, aliquota_ipi, preco_unitario) VALUES(5, 3, 0.5, 4.25);

INSERT INTO GrupoCotacao_Produto_Cotacao(id_cotacao, id_grupo_cotacao_produto, aliquota_ipi, preco_unitario) VALUES(5, 4, 1, 23);

INSERT INTO GrupoCotacao_Produto_Cotacao(id_cotacao, id_grupo_cotacao_produto, aliquota_ipi, preco_unitario) VALUES(6, 3, 0.5, 3.5);

INSERT INTO GrupoCotacao_Produto_Cotacao(id_cotacao, id_grupo_cotacao_produto, aliquota_ipi, preco_unitario) VALUES(6, 4, 1, 21);

-- Ordem compra
INSERT INTO OrdemCompra(id_ordem_compra, data, tipo_compra, status, id_cotacao, id_usuario) VALUES(1, (select now()), '1', '1', 2, 4);

INSERT INTO OrdemCompra(id_ordem_compra, data, tipo_compra, status, id_cotacao, id_usuario) VALUES(2, (select now()), '1', '1', 6, 4);

-- Forma pagamento
INSERT INTO FormaPgto(id_forma_pgto, descricao) VALUES(1, 'Parcelado');
INSERT INTO FormaPgto(id_forma_pgto, descricao) VALUES(2, 'À vista');

-- Formas pgto da Ordem
INSERT INTO OrdemCompra_FormaPgto(id_ordem_compra, id_forma_pgto, observacoes, valor) VALUES(1, 1, 'Parcelado em 10x', 55200);

INSERT INTO OrdemCompra_FormaPgto(id_ordem_compra, id_forma_pgto, observacoes, valor) VALUES(2, 1, 'Parcelado em 2x', 200);

INSERT INTO OrdemCompra_FormaPgto(id_ordem_compra, id_forma_pgto, valor) VALUES(2, 2, 30);

-- Aprovação Ordem compra
INSERT INTO Aprovacao_OrdemCompra(id_ordem_compra, id_usuario, data, status) VALUES(1, 7, (select now()), '1');
INSERT INTO Aprovacao_OrdemCompra(id_ordem_compra, id_usuario, data, status) VALUES(2, 7, (select now()), '1');



	
