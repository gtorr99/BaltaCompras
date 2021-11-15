-- Grupo de produtos
INSERT INTO GrupoProduto(id_grupo_produto, descricao) VALUES(3, 'Estoque de produção');

-- Usuários
UPDATE Usuario
SET nome = 'Jhonatan Leite'
	,email = 'jhonatan.leite@baltacompras.com.br'
WHERE id_usuario = 1;

UPDATE Usuario
SET nome = 'Cauê Sampaio'
	,email = 'caue.sampaio@baltacompras.com.br'
WHERE id_usuario = 2;

UPDATE Usuario
SET nome = 'Gabriel Torres'
	,email = 'gabriel.torres@baltacompras.com.br'
WHERE id_usuario = 3;

UPDATE Usuario
SET nome = 'Vitor Oliveira'
	,email = 'vitor.oliveira@ivel.com.br'
WHERE id_usuario = 4;

UPDATE Usuario
SET nome = 'Jorge Ivel'
	,email = 'jorge@ivel.com.br'
WHERE id_usuario = 5

UPDATE Usuario
SET nome = 'Rodrigo Ivel'
	,email = 'rodrigo@ivel.com.br'
WHERE id_usuario = 6

UPDATE Usuario
SET nome = 'Eric Barros'
	,email = 'eric.barros@ivel.com.br'
WHERE id_usuario = 7

-- Fornecedores
UPDATE Fornecedor
SET cnpj = '00.396.850/0001-50'
	,inscricao_estadual = '131.272.040.705'
	,razao_social = 'Sony Inc.'
	,nome_fantasia = 'Sony'
	,email = 'support@sony.com'
	,telefone = '(12) 2960-6654'
	,cep = '05069-010'
	,rua = 'Rua Werner Von Siemens'
	,numero = 111
	,complemento = ''
	,bairro = 'Lapa'
	,cidade = 'São Paulo'
	,estado = 'SP'
WHERE id_fornecedor = 1

UPDATE Fornecedor
SET cnpj = '15.454.650/0001-84'
	,inscricao_estadual = '890.806.665.474'
	,razao_social = 'Amazon Inc'
	,nome_fantasia = 'Amazon'
	,email = 'support@amazon.com'
	,telefone = '0800-038-0541'
	,cep = '98170'
	,rua = 'Terry Ave N'
	,numero = 410
	,complemento = ''
	,bairro = 'Great Neighborhood'
	,cidade = 'Seattle'
	,estado = 'WA'
WHERE id_fornecedor = 2

UPDATE Fornecedor
SET cnpj = '51.072.275/0001-71'
	,inscricao_estadual = '437.546.376.654'
	,razao_social = 'Companhia Brasileira de Distribuição Via Varejo S.A.'
	,nome_fantasia = 'Extra Hipermercado'
	,email = 'support@extra.com.br'
	,telefone = '4003-3383'
	,cep = '08220-000'
	,rua = 'Av. Brigadeiro Luis Antonio'
	,numero = 2013
	,complemento = ''
	,bairro = 'Jardim Paulista'
	,cidade = 'São Paulo'
	,estado = 'SP'
WHERE id_fornecedor = 3

UPDATE Fornecedor
SET cnpj = '86.317.412/0001-75'
	,inscricao_estadual = '620.874.233.458'
	,razao_social = 'Rede Limpa Produtos de Limpeaza LTDA'
	,nome_fantasia = 'Rede Limpa'
	,email = 'vendas.limpa@redelimpa.com.br'
	,telefone = '(15) 99735-8565'
	,cep = '17804-569'
	,rua = 'Av. Éden do Cajuru'
	,numero = 2021
	,complemento = ''
	,bairro = 'Campo Grande'
	,cidade = 'Sorocaba'
	,estado = 'SP'
WHERE id_fornecedor = 4

-- Requisições de Compra
UPDATE Requisicao
SET observacoes = ''
WHERE id_requisicao = 1

UPDATE Requisicao
SET observacoes = ''
WHERE id_requisicao = 2