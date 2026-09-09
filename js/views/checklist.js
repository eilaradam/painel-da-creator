/* ==========================================================================
   Checklist Portfólio · o que precisa ter, referências de vídeo e roteiros
   ========================================================================== */

window.Views = window.Views || {};

Views.checklist = (() => {

    let raiz = null;
    let sub = 'checklist';
    let abertas = { capa: true };          // seções do checklist abertas
    let filtroEstilo = '';
    let filtroAudiencia = '';
    let busca = '';
    let nichoAberto = 'beleza';
    let tipoAberto = '';

    const CORES = ['terra', 'oliva', 'mostarda', 'coral', 'rosa', 'petroleo', 'musgo', 'areia'];

    function render(el) {
        raiz = el;
        desenhar();
    }

    function desenhar() {
        raiz.innerHTML = `
            <div class="subnav">
                <button class="${sub === 'checklist' ? 'on' : ''}" data-sub="checklist" type="button">✅ Checklist do portfólio</button>
                <button class="${sub === 'referencias' ? 'on' : ''}" data-sub="referencias" type="button">🎬 Referências de vídeo</button>
                <button class="${sub === 'roteiros' ? 'on' : ''}" data-sub="roteiros" type="button">📝 Roteiros</button>
                <button class="${sub === 'ideias' ? 'on' : ''}" data-sub="ideias" type="button">💡 Ideias por nicho</button>
                <button class="${sub === 'revisao' ? 'on' : ''}" data-sub="revisao" type="button">🔍 Revisar meu roteiro</button>
            </div>
            <div>${
                sub === 'checklist' ? abaChecklist() :
                sub === 'referencias' ? abaReferencias() :
                sub === 'roteiros' ? abaRoteiros() :
                sub === 'ideias' ? abaIdeias() : abaRevisao()
            }</div>`;
        ligar();
    }

    /* ======================================================================
       1. Checklist do portfólio
       ====================================================================== */
    const chaveCl = (secId, i) => `cl:${secId}:${i}`;
    const feitosDaSecao = sec => sec.itens.filter((_, i) => Store.marcado(chaveCl(sec.id, i))).length;

    function abaChecklist() {
        const total = Biblioteca.totalItensChecklist();
        const feitos = Biblioteca.CHECKLIST.reduce((n, s) => n + feitosDaSecao(s), 0);
        const pct = Math.round((feitos / total) * 100);
        const prontas = Biblioteca.CHECKLIST.filter(s => feitosDaSecao(s) === s.itens.length).length;

        return `
            <section class="placar dots">
                <div>
                    <div class="eyebrow">Seu portfólio está</div>
                    <div class="placar-num">${pct}<small>%</small></div>
                </div>
                <div class="placar-txt">
                    <div style="display:flex;align-items:center;gap:9px;flex-wrap:wrap">
                        <span class="count-chip"><b>${feitos}</b> de ${total} itens</span>
                        <span class="count-chip"><b>${prontas}</b> de ${Biblioteca.CHECKLIST.length} páginas prontas</span>
                    </div>
                    <p>${
                        pct === 100 ? '🎉 Está completo. Agora é mandar pra marca todo dia, sem medo.'
                        : pct >= 70 ? 'Já dá pra prospectar com ele. Termine o que falta enquanto manda pras marcas.'
                        : pct >= 30 ? 'Está saindo do papel. Foque na Capa e nos Melhores resultados, são as páginas que fecham contrato.'
                        : 'Comece pela Capa. Com ela e os seus melhores vídeos você já consegue o primeiro trabalho.'
                    }</p>
                </div>
                <div class="placar-barra">
                    <div class="progress" style="height:10px"><span style="width:${pct}%"></span></div>
                </div>
            </section>

            <div class="toolbar">
                <div>
                    <h2 class="serif" style="font-size:19px">As páginas do seu portfólio</h2>
                    <p style="margin:2px 0 0;font-size:13px;color:var(--soft)">Na ordem em que a marca vai ver. Clique em cada uma pra abrir.</p>
                </div>
                <div style="margin-left:auto"></div>
                <button class="btn btn-sm" data-cl-todas="abrir" type="button">Abrir todas</button>
                <button class="btn btn-sm" data-cl-todas="fechar" type="button">Fechar todas</button>
            </div>

            ${Biblioteca.CHECKLIST.map(secao).join('')}

            <div class="note accent" style="margin-top:20px">
                💾
                <div><b>Suas marcações ficam salvas.</b> Você pode fechar essa página, voltar amanhã e continuar de onde parou.</div>
            </div>`;
    }

    function secao(sec) {
        const feitos = feitosDaSecao(sec);
        const total = sec.itens.length;
        const completa = feitos === total;
        const aberta = !!abertas[sec.id];
        const raio = 15;
        const volta = 2 * Math.PI * raio;

        return `
            <section class="cl-sec${aberta ? ' aberta' : ''}${completa ? ' completa' : ''}" data-sec="${sec.id}">
                <button class="cl-head" data-abrir-sec="${sec.id}" type="button" aria-expanded="${aberta}">
                    <span class="cl-emoji">${sec.emoji}</span>
                    <span class="cl-tit">
                        <h3>${UI.esc(sec.nome)}</h3>
                        <p>${UI.esc(sec.resumo)}</p>
                    </span>
                    <span class="cl-progresso">
                        <span class="cl-fracao">${completa ? '✓ pronta' : feitos + '/' + total}</span>
                        <svg class="cl-anel" viewBox="0 0 36 36">
                            <circle class="trilho" cx="18" cy="18" r="${raio}"></circle>
                            <circle class="arco" cx="18" cy="18" r="${raio}"
                                stroke-dasharray="${volta}" stroke-dashoffset="${volta * (1 - feitos / total)}"></circle>
                        </svg>
                        <svg class="cl-seta" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                    </span>
                </button>
                <div class="cl-body">
                    <div class="cl-porque">💡 ${UI.esc(sec.porque)}</div>
                    <div class="check-list">
                        ${sec.itens.map((it, i) => `
                            <label class="check">
                                <input type="checkbox" data-marca="${chaveCl(sec.id, i)}" ${Store.marcado(chaveCl(sec.id, i)) ? 'checked' : ''}>
                                <span class="check-box">${UI.icon('check', 12)}</span>
                                <span class="check-text">${UI.esc(it.t)}<small>${UI.esc(it.d)}</small></span>
                            </label>`).join('')}
                    </div>
                </div>
            </section>`;
    }

    /* ======================================================================
       2. Referências de vídeo
       ====================================================================== */
    function todasReferencias() {
        const minhas = Store.lista('referencias').map(r => Object.assign({ minha: true }, r));
        return minhas.concat(Biblioteca.REFERENCIAS);
    }

    function abaReferencias() {
        const todas = todasReferencias();
        const termo = busca.trim().toLowerCase();
        const vistas = todas.filter(r => {
            if (filtroEstilo && r.estilo !== filtroEstilo) return false;
            if (filtroAudiencia && r.audiencia !== filtroAudiencia) return false;
            if (!termo) return true;
            return (r.titulo + ' ' + (r.gancho || '') + ' ' + (r.porque || '') + ' ' + (r.estilo || '')).toLowerCase().includes(termo);
        });

        const estilos = [...new Set(todas.map(r => r.estilo).filter(Boolean))];

        return `
            <section class="hero dots">
                <span class="hero-marca">🎬</span>
                <h2>Referências de vídeo</h2>
                <p>O UGC está cheio de vídeo igual: pessoa sentada na sala falando do produto. Aqui estão os formatos que fogem disso.
                   Assista, entenda a estrutura e grave a sua versão. É isso que vai deixar o seu portfólio diferente de todos os outros.</p>
                <div class="hero-foot">
                    <span class="count-chip"><b>${todas.length}</b> ${todas.length === 1 ? 'referência' : 'referências'}</span>
                    <span class="count-chip">${estilos.length} estilos diferentes</span>
                </div>
            </section>

            <div class="filtros">
                <div class="search">
                    ${UI.icon('busca')}
                    <input class="input" id="refBusca" placeholder="Buscar formato, gancho..." value="${UI.esc(busca)}">
                </div>
                ${dropdown('estilo', 'Estilo', filtroEstilo, [{ v: '', t: 'Todos os estilos' }].concat(estilos.map(e => ({ v: e, t: e }))))}
                ${dropdown('audiencia', 'Audiência', filtroAudiencia, [{ v: '', t: 'Todas' }].concat(Biblioteca.AUDIENCIAS))}
                <div style="margin-left:auto"></div>
                <button class="btn btn-primary" id="refNova" type="button">${UI.icon('mais')} Adicionar referência</button>
            </div>

            ${vistas.length ? `
                <div class="ref-grid">
                    ${vistas.map(cartaoRef).join('')}
                </div>` :
                UI.vazio('Nenhuma referência com esse filtro', 'Tente limpar a busca ou trocar o estilo.')}

            <div class="note info" style="margin-top:26px">
                ${UI.icon('info')}
                <div><b>Quer guardar suas próprias referências?</b> Use o botão "Adicionar referência" e cole o link de um reel que te inspirou,
                junto com o motivo pelo qual você acha que ele funcionou. Referência sem análise não ensina nada.</div>
            </div>`;
    }

    function cartaoRef(r) {
        const cor = r.cor || CORES[Math.abs(hash(r.id || r.titulo)) % CORES.length];
        const capa = capaDoCard(r);
        const temMidia = r.video || capa;
        return `
            <button class="ref-card c-${cor}" data-ref="${UI.esc(r.id)}" type="button">
                <div class="ref-capa ${temMidia ? '' : 'capa-cat'}">
                    ${r.video ? `<video src="${UI.esc(r.video)}" muted playsinline preload="metadata"></video>`
                        : capa ? `<img src="${UI.esc(capa)}" alt="" loading="lazy">`
                        : `<span class="ref-emoji">${r.emoji || '🎬'}</span>`}
                    <span class="ref-badge">${UI.esc(r.estilo || 'Referência')}</span>
                    ${r.duracao ? `<span class="ref-dur">${UI.esc(r.duracao)}</span>` : ''}
                    <span class="ref-play">
                        <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 21 12 6 21 6 3"/></svg>
                    </span>
                </div>
                <div class="ref-info">
                    <h4>${UI.esc(r.titulo)}</h4>
                    <p>${UI.esc(r.gancho || r.porque || '')}</p>
                    <div class="ref-tags">
                        <span class="pill pill-cat">${UI.esc(r.audiencia || 'Universal')}</span>
                        ${r.marca ? `<span class="pill">${UI.esc(r.marca)}</span>` : ''}
                        ${r.minha ? '<span class="pill">minha</span>' : ''}
                    </div>
                </div>
            </button>`;
    }

    function hash(s) {
        let h = 0;
        String(s).split('').forEach(c => { h = ((h << 5) - h) + c.charCodeAt(0); h |= 0; });
        return h;
    }

    /* ---------- vídeo: arquivo, YouTube ou Instagram ---------- */

    /** pega o id do YouTube em qualquer formato de link */
    function idYoutube(url) {
        const s = String(url || '');
        const m = s.match(/(?:youtu\.be\/|v=|\/embed\/|\/shorts\/|\/live\/)([A-Za-z0-9_-]{11})/);
        if (m) return m[1];
        return /^[A-Za-z0-9_-]{11}$/.test(s.trim()) ? s.trim() : '';
    }

    /** pega o código do post ou reel do Instagram */
    function codigoInsta(url) {
        const m = String(url || '').match(/instagram\.com\/(?:p|reel|reels|tv)\/([A-Za-z0-9_-]+)/);
        return m ? m[1] : '';
    }

    /** o que aparece na capa do card: capa própria, print do YouTube ou nada */
    function capaDoCard(r) {
        if (r.capa) return r.capa;
        const yt = idYoutube(r.youtube || r.link);
        return yt ? `https://img.youtube.com/vi/${yt}/hqdefault.jpg` : '';
    }

    /** o player que vai dentro da ficha */
    function playerDaFicha(r) {
        if (r.video) {
            return `<video src="${UI.esc(r.video)}" controls playsinline style="width:100%;border-radius:14px;background:#000;max-height:62vh"></video>`;
        }
        const yt = idYoutube(r.youtube || r.link);
        if (yt) {
            // Short é vertical: player estreito e em pé, senão sobra tarja preta dos dois lados
            const curto = /\/shorts\//.test(String(r.youtube || r.link));
            const proporcao = curto ? '177.8%' : '56.25%';
            const largura = curto ? 'max-width:290px;margin:0 auto;' : '';
            return `<div style="${largura}position:relative;padding-top:${proporcao};border-radius:14px;overflow:hidden;background:#000">
                <iframe src="https://www.youtube-nocookie.com/embed/${yt}" title="${UI.esc(r.titulo)}"
                    style="position:absolute;inset:0;width:100%;height:100%;border:0"
                    allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture; fullscreen" allowfullscreen loading="lazy"></iframe>
            </div>`;
        }
        const ig = codigoInsta(r.instagram || r.link);
        if (ig) {
            return `<div style="display:flex;justify-content:center">
                <iframe src="https://www.instagram.com/p/${ig}/embed/captioned/" title="${UI.esc(r.titulo)}"
                    style="width:100%;max-width:400px;height:640px;border:1px solid var(--border);border-radius:14px;background:var(--surface)"
                    scrolling="no" allowtransparency loading="lazy"></iframe>
            </div>`;
        }
        return '';
    }

    /** link pra abrir o original em outra aba */
    const linkExterno = r => r.link || r.instagram || r.youtube || '';

    function dropdown(nome, rotulo, valor, opcoes) {
        const atual = opcoes.find(o => o.v === valor) || opcoes[0];
        return `
            <div class="dd" data-dd="${nome}">
                <button class="dd-btn" type="button" data-dd-btn>
                    <span class="dd-rotulo">${rotulo}:</span>
                    <span>${UI.esc(atual.t)}</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                </button>
                <div class="dd-menu">
                    ${opcoes.map(o => `
                        <button class="dd-item${o.v === valor ? ' on' : ''}" data-dd-val="${UI.esc(o.v)}" type="button">
                            ${UI.esc(o.t)}
                            <svg class="dd-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </button>`).join('')}
                </div>
            </div>`;
    }

    /* ---------- ficha da referência ---------- */
    function abrirRef(id) {
        const r = todasReferencias().find(x => String(x.id) === String(id));
        if (!r) return;
        const cor = r.cor || CORES[Math.abs(hash(r.id || r.titulo)) % CORES.length];
        const player = playerDaFicha(r);
        const externo = linkExterno(r);

        const roteiroHtml = Array.isArray(r.roteiro)
            ? r.roteiro.map(b => `<div class="beat"><div class="beat-when">${UI.esc(b.t)}</div><div class="beat-what">${b.o}</div></div>`).join('')
            : (r.roteiro ? `<p style="margin:0;white-space:pre-wrap;font-size:14px;line-height:1.65">${UI.esc(r.roteiro)}</p>` : '');

        UI.modal({
            titulo: (r.emoji || '🎬') + '  ' + r.titulo,
            sub: [r.marca ? 'Campanha ' + r.marca : '', r.estilo, r.duracao].filter(Boolean).join(' · '),
            largo: true,
            corpo: `
                <div class="c-${cor} ${player ? 'ficha-2col' : ''}">
                    <div class="${player ? 'ficha-video' : ''}">
                        ${player || `
                            <div class="ficha-capa capa-cat">
                                ${r.capa ? `<img src="${UI.esc(r.capa)}" alt="">` : `<span class="ref-emoji">${r.emoji || '🎬'}</span>`}
                            </div>`}
                        ${externo ? `<a class="btn ${player ? 'btn-sm' : 'btn-primary'}" href="${UI.esc(externo)}" target="_blank" rel="noopener" style="margin-top:12px">${UI.icon('link', 15)} Abrir no YouTube</a>` : ''}
                    </div>

                    <div>
                        ${r.gancho ? `
                            <div class="note accent" style="margin:0 0 18px">
                                🪝
                                <div><b>O gancho:</b> ${UI.esc(r.gancho)}</div>
                            </div>` : ''}

                        ${roteiroHtml ? `
                            <div class="eyebrow" style="margin-bottom:4px">Como esse vídeo é montado</div>
                            <div style="margin-bottom:20px">${roteiroHtml}</div>` : ''}

                        ${r.porque ? `<div class="ficha-linha"><div class="ficha-rot">Por que funcionou</div><div class="ficha-val">${UI.esc(r.porque)}</div></div>` : ''}
                        ${r.diferencial ? `<div class="ficha-linha"><div class="ficha-rot">O diferencial</div><div class="ficha-val">${UI.esc(r.diferencial)}</div></div>` : ''}
                        ${r.erro ? `<div class="ficha-linha"><div class="ficha-rot">Erro comum</div><div class="ficha-val">${UI.esc(r.erro)}</div></div>` : ''}
                    </div>
                </div>`,
            rodape: `
                ${r.minha ? `<button class="btn btn-danger" data-apagar-ref type="button">${UI.icon('lixo', 15)} Apagar</button>` : ''}
                <div class="spacer"></div>
                ${Array.isArray(r.roteiro) ? `<button class="btn" data-copiar-ref type="button">${UI.icon('copiar', 15)} Copiar o roteiro</button>` : ''}
                <button class="btn btn-primary" data-criar-ref type="button">${UI.icon('mais', 15)} Gravar a minha versão</button>`,
            aoAbrir(o) {
                const copiar = o.querySelector('[data-copiar-ref]');
                if (copiar) copiar.addEventListener('click', () => {
                    UI.copiar(textoDoRoteiro(r), 'Roteiro copiado, agora adapta pro seu produto');
                });

                o.querySelector('[data-criar-ref]').addEventListener('click', () => {
                    Store.add('conteudos', {
                        titulo: 'Minha versão: ' + r.titulo,
                        formato: 'Reels',
                        pilar: 'Nicho',
                        status: 'roteiro',
                        data: Store.dia(4),
                        roteiro: textoDoRoteiro(r)
                    });
                    UI.fecharModal();
                    UI.toast('Foi pro seu quadro de conteúdo');
                    App.atualizarBadges();
                });

                const apagar = o.querySelector('[data-apagar-ref]');
                if (apagar) apagar.addEventListener('click', () => {
                    UI.fecharModal();
                    UI.confirmar({
                        titulo: 'Apagar essa referência?',
                        texto: 'Ela sai da sua biblioteca. As referências da Lara continuam.',
                        aoConfirmar() { Store.remove('referencias', r.id); desenhar(); UI.toast('Apagada'); }
                    });
                });
            }
        });
    }

    function textoDoRoteiro(r) {
        const linhas = [(r.emoji || '') + ' ' + r.titulo];
        if (r.duracao) linhas.push('Duração ideal: ' + r.duracao);
        if (r.gancho) linhas.push('', 'GANCHO: ' + r.gancho);
        if (Array.isArray(r.roteiro)) {
            linhas.push('', 'ESTRUTURA:');
            r.roteiro.forEach(b => linhas.push(`[${b.t}] ${limpar(b.o)}`));
        } else if (r.roteiro) {
            linhas.push('', r.roteiro);
        }
        if (r.porque) linhas.push('', 'POR QUE FUNCIONA: ' + r.porque);
        if (r.erro) linhas.push('', 'CUIDADO COM: ' + r.erro);
        return linhas.join('\n');
    }

    function novaReferencia() {
        UI.modal({
            titulo: 'Adicionar referência',
            sub: 'Um vídeo que te inspirou, com o motivo pelo qual ele funcionou',
            largo: true,
            corpo: `
                <div class="field-row">
                    ${UI.campo('Nome do formato', UI.input('titulo', '', 'placeholder="Ex: Entrevista na porta da loja"'))}
                    ${UI.campo('Emoji da capa', UI.input('emoji', '🎬', 'maxlength="4" placeholder="🎬"'))}
                </div>
                <div class="field-row three">
                    ${UI.campo('Estilo', UI.input('estilo', '', 'list="listaEstilos" placeholder="Ex: Entrevista"') +
                        `<datalist id="listaEstilos">${Biblioteca.ESTILOS.map(e => `<option value="${e}">`).join('')}</datalist>`)}
                    ${UI.campo('Audiência', UI.select('audiencia', Biblioteca.AUDIENCIAS.map(a => ({ v: a.v, t: a.t })), 'Universal'))}
                    ${UI.campo('Duração', UI.input('duracao', '', 'placeholder="30 a 45s"'))}
                </div>
                ${UI.campo('Link do vídeo', UI.input('link', '', 'placeholder="https://www.instagram.com/reel/... ou https://youtu.be/..."'),
                    'Cole o link do reel do Instagram ou do YouTube. O vídeo aparece pra assistir aqui dentro.')}
                ${UI.campo('Capa (opcional)', UI.input('capa', '', 'placeholder="https://... link de uma imagem"'),
                    'Se for do YouTube, a capa vem sozinha. Se for do Instagram, você pode colar o link de uma imagem.')}
                ${UI.campo('O gancho', UI.input('gancho', '', 'placeholder="A frase ou a imagem dos 3 primeiros segundos"'))}
                ${UI.campo('Por que esse vídeo funcionou', UI.textarea('porque', '', 'placeholder="O que prendeu você? O que fez querer assistir até o fim?"'),
                    'Essa parte é a mais importante. Referência sem análise vira só um vídeo salvo.')}
                ${UI.campo('O roteiro, do seu jeito', UI.textarea('roteiro', '', 'style="min-height:130px" placeholder="Descreva o que acontece em cada trecho do vídeo"'))}`,
            rodape: `<button class="btn" data-fechar type="button">Cancelar</button>
                     <button class="btn btn-primary" data-salvar type="button">Salvar referência</button>`,
            aoAbrir(o) {
                o.querySelector('[data-salvar]').addEventListener('click', () => {
                    const d = UI.lerForm(o.querySelector('.modal-body'));
                    if (!d.titulo) { UI.toast('Dá um nome pra esse formato', 'erro'); return; }
                    d.cor = CORES[Math.abs(hash(d.titulo)) % CORES.length];
                    d.emoji = d.emoji || '🎬';
                    Store.add('referencias', d);
                    UI.fecharModal();
                    UI.toast('Referência guardada');
                    desenhar();
                });
            }
        });
    }

    /* ======================================================================
       3. Roteiros (os 10 tipos)
       ====================================================================== */
    function abaRoteiros() {
        return `
            <section class="hero dots">
                <span class="hero-marca">📝</span>
                <h2>Estruturas de roteiro</h2>
                <p>Dez formatos com a estrutura pronta, segundo a segundo. Escolha o tipo, siga o tempo e adapte pro seu produto.
                   Roteiro não é engessar, é não travar na hora de gravar.</p>
                <div class="hero-foot">
                    <span class="count-chip"><b>${Biblioteca.TIPOS.length}</b> estruturas prontas</span>
                </div>
            </section>

            <div class="grid g2" style="align-items:start">
                ${Biblioteca.TIPOS.map((t, i) => {
                    const cor = CORES[i % CORES.length];
                    const aberto = tipoAberto === t.id;
                    return `
                    <section class="cl-sec c-${cor}${aberto ? ' aberta' : ''}" data-tipo="${t.id}" style="${aberto ? 'grid-column:1/-1' : ''}">
                        <button class="cl-head" data-abrir-tipo="${t.id}" type="button" aria-expanded="${aberto}">
                            <span class="cl-emoji" style="background:var(--cat-bg)">${t.emoji}</span>
                            <span class="cl-tit">
                                <h3>${UI.esc(t.nome)}</h3>
                                <p>${UI.esc(t.duracao)}</p>
                            </span>
                            <svg class="cl-seta" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                        </button>
                        <div class="cl-body">
                            <div class="cl-porque">💡 ${UI.esc(t.porque)}</div>
                            <div class="eyebrow" style="margin:16px 0 2px">Estrutura</div>
                            <div style="margin-bottom:16px">
                                ${t.beats.map(b => `<div class="beat"><div class="beat-when">${UI.esc(b.t)}</div><div class="beat-what">${b.o}</div></div>`).join('')}
                            </div>
                            <div class="grid g2" style="align-items:start">
                                <div>
                                    <div class="eyebrow" style="margin-bottom:8px">⚠️ O que derruba esse vídeo</div>
                                    <ul style="margin:0;padding-left:18px;font-size:13.5px;line-height:1.75;color:var(--soft)">
                                        ${t.erros.map(e => `<li>${UI.esc(e)}</li>`).join('')}
                                    </ul>
                                </div>
                                <div style="display:flex;flex-direction:column;gap:8px;align-items:flex-start">
                                    <button class="btn btn-sm" data-copiar-tipo="${t.id}" type="button">${UI.icon('copiar', 14)} Copiar o esqueleto</button>
                                    <button class="btn btn-sm btn-primary" data-criar-tipo="${t.id}" type="button">${UI.icon('mais', 14)} Criar conteúdo com essa estrutura</button>
                                </div>
                            </div>
                        </div>
                    </section>`;
                }).join('')}
            </div>`;
    }

    /* ======================================================================
       4. Ideias por nicho
       ====================================================================== */
    function abaIdeias() {
        const nicho = Biblioteca.NICHOS.find(n => n.id === nichoAberto) || Biblioteca.NICHOS[0];
        return `
            <section class="hero dots">
                <span class="hero-marca">${nicho.emoji}</span>
                <h2>Ideias por nicho</h2>
                <p>Cinco vídeos que você consegue gravar essa semana, com o gancho já escrito. Escolha o seu nicho e jogue a ideia direto no seu quadro de conteúdo.</p>
                <div class="hero-foot">
                    <span class="count-chip"><b>${Biblioteca.NICHOS.length * 5}</b> ideias prontas</span>
                    <span class="count-chip">${Biblioteca.NICHOS.length} nichos</span>
                </div>
            </section>

            <div class="chips" style="margin-bottom:22px">
                ${Biblioteca.NICHOS.map(n => `
                    <button class="chip${n.id === nichoAberto ? ' on' : ''}" data-nicho="${n.id}" type="button">${n.emoji} ${UI.esc(n.nome)}</button>`).join('')}
            </div>

            <div class="ref-grid">
                ${nicho.ideias.map((i, idx) => {
                    const tipo = Biblioteca.tipoPorId(i.tipo) || {};
                    const cor = CORES[idx % CORES.length];
                    return `
                    <article class="ref-card c-${cor}" style="cursor:default">
                        <div class="ref-capa capa-cat" style="aspect-ratio:16/10">
                            <span class="ref-emoji" style="font-size:48px">${tipo.emoji || '🎬'}</span>
                            <span class="ref-badge">${UI.esc(tipo.nome || i.tipo)}</span>
                        </div>
                        <div class="ref-info">
                            <h4>${UI.esc(i.t)}</h4>
                            <p style="-webkit-line-clamp:3"><b style="color:var(--ink)">Gancho:</b> ${UI.esc(i.gancho)}</p>
                            <div style="display:flex;gap:7px;flex-wrap:wrap">
                                <button class="btn btn-sm" data-ver-tipo="${i.tipo}" type="button">Ver estrutura</button>
                                <button class="btn btn-sm btn-primary" data-criar-ideia="${nicho.id}:${idx}" type="button">${UI.icon('mais', 14)} Quero gravar</button>
                            </div>
                        </div>
                    </article>`;
                }).join('')}
            </div>`;
    }

    /* ======================================================================
       5. Revisão do roteiro
       ====================================================================== */
    function abaRevisao() {
        const todos = Biblioteca.REVISAO.flatMap((b, bi) => b.itens.map((_, ii) => `rv:${bi}:${ii}`));
        const feitos = todos.filter(k => Store.marcado(k)).length;
        const pct = Math.round((feitos / todos.length) * 100);

        return `
            <div class="grid g-1-2" style="align-items:start">
                <section class="placar dots" style="position:sticky;top:84px;display:block">
                    <div class="eyebrow">Este roteiro está</div>
                    <div class="placar-num">${pct}<small>%</small></div>
                    <div class="progress" style="height:10px;margin:14px 0 0"><span style="width:${pct}%"></span></div>
                    <p style="margin:14px 0 0;font-size:13.5px;color:var(--soft);line-height:1.6">
                        ${pct === 100 ? '🎬 Pode gravar. Esse roteiro está redondo.'
                        : pct >= 70 ? 'Está quase. Resolva o que falta e grave hoje mesmo.'
                        : pct >= 40 ? 'Tem base, mas ainda vai te fazer regravar. Vale mais 10 minutos aqui.'
                        : 'Passe item por item antes de pegar o celular. Dez minutos aqui economizam uma hora de gravação.'}
                    </p>
                    <button class="btn btn-sm" id="clZerar" type="button" style="margin-top:16px">Zerar para o próximo roteiro</button>
                </section>

                <div>
                    ${Biblioteca.REVISAO.map((b, bi) => {
                        const marcados = b.itens.filter((_, ii) => Store.marcado(`rv:${bi}:${ii}`)).length;
                        const completo = marcados === b.itens.length;
                        return `
                        <section class="cl-sec aberta${completo ? ' completa' : ''}" style="margin-bottom:14px">
                            <div class="cl-head" style="cursor:default">
                                <span class="cl-emoji">${b.emoji}</span>
                                <span class="cl-tit"><h3>${b.bloco}</h3></span>
                                <span class="cl-fracao">${completo ? '✓ pronto' : marcados + '/' + b.itens.length}</span>
                            </div>
                            <div class="cl-body">
                                <div class="check-list">
                                    ${b.itens.map((it, ii) => `
                                        <label class="check">
                                            <input type="checkbox" data-marca="rv:${bi}:${ii}" ${Store.marcado(`rv:${bi}:${ii}`) ? 'checked' : ''}>
                                            <span class="check-box">${UI.icon('check', 12)}</span>
                                            <span class="check-text">${UI.esc(it.t)}<small>${UI.esc(it.d)}</small></span>
                                        </label>`).join('')}
                                </div>
                            </div>
                        </section>`;
                    }).join('')}
                </div>
            </div>`;
    }

    /* ======================================================================
       eventos
       ====================================================================== */
    function ligar() {
        raiz.querySelectorAll('[data-sub]').forEach(b => {
            b.addEventListener('click', () => { sub = b.dataset.sub; desenhar(); window.scrollTo({ top: 0 }); });
        });

        raiz.querySelectorAll('[data-marca]').forEach(cb => {
            cb.addEventListener('change', () => {
                Store.marcar(cb.dataset.marca, cb.checked);
                desenhar();
            });
        });

        /* checklist */
        raiz.querySelectorAll('[data-abrir-sec]').forEach(b => {
            b.addEventListener('click', () => {
                const id = b.dataset.abrirSec;
                abertas[id] = !abertas[id];
                desenhar();
            });
        });
        raiz.querySelectorAll('[data-cl-todas]').forEach(b => {
            b.addEventListener('click', () => {
                abertas = {};
                if (b.dataset.clTodas === 'abrir') Biblioteca.CHECKLIST.forEach(s => abertas[s.id] = true);
                desenhar();
            });
        });

        /* referências */
        const buscaEl = raiz.querySelector('#refBusca');
        if (buscaEl) buscaEl.addEventListener('input', e => {
            busca = e.target.value;
            const pos = e.target.selectionStart;
            desenhar();
            const novo = raiz.querySelector('#refBusca');
            if (novo) { novo.focus(); novo.setSelectionRange(pos, pos); }
        });

        raiz.querySelectorAll('[data-dd]').forEach(dd => {
            dd.querySelector('[data-dd-btn]').addEventListener('click', e => {
                e.stopPropagation();
                const jaAberto = dd.classList.contains('aberto');
                raiz.querySelectorAll('[data-dd]').forEach(d => d.classList.remove('aberto'));
                dd.classList.toggle('aberto', !jaAberto);
            });
            dd.querySelectorAll('[data-dd-val]').forEach(item => {
                item.addEventListener('click', () => {
                    const v = item.dataset.ddVal;
                    if (dd.dataset.dd === 'estilo') filtroEstilo = v;
                    else filtroAudiencia = v;
                    desenhar();
                });
            });
        });
        document.addEventListener('click', fecharDropdowns);

        raiz.querySelectorAll('[data-ref]').forEach(c => {
            c.addEventListener('click', () => abrirRef(c.dataset.ref));
        });
        const nova = raiz.querySelector('#refNova');
        if (nova) nova.addEventListener('click', novaReferencia);

        /* roteiros */
        raiz.querySelectorAll('[data-abrir-tipo]').forEach(b => {
            b.addEventListener('click', () => {
                tipoAberto = tipoAberto === b.dataset.abrirTipo ? '' : b.dataset.abrirTipo;
                desenhar();
            });
        });
        raiz.querySelectorAll('[data-copiar-tipo]').forEach(b => {
            b.addEventListener('click', () => {
                const t = Biblioteca.tipoPorId(b.dataset.copiarTipo);
                UI.copiar([
                    'ROTEIRO · ' + t.nome,
                    'Duração ideal: ' + t.duracao, '',
                    ...t.beats.map(x => `[${x.t}] ${limpar(x.o)}`), '',
                    'CUIDADO COM:', ...t.erros.map(e => '· ' + e)
                ].join('\n'), 'Esqueleto copiado, agora é preencher');
            });
        });
        raiz.querySelectorAll('[data-criar-tipo]').forEach(b => {
            b.addEventListener('click', () => {
                const t = Biblioteca.tipoPorId(b.dataset.criarTipo);
                Store.add('conteudos', {
                    titulo: t.nome, formato: 'Reels', pilar: 'Nicho', status: 'roteiro',
                    data: Store.dia(4),
                    roteiro: t.beats.map(x => `[${x.t}] ${limpar(x.o)}`).join('\n\n')
                });
                UI.toast('Criado no seu quadro de conteúdo');
                App.atualizarBadges();
            });
        });

        /* ideias */
        raiz.querySelectorAll('[data-nicho]').forEach(b => {
            b.addEventListener('click', () => { nichoAberto = b.dataset.nicho; desenhar(); });
        });
        raiz.querySelectorAll('[data-ver-tipo]').forEach(b => {
            b.addEventListener('click', () => {
                tipoAberto = b.dataset.verTipo;
                sub = 'roteiros';
                desenhar();
                const alvo = raiz.querySelector(`[data-tipo="${tipoAberto}"]`);
                if (alvo) alvo.scrollIntoView({ behavior: 'smooth', block: 'center' });
            });
        });
        raiz.querySelectorAll('[data-criar-ideia]').forEach(b => {
            b.addEventListener('click', () => {
                const [nid, idx] = b.dataset.criarIdeia.split(':');
                const nicho = Biblioteca.NICHOS.find(n => n.id === nid);
                const ideia = nicho.ideias[Number(idx)];
                const tipo = Biblioteca.tipoPorId(ideia.tipo);
                Store.add('conteudos', {
                    titulo: ideia.t, formato: 'Reels', pilar: 'Nicho', status: 'ideia',
                    data: Store.dia(5),
                    roteiro: `Gancho: ${ideia.gancho}\n\n` + (tipo ? tipo.beats.map(x => `[${x.t}] ${limpar(x.o)}`).join('\n\n') : '')
                });
                UI.toast('"' + ideia.t + '" foi pro seu quadro');
                App.atualizarBadges();
            });
        });

        /* revisão */
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

    function fecharDropdowns() {
        document.querySelectorAll('[data-dd]').forEach(d => d.classList.remove('aberto'));
    }

    const limpar = html => String(html).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

    return {
        titulo: 'Checklist Portfólio',
        dica: 'O que precisa ter, referências e roteiros',
        render
    };
})();
