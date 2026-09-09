/* ==========================================================================
   Financeiro · quanto entrou, quanto vai entrar e quanto sobrou
   ========================================================================== */

window.Views = window.Views || {};

Views.financeiro = (() => {

    const CATEGORIAS_ENTRADA = ['Publi', 'UGC', 'Afiliado', 'Permuta com cachê', 'Consultoria', 'Outro'];
    const CATEGORIAS_SAIDA = ['Equipamento', 'Ferramenta', 'Terceiros', 'Deslocamento', 'Produto para gravar', 'Imposto', 'Outro'];

    let raiz = null;
    let filtro = 'tudo';

    function render(el) {
        raiz = el;
        desenhar();
    }

    function desenhar() {
        const lanc = Store.lista('lancamentos').slice().sort((a, b) => String(b.data).localeCompare(String(a.data)));
        const mesAtual = Store.mes(0);
        const noMes = l => String(l.data || '').slice(0, 7) === mesAtual;

        const recebido = soma(lanc.filter(l => l.tipo === 'entrada' && l.status === 'recebido' && noMes(l)));
        const aReceber = soma(lanc.filter(l => l.tipo === 'entrada' && l.status === 'previsto'));
        const gastos = soma(lanc.filter(l => l.tipo === 'saida' && noMes(l)));
        const sobrou = recebido - gastos;

        const meta = Number(Store.get().perfil.metaMes) || 0;
        const pct = meta ? Math.min(100, Math.round((recebido / meta) * 100)) : 0;
        const faltam = Math.max(0, meta - recebido);

        const atrasados = lanc.filter(l => l.tipo === 'entrada' && l.status === 'previsto' && (UI.emDias(l.data) ?? 99) < 0);

        const visiveis = lanc.filter(l => {
            if (filtro === 'entradas') return l.tipo === 'entrada';
            if (filtro === 'saidas') return l.tipo === 'saida';
            if (filtro === 'previstos') return l.status === 'previsto';
            return true;
        });

        raiz.innerHTML = `
            <div class="stats stagger" style="margin-bottom:22px">
                <div class="stat">
                    <div class="stat-label">Recebido em ${UI.MESES[new Date().getMonth()]}</div>
                    <div class="stat-value">${UI.brl(recebido)}</div>
                    <div class="stat-foot">
                        ${meta ? `<div class="progress" style="margin:7px 0 5px"><span style="width:${pct}%"></span></div>
                        ${pct}% da meta de ${UI.brl(meta)}` : 'defina sua meta nas configurações'}
                    </div>
                </div>
                <div class="stat">
                    <div class="stat-label">A receber</div>
                    <div class="stat-value">${UI.brl(aReceber)}</div>
                    <div class="stat-foot">${atrasados.length ? `<span class="down">${atrasados.length} ${atrasados.length === 1 ? 'pagamento atrasado' : 'pagamentos atrasados'}</span>` : 'nenhum atrasado'}</div>
                </div>
                <div class="stat">
                    <div class="stat-label">Gastos do mês</div>
                    <div class="stat-value">${UI.brl(gastos)}</div>
                    <div class="stat-foot">equipamento, edição, deslocamento</div>
                </div>
                <div class="stat">
                    <div class="stat-label">Sobrou de verdade</div>
                    <div class="stat-value" style="color:${sobrou >= 0 ? 'var(--ok)' : 'var(--danger)'}">${UI.brl(sobrou)}</div>
                    <div class="stat-foot">recebido menos gastos</div>
                </div>
            </div>

            ${meta && faltam > 0 ? `
                <div class="note accent" style="margin-bottom:20px">
                    ${UI.icon('raio')}
                    <div><b>Faltam ${UI.brl(faltam)} pra bater a meta do mês.</b> ${sugestaoMeta(faltam)}</div>
                </div>` : ''}
            ${atrasados.length ? `
                <div class="note" style="margin-bottom:20px">
                    ${UI.icon('alerta')}
                    <div><b>${UI.brl(soma(atrasados))} estão atrasados.</b> ${UI.esc(atrasados.map(l => l.marca || l.desc).join(', '))}.
                    Tem modelo pronto de cobrança educada na aba Mensagens.</div>
                </div>` : ''}

            <div class="grid g2" style="align-items:start;margin-bottom:22px">
                <section class="panel">
                    <div class="panel-head"><h3>Entradas por mês</h3></div>
                    <div class="panel-body">${grafico(lanc)}</div>
                </section>
                <section class="panel">
                    <div class="panel-head"><h3>De onde vem seu dinheiro</h3></div>
                    <div class="panel-body">${porCategoria(lanc)}</div>
                </section>
            </div>

            <div class="toolbar">
                <div class="chips">
                    ${[['tudo', 'Tudo'], ['entradas', 'Entradas'], ['saidas', 'Saídas'], ['previstos', 'A receber']].map(([v, t]) =>
                        `<button class="chip${filtro === v ? ' on' : ''}" data-filtro="${v}" type="button">${t}</button>`).join('')}
                </div>
                <div style="margin-left:auto"></div>
                <button class="btn" id="fSaida" type="button">${UI.icon('mais', 15)} Gasto</button>
                <button class="btn btn-primary" id="fEntrada" type="button">${UI.icon('mais', 15)} Entrada</button>
            </div>

            <div class="panel">
                <div class="panel-body flush">
                    ${visiveis.length ? `
                    <div class="table-wrap">
                        <table class="data">
                            <thead>
                                <tr>
                                    <th>Descrição</th>
                                    <th>Marca</th>
                                    <th>Categoria</th>
                                    <th>Data</th>
                                    <th>Situação</th>
                                    <th class="num">Valor</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>${visiveis.map(linha).join('')}</tbody>
                        </table>
                    </div>` : UI.vazio('Nada lançado ainda',
                        'Anote toda entrada e todo gasto. Sem isso você acha que ganhou bem e no fim do mês não sobra nada.')}
                </div>
            </div>
        `;
        ligar();
    }

    const soma = arr => arr.reduce((s, l) => s + Number(l.valor || 0), 0);

    function sugestaoMeta(faltam) {
        const c = Store.get().perfil.cache || {};
        const reels = Number(c.reels) || 0;
        if (!reels) return 'Cadastre sua tabela de preços pra eu te dizer quantos trabalhos faltam.';
        const n = Math.ceil(faltam / reels);
        return `Isso é ${n} ${n === 1 ? 'reels' : 'reels'} no seu valor de ${UI.brl(reels)}. Quantas marcas você ainda não chamou este mês?`;
    }

    function linha(l) {
        const entrada = l.tipo === 'entrada';
        const atrasado = entrada && l.status === 'previsto' && (UI.emDias(l.data) ?? 99) < 0;
        return `
            <tr class="clickable" data-editar="${l.id}">
                <td>
                    <div class="cell-title">${UI.esc(l.desc)}</div>
                </td>
                <td>${UI.esc(l.marca || '')}</td>
                <td><span class="pill">${UI.esc(l.categoria || '')}</span></td>
                <td>${UI.data(l.data)}</td>
                <td>
                    ${l.status === 'recebido'
                        ? `<span class="pill pill-ok">${entrada ? 'Recebido' : 'Pago'}</span>`
                        : `<span class="pill ${atrasado ? 'pill-danger' : 'pill-warn'}">${atrasado ? 'Atrasado' : 'Previsto'}</span>`}
                </td>
                <td class="num" style="color:${entrada ? 'var(--ink)' : 'var(--danger)'}">
                    <b>${entrada ? '' : '- '}${UI.brl(l.valor)}</b>
                </td>
                <td class="acts">
                    ${entrada && l.status === 'previsto'
                        ? `<button class="btn btn-sm" data-receber="${l.id}" type="button">${UI.icon('check', 13)} Recebi</button>` : ''}
                </td>
            </tr>`;
    }

    function grafico(lanc) {
        const meses = [];
        for (let i = 5; i >= 0; i--) meses.push(Store.mes(-i));
        const itens = meses.map(m => {
            const total = soma(lanc.filter(l => l.tipo === 'entrada' && l.status === 'recebido' && String(l.data || '').slice(0, 7) === m));
            return { rotulo: UI.MESES_CURTO[Number(m.split('-')[1]) - 1], valor: total, suave: m === Store.mes(0) };
        });
        if (!itens.some(i => i.valor)) return UI.vazio('Sem histórico', 'Assim que você marcar a primeira entrada como recebida, o gráfico aparece.');

        const comValor = itens.filter(i => i.valor > 0 && !i.suave);
        const media = comValor.length ? soma(comValor.map(i => ({ valor: i.valor }))) / comValor.length : 0;
        return UI.barras(itens) +
            (media ? `<p style="margin:14px 0 0;font-size:13px;color:var(--soft)">
                Sua média nos meses fechados é <b>${UI.brl(media)}</b>. É esse o número que você precisa bater todo mês pra viver disso.
            </p>` : '');
    }

    function porCategoria(lanc) {
        const entradas = lanc.filter(l => l.tipo === 'entrada' && l.status === 'recebido');
        if (!entradas.length) return UI.vazio('Sem entrada registrada', 'Aqui você vê qual tipo de trabalho te paga melhor.');
        const conta = {};
        entradas.forEach(l => {
            const k = l.categoria || 'Outro';
            conta[k] = (conta[k] || 0) + Number(l.valor || 0);
        });
        const total = Object.values(conta).reduce((a, b) => a + b, 0);
        const ordenado = Object.entries(conta).sort((a, b) => b[1] - a[1]);

        const porMarca = {};
        entradas.forEach(l => { if (l.marca) porMarca[l.marca] = (porMarca[l.marca] || 0) + Number(l.valor || 0); });
        const topMarca = Object.entries(porMarca).sort((a, b) => b[1] - a[1])[0];

        return `
            <div style="display:flex;flex-direction:column;gap:12px">
                ${ordenado.map(([cat, v]) => `
                    <div>
                        <div style="display:flex;align-items:baseline;gap:8px;margin-bottom:5px">
                            <span style="font-size:13.5px;font-weight:600">${UI.esc(cat)}</span>
                            <span style="margin-left:auto;font-size:12px;color:var(--muted)" class="mono">${Math.round((v / total) * 100)}%</span>
                            <span class="mono" style="font-size:13px;font-weight:500">${UI.brl(v)}</span>
                        </div>
                        <div class="progress"><span style="width:${(v / total) * 100}%"></span></div>
                    </div>`).join('')}
            </div>
            ${topMarca ? `<p style="margin:16px 0 0;font-size:13px;color:var(--soft);line-height:1.55">
                <b>${UI.esc(topMarca[0])}</b> é sua maior fonte de renda, com ${UI.brl(topMarca[1])}.
                ${(topMarca[1] / total) > 0.5 ? 'Cuidado: mais da metade do seu faturamento depende de uma marca só. Vale prospectar outras.' : 'Sua renda está bem distribuída, isso é saudável.'}
            </p>` : ''}`;
    }

    function ligar() {
        raiz.querySelectorAll('[data-filtro]').forEach(b => {
            b.addEventListener('click', () => { filtro = b.dataset.filtro; desenhar(); });
        });
        raiz.querySelector('#fEntrada').addEventListener('click', () => editar(null, 'entrada'));
        raiz.querySelector('#fSaida').addEventListener('click', () => editar(null, 'saida'));

        raiz.querySelectorAll('[data-editar]').forEach(tr => {
            tr.addEventListener('click', e => {
                if (e.target.closest('[data-receber]')) return;
                editar(tr.dataset.editar);
            });
        });
        raiz.querySelectorAll('[data-receber]').forEach(b => {
            b.addEventListener('click', e => {
                e.stopPropagation();
                const l = Store.find('lancamentos', b.dataset.receber);
                Store.update('lancamentos', l.id, { status: 'recebido', data: Store.dia(0) });
                UI.toast(UI.brl(l.valor) + ' na conta!');
                desenhar();
                App.atualizarBadges();
            });
        });
    }

    function editar(id, tipoNovo) {
        const l = id ? Store.find('lancamentos', id) : {
            tipo: tipoNovo, desc: '', marca: '', valor: '', data: Store.dia(0),
            status: tipoNovo === 'saida' ? 'recebido' : 'previsto',
            categoria: tipoNovo === 'saida' ? 'Ferramenta' : 'Publi'
        };
        const entrada = l.tipo === 'entrada';
        const marcas = Store.lista('marcas').map(m => m.nome).filter((v, i, a) => a.indexOf(v) === i);

        UI.modal({
            titulo: id ? 'Editar lançamento' : (entrada ? 'Nova entrada' : 'Novo gasto'),
            sub: entrada ? 'Todo dinheiro que entra, mesmo o pequeno' : 'Todo custo do seu trabalho conta',
            corpo: `
                ${UI.campo('Descrição', UI.input('desc', l.desc, `placeholder="${entrada ? 'Ex: Reels da coleção de verão' : 'Ex: Assinatura do app de edição'}"`))}
                <div class="field-row">
                    ${entrada ? UI.campo('Marca', `<input class="input" name="marca" list="listaMarcasF" value="${UI.esc(l.marca)}">
                        <datalist id="listaMarcasF">${marcas.map(m => `<option value="${UI.esc(m)}">`).join('')}</datalist>`)
                        : UI.campo('Onde', UI.input('marca', l.marca, 'placeholder="Ex: Adobe"'))}
                    ${UI.campo('Valor', UI.input('valor', l.valor, 'type="number" min="0" step="10"'))}
                </div>
                <div class="field-row three">
                    ${UI.campo('Categoria', UI.select('categoria', entrada ? CATEGORIAS_ENTRADA : CATEGORIAS_SAIDA, l.categoria))}
                    ${UI.campo(entrada ? 'Data (ou previsão)' : 'Data', UI.input('data', l.data, 'type="date"'))}
                    ${UI.campo('Situação', UI.select('status', [
                        { v: 'previsto', t: entrada ? 'Ainda vou receber' : 'Ainda vou pagar' },
                        { v: 'recebido', t: entrada ? 'Já caiu na conta' : 'Já paguei' }
                    ], l.status))}
                </div>`,
            rodape: `
                ${id ? `<button class="btn btn-danger" data-apagar type="button">${UI.icon('lixo', 15)} Apagar</button>` : ''}
                <div class="spacer"></div>
                <button class="btn" data-fechar type="button">Cancelar</button>
                <button class="btn btn-primary" data-salvar type="button">Salvar</button>`,
            aoAbrir(o) {
                o.querySelector('[data-salvar]').addEventListener('click', () => {
                    const d = UI.lerForm(o.querySelector('.modal-body'));
                    if (!d.desc) { UI.toast('Escreve do que se trata', 'erro'); return; }
                    d.valor = Number(d.valor) || 0;
                    d.tipo = l.tipo;
                    if (id) Store.update('lancamentos', id, d);
                    else Store.add('lancamentos', d);
                    UI.fecharModal();
                    UI.toast('Lançado');
                    desenhar();
                    App.atualizarBadges();
                });
                const apagar = o.querySelector('[data-apagar]');
                if (apagar) apagar.addEventListener('click', () => {
                    Store.remove('lancamentos', id); UI.fecharModal(); desenhar(); UI.toast('Apagado');
                });
            }
        });
    }

    return {
        titulo: 'Financeiro',
        dica: 'Quanto entrou, quanto vem e quanto sobrou',
        render
    };
})();
