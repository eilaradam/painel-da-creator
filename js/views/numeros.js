/* ==========================================================================
   Instagram · os números que a marca pede antes de fechar
   ========================================================================== */

window.Views = window.Views || {};

Views.numeros = (() => {

    let raiz = null;

    function render(el) {
        raiz = el;
        desenhar();
    }

    function desenhar() {
        const hist = Store.lista('historicoIg').slice().sort((a, b) => String(a.mes).localeCompare(String(b.mes)));
        const posts = Store.lista('postsIg').slice().sort((a, b) => String(b.data).localeCompare(String(a.data)));
        const atual = hist[hist.length - 1] || {};
        const anterior = hist[hist.length - 2] || {};
        const cresceu = (atual.seguidores || 0) - (anterior.seguidores || 0);
        const pctCresc = anterior.seguidores ? ((cresceu / anterior.seguidores) * 100).toFixed(1).replace('.', ',') : '0';

        raiz.innerHTML = `
            <div class="stats stagger" style="margin-bottom:22px">
                <div class="stat">
                    <div class="stat-label">Seguidores</div>
                    <div class="stat-value">${UI.compacto(atual.seguidores)}</div>
                    <div class="stat-foot">${cresceu >= 0 ? `<span class="up">+${UI.numero(cresceu)}</span>` : `<span class="down">${UI.numero(cresceu)}</span>`} no último mês (${pctCresc}%)</div>
                </div>
                <div class="stat">
                    <div class="stat-label">Alcance no mês</div>
                    <div class="stat-value">${UI.compacto(atual.alcance)}</div>
                    <div class="stat-foot">contas diferentes que te viram</div>
                </div>
                <div class="stat">
                    <div class="stat-label">Engajamento</div>
                    <div class="stat-value">${String(atual.engajamento || 0).replace('.', ',')}<small>%</small></div>
                    <div class="stat-foot">${Number(atual.engajamento) >= 3 ? 'acima da média do mercado, use isso na proposta' : 'a média de mercado fica entre 2% e 4%'}</div>
                </div>
                <div class="stat">
                    <div class="stat-label">Salvamentos</div>
                    <div class="stat-value">${UI.compacto(atual.salvamentos)}</div>
                    <div class="stat-foot">o número que mais impressiona marca</div>
                </div>
            </div>

            <div class="toolbar">
                <div>
                    <h2 class="serif" style="font-size:19px">Sua evolução</h2>
                    <p style="margin:2px 0 0;font-size:13px;color:var(--soft)">Atualize uma vez por mês. Leva dois minutos e vale ouro na hora de negociar.</p>
                </div>
                <div style="margin-left:auto"></div>
                <button class="btn" id="nPost" type="button">${UI.icon('mais', 15)} Registrar post</button>
                <button class="btn btn-primary" id="nMes" type="button">${UI.icon('grafico', 15)} Fechar o mês</button>
            </div>

            <div class="grid g2" style="align-items:start;margin-bottom:22px">
                <section class="panel">
                    <div class="panel-head"><h3>Seguidores que você ganhou por mês</h3></div>
                    <div class="panel-body">
                        ${hist.length > 1 ? UI.barras(hist.slice(1).map((h, i) => ({
                            rotulo: UI.data(h.mes + '-01', 'mes').split('/')[0],
                            valor: Math.max(0, (h.seguidores || 0) - (hist[i].seguidores || 0)),
                            suave: i === hist.length - 2
                        })), { formato: 'compacto' }) : UI.vazio('Sem histórico', 'Registre o fechamento de pelo menos dois meses pra ver a evolução.')}
                        <p style="margin:14px 0 0;font-size:12.5px;color:var(--muted)">
                            O total de seguidores está lá em cima. Aqui é o que entrou de novo em cada mês, que é o que mostra se você está crescendo ou parada.
                        </p>
                    </div>
                </section>
                <section class="panel">
                    <div class="panel-head"><h3>Alcance por mês</h3></div>
                    <div class="panel-body">
                        ${hist.length ? UI.barras(hist.map((h, i) => ({
                            rotulo: UI.data(h.mes + '-01', 'mes').split('/')[0],
                            valor: h.alcance,
                            suave: i === hist.length - 1
                        })), { formato: 'compacto' }) : UI.vazio('Sem histórico', 'Registre o fechamento do primeiro mês.')}
                        <p style="margin:14px 0 0;font-size:12.5px;color:var(--muted)">O mês atual aparece mais claro porque ainda não fechou.</p>
                    </div>
                </section>
            </div>

            ${leitura(hist, posts)}

            <section class="section" style="margin-top:22px">
                <div class="section-head">
                    <div>
                        <h2>Seus posts</h2>
                        <p>O que rendeu mais e o que virou parceria. Isso vira argumento na proposta.</p>
                    </div>
                </div>
                <div class="panel">
                    <div class="panel-body flush">
                        ${posts.length ? `
                        <div class="table-wrap">
                            <table class="data">
                                <thead>
                                    <tr>
                                        <th>Post</th>
                                        <th>Formato</th>
                                        <th class="num">Alcance</th>
                                        <th class="num">Salvos</th>
                                        <th class="num">Comentários</th>
                                        <th class="num">Compart.</th>
                                        <th>Rendeu marca?</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${posts.map(p => `
                                        <tr class="clickable" data-post="${p.id}">
                                            <td>
                                                <div class="cell-title">${UI.esc(p.titulo)}</div>
                                                <div class="cell-sub">${UI.data(p.data)}</div>
                                            </td>
                                            <td><span class="pill">${UI.esc(p.formato)}</span></td>
                                            <td class="num">${UI.compacto(p.alcance)}</td>
                                            <td class="num">${UI.numero(p.salvos)}</td>
                                            <td class="num">${UI.numero(p.comentarios)}</td>
                                            <td class="num">${UI.numero(p.compart)}</td>
                                            <td>${p.virouMarca ? '<span class="pill pill-ok">Sim</span>' : '<span class="muted">não</span>'}</td>
                                            <td class="acts"><button class="icon-btn" data-apagar-post="${p.id}" type="button">${UI.icon('lixo', 15)}</button></td>
                                        </tr>`).join('')}
                                </tbody>
                            </table>
                        </div>` : UI.vazio('Nenhum post registrado',
                            'Registre os posts que foram bem. Quando a marca pedir números, você tem prova na mão em vez de printar na correria.')}
                    </div>
                </div>
            </section>
        `;
        ligar();
    }

    /** lê os dados e escreve uma conclusão em português, que é o que a aluna não sabe fazer sozinha */
    function leitura(hist, posts) {
        if (!posts.length) return '';
        const porFormato = {};
        posts.forEach(p => {
            const f = p.formato || 'Outro';
            porFormato[f] = porFormato[f] || { soma: 0, n: 0 };
            porFormato[f].soma += Number(p.alcance || 0);
            porFormato[f].n++;
        });
        const ranking = Object.entries(porFormato)
            .map(([f, d]) => ({ f, media: d.soma / d.n, n: d.n }))
            .sort((a, b) => b.media - a.media);
        const melhor = ranking[0];
        const campeao = posts.slice().sort((a, b) => (b.alcance || 0) - (a.alcance || 0))[0];
        const renderam = posts.filter(p => p.virouMarca);
        const maisSalvo = posts.slice().sort((a, b) => (b.salvos || 0) - (a.salvos || 0))[0];

        return `
            <section class="panel">
                <div class="panel-head"><h3>O que seus números estão dizendo</h3></div>
                <div class="panel-body">
                    <div class="grid g3">
                        <div>
                            <div class="eyebrow">Formato que mais alcança</div>
                            <div class="serif" style="font-size:20px;margin:6px 0 4px">${UI.esc(melhor.f)}</div>
                            <p style="margin:0;font-size:13px;color:var(--soft);line-height:1.55">
                                Média de ${UI.compacto(Math.round(melhor.media))} de alcance em ${melhor.n} ${melhor.n === 1 ? 'post' : 'posts'}. Faça mais desses.
                            </p>
                        </div>
                        <div>
                            <div class="eyebrow">Seu melhor conteúdo</div>
                            <div class="serif" style="font-size:20px;margin:6px 0 4px">${UI.compacto(campeao.alcance)}</div>
                            <p style="margin:0;font-size:13px;color:var(--soft);line-height:1.55">
                                "${UI.esc(campeao.titulo)}". Esse é o print que vai no seu mídia kit.
                            </p>
                        </div>
                        <div>
                            <div class="eyebrow">Conteúdo que trouxe marca</div>
                            <div class="serif" style="font-size:20px;margin:6px 0 4px">${renderam.length} de ${posts.length}</div>
                            <p style="margin:0;font-size:13px;color:var(--soft);line-height:1.55">
                                ${renderam.length ? 'Repare no que eles têm em comum. É esse tipo de post que a marca vê e te chama.' : 'Ainda nenhum. Poste mostrando produto em uso, é o que faz marca te achar.'}
                            </p>
                        </div>
                    </div>
                    ${maisSalvo ? `
                    <div class="note accent" style="margin-top:18px">
                        ${UI.icon('raio')}
                        <div><b>Use isso na próxima proposta:</b> seu post "${UI.esc(maisSalvo.titulo)}" teve ${UI.numero(maisSalvo.salvos)} salvamentos.
                        Salvamento é o número que mais convence marca, porque mostra que a pessoa quer voltar no conteúdo, não que só passou o dedo.</div>
                    </div>` : ''}
                </div>
            </section>`;
    }

    function ligar() {
        raiz.querySelector('#nMes').addEventListener('click', fecharMes);
        raiz.querySelector('#nPost').addEventListener('click', () => editarPost(null));
        raiz.querySelectorAll('[data-post]').forEach(tr => {
            tr.addEventListener('click', e => {
                if (e.target.closest('[data-apagar-post]')) return;
                editarPost(tr.dataset.post);
            });
        });
        raiz.querySelectorAll('[data-apagar-post]').forEach(b => {
            b.addEventListener('click', e => {
                e.stopPropagation();
                Store.remove('postsIg', b.dataset.apagarPost);
                desenhar();
                UI.toast('Post removido');
            });
        });
    }

    function fecharMes() {
        const mesAtual = Store.mes(0);
        const existente = Store.lista('historicoIg').find(h => h.mes === mesAtual) || {};
        UI.modal({
            titulo: 'Fechar ' + UI.MESES[new Date().getMonth()],
            sub: 'Pegue esses números no Instagram em Painel profissional',
            corpo: `
                <div class="field-row">
                    ${UI.campo('Seguidores hoje', UI.input('seguidores', existente.seguidores, 'type="number" min="0"'))}
                    ${UI.campo('Contas alcançadas no mês', UI.input('alcance', existente.alcance, 'type="number" min="0"'))}
                </div>
                <div class="field-row three">
                    ${UI.campo('Engajamento (%)', UI.input('engajamento', existente.engajamento, 'type="number" min="0" step="0.1"'))}
                    ${UI.campo('Posts publicados', UI.input('posts', existente.posts, 'type="number" min="0"'))}
                    ${UI.campo('Salvamentos', UI.input('salvamentos', existente.salvamentos, 'type="number" min="0"'))}
                </div>
                <div class="note info">
                    ${UI.icon('info')}
                    <div>No app do Instagram: toque em <b>Painel profissional</b>, depois em <b>Total de contas alcançadas</b> e troque o período para os últimos 30 dias.</div>
                </div>`,
            rodape: `<button class="btn" data-fechar type="button">Cancelar</button>
                     <button class="btn btn-primary" data-salvar type="button">Salvar o mês</button>`,
            aoAbrir(o) {
                o.querySelector('[data-salvar]').addEventListener('click', () => {
                    const d = UI.lerForm(o.querySelector('.modal-body'));
                    const dados = {
                        mes: mesAtual,
                        seguidores: Number(d.seguidores) || 0,
                        alcance: Number(d.alcance) || 0,
                        engajamento: Number(String(d.engajamento).replace(',', '.')) || 0,
                        posts: Number(d.posts) || 0,
                        salvamentos: Number(d.salvamentos) || 0
                    };
                    const hist = Store.lista('historicoIg');
                    const i = hist.findIndex(h => h.mes === mesAtual);
                    if (i > -1) hist[i] = dados; else hist.push(dados);
                    Store.setPerfil({ seguidores: dados.seguidores });
                    Store.save();
                    UI.fecharModal();
                    UI.toast('Mês registrado');
                    desenhar();
                });
            }
        });
    }

    function editarPost(id) {
        const p = id ? Store.find('postsIg', id) : {
            titulo: '', data: Store.dia(0), formato: 'Reels', alcance: '', salvos: '', comentarios: '', compart: '', virouMarca: false
        };
        UI.modal({
            titulo: id ? 'Editar post' : 'Registrar post',
            sub: 'Vale registrar os que foram bem e os que trouxeram marca',
            largo: true,
            corpo: `
                <div class="field-row">
                    ${UI.campo('Sobre o que era', UI.input('titulo', p.titulo, 'placeholder="Ex: Antes e depois da estante"'))}
                    ${UI.campo('Data', UI.input('data', p.data, 'type="date"'))}
                </div>
                <div class="field-row three">
                    ${UI.campo('Formato', UI.select('formato', ['Reels', 'Carrossel', 'Stories', 'Foto'], p.formato))}
                    ${UI.campo('Alcance', UI.input('alcance', p.alcance, 'type="number" min="0"'))}
                    ${UI.campo('Salvamentos', UI.input('salvos', p.salvos, 'type="number" min="0"'))}
                </div>
                <div class="field-row">
                    ${UI.campo('Comentários', UI.input('comentarios', p.comentarios, 'type="number" min="0"'))}
                    ${UI.campo('Compartilhamentos', UI.input('compart', p.compart, 'type="number" min="0"'))}
                </div>
                <label class="check" style="border:1px solid var(--border);border-radius:var(--r-sm);padding:12px 14px">
                    <input type="checkbox" name="virouMarca" ${p.virouMarca ? 'checked' : ''}>
                    <span class="check-box">${UI.icon('check', 12)}</span>
                    <span class="check-text">Esse post trouxe contato de marca
                        <small>Marque quando alguma marca te chamar depois desse conteúdo. Esse é o post que você mostra pra vender.</small>
                    </span>
                </label>`,
            rodape: `${id ? '<button class="btn btn-danger" data-apagar type="button">Apagar</button>' : ''}
                     <div class="spacer"></div>
                     <button class="btn" data-fechar type="button">Cancelar</button>
                     <button class="btn btn-primary" data-salvar type="button">Salvar</button>`,
            aoAbrir(o) {
                o.querySelector('[data-salvar]').addEventListener('click', () => {
                    const d = UI.lerForm(o.querySelector('.modal-body'));
                    if (!d.titulo) { UI.toast('Escreve sobre o que era o post', 'erro'); return; }
                    ['alcance', 'salvos', 'comentarios', 'compart'].forEach(k => d[k] = Number(d[k]) || 0);
                    if (id) Store.update('postsIg', id, d);
                    else Store.add('postsIg', d);
                    UI.fecharModal();
                    UI.toast('Salvo');
                    desenhar();
                });
                const apagar = o.querySelector('[data-apagar]');
                if (apagar) apagar.addEventListener('click', () => {
                    Store.remove('postsIg', id); UI.fecharModal(); desenhar(); UI.toast('Apagado');
                });
            }
        });
    }

    return {
        titulo: 'Instagram',
        dica: 'Os números que a marca pede antes de fechar',
        render
    };
})();
