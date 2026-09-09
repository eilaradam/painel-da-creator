/* ==========================================================================
   Conteúdo · da ideia solta até o post no ar
   ========================================================================== */

window.Views = window.Views || {};

Views.conteudo = (() => {

    const ETAPAS = [
        { id: 'ideia', nome: 'Ideia' },
        { id: 'roteiro', nome: 'Roteiro' },
        { id: 'gravar', nome: 'A gravar' },
        { id: 'editar', nome: 'Editando' },
        { id: 'postado', nome: 'Postado' }
    ];
    const FORMATOS = ['Reels', 'Carrossel', 'Stories', 'Foto', 'TikTok'];
    const PILARES = ['Nicho', 'Autoridade', 'Bastidor', 'Pessoal', 'Venda'];

    let raiz = null;
    let sub = 'quadro';
    let mesVisto = 0;

    function render(el) {
        raiz = el;
        desenhar();
    }

    function desenhar() {
        const itens = Store.lista('conteudos');
        const postadosMes = itens.filter(c => c.status === 'postado' && String(c.data || '').slice(0, 7) === Store.mes(0));
        const naGaveta = itens.filter(c => c.status === 'ideia');

        raiz.innerHTML = `
            <div class="stats stagger" style="margin-bottom:22px">
                <div class="stat">
                    <div class="stat-label">Postados neste mês</div>
                    <div class="stat-value">${postadosMes.length}</div>
                    <div class="stat-foot">constância vale mais que perfeição</div>
                </div>
                <div class="stat">
                    <div class="stat-label">Ideias na gaveta</div>
                    <div class="stat-value">${naGaveta.length}</div>
                    <div class="stat-foot">${naGaveta.length < 5 ? 'abasteça, o bloqueio vem quando a gaveta esvazia' : 'gaveta cheia, pode gravar tranquila'}</div>
                </div>
                <div class="stat">
                    <div class="stat-label">Em produção</div>
                    <div class="stat-value">${itens.filter(c => ['roteiro', 'gravar', 'editar'].includes(c.status)).length}</div>
                    <div class="stat-foot">roteiro, gravação e edição</div>
                </div>
                <div class="stat">
                    <div class="stat-label">Equilíbrio dos pilares</div>
                    <div class="stat-value" style="font-size:16px;line-height:1.5;font-family:'DM Sans',sans-serif;font-weight:600;margin-top:9px">${equilibrio(itens)}</div>
                </div>
            </div>

            <div class="subnav">
                <button class="${sub === 'quadro' ? 'on' : ''}" data-sub="quadro" type="button">Quadro de produção</button>
                <button class="${sub === 'calendario' ? 'on' : ''}" data-sub="calendario" type="button">Calendário</button>
            </div>

            <div class="toolbar">
                <div style="margin-left:auto"></div>
                <button class="btn btn-primary" id="cNovo" type="button">${UI.icon('mais')} Nova ideia</button>
            </div>

            ${sub === 'quadro' ? quadro(itens) : calendario(itens)}
        `;

        ligar();
    }

    function equilibrio(itens) {
        const recentes = itens.filter(c => c.status === 'postado').slice(0, 10);
        if (!recentes.length) return '<span style="color:var(--muted);font-size:13px">poste pra ver</span>';
        const conta = {};
        recentes.forEach(c => { conta[c.pilar || 'Sem pilar'] = (conta[c.pilar || 'Sem pilar'] || 0) + 1; });
        return Object.entries(conta)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([p, n]) => `<span class="pill pill-accent" style="margin-right:4px">${UI.esc(p)} ${n}</span>`)
            .join('');
    }

    /* ---------- quadro ---------- */
    function quadro(itens) {
        return `<div class="board" id="cBoard">
            ${ETAPAS.map(et => {
                const lista = itens.filter(c => c.status === et.id);
                return `
                <section class="col" data-col="${et.id}">
                    <div class="col-head">
                        <h4>${et.nome}</h4>
                        <span class="col-count">${lista.length}</span>
                    </div>
                    <div class="col-body" data-drop="${et.id}">
                        ${lista.map(cartao).join('') || '<div style="padding:14px 4px;font-size:12.5px;color:var(--muted);text-align:center">Arraste pra cá</div>'}
                    </div>
                </section>`;
            }).join('')}
        </div>`;
    }

    function cartao(c) {
        const t = c.data ? UI.prazoTexto(c.data) : null;
        return `
            <article class="card" draggable="true" data-id="${c.id}">
                <div class="card-title">${UI.esc(c.titulo)}</div>
                <div class="card-foot">
                    <span class="pill">${UI.esc(c.formato || '')}</span>
                    ${c.pilar ? `<span class="pill pill-accent">${UI.esc(c.pilar)}</span>` : ''}
                    ${t && c.status !== 'postado' ? `<span class="pill ${t.tom ? 'pill-' + t.tom : ''}">${t.texto}</span>` : ''}
                    ${c.status === 'postado' && c.data ? `<span class="muted" style="font-size:11.5px">${UI.data(c.data)}</span>` : ''}
                </div>
            </article>`;
    }

    /* ---------- calendário ---------- */
    function calendario(itens) {
        const base = new Date();
        base.setDate(1);
        base.setMonth(base.getMonth() + mesVisto);
        const ano = base.getFullYear();
        const mes = base.getMonth();
        const primeiroDia = new Date(ano, mes, 1).getDay();
        const diasNoMes = new Date(ano, mes + 1, 0).getDate();
        const hojeIso = Store.dia(0);

        const porDia = {};
        itens.forEach(c => {
            if (!c.data) return;
            (porDia[c.data] = porDia[c.data] || []).push(c);
        });
        Store.lista('entregas').forEach(e => {
            if (!e.prazo || e.status === 'aprovado') return;
            (porDia[e.prazo] = porDia[e.prazo] || []).push({ titulo: '📦 ' + e.titulo, entrega: true, status: e.status });
        });

        const celulas = [];
        for (let i = 0; i < primeiroDia; i++) celulas.push('<div class="cal-day off"></div>');
        for (let d = 1; d <= diasNoMes; d++) {
            const iso = `${ano}-${String(mes + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            const evs = porDia[iso] || [];
            celulas.push(`
                <div class="cal-day${iso === hojeIso ? ' today' : ''}">
                    <div class="cal-num">${d}</div>
                    ${evs.slice(0, 3).map(e => `
                        <div class="cal-ev ${e.entrega ? 'ev-warn' : e.status === 'postado' ? 'ev-ok' : ''}" title="${UI.esc(e.titulo)}">${UI.esc(e.titulo)}</div>`).join('')}
                    ${evs.length > 3 ? `<div style="font-size:10.5px;color:var(--muted);padding-left:2px">+${evs.length - 3}</div>` : ''}
                </div>`);
        }

        return `
            <div class="panel">
                <div class="panel-head">
                    <button class="icon-btn" data-mes="-1" type="button" style="transform:rotate(90deg)">${UI.icon('seta', 16)}</button>
                    <h3 style="min-width:170px;text-align:center">${UI.MESES[mes].charAt(0).toUpperCase() + UI.MESES[mes].slice(1)} de ${ano}</h3>
                    <button class="icon-btn" data-mes="1" type="button" style="transform:rotate(-90deg)">${UI.icon('seta', 16)}</button>
                    <div class="spacer"></div>
                    <span class="pill pill-accent">conteúdo</span>
                    <span class="pill pill-warn">entrega de marca</span>
                </div>
                <div class="panel-body">
                    <div class="cal">
                        ${['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'].map(d => `<div class="cal-dow">${d}</div>`).join('')}
                        ${celulas.join('')}
                    </div>
                </div>
            </div>`;
    }

    /* ---------- eventos ---------- */
    function ligar() {
        raiz.querySelectorAll('[data-sub]').forEach(b => {
            b.addEventListener('click', () => { sub = b.dataset.sub; desenhar(); });
        });
        raiz.querySelector('#cNovo').addEventListener('click', () => editar(null));

        raiz.querySelectorAll('[data-mes]').forEach(b => {
            b.addEventListener('click', () => { mesVisto += Number(b.dataset.mes); desenhar(); });
        });

        raiz.querySelectorAll('.card[data-id]').forEach(card => {
            card.addEventListener('click', () => {
                if (!card.classList.contains('dragging')) editar(card.dataset.id);
            });
            card.addEventListener('dragstart', e => {
                e.dataTransfer.setData('text/plain', card.dataset.id);
                setTimeout(() => card.classList.add('dragging'), 0);
            });
            card.addEventListener('dragend', () => card.classList.remove('dragging'));
        });

        raiz.querySelectorAll('[data-drop]').forEach(zona => {
            const col = zona.closest('.col');
            zona.addEventListener('dragover', e => { e.preventDefault(); col.classList.add('drop'); });
            zona.addEventListener('dragleave', e => { if (!zona.contains(e.relatedTarget)) col.classList.remove('drop'); });
            zona.addEventListener('drop', e => {
                e.preventDefault();
                col.classList.remove('drop');
                const id = e.dataTransfer.getData('text/plain');
                const item = Store.find('conteudos', id);
                if (!item || item.status === zona.dataset.drop) return;
                const campos = { status: zona.dataset.drop };
                if (zona.dataset.drop === 'postado' && UI.emDias(item.data) > 0) campos.data = Store.dia(0);
                Store.update('conteudos', id, campos);
                desenhar();
            });
        });
    }

    function editar(id) {
        const c = id ? Store.find('conteudos', id) : {
            titulo: '', formato: 'Reels', pilar: 'Nicho', status: 'ideia', data: Store.dia(3), roteiro: ''
        };
        UI.modal({
            titulo: id ? 'Editar conteúdo' : 'Nova ideia',
            sub: id ? '' : 'Anote agora, mesmo pela metade. Ideia não anotada some.',
            largo: true,
            corpo: `
                ${UI.campo('Ideia em uma frase', UI.input('titulo', c.titulo, 'placeholder="Ex: 3 erros que fazem a marca não te responder"'))}
                <div class="field-row three">
                    ${UI.campo('Formato', UI.select('formato', FORMATOS, c.formato))}
                    ${UI.campo('Pilar', UI.select('pilar', PILARES, c.pilar))}
                    ${UI.campo('Etapa', UI.select('status', ETAPAS.map(e => ({ v: e.id, t: e.nome })), c.status))}
                </div>
                ${UI.campo('Data prevista de postar', UI.input('data', c.data, 'type="date"'))}
                ${UI.campo('Roteiro', UI.textarea('roteiro', c.roteiro, 'style="min-height:150px" placeholder="Gancho (primeiros 3 segundos):&#10;&#10;Desenvolvimento:&#10;&#10;Fechamento e chamada:"'),
                    'Sem roteiro pronto você grava 8 vezes. Com roteiro, grava 2.')}`,
            rodape: `
                ${id ? `<button class="btn btn-danger" data-apagar type="button">${UI.icon('lixo', 15)} Apagar</button>` : ''}
                <div class="spacer"></div>
                <button class="btn" data-fechar type="button">Cancelar</button>
                <button class="btn btn-primary" data-salvar type="button">${id ? 'Salvar' : 'Adicionar'}</button>`,
            aoAbrir(o) {
                o.querySelector('[data-salvar]').addEventListener('click', () => {
                    const d = UI.lerForm(o.querySelector('.modal-body'));
                    if (!d.titulo) { UI.toast('Escreve a ideia primeiro', 'erro'); return; }
                    if (id) Store.update('conteudos', id, d);
                    else Store.add('conteudos', d);
                    UI.fecharModal();
                    UI.toast(id ? 'Salvo' : 'Ideia guardada');
                    desenhar();
                });
                const apagar = o.querySelector('[data-apagar]');
                if (apagar) apagar.addEventListener('click', () => {
                    UI.fecharModal();
                    UI.confirmar({
                        titulo: 'Apagar essa ideia?', texto: 'Não dá pra desfazer.',
                        aoConfirmar() { Store.remove('conteudos', id); desenhar(); UI.toast('Apagada'); }
                    });
                });
            }
        });
    }

    return {
        titulo: 'Conteúdo',
        dica: 'Da ideia solta até o post no ar',
        render
    };
})();
