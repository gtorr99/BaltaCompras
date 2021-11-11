-- setores
INSERT INTO setor(id, descricao) VALUES(1, 'compras');
INSERT INTO setor(id, descricao) VALUES(2, 'almoxarifado');
INSERT INTO setor(id, descricao) VALUES(3, 'ti');

-- centros de custo
INSERT INTO centro_custo(id, descricao, valor_gasto, valor_limite, id_setor) VALUES(1, 'controle de compras', 10000, 20000, 1);

INSERT INTO centro_custo(id, descricao, valor_gasto, valor_limite, id_setor) VALUES(2, 'controle de entradas e saídas', 10000, 15000, 2);

INSERT INTO centro_custo(id, descricao, valor_gasto, valor_limite, id_setor) VALUES(3, 'big data', 5000, 10000, 3);

INSERT INTO centro_custo(id, descricao, valor_gasto, valor_limite, id_setor) VALUES(4, 'help desk', 0, 1000, 3);

-- permissões
INSERT INTO permissao(id, descricao) VALUES(1, 'administrador');

INSERT INTO permissao(id, descricao) VALUES(2, 'criar requisicao');
INSERT INTO permissao(id, descricao) VALUES(3, 'ler requisicao');
INSERT INTO permissao(id, descricao) VALUES(4, 'aprovar requisicao');

INSERT INTO permissao(id, descricao) VALUES(5, 'criar cotacao');
INSERT INTO permissao(id, descricao) VALUES(6, 'ler cotacao');

INSERT INTO permissao(id, descricao) VALUES(7, 'criar ordem');
INSERT INTO permissao(id, descricao) VALUES(8, 'ler ordem');
INSERT INTO permissao(id, descricao) VALUES(9, 'aprovar ordem');


-- funcões
INSERT INTO funcao(id, descricao) VALUES(1, 'administrador');
INSERT INTO funcao(id, descricao) VALUES(2, 'comprador');
INSERT INTO funcao(id, descricao) VALUES(3, 'requisitante');
INSERT INTO funcao(id, descricao) VALUES(4, 'aprovador requisicao');
INSERT INTO funcao(id, descricao) VALUES(5, 'aprovador ordem');

-- funcao_permissao
--admin
INSERT INTO funcao_permissao(id_funcao, id_permissao) VALUES(1, 1);

-- comprador
INSERT INTO funcao_permissao(id_funcao, id_permissao) VALUES(2, 3);
INSERT INTO funcao_permissao(id_funcao, id_permissao) VALUES(2, 5);
INSERT INTO funcao_permissao(id_funcao, id_permissao) VALUES(2, 6);
INSERT INTO funcao_permissao(id_funcao, id_permissao) VALUES(2, 7);
INSERT INTO funcao_permissao(id_funcao, id_permissao) VALUES(2, 8);

-- requisitante
INSERT INTO funcao_permissao(id_funcao, id_permissao) VALUES(3, 2);
INSERT INTO funcao_permissao(id_funcao, id_permissao) VALUES(3, 3);

-- aprovador req
INSERT INTO funcao_permissao(id_funcao, id_permissao) VALUES(4, 2);
INSERT INTO funcao_permissao(id_funcao, id_permissao) VALUES(4, 3);
INSERT INTO funcao_permissao(id_funcao, id_permissao) VALUES(4, 4);

-- aprovador ordem
INSERT INTO funcao_permissao(id_funcao, id_permissao) VALUES(5, 3);
INSERT INTO funcao_permissao(id_funcao, id_permissao) VALUES(5, 6);
INSERT INTO funcao_permissao(id_funcao, id_permissao) VALUES(5, 7);
INSERT INTO funcao_permissao(id_funcao, id_permissao) VALUES(5, 8);
INSERT INTO funcao_permissao(id_funcao, id_permissao) VALUES(5, 9);

-- usuarios
INSERT INTO usuario(id, nome, email, hash_senha, status, id_setor, id_funcao) VALUES(1, 'joel nathan', 'joel_nathan@fatec.com', '00xff-hex', 0, 3, 1);

INSERT INTO usuario(id, nome, email, hash_senha, status, id_setor, id_funcao) VALUES(2, 'caue da viola', 'caue_viola@fatec.com', '00xff-hex', 6, 3, 1);

INSERT INTO usuario(id, nome, email, hash_senha, status, id_setor, id_funcao) VALUES(3, 'gabriel towers', 'gabriel_towers@fatec.com', '00xff-hex', 6, 3, 1);

INSERT INTO usuario(id, nome, email, hash_senha, status, id_setor, id_funcao) VALUES(4, 'vitor valoroso', 'vitor_valoroso@fatec.com', '00xff-hex', 6, 1, 2);

INSERT INTO usuario(id, nome, email, hash_senha, status, id_setor, id_funcao) VALUES(5, 'jorge ivelson', 'jorge_ivelson@fatec.com', '00xff-hex', 6, 2, 3);

INSERT INTO usuario(id, nome, email, hash_senha, status, id_setor, id_funcao) VALUES(6, 'boss do ivelson', 'boss_ivelson@fatec.com', '00xff-hex', 6, 2, 4);

INSERT INTO usuario(id, nome, email, hash_senha, status, id_setor, id_funcao) VALUES(7, 'boss do valoroso', 'boss_valoroso@fatec.com', '00xff-hex', 6, 1, 5);

-- grupo produto
INSERT INTO grupo_produto(id, descricao) VALUES(1, 'eletronicos');
INSERT INTO grupo_produto(id, descricao) VALUES(2, 'material de limpeza');

-- produtos
INSERT INTO produto(id, descricao, un_medida, id_grupo_produto) VALUES(1, 'ps5', 0, 1);
INSERT INTO produto(id, descricao, un_medida, id_grupo_produto) VALUES(2, 'ssd intel 1tb', 0, 1);
INSERT INTO produto(id, descricao, un_medida, id_grupo_produto) VALUES(3, 'água sanitária', 1, 2);
INSERT INTO produto(id, descricao, un_medida, id_grupo_produto) VALUES(4, 'sabao em pó', 3, 2);

-- requisicões
INSERT INTO requisicao(id, data, prazo, observacoes, status, id_usuario, id_centro_custo) VALUES(1, (SELECT now()), (SELECT now()), 'precisamos de um ps5 urgente na producao!', 1, 5, 2);


INSERT INTO requisicao(id, data, prazo, observacoes, status, id_usuario, id_centro_custo) VALUES(2, (SELECT now()), (SELECT now()), 'partiu uns ssds topzeira', 0, 2, 4);


-- requisicao produto
INSERT INTO requisicao_produto(id_requisicao, id_produto, quantidade) VALUES(1, 1, 2);
INSERT INTO requisicao_produto(id_requisicao, id_produto, quantidade) VALUES(1, 3, 10);
INSERT INTO requisicao_produto(id_requisicao, id_produto, quantidade) VALUES(1, 4, 15);

INSERT INTO requisicao_produto(id_requisicao, id_produto, quantidade) VALUES(2, 1, 5);
INSERT INTO requisicao_produto(id_requisicao, id_produto, quantidade) VALUES(2, 2, 20);
INSERT INTO requisicao_produto(id_requisicao, id_produto, quantidade) VALUES(2, 3, 5);

-- aprovacao requisicao
INSERT INTO aprovacao_requisicao(id_requisicao, id_usuario, data, status) VALUES(1, 6, (SELECT now()), 0);

-- fornecedores
INSERT INTO fornecedor(id, cnpj, inscricao_estadual, razao_social, nome_fantasia, status, email, telefone, cep, rua, numero, complemento, bairro, cidade, estado) VALUES(1, '00.000.000/0000-00', 'sp-sony', 'sony inc.', 'sony', 6, 'sony_ps5@gmail.com', '(00) 00000-0000', '18000-000', 'rua dos alfeneiros', 4, 'em frente à azkaban', 'godrics hollow', 'sorocaba', 'sp');

INSERT INTO fornecedor(id, cnpj, inscricao_estadual, razao_social, nome_fantasia, status, email, telefone, cep, rua, numero, complemento, bairro, cidade, estado) VALUES(2, '11.111.111/1111-11', 'sp-amz', 'amazon', 'amazon', 6, 'amazon5@gmail.com', '(00) 00000-0000', '18000-000','rua dos alfeneiros', 4, 'em frente à azkaban', 'godrics hollow', 'sorocaba', 'sp');

INSERT INTO fornecedor(id, cnpj, inscricao_estadual, razao_social, nome_fantasia, status, email, telefone, cep, rua, numero, complemento, bairro, cidade, estado) VALUES(3, '22.222.222/2222-22', 'sp-ext', 'extra hipermercado', 'extra', 6, 'extra@gmail.com', '(00) 00000-0000', '18000-000','rua dos alfeneiros', 4, 'em frente à azkaban', 'godrics hollow', 'sorocaba', 'sp');

INSERT INTO fornecedor(id, cnpj, inscricao_estadual, razao_social, nome_fantasia, status, email, telefone, cep, rua, numero, complemento, bairro, cidade, estado) VALUES(4, '33.333.333/3333-33', 'sp-rdl', 'rede limpa', 'rede limpa', 6, 'rede_limpa@gmail.com', '(00) 00000-0000', '18000-000','rua dos alfeneiros', 4, 'em frente à azkaban', 'godrics hollow', 'sorocaba', 'sp');

-- grupoproduto fornecedor
INSERT INTO grupo_produto_fornecedor(id_fornecedor, id_grupo_produto) VALUES(1, 1);

INSERT INTO grupo_produto_fornecedor(id_fornecedor, id_grupo_produto) VALUES(2, 1);
INSERT INTO grupo_produto_fornecedor(id_fornecedor, id_grupo_produto) VALUES(2, 2);

INSERT INTO grupo_produto_fornecedor(id_fornecedor, id_grupo_produto) VALUES(3, 1);
INSERT INTO grupo_produto_fornecedor(id_fornecedor, id_grupo_produto) VALUES(3, 2);

INSERT INTO grupo_produto_fornecedor(id_fornecedor, id_grupo_produto) VALUES(4, 2);

-- grupo cotacao
INSERT INTO grupo_cotacao(id, data, prazo_solicitado, id_grupo_produto, id_usuario) VALUES(1, (SELECT now()), (SELECT now()), 1, 4);

INSERT INTO grupo_cotacao(id, data, prazo_solicitado, id_grupo_produto, id_usuario) VALUES(2, (SELECT now()), (SELECT now()), 2, 4);

-- grupocotacao produto
INSERT INTO grupo_cotacao_produto(id, quantidade_total, id_grupo_cotacao) VALUES(1, 7, 1);
INSERT INTO grupo_cotacao_produto(id, quantidade_total, id_grupo_cotacao) VALUES(2, 20, 1);
INSERT INTO grupo_cotacao_produto(id, quantidade_total, id_grupo_cotacao) VALUES(3, 15, 2);
INSERT INTO grupo_cotacao_produto(id, quantidade_total, id_grupo_cotacao) VALUES(4, 15, 2);

-- atualiza requisicões produto com o grupocotacao_produto que agrupa o somatório das quantidades por produto
UPDATE requisicao_produto SET id = 1 WHERE id_produto = 1;
UPDATE requisicao_produto SET id = 2 WHERE id_produto = 2;
UPDATE requisicao_produto SET id = 3 WHERE id_produto = 3;
UPDATE requisicao_produto SET id = 4 WHERE id_produto = 4;

-- cotacao
INSERT INTO cotacao(id, frete, desconto, prazo, selecionada, status, transportadora, meio_transporte, id_fornecedor, id_grupo_cotacao) VALUES(1, 515.9, 200, (SELECT now()), false, 0, 'fedex', 'carro', 1, 1);

INSERT INTO cotacao(id, frete, desconto, prazo, selecionada, status, transportadora, meio_transporte, id_fornecedor, id_grupo_cotacao) VALUES(2, 200, 0, (SELECT now()), true,  3, 'ups', 'drone', 2, 1);

INSERT INTO cotacao(id, frete, desconto, prazo, selecionada, status, transportadora, meio_transporte, id_fornecedor, id_grupo_cotacao) VALUES(3, 100, 0, (SELECT now()), false, 0, 'aviacao', 'aviao', 3, 1);

INSERT INTO cotacao(id, frete, desconto, prazo, selecionada, status, transportadora, meio_transporte, id_fornecedor, id_grupo_cotacao) VALUES(4, 200, 100, (SELECT now()), false, 0, 'ups', 'drone', 2, 2);

INSERT INTO cotacao(id, frete, desconto, prazo, selecionada, status, transportadora, meio_transporte, id_fornecedor, id_grupo_cotacao) VALUES(5, 150, 50, (SELECT now()), false, 0, 'insiders', 'submarino', 3, 2);

INSERT INTO cotacao(id, frete, desconto, prazo, selecionada, status, transportadora, meio_transporte, id_fornecedor, id_grupo_cotacao) VALUES(6, 0, 0, (SELECT now()), true, 3, 'translimpa', 'furgao da limpeza', 4, 2);

-- grupocotacao_produto_cotacao
INSERT INTO grupo_cotacao_produto_cotacao(id_cotacao, id_grupo_cotacao_produto, aliquota_ipi, preco_unitario) VALUES(1, 1, 15, 5000);

INSERT INTO grupo_cotacao_produto_cotacao(id_cotacao, id_grupo_cotacao_produto, aliquota_ipi, preco_unitario) VALUES(1, 2, 10, 2000);

INSERT INTO grupo_cotacao_produto_cotacao(id_cotacao, id_grupo_cotacao_produto, aliquota_ipi, preco_unitario) VALUES(2, 1, 15, 6000);

INSERT INTO grupo_cotacao_produto_cotacao(id_cotacao, id_grupo_cotacao_produto, aliquota_ipi, preco_unitario) VALUES(2, 2, 10, 1500);

INSERT INTO grupo_cotacao_produto_cotacao(id_cotacao, id_grupo_cotacao_produto, aliquota_ipi, preco_unitario) VALUES(3, 1, 15, 6500);

INSERT INTO grupo_cotacao_produto_cotacao(id_cotacao, id_grupo_cotacao_produto, aliquota_ipi, preco_unitario) VALUES(3, 2, 10, 1800);

INSERT INTO grupo_cotacao_produto_cotacao(id_cotacao, id_grupo_cotacao_produto, aliquota_ipi, preco_unitario) VALUES(4, 3, 0.5, 4.25);

INSERT INTO grupo_cotacao_produto_cotacao(id_cotacao, id_grupo_cotacao_produto, aliquota_ipi, preco_unitario) VALUES(4, 4, 1, 25);

INSERT INTO grupo_cotacao_produto_cotacao(id_cotacao, id_grupo_cotacao_produto, aliquota_ipi, preco_unitario) VALUES(5, 3, 0.5, 4.25);

INSERT INTO grupo_cotacao_produto_cotacao(id_cotacao, id_grupo_cotacao_produto, aliquota_ipi, preco_unitario) VALUES(5, 4, 1, 23);

INSERT INTO grupo_cotacao_produto_cotacao(id_cotacao, id_grupo_cotacao_produto, aliquota_ipi, preco_unitario) VALUES(6, 3, 0.5, 3.5);

INSERT INTO grupo_cotacao_produto_cotacao(id_cotacao, id_grupo_cotacao_produto, aliquota_ipi, preco_unitario) VALUES(6, 4, 1, 21);

-- ordem compra
INSERT INTO ordem_compra(id, data, tipo_compra, status, id_cotacao, id_usuario) VALUES(1, (SELECT now()), 1, 0, 2, 4);
INSERT INTO ordem_compra(id, data, tipo_compra, status, id_cotacao, id_usuario) VALUES(2, (SELECT now()), 1, 1, 6, 4);

-- forma pagamento
INSERT INTO forma_pgto(id, descricao) VALUES(1, 'parcelado');
INSERT INTO forma_pgto(id, descricao) VALUES(2, 'à vista');

-- formas pgto da ordem
INSERT INTO ordem_compra_forma_pgto(id_ordem_compra, id_forma_pgto, observacoes, valor) VALUES(1, 1, 'parcelado em 10x', 55200);

INSERT INTO ordem_compra_forma_pgto(id_ordem_compra, id_forma_pgto, observacoes, valor) VALUES(2, 1, 'parcelado em 2x', 200);

INSERT INTO ordem_compra_foordem_compra_forma_pgtormapgto(id_ordem_compra, id_forma_pgto, valor) VALUES(2, 2, 30);

-- aprovacao ordem compra
INSERT INTO aprovacao_ordem_compra(id_ordem_compra, id_usuario, data, status) VALUES(1, 7, (SELECT now()), 0);
INSERT INTO aprovacao_ordem_compra(id_ordem_compra, id_usuario, data, status) VALUES(2, 7, (SELECT now()), 1);