/* ==========================================================================
   Biblioteca · conteúdo de apoio da aba Checklist Portfólio
   Isso aqui não é dado da aluna, é material de consulta. Não muda com o uso.
   ========================================================================== */

const Biblioteca = (() => {

    /* ======================================================================
       1. CHECKLIST DO PORTFÓLIO
       Organizado por página, na ordem em que a marca vai ver.
       ====================================================================== */
    const CHECKLIST = [
        {
            id: 'capa',
            emoji: '🎬',
            nome: 'Capa',
            resumo: 'A marca decide em 3 segundos se continua rolando',
            porque: 'A capa não é enfeite. É a única chance de a marca entender quem é você antes de fechar a aba. Se ela precisar procurar informação, já perdeu.',
            itens: [
                { t: 'Uma foto profissional sua, de corpo ou meio corpo', d: 'Nada de selfie de espelho. A foto mostra que você leva o próprio trabalho a sério.' },
                { t: 'Seu nome e o que você faz em uma linha', d: 'Ex: "Manu Ribeiro · Creator UGC de beleza e casa". A marca precisa saber em 2 segundos.' },
                { t: 'Um texto curto com os seus diferenciais', d: 'Duas ou três frases. O que você entrega que a creator do lado não entrega.' },
                { t: 'Botão de contato já na capa', d: 'Se a marca gostou logo de cara, ela não pode ter que rolar até o fim pra te chamar.' },
                { t: 'Os nichos que você atende, visíveis', d: 'A marca de café quer saber em 1 segundo se você fala com o público dela.' },
                { t: 'Um vídeo ou banner que mostre o seu estilo', d: 'Movimento na capa segura a pessoa muito mais que foto parada.' }
            ]
        },
        {
            id: 'quem',
            emoji: '👋',
            nome: 'Quem é você',
            resumo: 'Direto, sem enrolação e com número',
            porque: 'Marca não contrata quem ela não entende. Essa página existe pra tirar a insegurança de quem está do outro lado decidindo se te chama.',
            itens: [
                { t: 'Apresentação direta, sem rodeio', d: 'Corte todo "sou apaixonada por criar conteúdo". Fale o que você faz e pra quem.' },
                { t: 'Seus maiores diferenciais', d: 'Roteiro próprio? Edição inclusa? Entrega em 48h? Fala em casa com luz natural boa? Isso é diferencial.' },
                { t: 'Suas experiências', d: 'Onde você já trabalhou, com que tipo de marca, que tipo de vídeo você mais entrega.' },
                { t: 'A quantidade de trabalhos que você já fez', d: 'Número dá segurança. "Mais de 40 vídeos entregues" vale mais que qualquer adjetivo.' },
                { t: 'Sua cidade', d: 'Muita marca procura creator da região pra gravar presencial ou receber produto rápido.' },
                { t: 'Uma foto sua profissional, diferente da capa', d: 'Aqui pode ser você trabalhando, gravando, com o setup. Mostra o processo.' }
            ]
        },
        {
            id: 'resultados',
            emoji: '⭐',
            nome: 'Seus melhores resultados',
            resumo: 'O trabalho que você teria orgulho de mostrar pra sua mãe',
            porque: 'Essa é a página que fecha contrato. A marca não quer ver tudo que você já fez, ela quer ver o seu melhor.',
            itens: [
                { t: 'Seus vídeos de melhor qualidade de imagem', d: 'Luz boa, foco certo, áudio limpo. Qualidade técnica é a primeira coisa que reprova.' },
                { t: 'O vídeo com a sua melhor entrega', d: 'Aquele em que você aparece bem, fala com naturalidade e prende do começo ao fim.' },
                { t: 'O vídeo com o seu melhor roteiro', d: 'Aquele que tem gancho, virada e fechamento. Roteiro é o que separa creator de figurante.' },
                { t: 'Aquele vídeo que valeu muito a pena ter produzido', d: 'O que deu resultado, o que a marca comemorou, o que você repetiria.' },
                { t: 'Um áudio de cliente com feedback positivo', d: 'Áudio de WhatsApp de uma marca elogiando vale mais que dez textos escritos por você.' },
                { t: 'Os números de cada vídeo, quando você tiver', d: 'Alcance, salvamentos e comentários embaixo do vídeo. Prova, não promessa.' }
            ]
        },
        {
            id: 'nichos',
            emoji: '🎯',
            nome: 'Seus nichos',
            resumo: 'Mais de 5 nichos, mais de 5 vídeos em cada',
            porque: 'Marca quer ver que você já gravou algo parecido com o produto dela. Se ela não achar, ela imagina que você não sabe fazer.',
            itens: [
                { t: 'Trabalhar com mais de 5 nichos diferentes', d: 'Beleza, casa, comida, moda, pet, fitness, serviço. Quanto mais portas abertas, mais orçamento chega.' },
                { t: 'Ter mais de 5 vídeos em cada nicho que você atende', d: 'Um vídeo solto não convence. Cinco mostram que você domina aquele tipo de produto.' },
                { t: 'Cada nicho com uma seção própria e identificada', d: 'A marca de pet precisa achar a parte de pet sem rolar o portfólio inteiro.' },
                { t: 'Formatos diferentes dentro do mesmo nicho', d: 'Demonstração, depoimento, unboxing e vlog do mesmo tipo de produto. Mostra repertório.' },
                { t: 'Se você ainda não tem 5 nichos, grave com o que tem em casa', d: 'Ninguém precisa saber que não foi contratado. O vídeo é a amostra do seu trabalho.' }
            ]
        },
        {
            id: 'marcas',
            emoji: '💬',
            nome: 'O que as marcas falam de você',
            resumo: 'Elogio na sua boca é propaganda, na boca da marca é prova',
            porque: 'Você pode escrever que é ótima. Ninguém acredita. Quando outra marca escreve, o valor muda de lugar.',
            itens: [
                { t: 'Depoimentos escritos das marcas com quem você trabalhou', d: 'Peça sempre ao entregar. O melhor momento pra pedir é quando a marca acabou de elogiar.' },
                { t: 'Print de conversa real, com autorização', d: 'Mensagem crua do WhatsApp convence mais que texto formatado bonitinho.' },
                { t: 'Nome e @ da marca junto ao depoimento', d: 'Depoimento anônimo parece inventado. Com o @ da marca, vira referência.' },
                { t: 'Áudio ou vídeo de cliente, se você tiver', d: 'É o formato mais forte de todos. Uma frase falada vale um parágrafo escrito.' },
                { t: 'Marcas recorrentes em destaque', d: 'Se alguém te contratou duas vezes, diga isso. É o maior elogio que existe no mercado.' }
            ]
        },
        {
            id: 'contato',
            emoji: '📩',
            nome: 'Contato e chamada',
            resumo: 'Não faça a marca procurar como te contratar',
            porque: 'Você não faz ideia de quantos trabalhos se perdem porque a pessoa gostou, rolou até o fim e não achou um e-mail.',
            itens: [
                { t: 'Seu e-mail de trabalho', d: 'De preferência um e-mail profissional, não o que você usa pra promoção de loja.' },
                { t: 'Seu Instagram', d: 'Clicável. A marca vai te olhar de qualquer jeito, facilite.' },
                { t: 'Seu WhatsApp ou outro meio direto', d: 'Muita marca prefere resolver por mensagem. Se você não der, ela procura outra.' },
                { t: 'Uma chamada clara no final', d: 'Ex: "Me chama que eu te mando uma proposta em 24 horas". Diga o que você quer que aconteça.' },
                { t: 'Sua cidade e se você atende remoto', d: 'Evita a marca desistir achando que você está longe demais.' },
                { t: 'Tudo isso repetido no rodapé de todas as páginas', d: 'A pessoa pode decidir te chamar em qualquer ponto. Deixe o caminho sempre à mão.' }
            ]
        }
    ];

    /* ======================================================================
       2. REFERÊNCIAS DE VÍDEO
       Os formatos que fogem do UGC padrão. Cada um com gancho, roteiro e
       o motivo real de ter funcionado.
       `video` aceita um arquivo em videos/ e `link` aceita URL do reel.
       ====================================================================== */
    const REFERENCIAS = [
        {
            id: 'entrevista-rua',
            titulo: 'Entrevista de rua',
            emoji: '🎤',
            estilo: 'Entrevista',
            audiencia: 'Universal',
            cor: 'terra',
            duracao: '30 a 60s',
            gancho: '"Quanto você acha que custa esse aqui?"',
            porque: 'Funciona porque tem gente real reagindo, e reação de gente real é a coisa mais difícil de fingir. O algoritmo entrega porque prende: a pessoa quer saber a resposta.',
            diferencial: 'Enquanto 90% do UGC é uma pessoa sozinha falando pra câmera na sala de casa, aqui tem rua, tem barulho, tem desconhecido. Isso sozinho já te tira do padrão.',
            erro: 'Perguntar coisa fechada de sim ou não. A pergunta precisa render opinião.',
            roteiro: [
                { t: '0 a 3s', o: 'Já comece com a pergunta sendo feita pra alguém. Sem apresentação, sem "oi gente".' },
                { t: '3 a 15s', o: 'Duas ou três respostas curtas de pessoas diferentes. Corte seco entre elas.' },
                { t: '15 a 30s', o: 'A resposta mais engraçada ou mais absurda. É essa que faz compartilhar.' },
                { t: '30 a 45s', o: 'Você revela a resposta certa e mostra o produto de perto.' },
                { t: 'final', o: 'Devolva a pergunta pra quem está assistindo. "E você, quanto acharia?"' }
            ],
            video: '', link: ''
        },
        {
            id: 'teste-produto',
            titulo: 'Testando o produto de verdade',
            emoji: '🧪',
            estilo: 'Teste',
            audiencia: 'B2C',
            cor: 'oliva',
            duracao: '30 a 45s',
            gancho: '"Vou testar do jeito mais difícil possível."',
            porque: 'Teste real quebra a desconfiança. A pessoa está cansada de review elogioso. Quando você testa no limite, ela acredita no resultado.',
            diferencial: 'Você não fala que funciona, você prova na câmera. E aceita mostrar se não funcionar. Isso é o que a marca boa quer.',
            erro: 'Testar de um jeito fácil demais, que já se sabe que vai dar certo. Perde a graça e a credibilidade.',
            roteiro: [
                { t: '0 a 3s', o: 'Mostre o desafio, não o produto. "Isso aqui promete tirar mancha de caneta. Vamos ver."' },
                { t: '3 a 10s', o: 'Crie o problema na frente da câmera. Sujar, bagunçar, amassar. Sem corte.' },
                { t: '10 a 25s', o: 'O teste acontecendo, em plano fechado, com o som real.' },
                { t: '25 a 35s', o: 'O resultado no mesmo enquadramento do começo. Aqui a prova social entra: "por isso que tem 4 mil avaliações".' },
                { t: 'final', o: 'Um ponto honesto de ressalva. É o que faz a pessoa confiar em você da próxima vez.' }
            ],
            video: '', link: ''
        },
        {
            id: 'vlog-feira',
            titulo: 'Vlog na feira ou no mercado',
            emoji: '🛒',
            estilo: 'Vlog',
            audiencia: 'B2C',
            cor: 'mostarda',
            duracao: '40 a 70s',
            gancho: '"Vem comigo fazer a feira da semana com R$ 100."',
            porque: 'Vlog externo tem vida. Tem gente passando, tem barulho, tem cor. O olho não cansa como cansa numa sala parada.',
            diferencial: 'Portfólio com vídeo externo mostra pra marca que você sabe gravar fora de casa, com barulho e sem controle de luz. Isso vale mais caro.',
            erro: 'Gravar tudo no mesmo plano andando. Precisa de detalhe, de close, de mão pegando o produto.',
            roteiro: [
                { t: '0 a 4s', o: 'Um limite ou uma missão. Valor, tempo ou quantidade. Isso cria o loop.' },
                { t: '4 a 20s', o: 'O caminho, com cortes rápidos e detalhes bonitos. Cores, texturas, mãos.' },
                { t: '20 a 45s', o: 'O produto entra naturalmente no meio da compra, não como propaganda.' },
                { t: '45 a 60s', o: 'O resultado em cima da mesa em casa. Fecha o ciclo que você abriu.' },
                { t: 'final', o: 'Diga se deu ou não deu certo. Cumprir a promessa do gancho é o que fideliza.' }
            ],
            video: '', link: ''
        },
        {
            id: 'venda-rua',
            titulo: 'Vendendo o produto na rua',
            emoji: '🗣️',
            estilo: 'Venda direta',
            audiencia: 'B2C',
            cor: 'coral',
            duracao: '25 a 45s',
            gancho: '"Vou tentar vender isso aqui pra 3 pessoas na rua."',
            porque: 'Tem tensão. A pessoa quer saber se vai dar certo ou se vai passar vergonha. Tensão segura até o fim.',
            diferencial: 'É o formato que mais mostra que você sabe argumentar e vender, que é exatamente o que a marca está comprando de você.',
            erro: 'Editar tirando as recusas. As recusas são a melhor parte, é o que torna real.',
            roteiro: [
                { t: '0 a 3s', o: 'Anuncie o desafio olhando pra câmera, andando. Energia alta.' },
                { t: '3 a 12s', o: 'Primeira abordagem. Deixe a recusa aparecer se acontecer.' },
                { t: '12 a 25s', o: 'Segunda abordagem, agora com um argumento melhor. Mostra evolução.' },
                { t: '25 a 40s', o: 'A pessoa que se interessa. Mostre o rosto, a reação, a pergunta que ela faz.' },
                { t: 'final', o: 'O argumento que funcionou, dito direto pra câmera. É esse o presente que você dá pra quem assistiu.' }
            ],
            video: '', link: ''
        },
        {
            id: 'pov-dramatizacao',
            titulo: 'POV e dramatização',
            emoji: '🎭',
            estilo: 'Dramatização',
            audiencia: 'B2C',
            cor: 'rosa',
            duracao: '15 a 30s',
            gancho: '"POV: você tem visita chegando em 20 minutos."',
            porque: 'A pessoa se vê na cena. Não é você falando do problema, é o problema acontecendo com alguém.',
            diferencial: 'Mostra pra marca que você sabe atuar e criar situação, e não só apresentar produto. Abre porta pra roteiro pago.',
            erro: 'Atuar demais e forçar. O tom precisa ser de vida real, não de teatro.',
            roteiro: [
                { t: '0 a 2s', o: 'A situação já acontecendo, com texto na tela dizendo o contexto.' },
                { t: '2 a 8s', o: 'O desespero, o corre, o problema no auge. É aqui que a pessoa ri e se identifica.' },
                { t: '8 a 20s', o: 'A solução entra na cena, sem virar propaganda. Continue atuando.' },
                { t: 'final', o: 'A cena resolvida, com um detalhe engraçado. Nunca termine com discurso de vendedor.' }
            ],
            video: '', link: ''
        },
        {
            id: 'bastidor-processo',
            titulo: 'Bastidor do seu processo',
            emoji: '🎥',
            estilo: 'Bastidor',
            audiencia: 'B2B',
            cor: 'petroleo',
            duracao: '30 a 50s',
            gancho: '"Como eu gravo um vídeo de marca sozinha em casa."',
            porque: 'Quem contrata creator quer ver como você trabalha. Esse vídeo responde a pergunta que a marca não faz em voz alta: "será que ela é profissional?".',
            diferencial: 'É o único formato dessa lista que fala direto com quem contrata, não com o consumidor final. Coloque um no portfólio e observe as propostas mudarem de tamanho.',
            erro: 'Mostrar só o resultado bonito. O valor está em mostrar o trabalho: o tripé torto, a terceira tomada, o ajuste de luz.',
            roteiro: [
                { t: '0 a 4s', o: 'O resultado final primeiro, por 2 segundos. Depois volte pro começo.' },
                { t: '4 a 20s', o: 'O setup real, com o que você tem. Mostre o improviso, isso gera confiança.' },
                { t: '20 a 40s', o: 'Uma decisão técnica sua explicada em uma frase. "Gravo sempre nessa hora por causa da luz."' },
                { t: 'final', o: 'O resultado de novo, agora com a pessoa entendendo o que teve por trás.' }
            ],
            video: '', link: ''
        },
        {
            id: 'comparativo-lado',
            titulo: 'Comparativo lado a lado',
            emoji: '⚖️',
            estilo: 'Comparativo',
            audiencia: 'Universal',
            cor: 'musgo',
            duracao: '25 a 40s',
            gancho: '"R$ 39 contra R$ 260. Dá pra ver diferença?"',
            porque: 'É o formato mais salvo que existe. Salvamento é o número que mais impressiona marca, porque mostra intenção de compra.',
            diferencial: 'Mostra que você consegue segurar a atenção num vídeo mais analítico, sem depender de humor. Isso vale muito pra marca de produto técnico.',
            erro: 'Detonar um dos dois. O comparativo honesto sempre acha um cenário pra cada um.',
            roteiro: [
                { t: '0 a 4s', o: 'A pergunta com os dois preços na tela. O contraste é o gancho.' },
                { t: '4 a 12s', o: 'Os dois lado a lado, mesma luz, mesmo enquadramento, identificados na tela.' },
                { t: '12 a 28s', o: 'Um critério por vez. Textura, cheiro, duração, rendimento. Um corte por critério.' },
                { t: '28 a 36s', o: 'O veredito com nuance. "Pra todo dia, o barato resolve. Pra evento, o caro entrega mais."' },
                { t: 'final', o: '"Qual você usa?" Comentário puxa comentário, e comentário é o que faz marca te achar.' }
            ],
            video: '', link: ''
        },
        {
            id: 'narracao-broll',
            titulo: 'Narração com imagens bonitas',
            emoji: '🎧',
            estilo: 'Narração',
            audiencia: 'B2B',
            cor: 'areia',
            duracao: '20 a 35s',
            gancho: 'A primeira frase da narração já em cima da imagem mais bonita que você tem.',
            porque: 'Parece cinema e custa quase nada. A marca vê esse vídeo e acha que você é cara, e é justamente por isso que ela topa pagar mais.',
            diferencial: 'É o formato que prova que você entrega mesmo sem aparecer. Isso abre um tipo de cliente que só quer o vídeo, não a sua imagem.',
            erro: 'Áudio com eco. Nesse formato o áudio é 70% do vídeo, então grave em lugar fechado, com o celular perto da boca.',
            roteiro: [
                { t: 'antes', o: 'Grave a narração primeiro. A imagem se encaixa depois, nunca o contrário.' },
                { t: '0 a 4s', o: 'Imagem de abertura forte com a narração já rolando. Sem silêncio no começo.' },
                { t: '4 a 25s', o: 'Uma imagem nova a cada 2 ou 3 segundos. Detalhe, textura, mão, movimento.' },
                { t: 'final', o: 'Feche na imagem mais bonita e deixe a última frase respirar em cima dela.' }
            ],
            video: '', link: ''
        }
    ];

    const ESTILOS = ['Entrevista', 'Teste', 'Vlog', 'Venda direta', 'Dramatização', 'Bastidor', 'Comparativo', 'Narração'];
    const AUDIENCIAS = [
        { v: 'B2C', t: 'B2C · cliente final' },
        { v: 'B2B', t: 'B2B · quem contrata' },
        { v: 'Universal', t: 'Universal' }
    ];

    /* ======================================================================
       3. OS 10 TIPOS DE VÍDEO (estruturas de roteiro)
       ====================================================================== */
    const TIPOS = [
        {
            id: 'unboxing', nome: 'Unboxing e primeira impressão', emoji: '📦', duracao: '20 a 35 segundos',
            porque: 'É o vídeo que a marca mais compra, porque mostra o produto chegando na casa de uma pessoa real. Serve pra lançamento.',
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
            id: 'demonstracao', nome: 'Demonstração de uso', emoji: '👐', duracao: '25 a 45 segundos',
            porque: 'Mostra o produto funcionando. É o vídeo que tira a dúvida de quem está quase comprando.',
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
            id: 'depoimento', nome: 'Depoimento honesto', emoji: '🗣️', duracao: '20 a 40 segundos',
            porque: 'É você olhando na câmera e contando a experiência. Barato de gravar e a marca usa em anúncio.',
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
            id: 'antes-depois', nome: 'Antes e depois', emoji: '🔄', duracao: '15 a 30 segundos',
            porque: 'É o formato que mais alcança. Prova visual, sem precisar de argumento.',
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
            id: 'problema-solucao', nome: 'Problema e solução', emoji: '💡', duracao: '20 a 35 segundos',
            porque: 'Estrutura clássica de venda. Funciona muito bem como anúncio pago.',
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
            id: 'rotina', nome: 'Rotina com o produto', emoji: '☀️', duracao: '30 a 50 segundos',
            porque: 'Coloca o produto na vida real. É o formato que mais gera desejo sem parecer venda.',
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
            id: 'comparativo', nome: 'Comparativo', emoji: '⚖️', duracao: '25 a 40 segundos',
            porque: 'Educativo e salvável. Gera muito comentário, e comentário é o que faz marca te achar.',
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
            id: 'lista', nome: 'Lista de dicas', emoji: '📝', duracao: '25 a 45 segundos',
            porque: 'É o formato mais salvo do Instagram. Salvamento é o número que mais impressiona marca.',
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
            id: 'anuncio', nome: 'Vídeo para anúncio', emoji: '📣', duracao: '15 a 30 segundos',
            porque: 'É o vídeo mais bem pago do UGC. A marca usa como anúncio pago, e cobra-se separado por isso.',
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
            id: 'narracao', nome: 'Narração com imagens (voice over)', emoji: '🎧', duracao: '20 a 35 segundos',
            porque: 'Grava sem aparecer, edita rápido e a marca adora porque parece cinema. Ótimo pra quem tem vergonha de câmera.',
            beats: [
                { t: 'áudio', o: '<b>Grave a narração primeiro</b>, em ambiente fechado, com o celular perto da boca. O áudio é 70% desse formato.' },
                { t: '0 a 4s', o: '<b>Imagem de abertura bonita</b> com a narração já começando. Nada de silêncio no início.' },
                { t: '4 a 25s', o: '<b>Uma imagem nova a cada 2 ou 3 segundos.</b> Detalhe, textura, mão, movimento. Nunca a mesma imagem por 5 segundos.' },
                { t: 'final', o: '<b>Feche na imagem mais bonita</b> e deixe a última frase respirar em cima dela.' }
            ],
            erros: ['Áudio gravado em ambiente com eco', 'Imagens paradas demais', 'Narração em tom de locutor em vez de conversa']
        }
    ];

    /* ======================================================================
       4. IDEIAS POR NICHO
       ====================================================================== */
    const NICHOS = [
        {
            id: 'beleza', nome: 'Beleza e skincare', emoji: '💄',
            ideias: [
                { t: 'Minha pele às 6h da manhã, sem filtro', tipo: 'rotina', gancho: '"Essa é a minha pele quando ninguém está vendo."' },
                { t: 'Testei por 14 dias e fotografei todo dia', tipo: 'antes-depois', gancho: '"Dia 1 contra dia 14, mesma luz, mesma hora."' },
                { t: 'A ordem certa de passar os produtos', tipo: 'lista', gancho: '"Você está passando na ordem errada e perdendo dinheiro."' },
                { t: 'O caro contra o de farmácia', tipo: 'comparativo', gancho: '"R$ 260 contra R$ 39. Será que dá pra ver diferença?"' },
                { t: 'Por que eu parei de usar esfoliante todo dia', tipo: 'depoimento', gancho: '"Eu estraguei minha barreira cutânea e demorei 4 meses pra recuperar."' }
            ]
        },
        {
            id: 'casa', nome: 'Casa e decoração', emoji: '🏠',
            ideias: [
                { t: 'A gaveta que eu tinha vergonha de abrir', tipo: 'antes-depois', gancho: '"Eu vou mostrar minha gaveta de verdade. Prepara."' },
                { t: 'Montando sozinha, sem homem e sem chorar', tipo: 'demonstracao', gancho: '"Diz que precisa de duas pessoas. Vou provar que não."' },
                { t: '3 lugares que você não pensou em usar isso', tipo: 'lista', gancho: '"O terceiro mudou minha cozinha inteira."' },
                { t: 'Meu canto de trabalho por menos de R$ 400', tipo: 'demonstracao', gancho: '"Tudo que está nessa mesa custou menos que um tênis."' },
                { t: 'Chegou, montei e coloquei no lugar', tipo: 'unboxing', gancho: '"Chegou em 3 dias e eu não acreditei no tamanho da caixa."' }
            ]
        },
        {
            id: 'moda', nome: 'Moda e acessórios', emoji: '👗',
            ideias: [
                { t: 'Provando o tamanho que eu realmente visto', tipo: 'depoimento', gancho: '"Eu visto 44 e ninguém mostra 44 nesse site."' },
                { t: 'Uma peça, cinco produções', tipo: 'lista', gancho: '"Comprei uma peça e usei a semana inteira sem repetir look."' },
                { t: 'Lavei 10 vezes pra ver se desbota', tipo: 'comparativo', gancho: '"Todo mundo mostra a peça nova. Eu vou mostrar depois de 10 lavagens."' },
                { t: 'Expectativa da foto contra a realidade', tipo: 'antes-depois', gancho: '"A foto do site contra o que chegou na minha casa."' },
                { t: 'Do trabalho pro jantar em 2 minutos', tipo: 'demonstracao', gancho: '"Mesma roupa, dois compromissos, dois acessórios."' }
            ]
        },
        {
            id: 'comida', nome: 'Comida e bebida', emoji: '🍳',
            ideias: [
                { t: 'Meu café das 6h, todo dia igual', tipo: 'rotina', gancho: '"É a única parte do meu dia que é só minha."' },
                { t: 'Fiz seguindo a embalagem contra do meu jeito', tipo: 'comparativo', gancho: '"A embalagem manda fazer assim. Eu faço assado."' },
                { t: 'Jantar em 12 minutos, cronometrado', tipo: 'demonstracao', gancho: '"Vou cronometrar aqui na tela, sem corte de tempo."' },
                { t: 'Provando pela primeira vez, reação real', tipo: 'unboxing', gancho: '"Nunca provei. Não faço ideia se vou gostar."' },
                { t: '3 jeitos de usar essa mesma coisa', tipo: 'lista', gancho: '"Comprei pra uma receita e uso em três."' }
            ]
        },
        {
            id: 'fitness', nome: 'Fitness e saúde', emoji: '💪',
            ideias: [
                { t: '30 dias tomando, com foto de todo dia', tipo: 'antes-depois', gancho: '"Eu não esperava mudança nenhuma, pra ser sincera."' },
                { t: 'Meu treino de 20 minutos em casa', tipo: 'demonstracao', gancho: '"Sem academia, sem equipamento, sem desculpa."' },
                { t: 'Por que eu parei de treinar em jejum', tipo: 'depoimento', gancho: '"Passei mal duas vezes até entender."' },
                { t: 'O que eu como num dia normal (não é dieta de foto)', tipo: 'rotina', gancho: '"Sem salada montadinha, é o que eu como de verdade."' },
                { t: 'Whey de R$ 90 contra o de R$ 250', tipo: 'comparativo', gancho: '"Preço triplo. Será que muda alguma coisa?"' }
            ]
        },
        {
            id: 'maternidade', nome: 'Maternidade e infantil', emoji: '🍼',
            ideias: [
                { t: 'A hora do banho aqui em casa é assim', tipo: 'rotina', gancho: '"Spoiler: alguém sempre chora. Às vezes sou eu."' },
                { t: 'Testei por um mês com uma criança de 2 anos', tipo: 'depoimento', gancho: '"Se sobreviveu a ela, sobrevive a qualquer coisa."' },
                { t: 'O que realmente cabe na bolsa de maternidade', tipo: 'lista', gancho: '"Eu levava 14 itens. Hoje levo 5."' },
                { t: 'Chegou o que eu mais esperava', tipo: 'unboxing', gancho: '"Eu pesquisei três meses antes de comprar isso."' },
                { t: 'Antes e depois do quarto dela', tipo: 'antes-depois', gancho: '"Gastei menos do que você imagina."' }
            ]
        },
        {
            id: 'pet', nome: 'Pet', emoji: '🐶',
            ideias: [
                { t: 'A reação dele foi melhor que a minha', tipo: 'unboxing', gancho: '"Ele ouviu o barulho da caixa e já veio correndo."' },
                { t: 'Testei por 15 dias no cachorro mais chato do mundo', tipo: 'depoimento', gancho: '"Ele não come nada. Nada mesmo."' },
                { t: 'O pelo dele antes e depois', tipo: 'antes-depois', gancho: '"Mesma luz, mesma janela, 21 dias de diferença."' },
                { t: 'Nossa rotina da manhã', tipo: 'rotina', gancho: '"Ele acorda 20 minutos antes do meu despertador. Todo dia."' },
                { t: '3 erros que eu cometia e ele odiava', tipo: 'lista', gancho: '"O segundo é o que quase todo mundo faz."' }
            ]
        },
        {
            id: 'servicos', nome: 'Serviços e tecnologia', emoji: '💻',
            ideias: [
                { t: 'Usei por uma semana e o que me irritou', tipo: 'depoimento', gancho: '"Vou falar do que ninguém fala nas avaliações."' },
                { t: 'Configurando do zero, sem pular etapa', tipo: 'demonstracao', gancho: '"Do jeito que uma pessoa normal faria, com as dúvidas e tudo."' },
                { t: 'O gratuito resolve ou preciso pagar?', tipo: 'comparativo', gancho: '"Testei os dois na mesma tarefa."' },
                { t: 'Como isso mudou minha semana de trabalho', tipo: 'problema-solucao', gancho: '"Eu perdia 4 horas por semana com isso."' },
                { t: '3 funções que ninguém usa e deveria', tipo: 'lista', gancho: '"A terceira eu descobri por acidente."' }
            ]
        }
    ];

    /* ======================================================================
       5. CHECKLIST DE REVISÃO DO ROTEIRO
       ====================================================================== */
    const REVISAO = [
        {
            bloco: 'Os 3 primeiros segundos', emoji: '⚡',
            itens: [
                { t: 'Meu gancho cabe em uma frase falada em 3 segundos', d: 'Cronometre falando em voz alta. Se não cabe, corte palavra.' },
                { t: 'A primeira imagem já mostra alguma coisa acontecendo', d: 'Nada de logo, nada de "oi gente". Comece no meio da ação.' },
                { t: 'Dá pra entender do que se trata sem áudio', d: 'A maioria assiste no mudo. Tem texto na tela ou imagem clara?' },
                { t: 'O gancho fala de um problema ou de um desejo específico', d: '"Como ter uma pele bonita" é fraco. "Minha pele descasca no inverno" é forte.' }
            ]
        },
        {
            bloco: 'O meio', emoji: '🎞️',
            itens: [
                { t: 'Não tem nenhum trecho onde eu explico o que já mostrei', d: 'Repetição é onde a pessoa desiste. Mostre ou fale, não os dois.' },
                { t: 'Tem no máximo 3 informações principais', d: 'Mais que isso ninguém guarda e ninguém salva.' },
                { t: 'Tem uma virada ou surpresa no meio', d: 'Um detalhe inesperado segura quem já ia sair.' },
                { t: 'Cada frase leva pra próxima', d: 'Leia em voz alta. Se dá pra cortar uma frase e não muda nada, corte.' },
                { t: 'Tem prova, não só afirmação', d: 'Em vez de "rende muito", mostre quantos dias durou.' }
            ]
        },
        {
            bloco: 'O fechamento', emoji: '🏁',
            itens: [
                { t: 'Tem uma única chamada, não três', d: 'Salva, comenta e compartilha ao mesmo tempo vira nenhuma das três.' },
                { t: 'O final não morre no vazio', d: 'Termine numa frase ou numa imagem forte, não em "é isso, gente".' },
                { t: 'Se for pra marca, o benefício está claro no final', d: 'A pessoa precisa saber o que ela ganha, não o que o produto tem.' }
            ]
        },
        {
            bloco: 'Antes de apertar o gravar', emoji: '📱',
            itens: [
                { t: 'Li em voz alta e não travei em nenhuma frase', d: 'Se você tropeça lendo, vai tropeçar gravando. Reescreva do jeito que você fala.' },
                { t: 'Tirei todas as palavras que eu não uso no dia a dia', d: '"Proporciona", "otimiza", "solução completa" derrubam a naturalidade.' },
                { t: 'Sei exatamente quantos planos preciso gravar', d: 'Liste os cortes antes. Evita gravar 40 vezes e ficar sem o plano principal.' },
                { t: 'Conferi a luz do lugar no horário que vou gravar', d: 'A luz das 15h não é a mesma das 18h. Grave sempre no mesmo horário.' },
                { t: 'Se for de marca, reli o briefing hoje', d: 'O que não pode aparecer, o que precisa ser falado, o prazo de aprovação.' }
            ]
        }
    ];

    const tipoPorId = id => TIPOS.find(t => t.id === id);
    const totalItensChecklist = () => CHECKLIST.reduce((n, s) => n + s.itens.length, 0);

    return { CHECKLIST, REFERENCIAS, ESTILOS, AUDIENCIAS, TIPOS, NICHOS, REVISAO, tipoPorId, totalItensChecklist };
})();
