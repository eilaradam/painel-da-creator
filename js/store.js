/* ==========================================================================
   Store · guarda tudo no navegador da creator (localStorage)
   Nada sai do computador dela. O backup é um arquivo .json que ela baixa.
   ========================================================================== */

const Store = (() => {
    const KEY = 'painel-da-creator:v1';
    let state = null;

    /* ---------- utilidades ---------- */
    const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

    /** data ISO (YYYY-MM-DD) deslocada em dias a partir de hoje */
    const dia = (offset = 0) => {
        const d = new Date();
        d.setHours(12, 0, 0, 0);
        d.setDate(d.getDate() + offset);
        return d.toISOString().slice(0, 10);
    };

    /** mês ISO (YYYY-MM) deslocado em meses a partir deste */
    const mes = (offset = 0) => {
        const d = new Date();
        d.setDate(1);
        d.setMonth(d.getMonth() + offset);
        return d.toISOString().slice(0, 7);
    };

    /* ---------- ciclo de vida ---------- */
    function load() {
        try {
            const cru = localStorage.getItem(KEY);
            if (cru) {
                state = JSON.parse(cru);
                migrar();
                return state;
            }
        } catch (e) {
            console.warn('[store] não consegui ler o que estava salvo, começando do exemplo', e);
        }
        state = Seed.criar({ uid, dia, mes });
        save();
        return state;
    }

    /** garante que dados salvos por versões antigas não quebrem a tela */
    function migrar() {
        // se ela ainda está só olhando o exemplo, atualiza pro exemplo mais novo
        if (state.exemplo && state.versao !== Seed.VERSAO) {
            state = Seed.criar({ uid, dia, mes });
            return;
        }
        const vazio = Seed.vazio({ uid, dia, mes });
        Object.keys(vazio).forEach(k => {
            if (state[k] === undefined) state[k] = vazio[k];
        });
        if (!state.perfil) state.perfil = vazio.perfil;
        Object.keys(vazio.perfil).forEach(k => {
            if (state.perfil[k] === undefined) state.perfil[k] = vazio.perfil[k];
        });
    }

    function save() {
        try {
            localStorage.setItem(KEY, JSON.stringify(state));
        } catch (e) {
            console.error('[store] não consegui salvar', e);
            if (window.UI) UI.toast('Não consegui salvar. O navegador pode estar sem espaço.', 'erro');
        }
    }

    const get = () => state;

    /* ---------- coleções ---------- */
    function lista(nome) {
        if (!Array.isArray(state[nome])) state[nome] = [];
        return state[nome];
    }

    function add(nome, item) {
        const novo = Object.assign({ id: uid(), criadoEm: new Date().toISOString() }, item);
        lista(nome).unshift(novo);
        save();
        return novo;
    }

    function update(nome, id, campos) {
        const item = lista(nome).find(x => x.id === id);
        if (!item) return null;
        Object.assign(item, campos);
        save();
        return item;
    }

    function remove(nome, id) {
        const arr = lista(nome);
        const i = arr.findIndex(x => x.id === id);
        if (i > -1) { arr.splice(i, 1); save(); }
    }

    const find = (nome, id) => lista(nome).find(x => x.id === id) || null;

    /* ---------- perfil ---------- */
    function setPerfil(campos) {
        Object.assign(state.perfil, campos);
        save();
    }

    /* ---------- checklists (marcações soltas por chave) ---------- */
    function marcado(chave) {
        return !!(state.marcacoes && state.marcacoes[chave]);
    }
    function marcar(chave, valor) {
        if (!state.marcacoes) state.marcacoes = {};
        if (valor) state.marcacoes[chave] = true;
        else delete state.marcacoes[chave];
        save();
    }

    /* ---------- backup ---------- */
    function exportar() {
        const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'painel-da-creator-' + dia() + '.json';
        a.click();
        setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    }

    function importar(arquivo) {
        return new Promise((resolve, reject) => {
            const leitor = new FileReader();
            leitor.onload = () => {
                try {
                    const dados = JSON.parse(leitor.result);
                    if (!dados || typeof dados !== 'object' || !dados.perfil) {
                        throw new Error('arquivo fora do formato');
                    }
                    state = dados;
                    migrar();
                    save();
                    resolve(state);
                } catch (e) { reject(e); }
            };
            leitor.onerror = () => reject(leitor.error);
            leitor.readAsText(arquivo);
        });
    }

    function restaurarExemplo() {
        state = Seed.criar({ uid, dia, mes });
        save();
    }

    function zerar() {
        state = Seed.vazio({ uid, dia, mes });
        save();
    }

    return {
        load, save, get, lista, add, update, remove, find,
        setPerfil, marcado, marcar,
        exportar, importar, restaurarExemplo, zerar,
        uid, dia, mes
    };
})();
