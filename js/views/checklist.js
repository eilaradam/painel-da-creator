/* ==========================================================================
   Checklist Portfólio · o que gravar, como roteirizar e como revisar
   ========================================================================== */

window.Views = window.Views || {};

Views.checklist = (() => {

    let raiz = null;
    let sub = 'portfolio';
    let nichoAberto = 'beleza';
    let tipoAberto = '';

    function render(el) {
        raiz = el;
        desenhar();
    }

    function desenhar() {
        raiz.innerHTML = `
            <div class="subnav">
                <button class="${sub === 'portfolio' ? 'on' : ''}" data-sub="portfolio" type="button">Meu portfólio</button>
                <button class="${sub === 'tipos' ? 'on' : ''}" data-sub="tipos" type="button">Tipos de vídeo e roteiros</button>
                <button class="${sub === 'ideias' ? 'on' : ''}" data-sub="ideias" type="button">Ideias por nicho</button>
                <button class="${sub === 'revisao' ? 'on' : ''}" data-sub="revisao" type="button">Revisar meu roteiro</button>
            </div>
            <div id="clConteudo">${
                sub === 'portfolio' ? abaPortfolio() :
                sub === 'tipos' ? abaTipos() :
                sub === 'ideias' ? abaIdeias() : abaRevisao()
            }</div>`;
        ligar();
    }

    /* ================= Meu portfólio ================= */
    function abaPortfolio() {
        const todos = Biblioteca.PORTFOLIO.flatMap((b, bi) => b.itens.map((_, ii) => `pf:${bi}:${ii}`));
        const feitos = todos.filter(k => Store.marcado(k)).length;
        const pct = Math.round((feitos / todos.length) * 100);

        return `
            <section class="panel" style="margin-bottom:24px">
                <div class="panel-body">
                    <div style="display:flex;align-items:flex-end;gap:16px;flex-wrap:wrap">
                        <div style="flex:1;min-width:220px">
                            <div class="eyebrow">Seu portfólio está</div>
                            <div class="serif" style="font-size:34px;letter-spacing:-0.03em;margin:5px 0 10px">${pct}% pronto</div>
                            <div class="progress" style="height:9px"><span style="width:${pct}%"></span></div>
                            <p style="margin:11px 0 0;font-size:13.5px;color:var(--soft);line-height:1.55">
                                ${pct === 100 ? 'Está completo. Agora é mandar pra marca todo dia, sem medo.'
                                : pct >= 60 ? 'Já dá pra prospectar. Continue preenchendo enquanto manda pras marcas.'
                                : pct >= 25 ? 'Está saindo do papel. Foque primeiro no bloco de cima, é o que a marca pede.'
                                : 'Comece pelos quatro primeiros itens. Com eles você já consegue fechar seu primeiro trabalho.'}
                            </p>
                        </div>
                        <div style="text-align:right">
                            <div class="serif" style="font-size:22px">${feitos} de ${todos.length}</div>
                            <div style="font-size:12.5px;color:var(--muted)">itens concluídos</div>
                        </div>
                    </div>
                </div>
            </section>

            <div class="grid g2" style="align-items:start">
                ${Biblioteca.PORTFOLIO.map((b, bi) => {
                    const marcados = b.itens.filter((_, ii) => Store.marcado(`pf:${bi}:${ii}`)).length;
                    return `
                    <section class="panel">
                        <div class="panel-head">
                            <h3>${b.bloco}</h3>
                            <div class="spacer"></div>
                            <span class="pill ${marcados === b.itens.length ? 'pill-ok' : ''}">${marcados}/${b.itens.length}</span>
                        </div>
                        <div class="panel-body">
                            <div class="check-list">
                                ${b.itens.map((it, ii) => item(`pf:${bi}:${ii}`, it)).join('')}
                            </div>
                        </div>
                    </section>`;
                }).join('')}
            </div>`;
    }

    function item(chave, it) {
        return `
            <label class="check">
                <input type="checkbox" data-marca="${chave}" ${Store.marcado(chave) ? 'checked' : ''}>
                <span class="check-box">${UI.icon('check', 12)}</span>
                <span class="check-text">${UI.esc(it.t)}<small>${UI.esc(it.d)}</small></span>
            </label>`;
    }

    /* ================= Tipos de vídeo ================= */
    function abaTipos() {
        return `
            <div class="note accent" style="margin-bottom:20px">
                ${UI.icon('livro')}
                <div><b>Como usar:</b> escolha o tipo de vídeo, siga a estrutura de tempo e adapte pro seu produto.
                Roteiro não é engessar, é não travar na hora de gravar.</div>
            </div>

            ${Biblioteca.TIPOS.map(t => `
                <div class="acc${tipoAberto === t.id ? ' open' : ''}" data-tipo="${t.id}">
                    <button class="acc-head" data-abrir="${t.id}" type="button">
                        <div style="flex:1">
                            <h4>${UI.esc(t.nome)}</h4>
                            <div style="font-size:12.5px;color:var(--muted);margin-top:2px">${UI.esc(t.duracao)}</div>
                        </div>
                        <span class="acc-seta">${UI.icon('seta', 16)}</span>
                    </button>
                    <div class="acc-body">
                        <p style="margin:0 0 16px;font-size:13.5px;color:var(--soft);line-height:1.6;max-width:74ch">
                            ${UI.esc(t.porque)}
                        </p>

                        <div class="eyebrow" style="margin-bottom:4px">Estrutura do roteiro</div>
                        <div style="margin-bottom:18px">
                            ${t.beats.map(b => `
                                <div class="beat">
                                    <div class="beat-when">${UI.esc(b.t)}</div>
                                    <div class="beat-what">${b.o}</div>
                                </div>`).join('')}
                        </div>

                        <div class="grid g2" style="align-items:start">
                            <div>
                                <div class="eyebrow" style="margin-bottom:8px">Erros que derrubam esse vídeo</div>
                                <ul style="margin:0;padding-left:18px;font-size:13.5px;line-height:1.75;color:var(--soft)">
                                    ${t.erros.map(e => `<li>${UI.esc(e)}</li>`).join('')}
                                </ul>
                            </div>
                            <div style="display:flex;flex-direction:column;gap:8px;align-items:flex-start">
                                <button class="btn btn-sm" data-copiar-tipo="${t.id}" type="button">${UI.icon('copiar', 14)} Copiar o esqueleto do roteiro</button>
                                <button class="btn btn-sm btn-primary" data-criar-tipo="${t.id}" type="button">${UI.icon('mais', 14)} Criar conteúdo com essa estrutura</button>
                            </div>
                        </div>
                    </div>
                </div>`).join('')}`;
    }

    /* ================= Ideias por nicho ================= */
    function abaIdeias() {
        const nicho = Biblioteca.NICHOS.find(n => n.id === nichoAberto) || Biblioteca.NICHOS[0];
        return `
            <div class="toolbar">
                <div class="chips">
                    ${Biblioteca.NICHOS.map(n => `
                        <button class="chip${n.id === nichoAberto ? ' on' : ''}" data-nicho="${n.id}" type="button">${UI.esc(n.nome)}</button>`).join('')}
                </div>
            </div>

            <div class="section-head" style="margin-bottom:16px">
                <div>
                    <h2>${UI.esc(nicho.nome)}</h2>
                    <p>Cinco vídeos que você consegue gravar essa semana, com o gancho já escrito.</p>
                </div>
            </div>

            <div class="grid g2" style="align-items:start">
                ${nicho.ideias.map((i, idx) => {
                    const tipo = Biblioteca.tipoPorId(i.tipo) || {};
                    return `
                    <article class="panel">
                        <div class="panel-body">
                            <div style="display:flex;align-items:flex-start;gap:12px">
                                <div style="flex:1">
                                    <span class="pill pill-accent">${UI.esc(tipo.nome || i.tipo)}</span>
                                    <h4 style="margin:9px 0 8px;font-size:16px;line-height:1.35">${UI.esc(i.t)}</h4>
                                    <p style="margin:0;font-size:13.5px;color:var(--soft);line-height:1.6">
                                        <b style="color:var(--ink)">Gancho:</b> ${UI.esc(i.gancho)}
                                    </p>
                                </div>
                            </div>
                            <div style="display:flex;gap:7px;margin-top:14px;flex-wrap:wrap">
                                <button class="btn btn-sm" data-ver-tipo="${i.tipo}" type="button">Ver a estrutura</button>
                                <button class="btn btn-sm btn-primary" data-criar-ideia="${nicho.id}:${idx}" type="button">${UI.icon('mais', 14)} Jogar no meu quadro</button>
                            </div>
                        </div>
                    </article>`;
                }).join('')}
            </div>`;
    }

    /* ================= Revisão do roteiro ================= */
    function abaRevisao() {
        const todos = Biblioteca.REVISAO.flatMap((b, bi) => b.itens.map((_, ii) => `rv:${bi}:${ii}`));
        const feitos = todos.filter(k => Store.marcado(k)).length;
        const pct = Math.round((feitos / todos.length) * 100);

        return `
            <div class="grid g-1-2" style="align-items:start">
                <section class="panel" style="position:sticky;top:84px">
                    <div class="panel-body">
                        <div class="eyebrow">Este roteiro está</div>
                        <div class="serif" style="font-size:38px;letter-spacing:-0.03em;margin:6px 0 12px">${pct}%</div>
                        <div class="progress" style="height:9px"><span style="width:${pct}%"></span></div>
                        <p style="margin:14px 0 0;font-size:13.5px;color:var(--soft);line-height:1.6">
                            ${pct === 100 ? 'Pode gravar. Esse roteiro está redondo.'
                            : pct >= 70 ? 'Está quase. Resolva os itens que faltam e grave hoje mesmo.'
                            : pct >= 40 ? 'Tem base, mas ainda vai te fazer regravar. Vale mais 10 minutos aqui.'
                            : 'Passe item por item antes de pegar o celular. Dez minutos aqui economizam uma hora de gravação.'}
                        </p>
                        <button class="btn btn-sm" id="clZerar" type="button" style="margin-top:16px">Zerar para o próximo roteiro</button>
                        <p style="margin:12px 0 0;font-size:12.5px;color:var(--muted);line-height:1.5">
                            Use essa lista uma vez por roteiro. Depois de gravar, zere e comece de novo.
                        </p>
                    </div>
                </section>

                <div>
                    ${Biblioteca.REVISAO.map((b, bi) => {
                        const marcados = b.itens.filter((_, ii) => Store.marcado(`rv:${bi}:${ii}`)).length;
                        return `
                        <section class="panel" style="margin-bottom:16px">
                            <div class="panel-head">
                                <h3>${b.bloco}</h3>
                                <div class="spacer"></div>
                                <span class="pill ${marcados === b.itens.length ? 'pill-ok' : ''}">${marcados}/${b.itens.length}</span>
                            </div>
                            <div class="panel-body">
                                <div class="check-list">
                                    ${b.itens.map((it, ii) => item(`rv:${bi}:${ii}`, it)).join('')}
                                </div>
                            </div>
                        </section>`;
                    }).join('')}
                </div>
            </div>`;
    }

    /* ================= eventos ================= */
    function ligar() {
        raiz.querySelectorAll('[data-sub]').forEach(b => {
            b.addEventListener('click', () => { sub = b.dataset.sub; desenhar(); });
        });

        raiz.querySelectorAll('[data-marca]').forEach(cb => {
            cb.addEventListener('change', () => {
                Store.marcar(cb.dataset.marca, cb.checked);
                desenhar();
            });
        });

        raiz.querySelectorAll('[data-abrir]').forEach(b => {
            b.addEventListener('click', () => {
                tipoAberto = tipoAberto === b.dataset.abrir ? '' : b.dataset.abrir;
                desenhar();
            });
        });

        raiz.querySelectorAll('[data-nicho]').forEach(b => {
            b.addEventListener('click', () => { nichoAberto = b.dataset.nicho; desenhar(); });
        });

        raiz.querySelectorAll('[data-ver-tipo]').forEach(b => {
            b.addEventListener('click', () => {
                tipoAberto = b.dataset.verTipo;
                sub = 'tipos';
                desenhar();
                const alvo = raiz.querySelector(`[data-tipo="${tipoAberto}"]`);
                if (alvo) alvo.scrollIntoView({ behavior: 'smooth', block: 'center' });
            });
        });

        raiz.querySelectorAll('[data-copiar-tipo]').forEach(b => {
            b.addEventListener('click', () => {
                const t = Biblioteca.tipoPorId(b.dataset.copiarTipo);
                const texto = [
                    'ROTEIRO · ' + t.nome,
                    'Duração ideal: ' + t.duracao,
                    '',
                    ...t.beats.map(x => `[${x.t}] ${limpar(x.o)}`),
                    '',
                    'CUIDADO COM:',
                    ...t.erros.map(e => '· ' + e)
                ].join('\n');
                UI.copiar(texto, 'Esqueleto copiado, agora é preencher');
            });
        });

        raiz.querySelectorAll('[data-criar-tipo]').forEach(b => {
            b.addEventListener('click', () => {
                const t = Biblioteca.tipoPorId(b.dataset.criarTipo);
                Store.add('conteudos', {
                    titulo: t.nome,
                    formato: 'Reels',
                    pilar: 'Nicho',
                    status: 'roteiro',
                    data: Store.dia(4),
                    roteiro: t.beats.map(x => `[${x.t}] ${limpar(x.o)}`).join('\n\n')
                });
                UI.toast('Criado no seu quadro de conteúdo');
                App.atualizarBadges();
            });
        });

        raiz.querySelectorAll('[data-criar-ideia]').forEach(b => {
            b.addEventListener('click', () => {
                const [nid, idx] = b.dataset.criarIdeia.split(':');
                const nicho = Biblioteca.NICHOS.find(n => n.id === nid);
                const ideia = nicho.ideias[Number(idx)];
                const tipo = Biblioteca.tipoPorId(ideia.tipo);
                Store.add('conteudos', {
                    titulo: ideia.t,
                    formato: 'Reels',
                    pilar: 'Nicho',
                    status: 'ideia',
                    data: Store.dia(5),
                    roteiro: `Gancho: ${ideia.gancho}\n\n` + (tipo ? tipo.beats.map(x => `[${x.t}] ${limpar(x.o)}`).join('\n\n') : '')
                });
                UI.toast('"' + ideia.t + '" foi pro seu quadro');
                App.atualizarBadges();
            });
        });

        const zerar = raiz.querySelector('#clZerar');
        if (zerar) zerar.addEventListener('click', () => {
            UI.confirmar({
                titulo: 'Zerar a revisão?',
                texto: 'Desmarca todos os itens pra você usar a lista no próximo roteiro. O checklist do portfólio não é afetado.',
                botao: 'Zerar',
                aoConfirmar() {
                    Biblioteca.REVISAO.forEach((b, bi) => b.itens.forEach((_, ii) => Store.marcar(`rv:${bi}:${ii}`, false)));
                    desenhar();
                    UI.toast('Pronta pro próximo roteiro');
                }
            });
        });
    }

    const limpar = html => String(html).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

    return {
        titulo: 'Checklist Portfólio',
        dica: 'O que gravar, como roteirizar e como revisar',
        render
    };
})();
