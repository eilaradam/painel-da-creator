/* ==========================================================================
   Propostas · montar o orçamento e mandar pra marca sem travar no valor
   ========================================================================== */

window.Views = window.Views || {};

Views.propostas = (() => {

    const STATUS = {
        rascunho: { nome: 'Rascunho', pill: '' },
        enviada: { nome: 'Enviada', pill: 'pill-warn' },
        aprovada: { nome: 'Aprovada', pill: 'pill-ok' },
        recusada: { nome: 'Recusada', pill: 'pill-danger' }
    };

    let raiz = null;
    let itensTemp = [];

    const total = p => {
        const soma = (p.itens || []).reduce((s, i) => s + (Number(i.valor) || 0) * (Number(i.qtd) || 1), 0);
        return Math.max(0, soma - (Number(p.desconto) || 0));
    };

    function render(el) {
        raiz = el;
        desenhar();
    }

    function desenhar() {
        const props = Store.lista('propostas');
        const enviadas = props.filter(p => p.status === 'enviada');
        const aprovadas = props.filter(p => p.status === 'aprovada');
        const decididas = props.filter(p => ['aprovada', 'recusada'].includes(p.status));
        const taxa = decididas.length ? Math.round((aprovadas.length / decididas.length) * 100) : 0;
        const valorEnviado = enviadas.reduce((s, p) => s + total(p), 0);

        raiz.innerHTML = `
            <div class="stats stagger" style="margin-bottom:22px">
                <div class="stat">
                    <div class="stat-label">Esperando resposta</div>
                    <div class="stat-value">${enviadas.length}</div>
                    <div class="stat-foot">${UI.brl(valorEnviado)} aguardando um sim</div>
                </div>
                <div class="stat">
                    <div class="stat-label">Aprovadas</div>
                    <div class="stat-value">${aprovadas.length}</div>
                    <div class="stat-foot">${UI.brl(aprovadas.reduce((s, p) => s + total(p), 0))} fechados</div>
                </div>
                <div class="stat">
                    <div class="stat-label">Taxa de aprovação</div>
                    <div class="stat-value">${taxa}<small>%</small></div>
                    <div class="stat-foot">das propostas que tiveram resposta</div>
                </div>
                <div class="stat">
                    <div class="stat-label">Ticket médio</div>
                    <div class="stat-value">${UI.brl(aprovadas.length ? aprovadas.reduce((s, p) => s + total(p), 0) / aprovadas.length : 0)}</div>
                    <div class="stat-foot">valor médio do que você fecha</div>
                </div>
            </div>

            <div class="toolbar">
                <div>
                    <h2 class="serif" style="font-size:19px">Suas propostas</h2>
                    <p style="margin:2px 0 0;font-size:13px;color:var(--soft)">Clique em uma para ver como a marca recebe.</p>
                </div>
                <div style="margin-left:auto"></div>
                <button class="btn" id="pTabela" type="button">${UI.icon('dinheiro', 15)} Minha tabela de preços</button>
                <button class="btn btn-primary" id="pNova" type="button">${UI.icon('mais')} Nova proposta</button>
            </div>

            <div class="panel">
                <div class="panel-body flush">
                    ${props.length ? `
                    <div class="table-wrap">
                        <table class="data">
                            <thead>
                                <tr>
                                    <th>Marca</th>
                                    <th>Proposta</th>
                                    <th>Situação</th>
                                    <th>Enviada</th>
                                    <th class="num">Valor</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                ${props.map(linha).join('')}
                            </tbody>
                        </table>
                    </div>` :
                    UI.vazio('Nenhuma proposta ainda',
                        'A proposta é o que separa a conversa do trabalho pago. Monte a primeira em dois minutos.',
                        '<button class="btn btn-primary" id="pVazio" type="button">Criar minha primeira proposta</button>')}
                </div>
            </div>
        `;

        ligar();
    }

    function linha(p) {
        const s = STATUS[p.status] || STATUS.rascunho;
        const dias = p.status === 'enviada' && p.enviadaEm ? Math.abs(UI.emDias(p.enviadaEm) || 0) : null;
        return `
            <tr class="clickable" data-ver="${p.id}">
                <td>
                    <div class="cell-title">${UI.esc(p.marcaNome || 'sem marca')}</div>
                    <div class="cell-sub">${(p.itens || []).length} ${(p.itens || []).length === 1 ? 'item' : 'itens'}</div>
                </td>
                <td>${UI.esc(p.titulo || '')}</td>
                <td><span class="pill ${s.pill}">${s.nome}</span></td>
                <td>
                    ${p.enviadaEm ? UI.data(p.enviadaEm) : '<span class="muted">não enviada</span>'}
                    ${dias !== null && dias >= 4 ? `<div class="cell-sub" style="color:var(--warn)">faz ${dias} dias, cobra</div>` : ''}
                </td>
                <td class="num"><b>${UI.brl(total(p))}</b></td>
                <td class="acts">
                    <button class="icon-btn" data-editar="${p.id}" title="Editar" type="button">${UI.icon('lapis', 15)}</button>
                </td>
            </tr>`;
    }

    function ligar() {
        const nova = raiz.querySelector('#pNova');
        if (nova) nova.addEventListener('click', () => editar(null));
        const vazio = raiz.querySelector('#pVazio');
        if (vazio) vazio.addEventListener('click', () => editar(null));
        raiz.querySelector('#pTabela').addEventListener('click', tabelaDePrecos);

        raiz.querySelectorAll('[data-ver]').forEach(tr => {
            tr.addEventListener('click', e => {
                if (e.target.closest('[data-editar]')) return;
                visualizar(tr.dataset.ver);
            });
        });
        raiz.querySelectorAll('[data-editar]').forEach(b => {
            b.addEventListener('click', e => { e.stopPropagation(); editar(b.dataset.editar); });
        });
    }

    /* ---------- tabela de preços dela ---------- */
    function tabelaDePrecos() {
        const c = Store.get().perfil.cache || {};
        UI.modal({
            titulo: 'Minha tabela de preços',
            sub: 'Isso vira sugestão automática quando você monta uma proposta',
            corpo: `
                <div class="field-row">
                    ${UI.campo('1 Reels', UI.input('reels', c.reels, 'type="number" min="0" step="50"'))}
                    ${UI.campo('Sequência de stories', UI.input('stories', c.stories, 'type="number" min="0" step="50"'))}
                </div>
                <div class="field-row">
                    ${UI.campo('Pacote de fotos', UI.input('foto', c.foto, 'type="number" min="0" step="50"'))}
                    ${UI.campo('Combo reels + stories', UI.input('combo', c.combo, 'type="number" min="0" step="50"'))}
                </div>
                <div class="field-row">
                    ${UI.campo('Exclusividade (% a mais)', UI.input('exclusividade', c.exclusividade, 'type="number" min="0" max="200"'),
                        'Quanto você cobra a mais pra não fechar com concorrente por um tempo')}
                    ${UI.campo('Permissão de anúncio (% a mais)', UI.input('permissaoAds', c.permissaoAds, 'type="number" min="0" max="200"'),
                        'A marca usar seu vídeo em anúncio pago é outro serviço. Cobre por isso.')}
                </div>
                <div class="note accent" style="margin-top:6px">
                    ${UI.icon('info')}
                    <div>Regra de bolso: some quanto custa o seu dia de trabalho (roteiro, gravação, edição) e some o valor de ceder a imagem. Se o número dá aperto no peito de tão baixo, ele está baixo.</div>
                </div>`,
            rodape: `<button class="btn" data-fechar type="button">Cancelar</button>
                     <button class="btn btn-primary" data-salvar type="button">Salvar tabela</button>`,
            aoAbrir(o) {
                o.querySelector('[data-salvar]').addEventListener('click', () => {
                    const d = UI.lerForm(o.querySelector('.modal-body'));
                    Store.setPerfil({
                        cache: {
                            reels: Number(d.reels) || 0, stories: Number(d.stories) || 0,
                            foto: Number(d.foto) || 0, combo: Number(d.combo) || 0,
                            exclusividade: Number(d.exclusividade) || 0, permissaoAds: Number(d.permissaoAds) || 0
                        }
                    });
                    UI.fecharModal();
                    UI.toast('Tabela salva');
                });
            }
        });
    }

    /* ---------- editor ---------- */
    function editar(id) {
        const p = id ? Store.find('propostas', id) : {
            marcaNome: '', titulo: '', status: 'rascunho', enviadaEm: '', validadeDias: 10, desconto: 0,
            itens: [], condicoes: 'Pagamento em até 15 dias após a entrega. Uma rodada de ajuste inclusa. O conteúdo é para uso orgânico no perfil da marca.', obs: ''
        };
        itensTemp = JSON.parse(JSON.stringify(p.itens || []));
        if (!itensTemp.length) itensTemp.push({ desc: '', qtd: 1, valor: '' });

        const marcas = Store.lista('marcas').map(m => m.nome).filter((v, i, a) => a.indexOf(v) === i);

        UI.modal({
            titulo: id ? 'Editar proposta' : 'Nova proposta',
            sub: 'Descreva a entrega como a marca entende, não como você chama internamente',
            largo: true,
            corpo: `
                <div class="field-row">
                    ${UI.campo('Marca', `<input class="input" name="marcaNome" list="listaMarcas" value="${UI.esc(p.marcaNome)}" placeholder="Ex: Casa Nova Decor">
                        <datalist id="listaMarcas">${marcas.map(m => `<option value="${UI.esc(m)}">`).join('')}</datalist>`)}
                    ${UI.campo('Nome da proposta', UI.input('titulo', p.titulo, 'placeholder="Ex: Campanha de setembro"'))}
                </div>

                <div class="label" style="margin-top:6px">O que você entrega</div>
                <div id="pItens" style="display:flex;flex-direction:column;gap:9px;margin-bottom:10px"></div>
                <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px">
                    <button class="btn btn-sm" data-add type="button">${UI.icon('mais', 14)} Adicionar item</button>
                    ${sugestoes()}
                </div>

                <div class="field-row three">
                    ${UI.campo('Situação', UI.select('status', Object.keys(STATUS).map(k => ({ v: k, t: STATUS[k].nome })), p.status))}
                    ${UI.campo('Enviada em', UI.input('enviadaEm', p.enviadaEm, 'type="date"'))}
                    ${UI.campo('Desconto (R$)', UI.input('desconto', p.desconto, 'type="number" min="0" step="50"'))}
                </div>
                ${UI.campo('Condições', UI.textarea('condicoes', p.condicoes, 'style="min-height:80px"'),
                    'Prazo de pagamento, rodadas de ajuste e onde o conteúdo pode ser usado. É isso que evita briga depois.')}
                ${UI.campo('Anotação sua (a marca não vê)', UI.input('obs', p.obs))}

                <div style="display:flex;align-items:baseline;gap:10px;padding:15px 0 0;border-top:1px solid var(--border)">
                    <span class="eyebrow">Total da proposta</span>
                    <span class="serif" id="pTotal" style="margin-left:auto;font-size:24px;letter-spacing:-0.02em"></span>
                </div>`,
            rodape: `
                ${id ? `<button class="btn btn-danger" data-apagar type="button">${UI.icon('lixo', 15)} Apagar</button>` : ''}
                <div class="spacer"></div>
                <button class="btn" data-fechar type="button">Cancelar</button>
                <button class="btn btn-primary" data-salvar type="button">${id ? 'Salvar' : 'Criar proposta'}</button>`,
            aoAbrir(o) {
                desenharItens(o);

                o.querySelector('[data-add]').addEventListener('click', () => {
                    itensTemp.push({ desc: '', qtd: 1, valor: '' });
                    desenharItens(o);
                });

                o.querySelectorAll('[data-sug]').forEach(b => {
                    b.addEventListener('click', () => {
                        const [desc, valor] = b.dataset.sug.split('|');
                        const vazioIdx = itensTemp.findIndex(i => !i.desc && !i.valor);
                        const item = { desc, qtd: 1, valor: Number(valor) };
                        if (vazioIdx > -1) itensTemp[vazioIdx] = item; else itensTemp.push(item);
                        desenharItens(o);
                    });
                });

                o.querySelector('[data-salvar]').addEventListener('click', () => {
                    lerItens(o);
                    const d = UI.lerForm(o.querySelector('.modal-body'));
                    if (!d.marcaNome) { UI.toast('Diz pra qual marca é essa proposta', 'erro'); return; }
                    const dados = {
                        marcaNome: d.marcaNome, titulo: d.titulo, status: d.status,
                        enviadaEm: d.enviadaEm, desconto: Number(d.desconto) || 0,
                        condicoes: d.condicoes, obs: d.obs,
                        itens: itensTemp.filter(i => i.desc).map(i => ({ desc: i.desc, qtd: Number(i.qtd) || 1, valor: Number(i.valor) || 0 }))
                    };
                    if (dados.status === 'enviada' && !dados.enviadaEm) dados.enviadaEm = Store.dia(0);
                    if (id) Store.update('propostas', id, dados);
                    else Store.add('propostas', dados);
                    UI.fecharModal();
                    UI.toast(id ? 'Proposta salva' : 'Proposta criada');
                    desenhar();
                    App.atualizarBadges();
                });

                const apagar = o.querySelector('[data-apagar]');
                if (apagar) apagar.addEventListener('click', () => {
                    UI.fecharModal();
                    UI.confirmar({
                        titulo: 'Apagar essa proposta?',
                        texto: 'Não dá pra desfazer.',
                        aoConfirmar() { Store.remove('propostas', id); desenhar(); UI.toast('Apagada'); }
                    });
                });

                o.addEventListener('input', e => {
                    if (e.target.name === 'desconto' || e.target.closest('#pItens')) {
                        lerItens(o);
                        atualizarTotal(o);
                    }
                });
            }
        });
    }

    function sugestoes() {
        const c = Store.get().perfil.cache || {};
        const lista = [
            { t: 'Reels', d: '1 Reels roteirizado, gravado e editado', v: c.reels },
            { t: 'Stories', d: 'Sequência de 3 stories com link', v: c.stories },
            { t: 'Fotos', d: 'Pacote de 3 fotos editadas', v: c.foto },
            { t: 'Anúncio', d: 'Permissão de anúncio por 60 dias', v: Math.round((c.reels || 0) * ((c.permissaoAds || 0) / 100)) }
        ].filter(i => i.v > 0);
        if (!lista.length) return '';
        return lista.map(i => `<button class="chip" data-sug="${UI.esc(i.d)}|${i.v}" type="button">+ ${i.t} · ${UI.brl(i.v)}</button>`).join('');
    }

    function desenharItens(o) {
        const box = o.querySelector('#pItens');
        box.innerHTML = itensTemp.map((i, idx) => `
            <div style="display:grid;grid-template-columns:minmax(0,1fr) 110px 34px;gap:8px;align-items:center">
                <input class="input" data-i="${idx}" data-campo="desc" value="${UI.esc(i.desc)}" placeholder="Ex: 1 Reels gravado no seu espaço">
                <input class="input" data-i="${idx}" data-campo="valor" type="number" min="0" step="50" value="${UI.esc(i.valor)}" placeholder="R$">
                <button class="icon-btn" data-remover="${idx}" type="button" title="Remover">${UI.icon('x', 15)}</button>
            </div>`).join('');

        box.querySelectorAll('[data-remover]').forEach(b => {
            b.addEventListener('click', () => {
                itensTemp.splice(Number(b.dataset.remover), 1);
                if (!itensTemp.length) itensTemp.push({ desc: '', qtd: 1, valor: '' });
                desenharItens(o);
                atualizarTotal(o);
            });
        });
        atualizarTotal(o);
    }

    function lerItens(o) {
        o.querySelectorAll('#pItens [data-i]').forEach(el => {
            const i = Number(el.dataset.i);
            if (itensTemp[i]) itensTemp[i][el.dataset.campo] = el.value;
        });
    }

    function atualizarTotal(o) {
        const desconto = Number((o.querySelector('[name=desconto]') || {}).value) || 0;
        const soma = itensTemp.reduce((s, i) => s + (Number(i.valor) || 0), 0);
        o.querySelector('#pTotal').textContent = UI.brl(Math.max(0, soma - desconto));
    }

    /* ---------- como a marca vê ---------- */
    function visualizar(id) {
        const p = Store.find('propostas', id);
        if (!p) return;
        const perfil = Store.get().perfil;
        const soma = (p.itens || []).reduce((s, i) => s + Number(i.valor || 0), 0);

        UI.modal({
            titulo: 'Proposta para ' + (p.marcaNome || ''),
            sub: 'É assim que a marca recebe',
            largo: true,
            corpo: `
                <div id="pImprimir" style="background:var(--surface);padding:6px 2px">
                    <div style="display:flex;align-items:flex-start;gap:14px;padding-bottom:18px;border-bottom:2px solid var(--ink)">
                        <div>
                            <div class="serif" style="font-size:24px;letter-spacing:-0.02em">${UI.esc(perfil.nome || 'Seu nome')}</div>
                            <div style="font-size:13px;color:var(--soft);margin-top:2px">${UI.esc(perfil.arroba || '')} · ${UI.compacto(perfil.seguidores)} seguidores</div>
                        </div>
                        <div style="margin-left:auto;text-align:right;font-size:12.5px;color:var(--soft);line-height:1.6">
                            ${UI.esc(perfil.email || '')}<br>${UI.esc(perfil.whatsapp || '')}
                        </div>
                    </div>

                    <div style="padding:20px 0 4px">
                        <div class="eyebrow">Proposta comercial</div>
                        <h3 class="serif" style="font-size:20px;margin-top:5px">${UI.esc(p.titulo || 'Parceria')}</h3>
                        <p style="margin:4px 0 0;font-size:13.5px;color:var(--soft)">Para ${UI.esc(p.marcaNome)} · ${UI.data(p.enviadaEm || Store.dia(0), 'longo')}</p>
                    </div>

                    <table class="data" style="margin:18px 0">
                        <thead><tr><th>Entrega</th><th class="num">Valor</th></tr></thead>
                        <tbody>
                            ${(p.itens || []).map(i => `
                                <tr><td>${UI.esc(i.desc)}</td><td class="num">${UI.brlExato(i.valor)}</td></tr>`).join('')}
                            ${p.desconto ? `<tr><td style="color:var(--ok)">Desconto pelo pacote fechado</td><td class="num" style="color:var(--ok)">- ${UI.brlExato(p.desconto)}</td></tr>` : ''}
                            <tr>
                                <td style="font-weight:700;font-size:15px">Total</td>
                                <td class="num serif" style="font-size:19px">${UI.brlExato(Math.max(0, soma - (Number(p.desconto) || 0)))}</td>
                            </tr>
                        </tbody>
                    </table>

                    ${p.condicoes ? `
                        <div style="margin-top:16px">
                            <div class="eyebrow" style="margin-bottom:7px">Condições</div>
                            <p style="margin:0;font-size:13.5px;line-height:1.65;color:var(--soft);white-space:pre-wrap">${UI.esc(p.condicoes)}</p>
                        </div>` : ''}

                    <p style="margin:22px 0 0;font-size:13px;color:var(--muted)">
                        Proposta válida por ${p.validadeDias || 10} dias. Qualquer ajuste, é só me chamar.
                    </p>
                </div>`,
            rodape: `
                <button class="btn" data-copiar type="button">${UI.icon('copiar', 15)} Copiar em texto</button>
                <div class="spacer"></div>
                <button class="btn" data-imprimir type="button">${UI.icon('imprimir', 15)} Salvar em PDF</button>
                <button class="btn btn-primary" data-editar type="button">Editar</button>`,
            aoAbrir(o) {
                o.querySelector('[data-editar]').addEventListener('click', () => { UI.fecharModal(); editar(id); });
                o.querySelector('[data-imprimir]').addEventListener('click', () => imprimir(o.querySelector('#pImprimir').innerHTML));
                o.querySelector('[data-copiar]').addEventListener('click', () => UI.copiar(emTexto(p, perfil), 'Proposta copiada, é só colar no e-mail'));
            }
        });
    }

    function emTexto(p, perfil) {
        const soma = (p.itens || []).reduce((s, i) => s + Number(i.valor || 0), 0);
        const linhas = [
            `PROPOSTA · ${p.titulo || 'Parceria'}`,
            `Para: ${p.marcaNome}`,
            `De: ${perfil.nome} (${perfil.arroba})`,
            '',
            'O QUE EU ENTREGO:'
        ];
        (p.itens || []).forEach(i => linhas.push(`· ${i.desc} ... ${UI.brlExato(i.valor)}`));
        if (p.desconto) linhas.push(`· Desconto pelo pacote ... - ${UI.brlExato(p.desconto)}`);
        linhas.push('', `TOTAL: ${UI.brlExato(Math.max(0, soma - (Number(p.desconto) || 0)))}`);
        if (p.condicoes) linhas.push('', 'CONDIÇÕES:', p.condicoes);
        linhas.push('', `Proposta válida por ${p.validadeDias || 10} dias.`, `${perfil.email || ''} · ${perfil.whatsapp || ''}`);
        return linhas.join('\n');
    }

    function imprimir(html) {
        const j = window.open('', '_blank', 'width=820,height=900');
        if (!j) { UI.toast('Libere os pop-ups pra salvar em PDF', 'erro'); return; }

        // leva junto o estilo desta página, seja ele um arquivo ou embutido.
        // sem isso a proposta sai sem formatação quando o painel roda como arquivo único.
        const estilos = Array.from(document.querySelectorAll('style'))
            .map(s => s.outerHTML)
            .concat(Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
                .map(l => `<link rel="stylesheet" href="${l.href}">`))
            .join('\n');

        j.document.write(`<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Proposta</title>
            ${estilos}
            <style>body{padding:44px;background:#fff;max-width:760px;margin:0 auto}</style>
            </head><body>${html}</body></html>`);
        j.document.close();
        setTimeout(() => j.print(), 700);
    }

    return {
        titulo: 'Propostas',
        dica: 'Monte o orçamento e mande sem medo',
        render
    };
})();
