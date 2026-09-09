/* ==========================================================================
   Biblioteca · conteúdo de apoio da aba Checklist Portfólio
   Isso aqui não é dado da aluna, é material de consulta. Não muda com o uso.
   ========================================================================== */

const Biblioteca = (() => {

    /* ---------- os 10 tipos de vídeo que todo portfólio UGC precisa ter ---------- */
    const TIPOS = [
        {
            id: 'unboxing',
            nome: 'Unboxing e primeira impressão',
            porque: 'É o vídeo que a marca mais compra, porque mostra o produto chegando na casa de uma pessoa real. Serve pra lançamento.',
            duracao: '20 a 35 segundos',
            beats: [
                { t: '0 a 3s', o: '<b>Gancho de expectativa.</b> Comece com a caixa já na mão e uma frase que abre um loop. <em>Ex: "Eu esperei três semanas por isso aqui."</em>' },
                { t: '3 a 10s', o: '<b>Abertura.</b> Abra devagar, com som real do papel e do plástico. Não fale por cima do som bom.' },
                { t: '10 a 22s', o: '<b>Primeira reação honesta.</b> Toque no produto, sinta a textura, diga a primeira coisa que passou pela sua cabeça, mesmo que seja boba.' },
                { t: '22 a 30s', o: '<b>Um detalhe que ninguém repara.</b> O cheiro, o peso, o acabamento. É esse detalhe que faz o vídeo parecer verdade.' },
                { t: 'final', o: '<b>Chamada leve.</b> <em>Ex: "Vou testar por uma semana e te conto." Isso já prepara o segundo vídeo pra mesma marca.</em>' }
            ],
            erros: ['Abrir a caixa fora de quadro', 'Falar o nome da marca 8 vezes', 'Música alta cobrindo o som do desembrulho']
        },
        {
            id: 'demonstracao',
            nome: 'Demonstração de uso',
            porque: 'Mostra o produto funcionando. É o vídeo que tira a dúvida de quem está quase comprando.',
            duracao: '25 a 45 segundos',
            beats: [
                { t: '0 a 3s', o: '<b>Mostre o resultado antes do processo.</b> <em>Ex: comece pelo cabelo já pronto, depois volte pro começo.</em>' },
                { t: '3 a 8s', o: '<b>Diga pra quem serve.</b> <em>Ex: "Se você tem cabelo fino e ele murcha em duas horas, presta atenção."</em>' },
                { t: '8 a 30s', o: '<b>Passo a passo curto.</b> No máximo 3 passos. Cada passo com um corte seco e a mão em quadro.' },
                { t: '30 a 40s', o: '<b>Resultado final com a mesma luz do começo.</b> Sem truque, senão perde a confiança.' },
                { t: 'final', o: '<b>Frase de fechamento com um benefício concreto.</b> <em>Ex: "Segurou o dia todo, e eu não retoquei nenhuma vez."</em>' }
            ],
            erros: ['Mais de 3 passos', 'Trocar a luz no meio do vídeo', 'Explicar como funciona por dentro em vez de mostrar funcionando']
        },
        {
            id: 'depoimento',
            nome: 'Depoimento honesto',
            porque: 'É você olhando na câmera e contando a experiência. Barato de gravar e a marca usa em anúncio.',
            duracao: '20 a 40 segundos',
            beats: [
                { t: '0 a 4s', o: '<b>Comece pela objeção.</b> <em>Ex: "Eu não acreditava que isso funcionava, achava marketing."</em>' },
                { t: '4 a 12s', o: '<b>Conte o problema que você tinha.</b> Específico, com detalhe da sua vida. Genérico não emociona ninguém.' },
                { t: '12 a 28s', o: '<b>O que mudou.</b> Use número ou tempo. <em>Ex: "Em duas semanas eu parei de acordar com dor."</em>' },
                { t: '28 a 36s', o: '<b>Um ponto negativo pequeno.</b> Isso é o que faz acreditarem em você. <em>Ex: "O cheiro é forte no começo, mas some."</em>' },
                { t: 'final', o: '<b>Recomendação com condição.</b> <em>Ex: "Se você tem [problema], vale muito. Se não tem, não precisa."</em>' }
            ],
            erros: ['Elogiar tudo sem nenhuma ressalva', 'Ler o texto e ficar com olhar de teleprompter', 'Falar como propaganda em vez de conversa']
        },
        {
            id: 'antes-depois',
            nome: 'Antes e depois',
            porque: 'É o formato que mais alcança. Prova visual, sem precisar de argumento.',
            duracao: '15 a 30 segundos',
            beats: [
                { t: '0 a 2s', o: '<b>O antes, sem filtro e sem vergonha.</b> Quanto mais real, mais forte o depois.' },
                { t: '2 a 5s', o: '<b>Frase que dá contexto.</b> <em>Ex: "Essa é a minha pia toda santa terça."</em>' },
                { t: '5 a 20s', o: '<b>O processo em velocidade acelerada.</b> Mesmo ângulo, mesmo enquadramento, mesma luz. Isso é o segredo.' },
                { t: '20 a 27s', o: '<b>O depois no mesmo quadro exato do antes.</b> Segure 3 segundos, deixe respirar.' },
                { t: 'final', o: '<b>Quanto tempo levou e quanto custou.</b> As duas perguntas que sempre aparecem nos comentários.' }
            ],
            erros: ['Mudar o ângulo entre o antes e o depois', 'Antes muito escuro e depois muito claro, parece truque', 'Não dizer quanto tempo levou']
        },
        {
            id: 'problema-solucao',
            nome: 'Problema e solução',
            porque: 'Estrutura clássica de venda. Funciona muito bem como anúncio pago.',
            duracao: '20 a 35 segundos',
            beats: [
                { t: '0 a 3s', o: '<b>Mostre o problema acontecendo.</b> Não fale dele, mostre. <em>Ex: a gaveta bagunçada, a mancha na roupa.</em>' },
                { t: '3 a 8s', o: '<b>A frustração.</b> Uma frase que a pessoa vai dizer "sou eu". <em>Ex: "Eu já tinha comprado três organizadores diferentes."</em>' },
                { t: '8 a 22s', o: '<b>A solução em ação.</b> Rápido, prático, com as mãos aparecendo.' },
                { t: '22 a 30s', o: '<b>O alívio.</b> A cena de depois, tranquila, com você usando no dia a dia.' },
                { t: 'final', o: '<b>Chamada direta.</b> Esse é o único formato onde um "corre lá" cabe bem.' }
            ],
            erros: ['Começar apresentando o produto em vez do problema', 'Problema genérico demais', 'Não mostrar o alívio no final']
        },
        {
            id: 'rotina',
            nome: 'Rotina com o produto',
            porque: 'Coloca o produto na vida real. É o formato que mais gera desejo sem parecer venda.',
            duracao: '30 a 50 segundos',
            beats: [
                { t: '0 a 4s', o: '<b>Contexto de tempo.</b> <em>Ex: "6h20, e eu tenho 15 minutos antes da reunião."</em>' },
                { t: '4 a 15s', o: '<b>Os primeiros passos da rotina, sem o produto ainda.</b> Isso cria naturalidade.' },
                { t: '15 a 35s', o: '<b>O produto entra como parte da rotina</b>, não como o assunto principal.' },
                { t: '35 a 45s', o: '<b>Fecha a rotina.</b> Você pronta, saindo, vivendo. O produto já ficou pra trás.' },
                { t: 'final', o: '<b>Uma frase sobre o que mudou na sua rotina.</b> Discreta.' }
            ],
            erros: ['Rotina irreal demais (cozinha impecável às 6h)', 'Segurar o produto pra câmera como catálogo', 'Cortar rápido demais e perder o clima']
        },
        {
            id: 'comparativo',
            nome: 'Comparativo',
            porque: 'Educativo e salvável. Gera muito comentário, e comentário é o que faz marca te achar.',
            duracao: '25 a 40 segundos',
            beats: [
                { t: '0 a 4s', o: '<b>A pergunta que todo mundo tem.</b> <em>Ex: "Vale pagar 3 vezes mais no importado?"</em>' },
                { t: '4 a 12s', o: '<b>Apresente os dois lado a lado</b>, mesma condição, mesma luz.' },
                { t: '12 a 28s', o: '<b>Teste concreto.</b> Um critério por vez. Textura, cheiro, duração, rendimento.' },
                { t: '28 a 36s', o: '<b>O veredito com nuance.</b> <em>Ex: "Pra usar todo dia, o barato resolve. Pra evento, o caro entrega mais."</em>' },
                { t: 'final', o: '<b>Devolva a pergunta.</b> "Qual você usa?" Isso enche os comentários.' }
            ],
            erros: ['Detonar um produto pra elogiar o outro', 'Comparar coisas de categorias diferentes', 'Não deixar claro qual é qual na tela']
        },
        {
            id: 'lista',
            nome: 'Lista de dicas',
            porque: 'É o formato mais salvo do Instagram. Salvamento é o número que mais impressiona marca.',
            duracao: '25 a 45 segundos',
            beats: [
                { t: '0 a 4s', o: '<b>Prometa o número e o ganho.</b> <em>Ex: "3 jeitos de usar isso que ninguém te contou."</em>' },
                { t: '4 a 14s', o: '<b>Dica 1: a mais óbvia.</b> Serve pra pessoa se sentir inteligente e continuar.' },
                { t: '14 a 26s', o: '<b>Dica 2: a útil.</b> Essa é a que resolve o problema de verdade.' },
                { t: '26 a 38s', o: '<b>Dica 3: a inesperada.</b> Guarde a melhor pro final, é ela que gera o salvamento.' },
                { t: 'final', o: '<b>"Salva pra não esquecer".</b> Pedir salvamento funciona, pedir like não.' }
            ],
            erros: ['Prometer 5 dicas e dar 3', 'Colocar a melhor dica primeiro', 'Texto na tela cobrindo a legenda automática']
        },
        {
            id: 'anuncio',
            nome: 'Vídeo para anúncio',
            porque: 'É o vídeo mais bem pago do UGC. A marca usa como anúncio pago, e cobra-se separado por isso.',
            duracao: '15 a 30 segundos',
            beats: [
                { t: '0 a 2s', o: '<b>Gancho brutal.</b> No anúncio a pessoa não te segue, não te conhece e o dedo está no ar. <em>Ex: "Para. Se você tem [problema], isso aqui é pra você."</em>' },
                { t: '2 a 8s', o: '<b>Problema + agitação.</b> Duas frases, no máximo.' },
                { t: '8 a 20s', o: '<b>Produto como solução, com prova visual.</b> Mostre funcionando, não conte.' },
                { t: '20 a 26s', o: '<b>Quebra de objeção.</b> Preço, tempo ou desconfiança. Escolha a principal.' },
                { t: 'final', o: '<b>Chamada única e clara.</b> Um só verbo. "Clica no link e testa."' }
            ],
            erros: ['Gancho lento (perdeu nos 2 primeiros segundos)', 'Duas chamadas diferentes no final', 'Parecer anúncio de TV em vez de pessoa falando']
        },
        {
            id: 'narracao',
            nome: 'Narração com imagens (voice over)',
            porque: 'Grava sem aparecer, edita rápido e a marca adora porque parece cinema. Ótimo pra quem tem vergonha de câmera.',
            duracao: '20 a 35 segundos',
            beats: [
                { t: 'áudio', o: '<b>Grave a narração primeiro</b>, em ambiente fechado, com o celular perto da boca. O áudio é 70% desse formato.' },
                { t: '0 a 4s', o: '<b>Imagem de abertura bonita</b> com a narração já começando. Nada de silêncio no início.' },
                { t: '4 a 25s', o: '<b>Uma imagem nova a cada 2 ou 3 segundos.</b> Detalhe, textura, mão, movimento. Nunca a mesma imagem por 5 segundos.' },
                { t: 'final', o: '<b>Feche na imagem mais bonita</b> e deixe a última frase respirar em cima dela.' }
            ],
            erros: ['Áudio gravado em ambiente com eco', 'Imagens paradas demais', 'Narração em tom de locutor em vez de conversa']
        }
    ];

    /* ---------- ideias de vídeo por nicho ---------- */
    const NICHOS = [
        {
            id: 'beleza',
            nome: 'Beleza e skincare',
            ideias: [
                { t: 'Minha pele às 6h da manhã, sem filtro', tipo: 'rotina', gancho: '"Essa é a minha pele quando ninguém está vendo."' },
                { t: 'Testei por 14 dias e fotografei todo dia', tipo: 'antes-depois', gancho: '"Dia 1 contra dia 14, mesma luz, mesma hora."' },
                { t: 'A ordem certa de passar os produtos', tipo: 'lista', gancho: '"Você está passando na ordem errada e perdendo dinheiro."' },
                { t: 'O caro contra o de farmácia', tipo: 'comparativo', gancho: '"R$ 260 contra R$ 39. Será que dá pra ver diferença?"' },
                { t: 'Por que eu parei de usar esfoliante todo dia', tipo: 'depoimento', gancho: '"Eu estraguei minha barreira cutânea e demorei 4 meses pra recuperar."' }
            ]
        },
        {
            id: 'casa',
            nome: 'Casa e decoração',
            ideias: [
                { t: 'A gaveta que eu tinha vergonha de abrir', tipo: 'antes-depois', gancho: '"Eu vou mostrar minha gaveta de verdade. Prepara."' },
                { t: 'Montando sozinha, sem homem e sem chorar', tipo: 'demonstracao', gancho: '"Diz que precisa de duas pessoas. Vou provar que não."' },
                { t: '3 lugares que você não pensou em usar isso', tipo: 'lista', gancho: '"O terceiro mudou minha cozinha inteira."' },
                { t: 'Meu canto de trabalho por menos de R$ 400', tipo: 'demonstracao', gancho: '"Tudo que está nessa mesa custou menos que um tênis."' },
                { t: 'Chegou, montei e coloquei no lugar', tipo: 'unboxing', gancho: '"Chegou em 3 dias e eu não acreditei no tamanho da caixa."' }
            ]
        },
        {
            id: 'moda',
            nome: 'Moda e acessórios',
            ideias: [
                { t: 'Provando o tamanho que eu realmente visto', tipo: 'depoimento', gancho: '"Eu visto 44 e ninguém mostra 44 nesse site."' },
                { t: 'Uma peça, cinco produções', tipo: 'lista', gancho: '"Comprei uma peça e usei a semana inteira sem repetir look."' },
                { t: 'Lavei 10 vezes pra ver se desbota', tipo: 'comparativo', gancho: '"Todo mundo mostra a peça nova. Eu vou mostrar depois de 10 lavagens."' },
                { t: 'Expectativa da foto contra a realidade', tipo: 'antes-depois', gancho: '"A foto do site contra o que chegou na minha casa."' },
                { t: 'Do trabalho pro jantar em 2 minutos', tipo: 'demonstracao', gancho: '"Mesma roupa, dois compromissos, dois acessórios."' }
            ]
        },
        {
            id: 'comida',
            nome: 'Comida e bebida',
            ideias: [
                { t: 'Meu café das 6h, todo dia igual', tipo: 'rotina', gancho: '"É a única parte do meu dia que é só minha."' },
                { t: 'Fiz seguindo a embalagem contra do meu jeito', tipo: 'comparativo', gancho: '"A embalagem manda fazer assim. Eu faço assado."' },
                { t: 'Jantar em 12 minutos, cronometrado', tipo: 'demonstracao', gancho: '"Vou cronometrar aqui na tela, sem corte de tempo."' },
                { t: 'Provando pela primeira vez, reação real', tipo: 'unboxing', gancho: '"Nunca provei. Não faço ideia se vou gostar."' },
                { t: '3 jeitos de usar essa mesma coisa', tipo: 'lista', gancho: '"Comprei pra uma receita e uso em três."' }
            ]
        },
        {
            id: 'fitness',
            nome: 'Fitness e saúde',
            ideias: [
                { t: '30 dias tomando, com foto de todo dia', tipo: 'antes-depois', gancho: '"Eu não esperava mudança nenhuma, pra ser sincera."' },
                { t: 'Meu treino de 20 minutos em casa', tipo: 'demonstracao', gancho: '"Sem academia, sem equipamento, sem desculpa."' },
                { t: 'Por que eu parei de treinar em jejum', tipo: 'depoimento', gancho: '"Passei mal duas vezes até entender."' },
                { t: 'O que eu como num dia normal (não é dieta de foto)', tipo: 'rotina', gancho: '"Sem salada montadinha, é o que eu como de verdade."' },
                { t: 'Whey de R$ 90 contra o de R$ 250', tipo: 'comparativo', gancho: '"Preço triplo. Será que muda alguma coisa?"' }
            ]
        },
        {
            id: 'maternidade',
            nome: 'Maternidade e infantil',
            ideias: [
                { t: 'A hora do banho aqui em casa é assim', tipo: 'rotina', gancho: '"Spoiler: alguém sempre chora. Às vezes sou eu."' },
                { t: 'Testei por um mês com uma criança de 2 anos', tipo: 'depoimento', gancho: '"Se sobreviveu a ela, sobrevive a qualquer coisa."' },
                { t: 'O que realmente cabe na bolsa de maternidade', tipo: 'lista', gancho: '"Eu levava 14 itens. Hoje levo 5."' },
                { t: 'Chegou o que eu mais esperava', tipo: 'unboxing', gancho: '"Eu pesquisei três meses antes de comprar isso."' },
                { t: 'Antes e depois do quarto dela', tipo: 'antes-depois', gancho: '"Gastei menos do que você imagina."' }
            ]
        },
        {
            id: 'pet',
            nome: 'Pet',
            ideias: [
                { t: 'A reação dele foi melhor que a minha', tipo: 'unboxing', gancho: '"Ele ouviu o barulho da caixa e já veio correndo."' },
                { t: 'Testei por 15 dias no cachorro mais chato do mundo', tipo: 'depoimento', gancho: '"Ele não come nada. Nada mesmo."' },
                { t: 'O pelo dele antes e depois', tipo: 'antes-depois', gancho: '"Mesma luz, mesma janela, 21 dias de diferença."' },
                { t: 'Nossa rotina da manhã', tipo: 'rotina', gancho: '"Ele acorda 20 minutos antes do meu despertador. Todo dia."' },
                { t: '3 erros que eu cometia e ele odiava', tipo: 'lista', gancho: '"O segundo é o que quase todo mundo faz."' }
            ]
        },
        {
            id: 'servicos',
            nome: 'Serviços e tecnologia',
            ideias: [
                { t: 'Usei por uma semana e o que me irritou', tipo: 'depoimento', gancho: '"Vou falar do que ninguém fala nas avaliações."' },
                { t: 'Configurando do zero, sem pular etapa', tipo: 'demonstracao', gancho: '"Do jeito que uma pessoa normal faria, com as dúvidas e tudo."' },
                { t: 'O gratuito resolve ou preciso pagar?', tipo: 'comparativo', gancho: '"Testei os dois na mesma tarefa."' },
                { t: 'Como isso mudou minha semana de trabalho', tipo: 'problema-solucao', gancho: '"Eu perdia 4 horas por semana com isso."' },
                { t: '3 funções que ninguém usa e deveria', tipo: 'lista', gancho: '"A terceira eu descobri por acidente."' }
            ]
        }
    ];

    /* ---------- checklist de revisão do roteiro ---------- */
    const REVISAO = [
        {
            bloco: 'Os 3 primeiros segundos',
            itens: [
                { t: 'Meu gancho cabe em uma frase falada em 3 segundos', d: 'Cronometre falando em voz alta. Se não cabe, corte palavra.' },
                { t: 'A primeira imagem já mostra alguma coisa acontecendo', d: 'Nada de logo, nada de "oi gente". Comece no meio da ação.' },
                { t: 'Dá pra entender do que se trata sem áudio', d: 'A maioria assiste no mudo. Tem texto na tela ou imagem clara?' },
                { t: 'O gancho fala de um problema ou de um desejo específico', d: '"Como ter uma pele bonita" é fraco. "Minha pele descasca no inverno" é forte.' }
            ]
        },
        {
            bloco: 'O meio',
            itens: [
                { t: 'Não tem nenhum trecho onde eu explico o que já mostrei', d: 'Repetição é onde a pessoa desiste. Mostre ou fale, não os dois.' },
                { t: 'Tem no máximo 3 informações principais', d: 'Mais que isso ninguém guarda e ninguém salva.' },
                { t: 'Tem uma virada ou surpresa no meio', d: 'Um detalhe inesperado segura quem já ia sair.' },
                { t: 'Cada frase leva pra próxima', d: 'Leia em voz alta. Se dá pra cortar uma frase e não muda nada, corte.' },
                { t: 'Tem prova, não só afirmação', d: 'Em vez de "rende muito", mostre quantos dias durou.' }
            ]
        },
        {
            bloco: 'O fechamento',
            itens: [
                { t: 'Tem uma única chamada, não três', d: 'Salva, comenta e compartilha ao mesmo tempo vira nenhuma das três.' },
                { t: 'O final não morre no vazio', d: 'Termine numa frase ou numa imagem forte, não em "é isso, gente".' },
                { t: 'Se for pra marca, o benefício está claro no final', d: 'A pessoa precisa saber o que ela ganha, não o que o produto tem.' }
            ]
        },
        {
            bloco: 'Antes de gravar',
            itens: [
                { t: 'Li em voz alta e não travei em nenhuma frase', d: 'Se você tropeça lendo, vai tropeçar gravando. Reescreva do jeito que você fala.' },
                { t: 'Tirei todas as palavras que eu não uso no dia a dia', d: '"Proporciona", "otimiza", "solução completa" derrubam a naturalidade.' },
                { t: 'Sei exatamente quantos planos preciso gravar', d: 'Liste os cortes antes. Evita gravar 40 vezes e ficar sem o plano principal.' },
                { t: 'Conferi a luz do lugar no horário que vou gravar', d: 'A luz das 15h não é a mesma das 18h. Grave sempre no mesmo horário.' },
                { t: 'Se for de marca, reli o briefing hoje', d: 'O que não pode aparecer, o que precisa ser falado, o prazo de aprovação.' }
            ]
        }
    ];

    /* ---------- o que o portfólio precisa ter pra fechar marca ---------- */
    const PORTFOLIO = [
        {
            bloco: 'O básico que toda marca pede',
            itens: [
                { t: '1 vídeo de demonstração de uso', d: 'É o mais pedido. Se você só tiver um, tenha esse.' },
                { t: '1 depoimento olhando pra câmera', d: 'Prova que você fala bem e que passa confiança.' },
                { t: '1 unboxing', d: 'Serve pra lançamento, que é quando a marca tem mais verba.' },
                { t: '1 antes e depois', d: 'É o que a marca mostra pro chefe dela pra aprovar seu orçamento.' }
            ]
        },
        {
            bloco: 'O que te faz cobrar mais',
            itens: [
                { t: '1 vídeo no formato de anúncio', d: 'Com gancho forte e chamada clara. Esse é o serviço mais bem pago.' },
                { t: '1 narração com imagens (voice over)', d: 'Mostra que você entrega mesmo sem aparecer, o que abre outro tipo de cliente.' },
                { t: '1 comparativo', d: 'Prova que você sabe segurar um vídeo mais longo sem perder a pessoa.' },
                { t: '1 vídeo com produto em movimento (b-roll bonito)', d: 'Textura, luz, mão em cena. É o que faz a marca achar que você é cara e querer mesmo assim.' }
            ]
        },
        {
            bloco: 'A embalagem',
            itens: [
                { t: 'Todos os vídeos na vertical 9:16', d: 'Se estiver em 16:9 a marca já descarta, porque não serve pro feed dela.' },
                { t: 'Áudio limpo em todos, sem eco', d: 'Áudio ruim reprova mais vídeo do que imagem ruim.' },
                { t: 'Os 3 melhores no topo da página', d: 'Ninguém assiste até o fim. Os três primeiros decidem.' },
                { t: 'Cada vídeo com uma linha dizendo o que é', d: '"Demonstração de uso, marca de skincare, 28s". Facilita a vida de quem contrata.' },
                { t: 'Um jeito claro de te chamar', d: 'E-mail ou WhatsApp visível, sem precisar procurar.' },
                { t: 'Seus números atualizados', d: 'Seguidores, alcance médio e o post que mais rendeu.' }
            ]
        },
        {
            bloco: 'Se você ainda não tem marca nenhuma',
            itens: [
                { t: 'Grave com produtos que você já tem em casa', d: 'Ninguém precisa saber que não foi contratado. O vídeo é a amostra do seu trabalho.' },
                { t: 'Escolha 3 marcas que você usa de verdade', d: 'Faz um vídeo espontâneo pra cada. É o portfólio e a prospecção ao mesmo tempo.' },
                { t: 'Não escreva "trabalho fictício" no portfólio', d: 'Você está mostrando a sua capacidade de produzir, e isso é real.' },
                { t: 'Mande o vídeo junto com a proposta pra própria marca', d: 'Receber um vídeo pronto do produto dela é o que mais converte na prospecção.' }
            ]
        }
    ];

    const tipoPorId = id => TIPOS.find(t => t.id === id);

    return { TIPOS, NICHOS, REVISAO, PORTFOLIO, tipoPorId };
})();
