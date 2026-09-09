/* ==========================================================================
   Entregas · o que você prometeu, pra quem e até quando
   ========================================================================== */

window.Views = window.Views || {};

Views.entregas = (() => {

    const ETAPAS = ['roteiro', 'gravar', 'editar', 'enviado', 'aprovado'];
    const NOMES = {
        roteiro: 'Escrevendo o roteiro',
        gravar: 'A gravar',
        editar: 'Editando',
        enviado: 'Enviado, aguardando',
        aprovado: 'Aprovado'
    };
    const FORMATOS = ['Reels', 'Stories', 'Carrossel', 'Foto', 'TikTok', 'Vídeo para anúncio', 'Outro'];

    let raiz = null;

    function render(el) {
        raiz = el;
        desenhar();
    }

    function desenhar() {
        const todas = Store.lista('entregas');
        const abertas = todas.filter(e => e.status !== 'aprovado');
        const prontas = todas.filter(e => e.status === 'aprovado');

        const atrasadas = abertas.filter(e => (UI.emDias(e.prazo) ?? 99) < 0);
        const semana = abertas.filter(e => { const d = UI.emDias(e.prazo); return d !== null && d >= 0 && d <= 7; });
        const depois = abertas.filter(e => { const d = UI.emDias(e.prazo); return d === null || d > 7; });

        const valorAberto = abertas.reduce((s, e) => s + Number(e.valor || 0), 0);

        raiz.innerHTML = `
            <div class="stats stagger" style="margin-bottom:22px">
                <div class="stat">
                    <div class="stat-label">Em produção</div>
                    <div class="stat-value">${abertas.length}</div>
                    <div class="stat-foot">${UI.brl(valorAberto)} em trabalho a entregar</div>
                </div>
                <div class="stat">
                    <div class="stat-label">Atrasadas</div>
                    <div class="stat-value" ${atrasadas.length ? 'style="color:var(--danger)"' : ''}>${atrasadas.length}</div>
                    <div class="stat-foot">${atrasadas.length ? 'avise a marca hoje, atraso sem aviso queima' : 'nenhuma, você está em dia'}</div>
                </div>
                <div class="stat">
                    <div class="stat-label">Vencem em 7 dias</div>
                    <div class="stat-value">${semana.length}</div>
                    <div class="stat-foot">planeje as gravações</div>
                </div>
                <div class="stat">
                    <div class="stat-label">Entregues e aprovadas</div>
                    <div class="stat-value">${prontas.length}</div>
                    <div class="stat-foot">viram case no seu portfólio</div>
                </div>
            </div>

            <div class="toolbar">
                <div>
                    <h2 class="serif" style="font-size:19px">Sua produção</h2>
                    <p style="margin:2px 0 0;font-size:13px;color:var(--soft)">Clique em qualquer entrega pra ver o briefing.</p>
                </div>
                <div style="margin-left:auto"></div>
                <button class="btn btn-primary" id="eNova" type="button">${UI.icon('mais')} Nova entrega</button>
            </div>

            ${grupo('Atrasadas', atrasadas, 'danger')}
            ${grupo('Essa semana', semana, 'warn')}
            ${grupo('Mais pra frente', depois, '')}
            ${grupo('Entregues e aprovadas', prontas, 'ok', true)}

            ${!todas.length ? UI.vazio('Nenhuma entrega cadastrada',
                'Toda vez que fechar com uma marca, quebre o combinado em entregas com prazo. É o que evita virar a noite editando.',
                '<button class="btn btn-primary" id="eVazio" type="button">Cadastrar a primeira</button>') : ''}
        `;

        ligar();
    }

    function grupo(titulo, itens, tom, recolhido) {
        if (!itens.length) return '';
        return `
            <section class="section">
                <div class="section-head">
                    <div style="display:flex;align-items:center;gap:9px">
                        <h2>${titulo}</h2>
                        <span class="pill ${tom ? 'pill-' + tom : ''}">${itens.length}</span>
                    </div>
                </div>
                <div class="panel">
                    <div class="panel-body flush">
                        <div class="table-wrap">
                            <table class="data">
                                <thead>
                                    <tr>
                                        <th>Entrega</th>
                                        <th>Marca</th>
                                        <th style="width:210px">Em que pé está</th>
                                        <th>Prazo</th>
                                        <th class="num">Valor</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>${itens.map(l => linha(l, recolhido)).join('')}</tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>`;
    }

    function linha(e, concluida) {
        const t = UI.prazoTexto(e.prazo);
        const passo = ETAPAS.indexOf(e.status);
        return `
            <tr class="clickable" data-ver="${e.id}">
                <td>
                    <div class="cell-title">${UI.esc(e.titulo)}</div>
                    <div class="cell-sub">${UI.esc(e.formato || '')}</div>
                </td>
                <td>${UI.esc(e.marcaNome || '')}</td>
                <td>
                    ${concluida ? '<span class="pill pill-ok">Aprovado</span>' : `
                        <div style="display:flex;align-items:center;gap:8px">
                            <div class="progress" style="flex:1;min-width:60px"><span style="width:${((passo + 1) / ETAPAS.length) * 100}%"></span></div>
                            <span style="font-size:12px;color:var(--soft);white-space:nowrap">${NOMES[e.status] || e.status}</span>
                        </div>`}
                </td>
                <td>
                    ${UI.data(e.prazo)}
                    ${!concluida && t.tom ? `<div class="cell-sub" style="color:var(--${t.tom})">${t.texto}</div>` : ''}
                </td>
                <td class="num">${e.valor ? UI.brl(e.valor) : ''}</td>
                <td class="acts">
                    ${!concluida && passo < ETAPAS.length - 1 ?
                        `<button class="btn btn-sm" data-avancar="${e.id}" type="button" title="Passar pra próxima etapa">${NOMES[ETAPAS[passo + 1]].split(',')[0]} ${UI.icon('setaDir', 13)}</button>` : ''}
                </td>
            </tr>`;
    }

    function ligar() {
        const nova = raiz.querySelector('#eNova');
        if (nova) nova.addEventListener('click', () => editar(null));
        const vazio = raiz.querySelector('#eVazio');
        if (vazio) vazio.addEventListener('click', () => editar(null));

        raiz.querySelectorAll('[data-ver]').forEach(tr => {
            tr.addEventListener('click', e => {
                if (e.target.closest('[data-avancar]')) return;
                editar(tr.dataset.ver);
            });
        });

        raiz.querySelectorAll('[data-avancar]').forEach(b => {
            b.addEventListener('click', e => {
                e.stopPropagation();
                const item = Store.find('entregas', b.dataset.avancar);
                const prox = ETAPAS[ETAPAS.indexOf(item.status) + 1];
                Store.update('entregas', item.id, { status: prox });
                UI.toast(item.titulo + ': ' + NOMES[prox].toLowerCase());
                desenhar();
                App.atualizarBadges();
            });
        });
    }

    function editar(id) {
        const e = id ? Store.find('entregas', id) : {
            marcaNome: '', titulo: '', formato: 'Reels', prazo: Store.dia(7), status: 'roteiro', valor: '', link: '', brief: ''
        };
        const marcas = Store.lista('marcas').map(m => m.nome).filter((v, i, a) => a.indexOf(v) === i);

        UI.modal({
            titulo: id ? e.titulo : 'Nova entrega',
            sub: id ? e.marcaNome : 'Quebre o combinado em pedaços com prazo',
            largo: true,
            corpo: `
                <div class="field-row">
                    ${UI.campo('Marca', `<input class="input" name="marcaNome" list="listaMarcasE" value="${UI.esc(e.marcaNome)}" placeholder="Ex: Aurora Home">
                        <datalist id="listaMarcasE">${marcas.map(m => `<option value="${UI.esc(m)}">`).join('')}</datalist>`)}
                    ${UI.campo('O que é', UI.input('titulo', e.titulo, 'placeholder="Ex: Reels da sala decorada"'))}
                </div>
                <div class="field-row three">
                    ${UI.campo('Formato', UI.select('formato', FORMATOS, e.formato))}
                    ${UI.campo('Prazo', UI.input('prazo', e.prazo, 'type="date"'))}
                    ${UI.campo('Valor', UI.input('valor', e.valor, 'type="number" min="0" step="50"'))}
                </div>
                ${UI.campo('Em que pé está', UI.select('status', ETAPAS.map(k => ({ v: k, t: NOMES[k] })), e.status))}
                ${UI.campo('Briefing (o que a marca pediu)', UI.textarea('brief', e.brief, 'placeholder="O que precisa aparecer, o que NÃO pode aparecer, tom do vídeo, prazo de aprovação..."'),
                    'Copie aqui o que a marca escreveu. Na hora de gravar você não vai querer caçar isso no e-mail.')}
                ${UI.campo('Link do que foi entregue', UI.input('link', e.link, 'placeholder="https://..."'))}`,
            rodape: `
                ${id ? `<button class="btn btn-danger" data-apagar type="button">${UI.icon('lixo', 15)} Apagar</button>` : ''}
                <div class="spacer"></div>
                <button class="btn" data-fechar type="button">Cancelar</button>
                <button class="btn btn-primary" data-salvar type="button">${id ? 'Salvar' : 'Adicionar'}</button>`,
            aoAbrir(o) {
                o.querySelector('[data-salvar]').addEventListener('click', () => {
                    const d = UI.lerForm(o.querySelector('.modal-body'));
                    if (!d.titulo) { UI.toast('Dá um nome pra essa entrega', 'erro'); return; }
                    d.valor = Number(d.valor) || 0;
                    if (id) Store.update('entregas', id, d);
                    else Store.add('entregas', d);
                    UI.fecharModal();
                    UI.toast(id ? 'Salvo' : 'Entrega cadastrada');
                    desenhar();
                    App.atualizarBadges();
                });
                const apagar = o.querySelector('[data-apagar]');
                if (apagar) apagar.addEventListener('click', () => {
                    UI.fecharModal();
                    UI.confirmar({
                        titulo: 'Apagar essa entrega?',
                        texto: 'Não dá pra desfazer.',
                        aoConfirmar() { Store.remove('entregas', id); desenhar(); App.atualizarBadges(); UI.toast('Apagada'); }
                    });
                });
            }
        });
    }

    return {
        titulo: 'Entregas',
        dica: 'O que você prometeu e até quando',
        render
    };
})();
