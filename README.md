# Painel da Creator

Painel de gestão da carreira de uma creator UGC. Cada pessoa que abre o link tem o seu próprio painel: os dados ficam salvos no navegador dela, sem login e sem cadastro.

Feito para as alunas da Imersão.

## O que tem dentro

| Aba | Para que serve |
|---|---|
| **Início** | Resumo do dia: quanto entrou, o que está em aberto e o que precisa de ação hoje |
| **Marcas** | Funil de contato até pagamento, em quadro de arrastar (contato, conversando, proposta, fechado, entregue, pago) |
| **Propostas** | Monta o orçamento com a tabela de preços dela e gera a proposta pronta pra mandar (copiar ou salvar em PDF) |
| **Entregas** | O que foi prometido, pra quem e até quando, agrupado por urgência |
| **Financeiro** | Entradas, gastos, meta do mês e de onde vem o dinheiro |
| **Conteúdo** | Quadro de produção (ideia até postado) e calendário |
| **Instagram** | Histórico mensal de seguidores, alcance e engajamento, mais os posts que renderam marca |
| **Checklist Portfólio** | O que gravar, 10 estruturas de roteiro, ideias por nicho e checklist de revisão do roteiro |
| **Mensagens** | Modelos prontos de abordagem, cobrança e negociação, já preenchidos com os dados dela |
| **Configurações** | Perfil, tabela de preços e backup |

## Como funciona por baixo

HTML, CSS e JavaScript puro. Sem framework, sem build, sem servidor.

- Os dados vivem no `localStorage` do navegador (chave `painel-da-creator:v1`)
- O backup é um arquivo `.json` que a pessoa baixa e restaura quando quiser
- Na primeira abertura, carrega um painel de exemplo (a creator fictícia Manu Ribeiro) para a pessoa entender cada tela. Em Configurações ela limpa tudo e começa com os dados dela

```
index.html          a casca (sidebar + topo)
css/app.css         o design system inteiro
js/store.js         estado + localStorage + backup
js/seed.js          os dados de exemplo
js/biblioteca.js    conteúdo do Checklist Portfólio (roteiros, nichos, checklists)
js/ui.js            modal, aviso, ícones, formatação
js/app.js           navegação entre abas
js/views/*.js       uma aba cada
```

## As duas formas de usar

**1. Online:** https://eilaradam.github.io/painel-da-creator/

**2. Instalado no computador:** o arquivo `Painel-da-Creator.html` é o painel inteiro num arquivo só (CSS e JS embutidos, cerca de 300 KB). A pessoa salva onde quiser, dá dois cliques e ele abre no navegador, funcionando igual e sem internet. Só os vídeos das referências precisam de conexão.

Na aba Configurações, quem estiver na versão online vê um botão **"Baixar o meu painel"** que entrega esse arquivo pronto.

> Cada cópia guarda os próprios dados: o que está salvo na versão online não aparece na copiada, e vice-versa. Pra levar os dados de uma pra outra, use Baixar backup e Restaurar de um backup.

## Gerar o arquivo único

Depois de qualquer mudança no código:

```
node build.js
```

Ele junta `index.html` + `css/app.css` + todos os `js/` e escreve `Painel-da-Creator.html`. O script recusa gerar se sobrar qualquer referência a arquivo local, então o resultado sempre roda sozinho.

## Vídeos nas referências

Cada referência aceita três formas de vídeo, e o painel escolhe a que existir:

| Campo | O que colocar | Como aparece |
|---|---|---|
| `youtube` ou `link` | link do YouTube em qualquer formato | player do YouTube dentro da ficha, e a capa do card vem automática |
| `instagram` ou `link` | link do reel ou post público | o post embutido dentro da ficha |
| `video` | caminho de um arquivo, ex: `videos/entrevista.mp4` | player nativo, funciona offline |

Sem nenhum dos três, o card mostra uma capa com emoji e o gradiente da cor da categoria.

## Rodar local durante o desenvolvimento

```
python3 -m http.server 5199
```

E abrir `http://localhost:5199`.

## Publicação

GitHub Pages na branch `main`, raiz do repositório. Todo push publica em cerca de um minuto.
