-- setores
INSERT INTO setor(id, descricao) VALUES(1, 'compras');
INSERT INTO setor(id, descricao) VALUES(2, 'almoxarifado');
INSERT INTO setor(id, descricao) VALUES(3, 'ti');

-- centros de custo
INSERT INTO centro_custo(id, descricao, valor_gasto, valor_limite, id_setor) VALUES(1, 'Controle de compras', 10000, 20000, 1);

INSERT INTO centro_custo(id, descricao, valor_gasto, valor_limite, id_setor) VALUES(2, 'Controle de entradas e saidas', 10000, 15000, 2);

INSERT INTO centro_custo(id, descricao, valor_gasto, valor_limite, id_setor) VALUES(3, 'Big data', 5000, 10000, 3);

INSERT INTO centro_custo(id, descricao, valor_gasto, valor_limite, id_setor) VALUES(4, 'Help desk', 0, 1000, 3);

-- permissões
INSERT INTO permissao(id, descricao) VALUES(1, 'Administrador');

INSERT INTO permissao(id, descricao) VALUES(2, 'Editar requisição');
INSERT INTO permissao(id, descricao) VALUES(3, 'Ler requisição');
INSERT INTO permissao(id, descricao) VALUES(4, 'Aprovar requisição');

INSERT INTO permissao(id, descricao) VALUES(5, 'Editar cotação');
INSERT INTO permissao(id, descricao) VALUES(6, 'Ler cotação');

INSERT INTO permissao(id, descricao) VALUES(7, 'Editar ordem');
INSERT INTO permissao(id, descricao) VALUES(8, 'Ler ordem');
INSERT INTO permissao(id, descricao) VALUES(9, 'Aprovar ordem');

INSERT INTO permissao(id, descricao) VALUES(10, 'Editar fornecedor');
INSERT INTO permissao(id, descricao) VALUES(1, 'Ler fornecedor');


-- funcões
INSERT INTO funcao(id, descricao) VALUES(1, 'Administrador');
INSERT INTO funcao(id, descricao) VALUES(2, 'Comprador');
INSERT INTO funcao(id, descricao) VALUES(3, 'Requisitante');
INSERT INTO funcao(id, descricao) VALUES(4, 'Aprovador requisicao');
INSERT INTO funcao(id, descricao) VALUES(5, 'Aprovador ordem');

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
INSERT INTO usuario(id, nome, email, hash_senha, status, id_setor, id_funcao) VALUES(1, 'Jhonatan Leite', 'jhonatan.leite@baltacompras.com.br', '79aafe839b67b8038ea6a878441ff9a0', 0, 3, 1);

INSERT INTO usuario(id, nome, email, hash_senha, status, id_setor, id_funcao) VALUES(2, 'Caue Sampaio', 'caue.sampaio@baltacompras.com.br', '79aafe839b67b8038ea6a878441ff9a0', 6, 3, 1);

INSERT INTO usuario(id, nome, email, hash_senha, status, id_setor, id_funcao) VALUES(3, 'Gabriel Torres', 'gabriel_towers@fatec.com', '79aafe839b67b8038ea6a878441ff9a0', 6, 3, 1);

INSERT INTO usuario(id, nome, email, hash_senha, status, id_setor, id_funcao) VALUES(4, 'Vitor Oliveira', 'vitor.oliveira@ivel.com.br', '27d2f8ff2575c1d459e188aa48e6083a', 6, 1, 2);

INSERT INTO usuario(id, nome, email, hash_senha, status, id_setor, id_funcao) VALUES(5, 'Jorge Ivel', 'jorge_ivelson@fatec.com', '8af75f2075350876d9f45a4190517ad2', 6, 2, 3);

INSERT INTO usuario(id, nome, email, hash_senha, status, id_setor, id_funcao) VALUES(6, 'Rodrigo Ivel', 'rodrigo@ivel.com.br', '8aa3e8112922553cf5858d4a01562784', 6, 2, 4);

INSERT INTO usuario(id, nome, email, hash_senha, status, id_setor, id_funcao) VALUES(7, 'Eric Barros', 'eric.barros@ivel.com.br', '8aa3e8112922553cf5858d4a01562784', 6, 1, 5);

-- grupo produto
INSERT INTO grupo_produto(id, descricao) VALUES(1, 'Eletronicos');
INSERT INTO grupo_produto(id, descricao) VALUES(2, 'Material de limpeza');
--INSERT INTO grupo_produto(id, descricao) VALUES(3, 'Estoque de produção');

-- produtos
INSERT INTO produto(id, descricao, un_medida, id_grupo_produto) VALUES(1, 'Teclado DELL KB216', 0, 1);
INSERT INTO produto(id, descricao, un_medida, id_grupo_produto) VALUES(2, 'SSD Kingston - 256GB', 0, 1);
INSERT INTO produto(id, descricao, un_medida, id_grupo_produto) VALUES(3, 'Agua sanitaria', 1, 2);
INSERT INTO produto(id, descricao, un_medida, id_grupo_produto) VALUES(4, 'Alcool gel', 1, 2);

-- requisicões
--INSERT INTO requisicao(id, data, prazo, observacoes, status, id_usuario, id_centro_custo) VALUES(1, (SELECT now()), (SELECT now()), '', 1, 5, 2);
--INSERT INTO requisicao(id, data, prazo, observacoes, status, id_usuario, id_centro_custo) VALUES(2, (SELECT now()), (SELECT now()), '', 0, 2, 4);


-- requisicao produto
--INSERT INTO requisicao_produto(id_requisicao, id_produto, quantidade) VALUES(1, 1, 2);
--INSERT INTO requisicao_produto(id_requisicao, id_produto, quantidade) VALUES(1, 3, 10);
--INSERT INTO requisicao_produto(id_requisicao, id_produto, quantidade) VALUES(1, 4, 15);
--
--INSERT INTO requisicao_produto(id_requisicao, id_produto, quantidade) VALUES(2, 1, 5);
--INSERT INTO requisicao_produto(id_requisicao, id_produto, quantidade) VALUES(2, 2, 20);
--INSERT INTO requisicao_produto(id_requisicao, id_produto, quantidade) VALUES(2, 3, 5);

-- aprovacao requisicao
--INSERT INTO aprovacao_requisicao(id_requisicao, id_usuario, data, status) VALUES(1, 6, (SELECT now()), 0);

-- fornecedores
INSERT INTO fornecedor(id, cnpj, inscricao_estadual, razao_social, nome_fantasia, status, email, telefone, cep, rua, numero, complemento, bairro, cidade, estado) VALUES(1, '00.396.850/0001-50', '131.272.040.705', 'Sony Inc.', 'Sony', 6, 'support@sony.com', '(12) 2960-6654', '05069-010', 'Rua Werner Von Siemens', 111, '', 'Lapa', 'São Paulo', 'SP');

INSERT INTO fornecedor(id, cnpj, inscricao_estadual, razao_social, nome_fantasia, status, email, telefone, cep, rua, numero, complemento, bairro, cidade, estado) VALUES(2,'15.454.650/0001-84', '890.806.665.474', 'Amazon Inc', 'Amazon', 6, 'support@amazon.com', '0800-038-0541', '98170-390', 'Terry Avenue', 410, '', 'Great Neighborhood', 'Seattle', 'WA');

INSERT INTO fornecedor(id, cnpj, inscricao_estadual, razao_social, nome_fantasia, status, email, telefone, cep, rua, numero, complemento, bairro, cidade, estado) VALUES(3, '51.072.275/0001-71', '437.546.376.654', 'Companhia Brasileira de Distribuição Via Varejo S.A.', 'Extra Hipermercado', 6, 'support@extra.com.br', '4003-3383', '08220-000', 'Av. Brigadeiro Luis Antonio', 2013, '', 'Jardim Paulista', 'São Paulo', 'SP');

INSERT INTO fornecedor(id, cnpj, inscricao_estadual, razao_social, nome_fantasia, status, email, telefone, cep, rua, numero, complemento, bairro, cidade, estado) VALUES(4, '86.317.412/0001-75', '620.874.233.458', 'Rede Limpa Produtos de Limpeaza LTDA', 'Rede Limpa', 6, 'vendas.limpa@redelimpa.com.br', '(15) 99735-8565', '17804-569', 'Av. Éden do Cajuru', 202, '', 'Campo Grande', 'Sorocaba', 'SP');

-- grupoproduto fornecedor
INSERT INTO grupo_produto_fornecedor(id_fornecedor, id_grupo_produto) VALUES(1, 1);

INSERT INTO grupo_produto_fornecedor(id_fornecedor, id_grupo_produto) VALUES(2, 1);
INSERT INTO grupo_produto_fornecedor(id_fornecedor, id_grupo_produto) VALUES(2, 2);

INSERT INTO grupo_produto_fornecedor(id_fornecedor, id_grupo_produto) VALUES(3, 1);
INSERT INTO grupo_produto_fornecedor(id_fornecedor, id_grupo_produto) VALUES(3, 2);

INSERT INTO grupo_produto_fornecedor(id_fornecedor, id_grupo_produto) VALUES(4, 2);

-- grupo cotacao
--INSERT INTO grupo_cotacao(id, data, prazo_solicitado, id_grupo_produto, id_usuario, status) VALUES(1, (SELECT now()), (SELECT now()), 1, 4, 0);
--
--INSERT INTO grupo_cotacao(id, data, prazo_solicitado, id_grupo_produto, id_usuario, status) VALUES(2, (SELECT now()), (SELECT now()), 2, 4, 0);

-- grupocotacao produto
--INSERT INTO grupo_cotacao_produto(id, quantidade_total, id_grupo_cotacao) VALUES(1, 7, 1);
--INSERT INTO grupo_cotacao_produto(id, quantidade_total, id_grupo_cotacao) VALUES(2, 20, 1);
--INSERT INTO grupo_cotacao_produto(id, quantidade_total, id_grupo_cotacao) VALUES(3, 15, 2);
--INSERT INTO grupo_cotacao_produto(id, quantidade_total, id_grupo_cotacao) VALUES(4, 15, 2);

-- atualiza requisicões produto com o grupocotacao_produto que agrupa o somatório das quantidades por produto
--UPDATE requisicao_produto SET id_grupo_cotacao_produto = 1 WHERE id_produto = 1;
--UPDATE requisicao_produto SET id_grupo_cotacao_produto = 2 WHERE id_produto = 2;
--UPDATE requisicao_produto SET id_grupo_cotacao_produto = 3 WHERE id_produto = 3;
--UPDATE requisicao_produto SET id_grupo_cotacao_produto = 4 WHERE id_produto = 4;

-- cotacao
--INSERT INTO cotacao(id, frete, desconto, prazo, selecionada, status, transportadora, meio_transporte, id_fornecedor, id_grupo_cotacao) VALUES(1, 515.9, 200, (SELECT now()), false, 0, 'fedex', 'carro', 1, 1);
--
--INSERT INTO cotacao(id, frete, desconto, prazo, selecionada, status, transportadora, meio_transporte, id_fornecedor, id_grupo_cotacao) VALUES(2, 200, 0, (SELECT now()), true,  3, 'ups', 'drone', 2, 1);
--
--INSERT INTO cotacao(id, frete, desconto, prazo, selecionada, status, transportadora, meio_transporte, id_fornecedor, id_grupo_cotacao) VALUES(3, 100, 0, (SELECT now()), false, 0, 'aviacao', 'aviao', 3, 1);
--
--INSERT INTO cotacao(id, frete, desconto, prazo, selecionada, status, transportadora, meio_transporte, id_fornecedor, id_grupo_cotacao) VALUES(4, 200, 100, (SELECT now()), false, 0, 'ups', 'drone', 2, 2);
--
--INSERT INTO cotacao(id, frete, desconto, prazo, selecionada, status, transportadora, meio_transporte, id_fornecedor, id_grupo_cotacao) VALUES(5, 150, 50, (SELECT now()), false, 0, 'insiders', 'submarino', 3, 2);
--
--INSERT INTO cotacao(id, frete, desconto, prazo, selecionada, status, transportadora, meio_transporte, id_fornecedor, id_grupo_cotacao) VALUES(6, 0, 0, (SELECT now()), true, 3, 'translimpa', 'furgao da limpeza', 4, 2);

-- grupocotacao_produto_cotacao
--INSERT INTO grupo_cotacao_produto_cotacao(id_cotacao, id_grupo_cotacao_produto, aliquota_ipi, preco_unitario) VALUES(1, 1, 15, 5000);
--
--INSERT INTO grupo_cotacao_produto_cotacao(id_cotacao, id_grupo_cotacao_produto, aliquota_ipi, preco_unitario) VALUES(1, 2, 10, 2000);
--
--INSERT INTO grupo_cotacao_produto_cotacao(id_cotacao, id_grupo_cotacao_produto, aliquota_ipi, preco_unitario) VALUES(2, 1, 15, 6000);
--
--INSERT INTO grupo_cotacao_produto_cotacao(id_cotacao, id_grupo_cotacao_produto, aliquota_ipi, preco_unitario) VALUES(2, 2, 10, 1500);
--
--INSERT INTO grupo_cotacao_produto_cotacao(id_cotacao, id_grupo_cotacao_produto, aliquota_ipi, preco_unitario) VALUES(3, 1, 15, 6500);
--
--INSERT INTO grupo_cotacao_produto_cotacao(id_cotacao, id_grupo_cotacao_produto, aliquota_ipi, preco_unitario) VALUES(3, 2, 10, 1800);
--
--INSERT INTO grupo_cotacao_produto_cotacao(id_cotacao, id_grupo_cotacao_produto, aliquota_ipi, preco_unitario) VALUES(4, 3, 0.5, 4.25);
--
--INSERT INTO grupo_cotacao_produto_cotacao(id_cotacao, id_grupo_cotacao_produto, aliquota_ipi, preco_unitario) VALUES(4, 4, 1, 25);
--
--INSERT INTO grupo_cotacao_produto_cotacao(id_cotacao, id_grupo_cotacao_produto, aliquota_ipi, preco_unitario) VALUES(5, 3, 0.5, 4.25);
--
--INSERT INTO grupo_cotacao_produto_cotacao(id_cotacao, id_grupo_cotacao_produto, aliquota_ipi, preco_unitario) VALUES(5, 4, 1, 23);
--
--INSERT INTO grupo_cotacao_produto_cotacao(id_cotacao, id_grupo_cotacao_produto, aliquota_ipi, preco_unitario) VALUES(6, 3, 0.5, 3.5);
--
--INSERT INTO grupo_cotacao_produto_cotacao(id_cotacao, id_grupo_cotacao_produto, aliquota_ipi, preco_unitario) VALUES(6, 4, 1, 21);

-- ordem compra
--INSERT INTO ordem_compra(id, data, tipo_compra, status, id_cotacao, id_usuario) VALUES(1, (SELECT now()), 1, 0, 2, 4);
--INSERT INTO ordem_compra(id, data, tipo_compra, status, id_cotacao, id_usuario) VALUES(2, (SELECT now()), 1, 1, 6, 4);

-- forma pagamento
INSERT INTO forma_pgto(id, descricao) VALUES(1, 'Parcelado');
INSERT INTO forma_pgto(id, descricao) VALUES(2, 'À vista');

-- formas pgto da ordem
--INSERT INTO ordem_compra_forma_pgto(id_ordem_compra, id_forma_pgto, observacoes, valor) VALUES(1, 1, 'parcelado em 10x', 55200);
--
--INSERT INTO ordem_compra_forma_pgto(id_ordem_compra, id_forma_pgto, observacoes, valor) VALUES(2, 1, 'parcelado em 2x', 200);
--
--INSERT INTO ordem_compra_foordem_compra_forma_pgtormapgto(id_ordem_compra, id_forma_pgto, valor) VALUES(2, 2, 30);

-- aprovacao ordem compra
--INSERT INTO aprovacao_ordem_compra(id_ordem_compra, id_usuario, data, status) VALUES(1, 7, (SELECT now()), 0);
--INSERT INTO aprovacao_ordem_compra(id_ordem_compra, id_usuario, data, status) VALUES(2, 7, (SELECT now()), 1);



-- Usuários
--UPDATE Usuario
--SET nome = 'Jhonatan Leite'
--	,email = 'jhonatan.leite@baltacompras.com.br'
--WHERE id_usuario = 1;
--
--UPDATE Usuario
--SET nome = 'Cauê Sampaio'
--	,email = 'caue.sampaio@baltacompras.com.br'
--WHERE id_usuario = 2;
--
--UPDATE Usuario
--SET nome = 'Gabriel Torres'
--	,email = 'gabriel.torres@baltacompras.com.br'
--WHERE id_usuario = 3;
--
--UPDATE Usuario
--SET nome = 'Vitor Oliveira'
--	,email = 'vitor.oliveira@ivel.com.br'
--WHERE id_usuario = 4;
--
--UPDATE Usuario
--SET nome = 'Jorge Ivel'
--	,email = 'jorge@ivel.com.br'
--WHERE id_usuario = 5
--
--UPDATE Usuario
--SET nome = 'Rodrigo Ivel'
--	,email = 'rodrigo@ivel.com.br'
--WHERE id_usuario = 6
--
--UPDATE Usuario
--SET nome = 'Eric Barros'
--	,email = 'eric.barros@ivel.com.br'
--WHERE id_usuario = 7
--
---- Fornecedores
--UPDATE fornecedor
--SET cnpj = '00.396.850/0001-50'
--	,inscricao_estadual = '131.272.040.705'
--	,razao_social = 'Sony Inc.'
--	,nome_fantasia = 'Sony'
--	,email = 'support@sony.com'
--	,telefone = '(12) 2960-6654'
--	,cep = '05069-010'
--	,rua = 'Rua Werner Von Siemens'
--	,numero = 111
--	,complemento = ''
--	,bairro = 'Lapa'
--	,cidade = 'São Paulo'
--	,estado = 'SP'
--WHERE id = 1;
--
--UPDATE Fornecedor
--SET cnpj = '15.454.650/0001-84'
--	,inscricao_estadual = '890.806.665.474'
--	,razao_social = 'Amazon Inc'
--	,nome_fantasia = 'Amazon'
--	,email = 'support@amazon.com'
--	,telefone = '0800-038-0541'
--	,cep = '98170'
--	,rua = 'Terry Ave N'
--	,numero = 410
--	,complemento = ''
--	,bairro = 'Great Neighborhood'
--	,cidade = 'Seattle'
--	,estado = 'WA'
--WHERE id_fornecedor = 2
--
--UPDATE Fornecedor
--SET cnpj = '51.072.275/0001-71'
--	,inscricao_estadual = '437.546.376.654'
--	,razao_social = 'Companhia Brasileira de Distribuição Via Varejo S.A.'
--	,nome_fantasia = 'Extra Hipermercado'
--	,email = 'support@extra.com.br'
--	,telefone = '4003-3383'
--	,cep = '08220-000'
--	,rua = 'Av. Brigadeiro Luis Antonio'
--	,numero = 2013
--	,complemento = ''
--	,bairro = 'Jardim Paulista'
--	,cidade = 'São Paulo'
--	,estado = 'SP'
--WHERE id_fornecedor = 3
--
--UPDATE Fornecedor
--SET cnpj = '86.317.412/0001-75'
--	,inscricao_estadual = '620.874.233.458'
--	,razao_social = 'Rede Limpa Produtos de Limpeaza LTDA'
--	,nome_fantasia = 'Rede Limpa'
--	,email = 'vendas.limpa@redelimpa.com.br'
--	,telefone = '(15) 99735-8565'
--	,cep = '17804-569'
--	,rua = 'Av. Éden do Cajuru'
--	,numero = 2021
--	,complemento = ''
--	,bairro = 'Campo Grande'
--	,cidade = 'Sorocaba'
--	,estado = 'SP'
--WHERE id_fornecedor = 4
--
---- Requisições de Compra
--UPDATE Requisicao
--SET observacoes = ''
--WHERE id_requisicao = 1
--
--UPDATE Requisicao
--SET observacoes = ''
--WHERE id_requisicao = 2