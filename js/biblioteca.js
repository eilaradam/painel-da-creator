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
            id: 'react-prova',
            titulo: 'React com prova real',
            emoji: '😱',
            estilo: 'React',
            audiencia: 'B2C',
            cor: 'coral',
            duracao: '55s',
            youtube: 'https://youtube.com/shorts/08Bl9O930Kg',
            marca: 'Creamy',
            gancho: '"Ok, Jade Picon, a gente já entendeu que sua pele é perfeita, mas... peraí, o que é isso que ela tá passando?"',
            porque: 'Pega carona em alguém que a audiência já para pra ver, e transforma a curiosidade em teste. Quando a Lara diz "com os meus poros que dá pra ver do espaço", ela sai do lugar de quem vende e vai pro lugar de quem tem o mesmo problema de quem assiste.',
            diferencial: 'Junta dois formatos que quase ninguém junta: o react, que é entretenimento e segura, e a demonstração, que é o que vende. E fecha com prova de fora ("nos testes da marca, 100% das pessoas falaram que a textura melhorou"), não só com a opinião dela.',
            erro: 'Reagir e não testar. O react sozinho entretém e não vende. A prova é o que transforma em trabalho de marca.',
            roteiro: [
                { t: '0 a 5s', o: '<b>Entre no meio da cena de outra pessoa.</b> Uma celebridade ou um vídeo que está rodando. <em>"A gente já entendeu que sua pele é perfeita, mas..."</em>' },
                { t: '5 a 12s', o: '<b>A pergunta que abre o loop.</b> "O que é isso que ela está passando?" Aqui a audiência quer a resposta e não sai mais.' },
                { t: '12 a 20s', o: '<b>Se coloque no mesmo problema de quem assiste.</b> Exponha o seu defeito antes de falar do produto.' },
                { t: '20 a 35s', o: '<b>Diga o que o produto NÃO é antes de dizer o que ele é.</b> <em>"Isso não é tônico, não é água de limpar o rosto. É tratamento."</em> Isso educa e justifica o preço.' },
                { t: '35 a 45s', o: '<b>Resultado com honestidade.</b> <em>"Não é milagre de uma hora não, mas é rápido de verdade."</em> A ressalva é o que faz acreditarem no resto.' },
                { t: '45 a 55s', o: '<b>Prova de fora + chamada.</b> Número do teste da marca e uma frase seca no fim.' }
            ]
        },
        {
            id: 'conversa-encenada',
            titulo: 'Conversa encenada',
            emoji: '💬',
            estilo: 'Encenação',
            audiencia: 'B2C',
            cor: 'rosa',
            duracao: '38s',
            youtube: 'https://youtube.com/shorts/XczFsjLCIUU',
            marca: 'Lemon Bank',
            gancho: 'A cena já rolando, sem apresentação: "São R$ 18. Crédito ou débito?"',
            porque: 'Toda a informação do produto chega dentro de um diálogo. Ninguém sente que está assistindo propaganda, sente que está escutando uma conversa. As perguntas que a audiência tem são feitas pela outra pessoa na cena.',
            diferencial: 'Exige segunda pessoa e locação, que é justamente o que a maioria das creators não faz. Portfólio com esse formato mostra pra marca que você produz cena, não só fala pra câmera. É o tipo de vídeo que muda a faixa de preço da sua proposta.',
            erro: 'Diálogo decorado. Se as duas pessoas falarem certinho demais, quebra. Deixe a fala se atropelar um pouco.',
            roteiro: [
                { t: '0 a 4s', o: '<b>A cena no meio de uma ação comum.</b> Um pagamento, um pedido, uma entrega. Nada de "oi gente".' },
                { t: '4 a 10s', o: '<b>O produto entra por acaso.</b> Alguém repara nele. <em>"Que cartão bonito, né?"</em>' },
                { t: '10 a 25s', o: '<b>A outra pessoa pergunta o que a audiência quer saber.</b> Cada dúvida vira uma fala, não um texto na tela.' },
                { t: '25 a 33s', o: '<b>O benefício principal dito de forma simples,</b> com a reação de surpresa de quem ouviu. A reação vale mais que a informação.' },
                { t: 'final', o: '<b>Feche dentro da cena, com humor.</b> <em>"Vou até trazer uma limonada por conta da casa."</em> Nunca saia da cena pra virar vendedor.' }
            ]
        },
        {
            id: 'demonstracao-externa',
            titulo: 'Demonstração externa',
            emoji: '🧁',
            estilo: 'Demonstração',
            audiencia: 'B2C',
            cor: 'mostarda',
            duracao: '32s',
            youtube: 'https://youtube.com/shorts/5wf8Fv2CTa4',
            marca: 'InfinitePay',
            gancho: '"Me chamaram de maluca só porque eu tava vendendo brigadeiro, até descobrirem quanto tava caindo na minha conta."',
            porque: 'Abre com julgamento social e dinheiro, duas coisas que ninguém consegue ignorar. E o produto aparece resolvendo uma situação real, na rua, não em cima de uma mesa branca.',
            diferencial: 'Gravado fora, com uma venda acontecendo de verdade. A marca vê esse vídeo e entende que você sabe gravar sem estúdio, sem controle de luz e com barulho em volta. Isso vale caro.',
            erro: 'Mostrar o aplicativo parado na tela. O produto tem que estar sendo usado no meio da ação, com a mão e o cliente em quadro.',
            roteiro: [
                { t: '0 a 6s', o: '<b>Gancho de julgamento + curiosidade de dinheiro.</b> "Me chamaram de maluca... até descobrirem quanto tava caindo na minha conta."' },
                { t: '6 a 12s', o: '<b>Revele o segredo.</b> O produto entra como resposta a uma pergunta que você mesma plantou.' },
                { t: '12 a 22s', o: '<b>Passo a passo curto, na tela, enquanto a venda acontece.</b> No máximo 3 toques.' },
                { t: '22 a 28s', o: '<b>Número concreto que quebra objeção.</b> Taxa, parcelamento, custo. Sem número o vídeo vira conversa fiada.' },
                { t: 'final', o: '<b>Uma chamada só, com um verbo só.</b>' }
            ]
        },
        {
            id: 'dor-em-cortes',
            titulo: 'Sequência de dor em cortes',
            emoji: '😩',
            estilo: 'Problema e solução',
            audiencia: 'Universal',
            cor: 'terra',
            duracao: '30s',
            youtube: 'https://youtube.com/shorts/i9dHLO0VlFk',
            marca: 'Velds',
            gancho: '"Meu Deus, será que eu deixei a luz de casa acesa de novo? E a chave, onde que eu coloquei?"',
            porque: 'São duas ou três aflições em cortes rápidos logo de cara, sem produto nenhum. A pessoa se reconhece em pelo menos uma nos primeiros segundos, e quem se reconhece não rola.',
            diferencial: 'Cada dor mostrada no começo é resolvida na tela depois, na mesma ordem. Esse fechamento de ciclo é o que faz o vídeo parecer completo em 30 segundos.',
            erro: 'Dor genérica. "A correria do dia a dia" não é dor, é frase de calendário. Dor é a chave que você não sabe onde colocou.',
            roteiro: [
                { t: '0 a 8s', o: '<b>Duas ou três aflições em cortes secos.</b> Sem produto, sem marca, só o desespero. Fale em voz de pensamento.' },
                { t: '8 a 12s', o: '<b>A virada em uma frase.</b> <em>"Graças a X eu não tenho mais esse problema."</em>' },
                { t: '12 a 25s', o: '<b>Resolva cada dor na ordem em que você mostrou.</b> Uma solução por corte, com a mão em quadro.' },
                { t: '25 a 30s', o: '<b>Amplie:</b> liste rápido o que mais existe na linha, pra abrir o desejo além do que foi mostrado.' },
                { t: 'final', o: '<b>Frase de valor pessoal.</b> <em>"Salvou minha rotina e vale cada centavo."</em>' }
            ]
        },
        {
            id: 'entrevista-mercado',
            titulo: 'Entrevista no mercado',
            emoji: '🛒',
            estilo: 'Entrevista',
            audiencia: 'B2C',
            cor: 'oliva',
            duracao: '35s',
            youtube: 'https://youtube.com/shorts/wesTfq67X9o',
            marca: 'Méliuz',
            gancho: '"Caraca, o café tá caro desse jeito? Você tá levando tudo isso?"',
            porque: 'Preço de supermercado é assunto que qualquer pessoa tem opinião, então o gancho pega geral. E a explicação do produto não vem de você vendendo, vem da outra pessoa contando. Informação na boca de terceiro tem outro peso.',
            diferencial: 'Locação real, pessoa real e o produto explicado por quem usa. É o formato mais difícil de gravar dessa lista e por isso o que menos aparece no portfólio das outras.',
            erro: 'Parecer roteirizado. Deixe o estranhamento genuíno acontecer ("promoção? aqui não tem promoção de café"), porque é ele que segura.',
            roteiro: [
                { t: '0 a 5s', o: '<b>Aborde no corredor com uma observação, não com uma pergunta de vendedor.</b> "O café tá caro desse jeito?"' },
                { t: '5 a 12s', o: '<b>Crie o estranhamento.</b> A outra pessoa fala de uma promoção que não existe na prateleira. Isso abre a curiosidade.' },
                { t: '12 a 25s', o: '<b>Deixe a pessoa explicar.</b> Você só faz as perguntas que a audiência faria: "explica pra gente".' },
                { t: '25 a 32s', o: '<b>Exemplo com número, apontando o produto que está na mão.</b> "Esse café aqui está com 30% de cashback."' },
                { t: 'final', o: '<b>Reação e saída natural.</b> "Vou aproveitar pra levar o meu também." Sem chamada forçada.' }
            ]
        },
        {
            id: 'rotina-marca',
            titulo: 'Rotina com a marca',
            emoji: '☀️',
            estilo: 'Rotina',
            audiencia: 'B2C',
            cor: 'areia',
            duracao: '40s',
            youtube: 'https://youtube.com/shorts/0FhBNV71z9A',
            marca: 'Ateliê',
            gancho: 'Um contexto de tempo logo na primeira frase, com você já no meio da rotina.',
            porque: 'Coloca o produto dentro de uma vida que a pessoa quer ter. Não tem argumento de venda, tem desejo. É o formato que a marca pede quando quer construir imagem em vez de vender no impulso.',
            diferencial: 'O produto não é o assunto, ele é parte do cenário. Isso exige confiança da sua parte e é justamente o que faz parecer conteúdo em vez de anúncio.',
            erro: 'Rotina irreal. Cozinha impecável às 6h da manhã ninguém acredita. Deixe a bagunça aparecer um pouco.',
            roteiro: [
                { t: '0 a 4s', o: '<b>Contexto de tempo.</b> Uma hora, um compromisso, um limite. Isso ancora a cena na realidade.' },
                { t: '4 a 15s', o: '<b>Os primeiros passos da rotina sem o produto ainda.</b> É o que cria a naturalidade.' },
                { t: '15 a 32s', o: '<b>O produto entra como parte da rotina,</b> não como o assunto principal. Mostre o uso, não a embalagem.' },
                { t: '32 a 40s', o: '<b>Feche a rotina.</b> Você pronta, saindo, vivendo. O produto já ficou pra trás.' },
                { t: 'final', o: '<b>Uma frase discreta sobre o que mudou.</b> Quanto menos vendedora, mais funciona.' }
            ]
        },
        {
            id: 'entrevista-rua',
            titulo: 'Entrevista de rua',
            emoji: '🎤',
            estilo: 'Entrevista',
            audiencia: 'Universal',
            cor: 'petroleo',
            duracao: '30 a 60s',
            gancho: '"Quanto você acha que custa esse aqui?"',
            porque: 'Funciona porque tem gente real reagindo, e reação de gente real é a coisa mais difícil de fingir. A audiência quer saber a resposta, então fica até o fim.',
            diferencial: 'Enquanto a maioria do UGC é uma pessoa sozinha falando na sala de casa, aqui tem rua, barulho e desconhecido. Isso sozinho já te tira do padrão.',
            erro: 'Pergunta fechada de sim ou não. A pergunta precisa render opinião.',
            roteiro: [
                { t: '0 a 3s', o: 'Já comece com a pergunta sendo feita pra alguém. Sem apresentação.' },
                { t: '3 a 15s', o: 'Duas ou três respostas curtas de pessoas diferentes, com corte seco entre elas.' },
                { t: '15 a 30s', o: 'A resposta mais engraçada ou mais absurda. É essa que faz compartilhar.' },
                { t: '30 a 45s', o: 'Você revela a resposta certa e mostra o produto de perto.' },
                { t: 'final', o: 'Devolva a pergunta pra quem está assistindo.' }
            ]
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
            diferencial: 'Mostra que você consegue segurar a atenção num vídeo analítico, sem depender de humor. Vale muito pra marca de produto técnico.',
            erro: 'Detonar um dos dois. O comparativo honesto sempre acha um cenário pra cada um.',
            roteiro: [
                { t: '0 a 4s', o: 'A pergunta com os dois preços na tela. O contraste é o gancho.' },
                { t: '4 a 12s', o: 'Os dois lado a lado, mesma luz, mesmo enquadramento, identificados na tela.' },
                { t: '12 a 28s', o: 'Um critério por vez, um corte por critério.' },
                { t: '28 a 36s', o: 'O veredito com nuance, um cenário pra cada um.' },
                { t: 'final', o: '"Qual você usa?" Comentário puxa comentário.' }
            ]
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
            diferencial: 'É o único formato dessa lista que fala com quem contrata, não com o consumidor. Coloque um no portfólio e veja as propostas mudarem de tamanho.',
            erro: 'Mostrar só o resultado bonito. O valor está em mostrar o trabalho: o tripé torto, a terceira tomada, o ajuste de luz.',
            roteiro: [
                { t: '0 a 4s', o: 'O resultado final primeiro, por 2 segundos. Depois volte pro começo.' },
                { t: '4 a 20s', o: 'O setup real, com o que você tem. Mostre o improviso, isso gera confiança.' },
                { t: '20 a 40s', o: 'Uma decisão técnica sua explicada em uma frase.' },
                { t: 'final', o: 'O resultado de novo, agora com a pessoa entendendo o que teve por trás.' }
            ]
        },
        {
            id: 'narracao-broll',
            titulo: 'Narração com imagens bonitas',
            emoji: '🎧',
            estilo: 'Narração',
            audiencia: 'B2B',
            cor: 'rosa',
            duracao: '20 a 35s',
            gancho: 'A primeira frase da narração já em cima da imagem mais bonita que você tem.',
            porque: 'Parece cinema e custa quase nada. A marca vê e acha que você é cara, e é por isso que ela topa pagar mais.',
            diferencial: 'Prova que você entrega mesmo sem aparecer, o que abre um tipo de cliente que só quer o vídeo, não a sua imagem.',
            erro: 'Áudio com eco. Nesse formato o áudio é 70% do vídeo.',
            roteiro: [
                { t: 'antes', o: 'Grave a narração primeiro. A imagem se encaixa depois, nunca o contrário.' },
                { t: '0 a 4s', o: 'Imagem de abertura forte com a narração já rolando. Sem silêncio no começo.' },
                { t: '4 a 25s', o: 'Uma imagem nova a cada 2 ou 3 segundos.' },
                { t: 'final', o: 'Feche na imagem mais bonita e deixe a última frase respirar.' }
            ]
        }
    ];

    const ESTILOS = ['React', 'Encenação', 'Demonstração', 'Problema e solução', 'Entrevista', 'Rotina', 'Comparativo', 'Bastidor', 'Narração'];
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
