/* ==========================================================================
   Mensagens · o texto pronto pra hora que dá branco
   ========================================================================== */

window.Views = window.Views || {};

Views.mensagens = (() => {

    const CATEGORIAS = ['Primeiro contato', 'Follow up', 'Negociação', 'Fechamento', 'Cobrança', 'Pós-entrega'];

    let raiz = null;
    let filtro = 'todas';

    function render(el) {
        raiz = el;
        desenhar();
    }

    function desenhar() {
        const todas = Store.lista('mensagens');
        const visiveis = filtro === 'todas' ? todas : todas.filter(m => m.categoria === filtro);

        raiz.innerHTML = `
            <div class="note accent" style="margin-bottom:20px">
                ${UI.icon('raio')}
                <div><b>Os campos entre colchetes já vêm preenchidos com seus dados</b> quando você copia.
                O que estiver faltando é porque você ainda não preencheu nas configurações.</div>
            </div>

            <div class="toolbar">
                <div class="chips">
                    <button class="chip${filtro === 'todas' ? ' on' : ''}" data-cat="todas" type="button">Todas</button>
                    ${CATEGORIAS.map(c => `<button class="chip${filtro === c ? ' on' : ''}" data-cat="${UI.esc(c)}" type="button">${c}</button>`).join('')}
                </div>
                <div style="margin-left:auto"></div>
                <button class="btn btn-primary" id="msNova" type="button">${UI.icon('mais')} Novo modelo</button>
            </div>

            ${visiveis.length ? `
                <div class="grid g2" style="align-items:start">
                    ${visiveis.map(cartao).join('')}
                </div>` :
                UI.vazio('Nenhum modelo nessa categoria', 'Crie o seu ou volte pra "Todas".')}
        `;
        ligar();
    }

    function cartao(m) {
        const preenchido = preencher(m.texto);
        return `
            <article class="snippet">
                <div class="snippet-head">
                    <div style="flex:1;min-width:0">
                        <span class="pill pill-accent">${UI.esc(m.categoria)}</span>
                        <h4 style="margin-top:7px">${UI.esc(m.titulo)}</h4>
                    </div>
                    <button class="icon-btn" data-editar="${m.id}" title="Editar" type="button">${UI.icon('lapis', 15)}</button>
                    <button class="btn btn-sm btn-primary" data-copiar="${m.id}" type="button">${UI.icon('copiar', 14)} Copiar</button>
                </div>
                <div class="snippet-body">${destacar(preenchido)}</div>
            </article>`;
    }

    /** troca os [CAMPOS] pelos dados dela quando já existem */
    function preencher(texto) {
        const p = Store.get().perfil;
        const mapa = {
            '[SEU NOME]': p.nome,
            '[SEU @]': p.arroba,
            '[SEU NICHO]': p.nicho ? p.nicho.toLowerCase() : '',
            '[SEU WHATSAPP]': p.whatsapp,
            '[SEU EMAIL]': p.email,
            '[X] mil seguidores': p.seguidores ? UI.compacto(p.seguidores) + ' seguidores' : '',
            '[MÊS]': UI.MESES[new Date().getMonth()]
        };
        let saida = texto;
        Object.entries(mapa).forEach(([k, v]) => {
            if (v) saida = saida.split(k).join(v);
        });
        return saida;
    }

    const destacar = texto => UI.esc(texto).replace(/\[([^\]]+)\]/g, '<span class="ph">[$1]</span>');

    function ligar() {
        raiz.querySelectorAll('[data-cat]').forEach(b => {
            b.addEventListener('click', () => { filtro = b.dataset.cat; desenhar(); });
        });
        raiz.querySelector('#msNova').addEventListener('click', () => editar(null));

        raiz.querySelectorAll('[data-copiar]').forEach(b => {
            b.addEventListener('click', () => {
                const m = Store.find('mensagens', b.dataset.copiar);
                UI.copiar(preencher(m.texto), 'Copiado. Agora troca o que está entre colchetes');
            });
        });
        raiz.querySelectorAll('[data-editar]').forEach(b => {
            b.addEventListener('click', () => editar(b.dataset.editar));
        });
    }

    function editar(id) {
        const m = id ? Store.find('mensagens', id) : { categoria: 'Primeiro contato', titulo: '', texto: '' };
        UI.modal({
            titulo: id ? 'Editar modelo' : 'Novo modelo',
            sub: 'Use [COLCHETES] no que muda a cada marca',
            largo: true,
            corpo: `
                <div class="field-row">
                    ${UI.campo('Quando usar', UI.select('categoria', CATEGORIAS, m.categoria))}
                    ${UI.campo('Nome do modelo', UI.input('titulo', m.titulo, 'placeholder="Ex: Cobrar retorno sem parecer chata"'))}
                </div>
                ${UI.campo('Texto', UI.textarea('texto', m.texto, 'style="min-height:240px;line-height:1.65"'),
                    'Dica: [SEU NOME], [SEU @], [SEU NICHO], [SEU WHATSAPP] e [MÊS] são preenchidos sozinhos quando você copia.')}`,
            rodape: `
                ${id ? `<button class="btn btn-danger" data-apagar type="button">${UI.icon('lixo', 15)} Apagar</button>` : ''}
                <div class="spacer"></div>
                <button class="btn" data-fechar type="button">Cancelar</button>
                <button class="btn btn-primary" data-salvar type="button">Salvar</button>`,
            aoAbrir(o) {
                o.querySelector('[data-salvar]').addEventListener('click', () => {
                    const d = UI.lerForm(o.querySelector('.modal-body'));
                    if (!d.titulo || !d.texto) { UI.toast('Falta o nome ou o texto', 'erro'); return; }
                    if (id) Store.update('mensagens', id, d);
                    else Store.add('mensagens', d);
                    UI.fecharModal();
                    UI.toast('Salvo');
                    desenhar();
                });
                const apagar = o.querySelector('[data-apagar]');
                if (apagar) apagar.addEventListener('click', () => {
                    UI.fecharModal();
                    UI.confirmar({
                        titulo: 'Apagar esse modelo?', texto: 'Não dá pra desfazer.',
                        aoConfirmar() { Store.remove('mensagens', id); desenhar(); UI.toast('Apagado'); }
                    });
                });
            }
        });
    }

    return {
        titulo: 'Mensagens',
        dica: 'Texto pronto pra hora que dá branco',
        render
    };
})();
