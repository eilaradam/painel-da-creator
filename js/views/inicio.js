/* ==========================================================================
   Início · o resumo que responde "o que eu faço hoje?"
   ========================================================================== */

window.Views = window.Views || {};

Views.inicio = (() => {

    let raiz = null;

    function render(el) {
        raiz = el;
        desenhar();
    }

    /* ---------- cálculos do mês ---------- */
    function resumoDoMes() {
        const mesAtual = Store.mes(0);
        const lanc = Store.lista('lancamentos');
        const noMes = l => String(l.data || '').slice(0, 7) === mesAtual;

        const recebido = lanc.filter(l => l.tipo === 'entrada' && l.status === 'recebido' && noMes(l))
            .reduce((s, l) => s + Number(l.valor || 0), 0);
        const aReceber = lanc.filter(l => l.tipo === 'entrada' && l.status === 'previsto')
            .reduce((s, l) => s + Number(l.valor || 0), 0);
        const gastos = lanc.filter(l => l.tipo === 'saida' && noMes(l))
            .reduce((s, l) => s + Number(l.valor || 0), 0);

        return { recebido, aReceber, gastos, sobrou: recebido - gastos };
    }

    /** tudo que está pedindo uma ação dela, em ordem de urgência */
    function pendencias() {
        const itens = [];

        Store.lista('marcas').forEach(m => {
            if (['pago', 'perdida'].includes(m.status) || !m.prazoRetorno) return;
            const d = UI.emDias(m.prazoRetorno);
            if (d === null || d > 1) return;
            itens.push({
                dias: d,
                tipo: 'marca',
                titulo: m.proximoPasso || 'Dar um retorno para ' + m.nome,
                quem: m.nome,
                aba: 'marcas',
                id: m.id
            });
        });

        Store.lista('entregas').forEach(e => {
            if (['aprovado', 'entregue'].includes(e.status) || !e.prazo) return;
            const d = UI.emDias(e.prazo);
            if (d === null || d > 3) return;
            itens.push({
                dias: d,
                tipo: 'entrega',
                titulo: e.titulo,
                quem: e.marcaNome,
                aba: 'entregas',
                id: e.id
            });
        });

        Store.lista('propostas').forEach(p => {
            if (p.status !== 'enviada' || !p.enviadaEm) return;
            const dias = Math.abs(UI.emDias(p.enviadaEm) || 0);
            if (dias < 4) return;
            // se a marca já está na lista pedindo retorno, não cobra duas vezes a mesma coisa
            if (itens.some(i => i.tipo === 'marca' && i.quem === p.marcaNome)) return;
            itens.push({
                dias: -dias,
                tipo: 'proposta',
                titulo: 'Cobrar retorno da proposta (enviada faz ' + dias + ' dias)',
                quem: p.marcaNome,
                aba: 'propostas',
                id: p.id
            });
        });

        return itens.sort((a, b) => a.dias - b.dias);
    }

    /* ---------- desenho ---------- */
    function desenhar() {
        const p = Store.get().perfil;
        const mes = resumoDoMes();
        const meta = Number(p.metaMes) || 0;
        const pct = meta ? Math.min(100, Math.round((mes.recebido / meta) * 100)) : 0;
        const pend = pendencias();
        const ig = Store.lista('historicoIg');
        const ultimo = ig[ig.length - 1] || {};
        const penultimo = ig[ig.length - 2] || {};
        const cresceu = (ultimo.seguidores || 0) - (penultimo.seguidores || 0);

        const entregasAbertas = Store.lista('entregas')
            .filter(e => !['aprovado', 'entregue'].includes(e.status))
            .sort((a, b) => String(a.prazo).localeCompare(String(b.prazo)));

        raiz.innerHTML = `
            <div style="margin-bottom:26px">
                <div class="eyebrow">${saudacao()}</div>
                <h1 class="serif" style="font-size:clamp(26px,3.4vw,34px);letter-spacing:-0.03em;margin-top:6px">
                    ${UI.esc((p.nome || 'creator').split(' ')[0])}, ${fraseDoDia(pend, mes, meta)}
                </h1>
            </div>

            <div class="stats stagger" style="margin-bottom:26px">
                <div class="stat">
                    <div class="stat-label">Recebido em ${UI.MESES[new Date().getMonth()]}</div>
                    <div class="stat-value">${UI.brl(mes.recebido)}</div>
                    <div class="stat-foot">
                        ${meta ? `meta de ${UI.brl(meta)}
                        <div class="progress" style="margin-top:7px"><span style="width:${pct}%"></span></div>
                        <div style="margin-top:5px">${pct}% da meta</div>` : 'defina sua meta nas configurações'}
                    </div>
                </div>
                <div class="stat">
                    <div class="stat-label">A receber</div>
                    <div class="stat-value">${UI.brl(mes.aReceber)}</div>
                    <div class="stat-foot">de trabalhos já fechados</div>
                </div>
                <div class="stat">
                    <div class="stat-label">Entregas abertas</div>
                    <div class="stat-value">${entregasAbertas.length}</div>
                    <div class="stat-foot">${entregasAbertas.length ? 'a mais próxima ' + UI.prazoTexto(entregasAbertas[0].prazo).texto : 'nada pendente, aproveita'}</div>
                </div>
                <div class="stat">
                    <div class="stat-label">Seguidores</div>
                    <div class="stat-value">${UI.compacto(ultimo.seguidores || p.seguidores || 0)}</div>
                    <div class="stat-foot">${cresceu > 0 ? `<span class="up">+${UI.numero(cresceu)}</span> no mês` : 'atualize seus números na aba Instagram'}</div>
                </div>
            </div>

            <div class="grid g-2-1" style="align-items:start">
                <section class="panel">
                    <div class="panel-head">
                        <h3>Precisa de você</h3>
                        <span class="pill ${pend.length ? 'pill-warn' : 'pill-ok'}">${pend.length || 'nada'} ${pend.length === 1 ? 'item' : pend.length ? 'itens' : 'em aberto'}</span>
                    </div>
                    <div class="panel-body${pend.length ? ' flush' : ''}">
                        ${pend.length ? `
                            <div class="timeline" style="padding:4px 18px">
                                ${pend.slice(0, 7).map(item => {
                                    const t = UI.prazoTexto(Store.dia(item.dias));
                                    return `
                                    <div class="tl-item" style="cursor:pointer;grid-template-columns:108px minmax(0,1fr)" data-ir="${item.aba}">
                                        <div class="tl-when" style="text-align:left">
                                            <span class="pill ${t.tom ? 'pill-' + t.tom : ''}" style="font-size:10.5px">${t.texto}</span>
                                        </div>
                                        <div>
                                            <div class="tl-what">${UI.esc(item.titulo)}</div>
                                            <div class="tl-sub">${UI.esc(item.quem)} · ${rotuloTipo(item.tipo)}</div>
                                        </div>
                                    </div>`;
                                }).join('')}
                            </div>` :
                            `<div class="empty" style="padding:32px 20px">
                                ${UI.icon('check')}
                                <h4>Tudo em dia</h4>
                                <p>Nenhuma marca esperando retorno e nenhuma entrega vencendo nos próximos dias.</p>
                            </div>`}
                    </div>
                </section>

                <div>
                    <section class="panel" style="margin-bottom:16px">
                        <div class="panel-head"><h3>⏳ Ritmo do mês</h3></div>
                        <div class="panel-body">${ritmoDoMes(mes, meta)}</div>
                    </section>

                    <section class="panel">
                        <div class="panel-head"><h3>Seu funil agora</h3></div>
                        <div class="panel-body">
                            ${funilResumo()}
                        </div>
                    </section>
                </div>
            </div>

            <div class="grid g2" style="margin-top:22px;align-items:start">
                <section class="panel">
                    <div class="panel-head">
                        <h3>Faturamento dos últimos meses</h3>
                        <div class="spacer"></div>
                        <button class="btn btn-sm" data-ir="financeiro" type="button">Ver tudo</button>
                    </div>
                    <div class="panel-body">${graficoFaturamento()}</div>
                </section>

                <section class="panel">
                    <div class="panel-head">
                        <h3>Próximas entregas</h3>
                        <div class="spacer"></div>
                        <button class="btn btn-sm" data-ir="entregas" type="button">Ver tudo</button>
                    </div>
                    <div class="panel-body">
                        ${entregasAbertas.length ? `
                            <div class="timeline">
                                ${entregasAbertas.slice(0, 5).map(e => {
                                    const t = UI.prazoTexto(e.prazo);
                                    return `
                                    <div class="tl-item">
                                        <div class="tl-when"><b>${UI.data(e.prazo)}</b>${t.tom ? `<span style="color:var(--${t.tom})">${t.texto}</span>` : t.texto}</div>
                                        <div>
                                            <div class="tl-what">${UI.esc(e.titulo)}</div>
                                            <div class="tl-sub">${UI.esc(e.marcaNome)} · ${UI.esc(rotuloEntrega(e.status))}</div>
                                        </div>
                                    </div>`;
                                }).join('')}
                            </div>` :
                            UI.vazio('Sem entrega marcada', 'Quando você fechar uma marca, cadastre aqui o que precisa gravar e até quando.', '', '📦')}
                    </div>
                </section>
            </div>
        `;

        raiz.querySelectorAll('[data-ir]').forEach(b => {
            b.addEventListener('click', () => App.ir(b.dataset.ir));
        });
    }

    /** compara quanto do mês já passou com quanto da meta ela fez */
    function ritmoDoMes(mes, meta) {
        const passou = Math.round(UI.quantoDoMes() * 100);
        const feito = meta ? Math.min(100, Math.round((mes.recebido / meta) * 100)) : 0;
        const hoje = new Date();
        const noMes = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0).getDate();
        const faltam = noMes - hoje.getDate();

        let recado;
        if (!meta) recado = 'Defina sua meta nas configurações pra acompanhar o ritmo.';
        else if (feito >= 100) recado = '🎉 Meta batida. O que vier agora é lucro.';
        else if (feito >= passou) recado = `Você está <b class="grifo">adiantada</b>. Continue nesse ritmo e bate a meta antes do fim do mês.`;
        else recado = `Você está <b class="grifo">atrás do ritmo</b>. Pra chegar na meta faltam ${UI.brl(meta - mes.recebido)} em ${faltam} ${faltam === 1 ? 'dia' : 'dias'}.`;

        return `
            <div class="ritmo">
                <div class="ritmo-linha">
                    <span class="ritmo-rot">Do mês</span>
                    <div class="progress"><span class="tempo" style="width:${passou}%"></span></div>
                    <span class="ritmo-num">${passou}%</span>
                </div>
                <div class="ritmo-linha">
                    <span class="ritmo-rot">Da meta</span>
                    <div class="progress"><span style="width:${feito}%"></span></div>
                    <span class="ritmo-num">${feito}%</span>
                </div>
            </div>
            <p style="margin:14px 0 0;font-size:13.5px;color:var(--soft);line-height:1.6">${recado}</p>`;
    }

    function saudacao() {
        const h = new Date().getHours();
        if (h < 5) return 'Boa madrugada';
        if (h < 12) return 'Bom dia';
        if (h < 18) return 'Boa tarde';
        return 'Boa noite';
    }

    function fraseDoDia(pend, mes, meta) {
        const urgentes = pend.filter(i => i.dias <= 0).length;
        if (urgentes) return `você tem ${urgentes} ${urgentes === 1 ? 'coisa' : 'coisas'} pra resolver hoje.`;
        if (meta && mes.recebido >= meta) return 'você bateu a meta do mês. Vai comemorar.';
        if (pend.length) return 'nada atrasado por aqui. Só o que vence nos próximos dias.';
        return 'tudo em dia. Que tal prospectar uma marca nova?';
    }

    const rotuloTipo = t => ({ marca: 'marca no funil', entrega: 'entrega', proposta: 'proposta' })[t] || t;
    const rotuloEntrega = s => ({ roteiro: 'escrevendo o roteiro', gravar: 'a gravar', editar: 'editando', enviado: 'enviado, aguardando', aprovado: 'aprovado' })[s] || s;

    function funilResumo() {
        const marcas = Store.lista('marcas');
        const linhas = Views.marcas.COLUNAS.map(c => {
            const itens = marcas.filter(m => m.status === c.id);
            return { nome: c.nome, qtd: itens.length, valor: itens.reduce((s, m) => s + Number(m.valor || 0), 0) };
        });
        const max = Math.max(...linhas.map(l => l.qtd), 1);

        return `<div style="display:flex;flex-direction:column;gap:11px">
            ${linhas.map(l => `
                <div style="cursor:pointer" data-ir="marcas">
                    <div style="display:flex;align-items:baseline;gap:8px;margin-bottom:5px">
                        <span style="font-size:13px;font-weight:600">${l.nome}</span>
                        <span style="margin-left:auto;font-size:12px;color:var(--muted)" class="mono">${l.valor ? UI.brl(l.valor) : ''}</span>
                        <span style="font-size:13px;font-weight:700;min-width:16px;text-align:right">${l.qtd}</span>
                    </div>
                    <div class="progress"><span style="width:${(l.qtd / max) * 100}%"></span></div>
                </div>`).join('')}
        </div>`;
    }

    function graficoFaturamento() {
        const lanc = Store.lista('lancamentos').filter(l => l.tipo === 'entrada');
        const meses = [];
        for (let i = 5; i >= 0; i--) meses.push(Store.mes(-i));
        const itens = meses.map(m => {
            const total = lanc.filter(l => String(l.data || '').slice(0, 7) === m && l.status === 'recebido')
                .reduce((s, l) => s + Number(l.valor || 0), 0);
            const [ano, mm] = m.split('-');
            return { rotulo: UI.MESES_CURTO[Number(mm) - 1], valor: total, suave: m === Store.mes(0) };
        });
        const temAlgo = itens.some(i => i.valor > 0);
        if (!temAlgo) return UI.vazio('Ainda sem lançamento', 'Assim que você registrar o primeiro pagamento recebido, o gráfico aparece aqui.', '', '💰');
        return UI.barras(itens) +
            `<p style="margin:14px 0 0;font-size:12.5px;color:var(--muted)">O mês atual aparece mais claro porque ainda está correndo.</p>`;
    }

    return {
        titulo: 'Início',
        dica: 'Seu resumo do dia',
        render
    };
})();
