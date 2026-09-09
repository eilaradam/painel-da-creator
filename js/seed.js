/* ==========================================================================
   Seed · a creator de exemplo que aparece quando a aluna abre pela 1ª vez
   As datas são geradas a partir de HOJE, então o painel nunca parece velho.
   ========================================================================== */

const Seed = (() => {

    function vazio({ uid, dia, mes }) {
        return {
            versao: 3,
            criadoEm: new Date().toISOString(),
            exemplo: false,
            perfil: {
                nome: '',
                arroba: '',
                nicho: '',
                cidade: '',
                email: '',
                whatsapp: '',
                bio: '',
                seguidores: 0,
                metaMes: 5000,
                cache: { reels: 0, stories: 0, foto: 0, combo: 0, exclusividade: 30, permissaoAds: 50 }
            },
            marcas: [],
            propostas: [],
            entregas: [],
            conteudos: [],
            lancamentos: [],
            historicoIg: [],
            postsIg: [],
            referencias: [],
            mensagens: modelosDeMensagem(uid),
            marcacoes: {}
        };
    }

    function criar({ uid, dia, mes }) {
        const s = vazio({ uid, dia, mes });
        s.exemplo = true;

        s.perfil = {
            nome: 'Manu Ribeiro',
            arroba: '@manu.ribeiro',
            nicho: 'Beleza e casa',
            cidade: 'São Paulo, SP',
            email: 'contato@manuribeiro.com.br',
            whatsapp: '(11) 98765-4321',
            bio: 'Creator de beleza e casa. Faço vídeo que parece indicação de amiga, não propaganda.',
            seguidores: 24700,
            metaMes: 12000,
            cache: { reels: 1200, stories: 450, foto: 600, combo: 1800, exclusividade: 30, permissaoAds: 50 }
        };

        /* ---------------- Marcas (o funil) ---------------- */
        s.marcas = [
            {
                id: uid(), nome: 'Lumi Skincare', contato: 'Rafaela (marketing)',
                email: 'rafaela@lumiskincare.com.br', instagram: '@lumiskincare', nicho: 'Beleza',
                status: 'contato', valor: 1800, origem: 'Elas me chamaram no direct',
                proximoPasso: 'Mandar o mídia kit e perguntar o orçamento', prazoRetorno: dia(1),
                obs: 'Chamaram depois do reels da rotina de skincare. Querem 1 reels + 3 stories.',
                criadoEm: dia(-2)
            },
            {
                id: uid(), nome: 'Verde Vida Suplementos', contato: 'Diego',
                email: 'diego@verdevida.com', instagram: '@verdevidaoficial', nicho: 'Saúde',
                status: 'contato', valor: 900, origem: 'Prospecção minha por e-mail',
                proximoPasso: 'Dar um retorno, faz 4 dias que mandei', prazoRetorno: dia(0),
                obs: 'Mandei e-mail de apresentação. Ainda não respondeu.',
                criadoEm: dia(-4)
            },
            {
                id: uid(), nome: 'Casa Nova Decor', contato: 'Patrícia (dona)',
                email: 'patricia@casanovadecor.com.br', instagram: '@casanovadecor', nicho: 'Casa',
                status: 'conversando', valor: 2400, origem: 'Indicação da Bia',
                proximoPasso: 'Mandar a proposta com 2 opções de pacote', prazoRetorno: dia(1),
                obs: 'Quer conteúdo pra coleção de verão. Pediu proposta com e sem permissão de anúncio.',
                criadoEm: dia(-7)
            },
            {
                id: uid(), nome: 'Bloom Cosméticos', contato: 'Nathalia (agência Nove)',
                email: 'nathalia@agencianove.com', instagram: '@bloomcosmeticos', nicho: 'Beleza',
                status: 'conversando', valor: 3200, origem: 'Trabalhou comigo em maio',
                proximoPasso: 'Ela volta com o briefing na quinta', prazoRetorno: dia(3),
                obs: 'Recorrente. Já fizemos 2 campanhas. Sempre paga em 15 dias, sem atraso.',
                criadoEm: dia(-5)
            },
            {
                id: uid(), nome: 'Studio Café', contato: 'Léo',
                email: 'leo@studiocafe.com.br', instagram: '@studiocafesp', nicho: 'Comida',
                status: 'proposta', valor: 1600, origem: 'Eles me chamaram no direct',
                proximoPasso: 'Cobrar retorno da proposta, já faz 5 dias', prazoRetorno: dia(-1),
                obs: 'Proposta enviada dia ' + dia(-5) + '. Sem resposta até agora.',
                criadoEm: dia(-12)
            },
            {
                id: uid(), nome: 'Tec Fit', contato: 'Amanda',
                email: 'amanda@tecfit.com.br', instagram: '@tecfitbrasil', nicho: 'Fitness',
                status: 'proposta', valor: 2100, origem: 'Prospecção minha por e-mail',
                proximoPasso: 'Aguardar até sexta, depois ligo', prazoRetorno: dia(4),
                obs: 'Gostaram do portfólio. Querem começar com 1 vídeo teste.',
                criadoEm: dia(-9)
            },
            {
                id: uid(), nome: 'Aurora Home', contato: 'Juliana',
                email: 'juliana@aurorahome.com.br', instagram: '@aurorahome', nicho: 'Casa',
                status: 'fechado', valor: 2800, origem: 'Indicação da Bia',
                proximoPasso: 'Gravar o reels até quinta', prazoRetorno: dia(2),
                obs: 'Contrato assinado. 1 reels + 4 stories + 3 fotos. Pagamento 50% agora, 50% na entrega.',
                criadoEm: dia(-14)
            },
            {
                id: uid(), nome: 'Doce Grão Cafés', contato: 'Marcos',
                email: 'marcos@docegrao.com.br', instagram: '@docegraocafes', nicho: 'Comida',
                status: 'fechado', valor: 1600, origem: 'Eles me chamaram no direct',
                proximoPasso: 'Roteiro aprovado, gravar semana que vem', prazoRetorno: dia(6),
                obs: '2 reels sobre a linha de cafés especiais. Produto já chegou.',
                criadoEm: dia(-11)
            },
            {
                id: uid(), nome: 'Mari Flores', contato: 'Mariana',
                email: 'mari@mariflores.com.br', instagram: '@marifloresatelie', nicho: 'Casa',
                status: 'entregue', valor: 1200, origem: 'Indicação',
                proximoPasso: 'Nota emitida, vence dia ' + dia(8), prazoRetorno: dia(8),
                obs: 'Entregue e aprovado. Pagamento combinado em 15 dias.',
                criadoEm: dia(-22)
            },
            {
                id: uid(), nome: 'Bloom Cosméticos', contato: 'Nathalia (agência Nove)',
                email: 'nathalia@agencianove.com', instagram: '@bloomcosmeticos', nicho: 'Beleza',
                status: 'pago', valor: 3400, origem: 'Campanha de agosto',
                proximoPasso: '', prazoRetorno: '',
                obs: 'Campanha lançamento do sérum. Melhor resultado do ano: 89 mil de alcance.',
                criadoEm: dia(-38)
            },
            {
                id: uid(), nome: 'Ateliê Lis', contato: 'Carol',
                email: 'carol@atelielis.com.br', instagram: '@atelielis', nicho: 'Moda',
                status: 'pago', valor: 1400, origem: 'Prospecção minha',
                proximoPasso: '', prazoRetorno: '',
                obs: 'Permuta + cachê. Toparia repetir.',
                criadoEm: dia(-45)
            },
            {
                id: uid(), nome: 'Glow Beauty', contato: 'Sem retorno',
                email: 'contato@glowbeauty.com.br', instagram: '@glowbeautybr', nicho: 'Beleza',
                status: 'perdida', valor: 800, origem: 'Prospecção minha',
                proximoPasso: '', prazoRetorno: '',
                obs: 'Só queriam permuta. Recusei, não cobre nem o dia de gravação.',
                criadoEm: dia(-30)
            }
        ];

        const acharMarca = nome => (s.marcas.find(m => m.nome === nome) || {}).id || '';

        /* ---------------- Propostas ---------------- */
        s.propostas = [
            {
                id: uid(), marcaId: acharMarca('Studio Café'), marcaNome: 'Studio Café',
                titulo: 'Campanha de setembro', status: 'enviada', enviadaEm: dia(-5),
                validadeDias: 10, desconto: 0,
                itens: [
                    { desc: '1 Reels roteirizado e gravado no local', qtd: 1, valor: 1200 },
                    { desc: 'Sequência de 3 stories com link', qtd: 1, valor: 400 }
                ],
                condicoes: 'Pagamento em até 15 dias após a entrega. Uma rodada de ajuste inclusa. Prazo de entrega: 7 dias corridos após a gravação.',
                obs: 'Sem resposta faz 5 dias. Mandar follow up.'
            },
            {
                id: uid(), marcaId: acharMarca('Tec Fit'), marcaNome: 'Tec Fit',
                titulo: 'Vídeo teste', status: 'enviada', enviadaEm: dia(-3),
                validadeDias: 15, desconto: 0,
                itens: [
                    { desc: '1 Reels no formato antes e depois', qtd: 1, valor: 1200 },
                    { desc: 'Permissão de anúncio por 60 dias', qtd: 1, valor: 600 },
                    { desc: '2 stories de bastidor', qtd: 1, valor: 300 }
                ],
                condicoes: 'Pagamento 50% na aprovação do roteiro e 50% na entrega. Uma rodada de ajuste inclusa.',
                obs: ''
            },
            {
                id: uid(), marcaId: acharMarca('Aurora Home'), marcaNome: 'Aurora Home',
                titulo: 'Coleção primavera', status: 'aprovada', enviadaEm: dia(-16),
                validadeDias: 10, desconto: 200,
                itens: [
                    { desc: '1 Reels de decoração da sala', qtd: 1, valor: 1400 },
                    { desc: '4 stories mostrando a montagem', qtd: 1, valor: 600 },
                    { desc: '3 fotos editadas para o feed da marca', qtd: 1, valor: 700 },
                    { desc: 'Permissão de anúncio por 90 dias', qtd: 1, valor: 300 }
                ],
                condicoes: 'Pagamento 50% na assinatura e 50% na entrega. Duas rodadas de ajuste inclusas.',
                obs: 'Fechada. Dei R$ 200 de desconto pelo pacote fechado.'
            },
            {
                id: uid(), marcaId: acharMarca('Casa Nova Decor'), marcaNome: 'Casa Nova Decor',
                titulo: 'Coleção de verão (rascunho)', status: 'rascunho', enviadaEm: '',
                validadeDias: 10, desconto: 0,
                itens: [
                    { desc: '2 Reels da coleção', qtd: 1, valor: 2400 },
                    { desc: '6 stories', qtd: 1, valor: 900 }
                ],
                condicoes: 'Pagamento em até 15 dias após a entrega. Uma rodada de ajuste inclusa.',
                obs: 'Ela pediu com e sem permissão de anúncio. Fazer as duas versões.'
            }
        ];

        /* ---------------- Entregas ---------------- */
        s.entregas = [
            {
                id: uid(), marcaNome: 'Aurora Home', titulo: 'Reels da sala decorada',
                formato: 'Reels', prazo: dia(2), status: 'gravar', valor: 1400, link: '',
                brief: 'Mostrar a estante montada do zero. Falar do preço e do frete grátis acima de R$ 199. Não pode aparecer marca concorrente no fundo.'
            },
            {
                id: uid(), marcaNome: 'Aurora Home', titulo: '4 stories da montagem',
                formato: 'Stories', prazo: dia(3), status: 'gravar', valor: 600, link: '',
                brief: 'Sequência mostrando a caixa chegando, a montagem e o resultado. Último story com o link da loja.'
            },
            {
                id: uid(), marcaNome: 'Doce Grão Cafés', titulo: 'Reels 1: como faço meu café',
                formato: 'Reels', prazo: dia(6), status: 'editar', valor: 800, link: '',
                brief: 'Rotina da manhã. Mostrar o grão, o preparo e a xícara pronta. Tom calmo, sem correria.'
            },
            {
                id: uid(), marcaNome: 'Doce Grão Cafés', titulo: 'Reels 2: comparação de moagem',
                formato: 'Reels', prazo: dia(9), status: 'roteiro', valor: 800, link: '',
                brief: 'Explicar a diferença da moagem fina e grossa de um jeito simples. Formato educativo.'
            },
            {
                id: uid(), marcaNome: 'Mari Flores', titulo: 'Reels do arranjo de mesa',
                formato: 'Reels', prazo: dia(-4), status: 'aprovado', valor: 1200,
                link: 'https://instagram.com/reel/exemplo',
                brief: 'Arranjo pra mesa de jantar. Entregue e aprovado sem ajuste.'
            }
        ];

        /* ---------------- Conteúdo do perfil dela ---------------- */
        s.conteudos = [
            { id: uid(), titulo: '3 erros que fazem a marca não te responder', formato: 'Reels', pilar: 'Autoridade', status: 'ideia', data: dia(5), roteiro: '' },
            { id: uid(), titulo: 'Meu setup de gravação por menos de R$ 300', formato: 'Reels', pilar: 'Bastidor', status: 'ideia', data: dia(8), roteiro: '' },
            { id: uid(), titulo: 'Como eu organizo minhas parcerias', formato: 'Carrossel', pilar: 'Autoridade', status: 'roteiro', data: dia(3), roteiro: 'Gancho: "Eu perdi uma marca de R$ 2 mil porque esqueci de responder um e-mail."' },
            { id: uid(), titulo: 'Rotina de skincare da manhã', formato: 'Reels', pilar: 'Nicho', status: 'gravar', data: dia(1), roteiro: 'Gancho: acordar e ir direto pro banheiro, sem falar nada nos 2 primeiros segundos.' },
            { id: uid(), titulo: 'Antes e depois do canto da leitura', formato: 'Reels', pilar: 'Nicho', status: 'editar', data: dia(0), roteiro: '' },
            { id: uid(), titulo: 'Respondendo: quanto eu cobro?', formato: 'Stories', pilar: 'Autoridade', status: 'postado', data: dia(-2), roteiro: '' },
            { id: uid(), titulo: 'Tour pela minha estante nova', formato: 'Reels', pilar: 'Nicho', status: 'postado', data: dia(-5), roteiro: '' }
        ];

        /* ---------------- Financeiro ---------------- */
        s.lancamentos = [
            { id: uid(), tipo: 'entrada', desc: 'Campanha lançamento do sérum', marca: 'Bloom Cosméticos', valor: 3400, data: dia(-6), status: 'recebido', categoria: 'Publi' },
            { id: uid(), tipo: 'entrada', desc: 'Conteúdo coleção primavera (50% na assinatura)', marca: 'Aurora Home', valor: 1400, data: dia(-10), status: 'recebido', categoria: 'Publi' },
            { id: uid(), tipo: 'entrada', desc: 'Vídeos de produto', marca: 'Ateliê Lis', valor: 1400, data: dia(-18), status: 'recebido', categoria: 'UGC' },
            { id: uid(), tipo: 'entrada', desc: 'Reels do arranjo de mesa', marca: 'Mari Flores', valor: 1200, data: dia(-19), status: 'recebido', categoria: 'UGC' },
            { id: uid(), tipo: 'entrada', desc: 'Comissão de afiliado', marca: 'Loja Amei', valor: 340, data: dia(-8), status: 'recebido', categoria: 'Afiliado' },
            { id: uid(), tipo: 'entrada', desc: 'Coleção primavera (50% na entrega)', marca: 'Aurora Home', valor: 1400, data: dia(7), status: 'previsto', categoria: 'Publi' },
            { id: uid(), tipo: 'entrada', desc: '2 reels linha de cafés', marca: 'Doce Grão Cafés', valor: 1600, data: dia(12), status: 'previsto', categoria: 'Publi' },
            { id: uid(), tipo: 'entrada', desc: 'Reels do arranjo (nota vence)', marca: 'Mari Flores', valor: 1200, data: dia(8), status: 'previsto', categoria: 'UGC' },
            { id: uid(), tipo: 'saida', desc: 'Edição terceirizada (3 vídeos)', marca: '', valor: 450, data: dia(-7), status: 'recebido', categoria: 'Terceiros' },
            { id: uid(), tipo: 'saida', desc: 'Assinatura do app de edição', marca: '', valor: 49, data: dia(-12), status: 'recebido', categoria: 'Ferramenta' },
            { id: uid(), tipo: 'saida', desc: 'Ring light nova', marca: '', valor: 289, data: dia(-15), status: 'recebido', categoria: 'Equipamento' },
            { id: uid(), tipo: 'saida', desc: 'Uber para a gravação', marca: '', valor: 62, data: dia(-9), status: 'recebido', categoria: 'Deslocamento' },

            /* histórico dos meses anteriores, pra ela ver a evolução no gráfico */
            { id: uid(), tipo: 'entrada', desc: 'Campanha de inverno', marca: 'Bloom Cosméticos', valor: 2200, data: mes(-1) + '-14', status: 'recebido', categoria: 'Publi' },
            { id: uid(), tipo: 'entrada', desc: 'Vídeos de produto', marca: 'Ateliê Lis', valor: 1200, data: mes(-1) + '-22', status: 'recebido', categoria: 'UGC' },
            { id: uid(), tipo: 'entrada', desc: 'Reels da coleção', marca: 'Casa Nova Decor', valor: 1800, data: mes(-2) + '-09', status: 'recebido', categoria: 'Publi' },
            { id: uid(), tipo: 'entrada', desc: '3 vídeos para anúncio', marca: 'Verde Vida Suplementos', valor: 2400, data: mes(-2) + '-25', status: 'recebido', categoria: 'UGC' },
            { id: uid(), tipo: 'entrada', desc: 'Parceria de julho', marca: 'Mari Flores', valor: 1100, data: mes(-3) + '-11', status: 'recebido', categoria: 'UGC' },
            { id: uid(), tipo: 'entrada', desc: 'Reels de lançamento', marca: 'Lumi Skincare', valor: 1500, data: mes(-3) + '-27', status: 'recebido', categoria: 'Publi' },
            { id: uid(), tipo: 'entrada', desc: 'Primeiro trabalho pago', marca: 'Ateliê Lis', valor: 800, data: mes(-4) + '-18', status: 'recebido', categoria: 'UGC' },
            { id: uid(), tipo: 'entrada', desc: 'Primeira permuta com cachê', marca: 'Glow Beauty', valor: 450, data: mes(-5) + '-20', status: 'recebido', categoria: 'Permuta com cachê' },
            { id: uid(), tipo: 'entrada', desc: 'Comissão de afiliado', marca: 'Loja Amei', valor: 260, data: mes(-4) + '-28', status: 'recebido', categoria: 'Afiliado' },
            { id: uid(), tipo: 'saida', desc: 'Microfone de lapela', marca: '', valor: 180, data: mes(-3) + '-05', status: 'recebido', categoria: 'Equipamento' },
            { id: uid(), tipo: 'saida', desc: 'Assinatura do app de edição', marca: '', valor: 49, data: mes(-1) + '-12', status: 'recebido', categoria: 'Ferramenta' }
        ];

        /* ---------------- Números do Instagram ---------------- */
        s.historicoIg = [
            { mes: mes(-5), seguidores: 18400, alcance: 62000, engajamento: 4.1, posts: 9, salvamentos: 1180 },
            { mes: mes(-4), seguidores: 19600, alcance: 71500, engajamento: 4.4, posts: 11, salvamentos: 1420 },
            { mes: mes(-3), seguidores: 20900, alcance: 68200, engajamento: 3.9, posts: 8, salvamentos: 1150 },
            { mes: mes(-2), seguidores: 22300, alcance: 94800, engajamento: 5.2, posts: 12, salvamentos: 2140 },
            { mes: mes(-1), seguidores: 23800, alcance: 118400, engajamento: 5.6, posts: 13, salvamentos: 2610 },
            { mes: mes(0), seguidores: 24700, alcance: 47200, engajamento: 5.1, posts: 5, salvamentos: 980 }
        ];

        s.postsIg = [
            { id: uid(), titulo: 'Antes e depois da estante', data: dia(-5), formato: 'Reels', alcance: 89400, salvos: 1840, comentarios: 212, compart: 640, virouMarca: true },
            { id: uid(), titulo: 'Rotina de skincare da manhã', data: dia(-9), formato: 'Reels', alcance: 41200, salvos: 720, comentarios: 96, compart: 210, virouMarca: true },
            { id: uid(), titulo: 'Quanto eu cobro por um reels', data: dia(-13), formato: 'Carrossel', alcance: 28600, salvos: 1960, comentarios: 178, compart: 380, virouMarca: false },
            { id: uid(), titulo: 'Tour pelo meu cantinho de trabalho', data: dia(-17), formato: 'Reels', alcance: 22100, salvos: 410, comentarios: 54, compart: 88, virouMarca: false },
            { id: uid(), titulo: 'Café que eu tomo todo dia', data: dia(-21), formato: 'Reels', alcance: 16800, salvos: 290, comentarios: 41, compart: 62, virouMarca: true }
        ];

        /* a Manu já tem parte do portfólio pronto, pra barra não abrir em zero */
        s.marcacoes = {
            'cl:capa:0': true, 'cl:capa:1': true, 'cl:capa:2': true, 'cl:capa:3': true, 'cl:capa:4': true, 'cl:capa:5': true,
            'cl:quem:0': true, 'cl:quem:1': true, 'cl:quem:3': true, 'cl:quem:4': true,
            'cl:resultados:0': true, 'cl:resultados:1': true, 'cl:resultados:2': true,
            'cl:nichos:0': true, 'cl:nichos:2': true,
            'cl:contato:0': true, 'cl:contato:1': true, 'cl:contato:2': true
        };

        return s;
    }

    /* ---------------- Modelos de mensagem ---------------- */
    function modelosDeMensagem(uid) {
        return [
            {
                id: uid(), categoria: 'Primeiro contato', titulo: 'Apresentação por e-mail (marca que eu já uso)',
                texto: 'Assunto: Conteúdo para a [MARCA] · [SEU @]\n\nOi, [NOME]!\n\nMeu nome é [SEU NOME], sou creator de [SEU NICHO] e tenho [X] mil seguidores no Instagram.\n\nEu uso [PRODUTO] há [TEMPO] e vejo muita gente perguntando sobre ele nos meus comentários. Por isso pensei em fazer um conteúdo mostrando [IDEIA EM UMA FRASE].\n\nDeixo aqui meu portfólio: [LINK]\n\nSe fizer sentido, me conta qual é o orçamento de vocês para creators que eu monto uma proposta redondinha.\n\nUm beijo,\n[SEU NOME]\n[SEU @] · [SEU WHATSAPP]'
            },
            {
                id: uid(), categoria: 'Primeiro contato', titulo: 'Direct curto (marca pequena)',
                texto: 'Oi, [MARCA]! Tudo bem?\n\nSou a [SEU NOME], faço conteúdo de [SEU NICHO] aqui pro Instagram. Acompanho vocês faz um tempo e tive uma ideia de vídeo com [PRODUTO] que acho que a minha audiência ia amar.\n\nPosso te mandar meu portfólio e os valores? :)'
            },
            {
                id: uid(), categoria: 'Follow up', titulo: 'Cobrar retorno da proposta (sem parecer chata)',
                texto: 'Oi, [NOME]! Tudo bem?\n\nPassando pra saber se você chegou a ver a proposta que mandei dia [DATA]. Sem pressa nenhuma, é só pra eu saber se seguro a agenda de [MÊS] pra vocês ou se libero.\n\nQualquer ajuste que precisar, é só falar que eu adapto.\n\nBeijo!'
            },
            {
                id: uid(), categoria: 'Follow up', titulo: 'Terceira tentativa (a última)',
                texto: 'Oi, [NOME]!\n\nVou fechar minha agenda de [MÊS] essa semana, então esse é meu último toque por aqui :)\n\nSe der certo mais pra frente, minha porta segue aberta. E se não for o momento, sem problema nenhum, só me avisa que eu tiro da minha lista de acompanhamento.\n\nObrigada!'
            },
            {
                id: uid(), categoria: 'Negociação', titulo: 'Quando a marca acha caro',
                texto: 'Oi, [NOME]! Entendo perfeitamente.\n\nMeu valor cobre roteiro, gravação, edição e a cessão de imagem, que é o que garante o vídeo pronto pra usar sem retrabalho pra vocês.\n\nMas dá pra caber no orçamento de [VALOR] assim:\n\nOpção 1: tiro a permissão de anúncio e entrego só o post orgânico.\nOpção 2: mantenho a permissão de anúncio e reduzo de [X] pra [Y] entregas.\n\nMe conta qual faz mais sentido que eu já ajusto a proposta.'
            },
            {
                id: uid(), categoria: 'Negociação', titulo: 'Quando oferecem só permuta',
                texto: 'Oi, [NOME]! Obrigada pelo convite, fiquei feliz de vocês terem pensado em mim.\n\nHoje eu não fecho só com permuta porque a produção do vídeo tem um custo real pra mim (roteiro, gravação, edição e o dia de trabalho).\n\nO que eu consigo fazer é uma primeira parceria enxuta de [VALOR], já com o produto incluso. Se rodar bem, a gente evolui pra um pacote maior.\n\nFaz sentido pra vocês?'
            },
            {
                id: uid(), categoria: 'Fechamento', titulo: 'Alinhamento antes de gravar',
                texto: 'Oi, [NOME]! Fechado então :)\n\nSó pra deixar tudo alinhado antes de eu gravar:\n\n· Entregas: [O QUE VOCÊ VAI ENTREGAR]\n· Data de entrega: [DATA]\n· Valor: [VALOR], pago [CONDIÇÃO]\n· Ajustes: [X] rodada inclusa\n· Uso do conteúdo: [ORGÂNICO / ANÚNCIO POR X DIAS]\n\nSe estiver tudo certo, é só me confirmar por aqui que eu já começo o roteiro. Ah, me manda também o que NÃO pode aparecer ou ser falado, pra eu não errar :)'
            },
            {
                id: uid(), categoria: 'Cobrança', titulo: 'Pagamento atrasado (primeiro toque)',
                texto: 'Oi, [NOME]! Tudo bem?\n\nO pagamento do conteúdo que entreguei dia [DATA] venceu em [DATA VENCIMENTO] e ainda não caiu na conta. Deve ser só algum trâmite aí do financeiro.\n\nVocê consegue verificar pra mim? Se precisar que eu reenvie a nota, é só falar.\n\nObrigada!'
            },
            {
                id: uid(), categoria: 'Pós-entrega', titulo: 'Mandar o resultado (e plantar a próxima)',
                texto: 'Oi, [NOME]! Passando os números do conteúdo:\n\n· Alcance: [X]\n· Salvamentos: [X]\n· Comentários: [X]\n· Compartilhamentos: [X]\n\nO comentário que mais apareceu foi "[COMENTÁRIO]", o que mostra que a audiência entendeu bem [PONTO].\n\nSe quiserem, eu já tenho uma ideia de continuação pra [MÊS QUE VEM]: [IDEIA]. Me avisa que eu separo a data :)'
            }
        ];
    }

    return { criar, vazio, modelosDeMensagem, VERSAO: 3 };
})();
