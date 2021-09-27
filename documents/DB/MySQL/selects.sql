/* Selects */

-- Setores
SELECT
    id_setor    AS 'ID'
    ,descricao  AS 'Setor'
FROM Setor;

-- Centro de custo
SELECT 
    cc.id_centro_custo  AS 'ID'
    ,cc.descricao       AS 'Centro de Custo'
    ,s.descricao        AS 'Setor' 
    ,cc.valor_limite    AS 'Valor Limite'
    ,cc.valor_gasto     AS 'Total Gasto'
FROM CentroCusto cc 
INNER JOIN Setor s 
ON cc.id_setor = s.id_setor;

-- Permissões
SELECT 
    id_permissao  AS 'ID'
    ,descricao    AS 'Permissão'
FROM Permissao;

-- Funções
SELECT
    id_funcao    AS 'ID'
    , descricao  AS 'Função'
FROM Funcao;

-- Funções e Permissões
SELECT
    fun.descricao AS 'Função'
    ,per.descricao AS 'Permissão'
FROM Funcao_Permissao fp
INNER JOIN Funcao fun
ON fp.id_funcao = fun.id_funcao
INNER JOIN Permissao per
ON fp.id_permissao = per.id_permissao
ORDER BY fp.id_funcao;

-- Usuários
SELECT
    u.id_usuario  AS 'ID'
    ,u.nome       AS 'Nome'
    ,u.email      AS 'Login'
    ,u.hash_senha AS 'Hash Senha'
    ,IF(u.status='1', 'Ativo', 'Inativo') AS 'Status'
    ,s.descricao    AS 'Setor'
    ,fun.descricao  AS 'Função'
FROM Usuario u
INNER JOIN Setor s
ON u.id_setor = s.id_setor
INNER JOIN Funcao fun
ON u.id_funcao = fun.id_funcao
ORDER BY u.id_usuario;

-- GrupoProduto
SELECT 
    id_grupo_produto AS 'ID'
    ,descricao AS 'Grupo de produto'
FROM GrupoProduto;

-- Produto
SELECT
    p.id_produto AS 'ID'
    ,p.descricao AS 'Produto'
    ,CASE 
        WHEN p.un_medida = '1' THEN 'Unidade'
        WHEN p.un_medida = '2' THEN 'Litro'
        WHEN p.un_medida = '3' THEN 'Quilograma'
    END AS 'Un. Medida'
    ,gp.descricao AS 'Grupo de produto'
FROM Produto p
INNER JOIN GrupoProduto gp
ON p.id_grupo_produto = gp.id_grupo_produto
ORDER BY p.id_produto;

-- Requisição
SELECT
    req.id_requisicao AS 'ID'
    ,req.data AS 'Data de abertura'
    ,CASE
        WHEN req.status = '1' THEN 'Aberta' 
        WHEN req.status = '2' THEN 'Aprovada' 
        WHEN req.status = '3' THEN 'Reprovada' 
        WHEN req.status = '4' THEN 'Cancelada' 
        WHEN req.status = '5' THEN 'Em processamento' 
        ELSE 'Concluída'
    END AS 'Status'
    ,u.nome AS 'Requisitante'
    ,cc.descricao AS 'Centro de Custo'
    ,IFNULL(req.observacoes, '-') AS 'Observações'
FROM Requisicao req
INNER JOIN Usuario u
ON req.id_usuario = u.id_usuario
INNER JOIN CentroCusto cc
ON req.id_centro_custo = cc.id_centro_custo
ORDER BY req.id_requisicao;

-- Produtos da requisição
SELECT
    rp.id_requisicao AS 'Requisição'
    ,p.descricao AS 'Produto'
    ,rp.quantidade AS 'Quantidade'
    ,gp.descricao AS 'Grupo produto'
FROM Requisicao_Produto rp
INNER JOIN Produto p
ON rp.id_produto = p.id_produto
INNER JOIN GrupoProduto gp
ON p.id_grupo_produto = gp.id_grupo_produto
ORDER BY rp.id_requisicao;

-- Aprovações de requisição
SELECT
    apreq.id_requisicao AS 'Requisição'
    ,u.nome AS 'Aprovador'
    ,apreq.data AS 'Data da aprovação'
    ,CASE
        WHEN apreq.status = '1' THEN 'Aprovada' 
        WHEN apreq.status = '2' THEN 'Reprovada' 
        WHEN apreq.status = '3' THEN 'Revisão'
    END AS 'Status'
    ,IFNULL(apreq.observacoes, '-') AS 'Observações'
FROM Aprovacao_Requisicao apreq
INNER JOIN Usuario u
ON apreq.id_usuario = u.id_usuario
ORDER BY apreq.id_requisicao;

-- Fornecedor
SELECT
    id_fornecedor AS 'ID'
    ,cnpj AS 'CNPJ'
    ,inscricao_estadual AS 'Insc. Est.'
    ,razao_social AS 'Razão Soc.'
    ,nome_fantasia AS 'Nome Fant.'
    ,IF(status='1', 'Ativo', 'Inativo') AS 'Status'
    ,email AS 'Email'
    ,telefone AS 'Tel.'
    ,cep AS 'CEP'
    ,rua AS 'Rua'
    ,numero AS 'Nº'
    ,complemento AS 'Compl.'
    ,bairro AS 'Bairro'
    ,cidade AS 'Cidade'
    ,estado AS 'Estado'
FROM Fornecedor;

-- GrupoProduto dos fornecedores
SELECT
    f.nome_fantasia AS 'Fornecedor'
    ,gp.descricao AS 'Grupo de produto'
FROM GrupoProduto_Fornecedor gpf
INNER JOIN Fornecedor f
ON gpf.id_fornecedor = f.id_fornecedor
INNER JOIN GrupoProduto gp
ON gpf.id_grupo_produto = gp.id_grupo_produto
ORDER BY gpf.id_fornecedor;

-- Grupo de cotação
SELECT
    gc.id_grupo_cotacao AS 'ID'
    ,gc.data AS 'Data'
    ,gc.prazo_solicitado AS 'Prazo solicitado'
    ,u.nome AS 'Comprador'
    ,IFNULL(gc.observacoes, '-') AS 'Observações'
FROM GrupoCotacao gc
INNER JOIN Usuario u
ON gc.id_usuario = u.id_usuario
ORDER BY gc.id_grupo_cotacao;

-- Grupo de cotação com somatório das qtdes de produtos das requisições
SELECT DISTINCT
    gcp.id_grupo_cotacao_produto AS 'ID'
    ,p.descricao AS 'Produto'
    ,gcp.quantidade_total AS 'Quantidade total'
    ,gp.descricao AS 'Grupo de produto'
FROM GrupoCotacao_Produto gcp
INNER JOIN Requisicao_Produto rp
ON gcp.id_grupo_cotacao_produto = rp.id_grupo_cotacao_produto
INNER JOIN Produto p
ON rp.id_produto = p.id_produto
INNER JOIN GrupoProduto gp
ON gp.id_grupo_produto = p.id_grupo_produto
ORDER BY 1;

-- Cotação
SELECT DISTINCT
    cot.id_cotacao  AS 'ID'
    ,gc.data        AS 'Data de abertura'
    ,u.nome         AS 'Comprador'
    ,cot.frete      AS 'Frete (R$)'
    ,cot.desconto   AS 'Desconto (R$)'
    ,cot.prazo      AS 'Prazo'
    ,IF(cot.selecionada=1, 'Sim', 'Não') AS 'Selecionada'
    ,CASE
        WHEN cot.status = '1' THEN 'Aberta' 
        WHEN cot.status = '2' THEN 'Cancelada' 
        WHEN cot.status = '3' THEN 'Em processamento' 
        ELSE 'Concluída'
    END AS 'Status'
    ,cot.transportadora     AS 'Transportadora'
    ,cot.meio_transporte    AS 'Meio de Transporte'
    ,f.nome_fantasia        AS 'Fornecedor'
    ,cot.id_grupo_cotacao   AS 'Grupo Cotação'
    ,gp.descricao           AS 'Grupo Produto'
    ,IFNULL(cot.observacoes, '-') AS 'Observações'
FROM Cotacao cot
INNER JOIN Fornecedor f
ON cot.id_fornecedor = f.id_fornecedor
INNER JOIN GrupoCotacao gc
ON cot.id_grupo_cotacao = gc.id_grupo_cotacao
INNER JOIN Usuario u
ON gc.id_usuario = u.id_usuario
INNER JOIN GrupoCotacao_Produto gcp
ON gcp.id_grupo_cotacao = gc.id_grupo_cotacao
INNER JOIN Requisicao_Produto rp
ON gcp.id_grupo_cotacao_produto = rp.id_grupo_cotacao_produto
INNER JOIN Produto p
ON rp.id_produto = p.id_produto
INNER JOIN GrupoProduto gp
ON gp.id_grupo_produto = p.id_grupo_produto
ORDER BY 1;

-- Produtos da Cotação
SELECT DISTINCT
    gcpc.id_cotacao      AS 'Cotação'
    ,f.nome_fantasia     AS 'Fornecedor'
    ,p.descricao         AS 'Produto'
    ,gcpc.aliquota_ipi   AS 'Aliq. IPI'
    ,(SELECT gcpc.preco_unitario * gcp.quantidade_total) AS 'Preço'
FROM GrupoCotacao_Produto_Cotacao gcpc
INNER JOIN Cotacao cot
ON gcpc.id_cotacao = cot.id_cotacao
INNER JOIN Fornecedor f
ON cot.id_fornecedor = f.id_fornecedor
INNER JOIN Requisicao_Produto rp
ON gcpc.id_grupo_cotacao_produto = rp.id_grupo_cotacao_produto
INNER JOIN Produto p
ON rp.id_produto = p.id_produto
INNER JOIN GrupoCotacao_Produto gcp
ON gcpc.id_grupo_cotacao_produto = gcp.id_grupo_cotacao_produto
ORDER BY 1;

-- Ordem de compra
SELECT
    oc.id_ordem_compra AS 'ID'
    ,oc.data AS 'Data'
    ,IF(oc.tipo_compra='1', 'Matéria-Prima', 'Consumo interno') AS 'Tipo de Compra'
    ,oc.id_cotacao AS 'Cotação'
    ,f.nome_fantasia AS 'Fornecedor'
    ,(SELECT subSelect.valorTotal FROM 
        (SELECT DISTINCT 
            gcpca.id_cotacao, 
            (SELECT DISTINCT(SUM(gcpca.preco_unitario * gcpa.quantidade_total) + cota.frete - cota.desconto)) AS valorTotal 
            FROM GrupoCotacao_Produto_Cotacao gcpca 
            INNER JOIN GrupoCotacao_Produto gcpa
            ON gcpca.id_grupo_cotacao_produto = gcpa.id_grupo_cotacao_produto 
            INNER JOIN Cotacao cota
            ON cota.id_cotacao = gcpca.id_cotacao 
            WHERE cot.id_cotacao = cota.id_cotacao 
            GROUP BY 1
        ) subSelect) AS 'Total (R$)'
    , u.nome AS 'Comprador'
    ,CASE
        WHEN oc.status = '1' THEN 'Em análise' 
        WHEN oc.status = '2' THEN 'Aprovada' 
        WHEN oc.status = '3' THEN 'Reprovada' 
        WHEN oc.status = '4' THEN 'Em processamento' 
        WHEN oc.status = '5' THEN 'Cancelada' 
        WHEN oc.status = '6' THEN 'Problemas' 
        ELSE 'Concluída'
    END AS 'Status'
    ,IFNULL(oc.observacoes, '-') AS 'Observações'
FROM OrdemCompra oc
INNER JOIN Usuario u
ON oc.id_usuario = u.id_usuario
INNER JOIN Cotacao cot
ON oc.id_cotacao = cot.id_cotacao
INNER JOIN Fornecedor f
ON cot.id_fornecedor = f.id_fornecedor
GROUP BY 1;

-- Formas de Pagamento
SELECT
    id_forma_pgto AS 'ID'
    ,descricao AS 'Forma de Pagamento'
FROM FormaPgto;

-- Formas de pagamento de cada Ordem de compra
SELECT
    fpoc.id_ordem_compra AS 'Ordem de Compra'
    ,fp.descricao AS 'Forma de Pagamento'
    ,fpoc.valor AS 'Valor (R$)' 
    ,IFNULL(fpoc.observacoes, '-') AS 'Observações'
FROM OrdemCompra_FormaPgto fpoc
INNER JOIN FormaPgto fp
ON fpoc.id_forma_pgto = fp.id_forma_pgto
ORDER BY 1;

-- Aprovações de Ordem de compra
SELECT
    apoc.id_ordem_compra AS 'Ordem de Compra'
    ,u.nome AS 'Aprovador'
    ,apoc.data AS 'Data da aprovação'
    ,CASE
        WHEN apoc.status = '1' THEN 'Aprovada' 
        WHEN apoc.status = '2' THEN 'Reprovada' 
        WHEN apoc.status = '3' THEN 'Revisão'
    END AS 'Status'
    ,IFNULL(apoc.observacoes, '-') AS 'Observações'
FROM Aprovacao_OrdemCompra apoc
INNER JOIN Usuario u
ON apoc.id_usuario = u.id_usuario
ORDER BY 1;

-- Produtos da Ordem de compra
SELECT DISTINCT
    oc.id_ordem_compra     AS 'Ordem'
    ,p.descricao           AS 'Produto'
    ,gcp.quantidade_total  AS 'Quantidade'
    ,(SELECT gcpc.preco_unitario * gcp.quantidade_total) AS 'Subtotal (R$)'
FROM GrupoCotacao_Produto_Cotacao gcpc
INNER JOIN Cotacao cot
ON gcpc.id_cotacao = cot.id_cotacao
INNER JOIN Requisicao_Produto rp
ON gcpc.id_grupo_cotacao_produto = rp.id_grupo_cotacao_produto
INNER JOIN Produto p
ON rp.id_produto = p.id_produto
INNER JOIN OrdemCompra oc
ON cot.id_cotacao = oc.id_cotacao
INNER JOIN GrupoCotacao_Produto gcp
ON gcpc.id_grupo_cotacao_produto = gcp.id_grupo_cotacao_produto
ORDER BY 1;

-- Subtotal cotação
SELECT DISTINCT gcpc.id_cotacao, (SELECT DISTINCT(SUM(gcpc.preco_unitario * gcp.quantidade_total) + cot.frete - cot.desconto)) AS 'Preço' FROM GrupoCotacao_Produto_Cotacao gcpc INNER JOIN GrupoCotacao_Produto gcp ON gcpc.id_grupo_cotacao_produto = gcp.id_grupo_cotacao_produto INNER JOIN Cotacao cot ON cot.id_cotacao = gcpc.id_cotacao GROUP BY gcpc.id_cotacao;

