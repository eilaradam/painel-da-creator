/* ==========================================================================
   Marcas · o funil, do primeiro contato até o dinheiro na conta
   ========================================================================== */

window.Views = window.Views || {};

Views.marcas = (() => {

    const COLUNAS = [
        { id: 'contato', nome: 'Contato feito', cor: 'info', emoji: '👋' },
        { id: 'conversando', nome: 'Conversando', cor: 'info', emoji: '💬' },
        { id: 'proposta', nome: 'Proposta enviada', cor: 'warn', emoji: '📄' },
        { id: 'fechado', nome: 'Fechado', cor: 'accent', emoji: '🤝' },
        { id: 'entregue', nome: 'Entregue', cor: 'accent', emoji: '📦' },
        { id: 'pago', nome: 'Pago', cor: 'ok', emoji: '💰' }
    ];

    const NOMES = COLUNAS.reduce((a, c) => (a[c.id] = c.nome, a), { perdida: 'Não rolou' });

    let filtro = '';
    let verPerdidas = false;
    let raiz = null;

    /* ---------- render ---------- */
    function render(el) {
        raiz = el;
        desenhar();
    }

    function desenhar() {
        const marcas = Store.lista('marcas');
        const busca = filtro.toLowerCase();
        const visiveis = marcas.filter(m => {
            if (m.status === 'perdida' && !verPerdidas) return false;
            if (!busca) return true;
            return (m.nome + ' ' + (m.contato || '') + ' ' + (m.nicho || '') + ' ' + (m.obs || '')).toLowerCase().includes(busca);
        });

        const emAberto = marcas.filter(m => ['contato', 'conversando', 'proposta'].includes(m.status));
        const valorAberto = emAberto.reduce((s, m) => s + (Number(m.valor) || 0), 0);
        const aReceber = marcas.filter(m => ['fechado', 'entregue'].includes(m.status)).reduce((s, m) => s + (Number(m.valor) || 0), 0);
        const atrasadas = marcas.filter(m => m.prazoRetorno && (UI.emDias(m.prazoRetorno) ?? 99) <= 0 && !['pago', 'perdida'].includes(m.status));

        raiz.innerHTML = `
            <div class="stats stagger" style="margin-bottom:22px">
                <div class="stat">
                    <div class="stat-label">Conversas em aberto</div>
                    <div class="stat-value">${emAberto.length}</div>
                    <div class="stat-foot">${UI.brl(valorAberto)} em jogo</div>
                </div>
                <div class="stat">
                    <div class="stat-label">Fechado a receber</div>
                    <div class="stat-value">${UI.brl(aReceber)}</div>
                    <div class="stat-foot">já é seu, falta entregar ou receber</div>
                </div>
                <div class="stat">
                    <div class="stat-label">Precisam de você hoje</div>
                    <div class="stat-value" ${atrasadas.length ? 'style="color:var(--danger)"' : ''}>${atrasadas.length}</div>
                    <div class="stat-foot">${atrasadas.length ? 'passou do dia de dar retorno' : 'nenhuma marca esperando'}</div>
                </div>
                <div class="stat">
                    <div class="stat-label">Fechamento</div>
                    <div class="stat-value">${taxaFechamento(marcas)}<small>%</small></div>
                    <div class="stat-foot">das conversas viram trabalho</div>
                </div>
            </div>

            <div class="toolbar">
                <div class="search">
                    ${UI.icon('busca')}
                    <input class="input" id="mBusca" placeholder="Buscar marca, contato ou anotação" value="${UI.esc(filtro)}">
                </div>
                <button class="chip${verPerdidas ? ' on' : ''}" id="mPerdidas" type="button">Mostrar as que não rolaram</button>
                <div class="spacer" style="margin-left:auto"></div>
                <button class="btn btn-primary" id="mNova" type="button">${UI.icon('mais')} Nova marca</button>
            </div>

            ${atrasadas.length ? `
                <div class="note" style="margin-bottom:18px">
                    ${UI.icon('alerta')}
                    <div><b>${atrasadas.length === 1 ? 'Uma marca está' : atrasadas.length + ' marcas estão'} esperando seu retorno.</b>
                    ${UI.esc(atrasadas.map(m => m.nome).join(', '))}. Marca que está parada é dinheiro parado.</div>
                </div>` : ''}

            <div class="board" id="mBoard">
                ${COLUNAS.map(c => coluna(c, visiveis)).join('')}
            </div>

            ${verPerdidas ? colunaPerdidas(visiveis) : ''}
        `;

        ligar();
    }

    function coluna(c, marcas) {
        const itens = marcas.filter(m => m.status === c.id);
        const total = itens.reduce((s, m) => s + (Number(m.valor) || 0), 0);
        return `
            <section class="col" data-col="${c.id}">
                <div class="col-head">
                    <span style="font-size:15px">${c.emoji}</span>
                    <h4>${c.nome}</h4>
                    <span class="col-count">${itens.length}</span>
                </div>
                ${total ? `<div class="col-total">${UI.brl(total)}</div>` : '<div class="col-total">&nbsp;</div>'}
                <div class="col-body" data-drop="${c.id}">
                    ${itens.map(cartao).join('') || `<div style="padding:18px 4px;font-size:12.5px;color:var(--muted);text-align:center;line-height:1.7"><span style="font-size:22px;display:block;opacity:.5">${c.emoji}</span>Arraste uma marca pra cá</div>`}
                </div>
            </section>`;
    }

    function colunaPerdidas(marcas) {
        const itens = marcas.filter(m => m.status === 'perdida');
        if (!itens.length) return '';
        return `
            <section class="section" style="margin-top:26px">
                <div class="section-head">
                    <div>
                        <h2>Não rolou</h2>
                        <p>Guarde o motivo. Muita marca que disse não hoje volta em seis meses.</p>
                    </div>
                </div>
                <div class="grid g3">
                    ${itens.map(m => `
                        <article class="card" data-id="${m.id}" draggable="false">
                            <div class="card-top">
                                <div class="card-avatar">${UI.iniciais(m.nome)}</div>
                                <div style="flex:1;min-width:0">
                                    <div class="card-title">${UI.esc(m.nome)}</div>
                                    <div class="card-sub">${UI.esc(m.obs || 'sem motivo anotado')}</div>
                                </div>
                            </div>
                        </article>`).join('')}
                </div>
            </section>`;
    }

    function cartao(m) {
        const prazo = m.prazoRetorno ? UI.prazoTexto(m.prazoRetorno) : null;
        return `
            <article class="card" draggable="true" data-id="${m.id}">
                <div class="card-top">
                    <div class="card-avatar">${UI.iniciais(m.nome)}</div>
                    <div style="flex:1;min-width:0">
                        <div class="card-title">${UI.esc(m.nome)}</div>
                        <div class="card-sub">${UI.esc(m.contato || m.instagram || '')}</div>
                    </div>
                </div>
                ${m.proximoPasso ? `<div style="margin-top:9px;font-size:12.5px;color:var(--soft);line-height:1.45">${UI.esc(m.proximoPasso)}</div>` : ''}
                <div class="card-foot">
                    ${m.valor ? `<span class="card-money">${UI.brl(m.valor)}</span>` : ''}
                    ${prazo ? `<span class="pill ${prazo.tom ? 'pill-' + prazo.tom : ''}">${prazo.texto}</span>` : ''}
                </div>
            </article>`;
    }

    function taxaFechamento(marcas) {
        const decididas = marcas.filter(m => ['fechado', 'entregue', 'pago', 'perdida'].includes(m.status));
        if (!decididas.length) return 0;
        const ganhas = decididas.filter(m => m.status !== 'perdida').length;
        return Math.round((ganhas / decididas.length) * 100);
    }

    /* ---------- eventos ---------- */
    function ligar() {
        const busca = raiz.querySelector('#mBusca');
        busca.addEventListener('input', e => {
            filtro = e.target.value;
            const pos = e.target.selectionStart;
            desenhar();
            const novo = raiz.querySelector('#mBusca');
            novo.focus();
            novo.setSelectionRange(pos, pos);
        });

        raiz.querySelector('#mPerdidas').addEventListener('click', () => {
            verPerdidas = !verPerdidas;
            desenhar();
        });

        raiz.querySelector('#mNova').addEventListener('click', () => abrirFicha(null));

        raiz.querySelectorAll('.card[data-id]').forEach(card => {
            card.addEventListener('click', e => {
                if (card.classList.contains('dragging')) return;
                abrirFicha(card.dataset.id);
            });
            card.addEventListener('dragstart', e => {
                e.dataTransfer.setData('text/plain', card.dataset.id);
                e.dataTransfer.effectAllowed = 'move';
                setTimeout(() => card.classList.add('dragging'), 0);
            });
            card.addEventListener('dragend', () => card.classList.remove('dragging'));
        });

        raiz.querySelectorAll('[data-drop]').forEach(zona => {
            const col = zona.closest('.col');
            zona.addEventListener('dragover', e => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                col.classList.add('drop');
            });
            zona.addEventListener('dragleave', e => {
                if (!zona.contains(e.relatedTarget)) col.classList.remove('drop');
            });
            zona.addEventListener('drop', e => {
                e.preventDefault();
                col.classList.remove('drop');
                const id = e.dataTransfer.getData('text/plain');
                const marca = Store.find('marcas', id);
                if (!marca) return;
                const novo = zona.dataset.drop;
                if (marca.status === novo) return;
                Store.update('marcas', id, { status: novo });
                if (novo === 'pago') {
                    UI.confete();
                    UI.toast('💸 ' + marca.nome + ' pagou! ' + UI.brl(marca.valor));
                    registrarPagamento(marca);
                } else {
                    UI.toast(marca.nome + ' foi para "' + NOMES[novo] + '"');
                }
                desenhar();
                App.atualizarBadges();
                App.atualizarUrgente();
            });
        });
    }

    /** quando a marca vira "pago", oferece lançar no financeiro */
    function registrarPagamento(marca) {
        const jaTem = Store.lista('lancamentos').some(l => l.marca === marca.nome && Number(l.valor) === Number(marca.valor) && l.status === 'recebido');
        if (jaTem || !marca.valor) return;
        Store.add('lancamentos', {
            tipo: 'entrada',
            desc: 'Trabalho para ' + marca.nome,
            marca: marca.nome,
            valor: Number(marca.valor),
            data: Store.dia(0),
            status: 'recebido',
            categoria: 'Publi'
        });
        UI.toast(UI.brl(marca.valor) + ' lançado no financeiro');
    }

    /* ---------- ficha da marca ---------- */
    function abrirFicha(id) {
        const m = id ? Store.find('marcas', id) : {
            nome: '', contato: '', email: '', instagram: '', nicho: '', status: 'contato',
            valor: '', origem: '', proximoPasso: '', prazoRetorno: '', obs: ''
        };
        const novo = !id;

        const corpo = `
            <div class="field-row">
                ${UI.campo('Nome da marca', UI.input('nome', m.nome, 'placeholder="Ex: Lumi Skincare"'))}
                ${UI.campo('Com quem você fala', UI.input('contato', m.contato, 'placeholder="Ex: Rafaela (marketing)"'))}
            </div>
            <div class="field-row">
                ${UI.campo('E-mail', UI.input('email', m.email, 'type="email" placeholder="contato@marca.com"'))}
                ${UI.campo('Instagram', UI.input('instagram', m.instagram, 'placeholder="@marca"'))}
            </div>
            <div class="field-row three">
                ${UI.campo('Etapa', UI.select('status', [...COLUNAS.map(c => ({ v: c.id, t: c.nome })), { v: 'perdida', t: 'Não rolou' }], m.status))}
                ${UI.campo('Valor em jogo', UI.input('valor', m.valor, 'type="number" min="0" step="50" placeholder="1800"'))}
                ${UI.campo('Nicho', UI.input('nicho', m.nicho, 'placeholder="Beleza"'))}
            </div>
            <div class="field-row">
                ${UI.campo('Como chegou até você', UI.select('origem', [
                    'Elas me chamaram no direct', 'Prospecção minha por e-mail', 'Prospecção minha no direct',
                    'Indicação', 'Agência', 'Plataforma de campanha', 'Outro'
                ], m.origem || 'Elas me chamaram no direct'))}
                ${UI.campo('Quando dar o próximo retorno', UI.input('prazoRetorno', m.prazoRetorno, 'type="date"'))}
            </div>
            ${UI.campo('Qual é o próximo passo', UI.input('proximoPasso', m.proximoPasso, 'placeholder="Ex: mandar a proposta com 2 opções"'),
                'Escreva sempre uma ação sua. É isso que vira sua lista do dia no Início.')}
            ${UI.campo('Anotações', UI.textarea('obs', m.obs, 'placeholder="O que ela pediu, o que não pode aparecer, prazo de pagamento..."'))}
        `;

        const rodape = `
            ${!novo ? `<button class="btn btn-danger" data-apagar type="button">${UI.icon('lixo', 15)} Apagar</button>` : ''}
            <div class="spacer"></div>
            <button class="btn" data-fechar type="button">Cancelar</button>
            <button class="btn btn-primary" data-salvar type="button">${novo ? 'Adicionar marca' : 'Salvar'}</button>`;

        UI.modal({
            titulo: novo ? 'Nova marca' : m.nome,
            sub: novo ? 'Toda conversa começa aqui, mesmo a que ainda é só um direct' : NOMES[m.status],
            corpo, rodape, largo: true,
            aoAbrir(o) {
                o.querySelector('[data-salvar]').addEventListener('click', () => {
                    const dados = UI.lerForm(o.querySelector('.modal-body'));
                    if (!dados.nome) { UI.toast('Escreve pelo menos o nome da marca', 'erro'); return; }
                    dados.valor = Number(dados.valor) || 0;
                    if (novo) Store.add('marcas', dados);
                    else Store.update('marcas', id, dados);
                    UI.fecharModal();
                    UI.toast(novo ? 'Marca adicionada' : 'Salvo');
                    desenhar();
                    App.atualizarBadges();
                });
                const apagar = o.querySelector('[data-apagar]');
                if (apagar) apagar.addEventListener('click', () => {
                    UI.fecharModal();
                    UI.confirmar({
                        titulo: 'Apagar ' + m.nome + '?',
                        texto: 'Some do funil e não dá pra desfazer.',
                        aoConfirmar() {
                            Store.remove('marcas', id);
                            UI.toast('Marca apagada');
                            desenhar();
                            App.atualizarBadges();
                        }
                    });
                });
            }
        });
    }

    return {
        titulo: 'Marcas',
        dica: 'Do primeiro oi até o dinheiro na conta',
        render,
        abrirFicha,
        COLUNAS, NOMES
    };
})();
