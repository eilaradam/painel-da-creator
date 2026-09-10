/* ==========================================================================
   App · navegação e cola de tudo
   ========================================================================== */

const App = (() => {

    const ABAS = [
        { id: 'inicio', grupo: '', icone: 'casa', emoji: '👋', view: () => Views.inicio },
        { id: 'marcas', grupo: 'O dinheiro', icone: 'marcas', emoji: '🤝', view: () => Views.marcas },
        { id: 'propostas', grupo: '', icone: 'proposta', emoji: '📄', view: () => Views.propostas },
        { id: 'entregas', grupo: '', icone: 'entrega', emoji: '📦', view: () => Views.entregas },
        { id: 'financeiro', grupo: '', icone: 'dinheiro', emoji: '💰', view: () => Views.financeiro },
        { id: 'conteudo', grupo: 'O conteúdo', icone: 'video', emoji: '🎬', view: () => Views.conteudo },
        { id: 'numeros', grupo: '', icone: 'grafico', emoji: '📈', view: () => Views.numeros },
        { id: 'checklist', grupo: '', icone: 'check', emoji: '✅', view: () => Views.checklist },
        { id: 'mensagens', grupo: 'Apoio', icone: 'chat', emoji: '💬', view: () => Views.mensagens },
        { id: 'config', grupo: '', icone: 'config', emoji: '⚙️', view: () => Views.config }
    ];

    let atual = 'inicio';

    /* ---------- montagem ---------- */
    function iniciar() {
        Store.load();
        montarSidebar();
        atualizarPerfil();

        window.addEventListener('hashchange', () => {
            const alvo = location.hash.replace('#', '');
            if (alvo && alvo !== atual) ir(alvo, true);
        });

        document.getElementById('menuBtn').addEventListener('click', () => {
            document.body.classList.toggle('nav-open');
        });
        document.getElementById('scrim').addEventListener('click', () => {
            document.body.classList.remove('nav-open');
        });

        tiquetaque();
        setInterval(tiquetaque, 20000);

        document.getElementById('barraUrgente').addEventListener('click', () => ir('marcas'));

        const inicial = location.hash.replace('#', '');
        ir(ABAS.some(a => a.id === inicial) ? inicial : 'inicio', true);
    }

    /* ---------- relógio do topo ---------- */
    function tiquetaque() {
        const t = UI.agoraTexto();
        const d = document.getElementById('relogioData');
        const h = document.getElementById('relogioHora');
        if (d) d.textContent = t.data;
        if (h) h.textContent = t.hora;
    }

    /* ---------- barra vermelha do topo: só aparece quando algo venceu ---------- */
    function atualizarUrgente() {
        const barra = document.getElementById('barraUrgente');
        if (!barra) return;

        const marcas = Store.lista('marcas').filter(m =>
            !['pago', 'perdida'].includes(m.status) && m.prazoRetorno && (UI.emDias(m.prazoRetorno) ?? 99) < 0);
        const entregas = Store.lista('entregas').filter(e =>
            e.status !== 'aprovado' && e.prazo && (UI.emDias(e.prazo) ?? 99) < 0);
        const grana = Store.lista('lancamentos').filter(l =>
            l.tipo === 'entrada' && l.status === 'previsto' && (UI.emDias(l.data) ?? 99) < 0);

        const partes = [];
        if (marcas.length) partes.push(`<span class="num">${marcas.length}</span> ${marcas.length === 1 ? 'marca esperando retorno' : 'marcas esperando retorno'}`);
        if (entregas.length) partes.push(`<span class="num">${entregas.length}</span> ${entregas.length === 1 ? 'entrega atrasada' : 'entregas atrasadas'}`);
        if (grana.length) partes.push(`<span class="num">${UI.brl(grana.reduce((t, l) => t + Number(l.valor || 0), 0))}</span> atrasados pra receber`);

        barra.hidden = !partes.length;
        if (partes.length) {
            barra.innerHTML = '<b>Precisa de você hoje</b>' +
                partes.map(p => '<span>' + p + '</span>').join('<span class="estrela"></span>');
        }
    }

    function montarSidebar() {
        const nav = document.getElementById('nav');
        let html = '';
        ABAS.forEach(a => {
            if (a.grupo) html += `<div class="nav-label">${a.grupo}</div>`;
            html += `
                <button class="nav-item" data-aba="${a.id}" type="button">
                    ${UI.icon(a.icone)}
                    <span>${a.view().titulo}</span>
                    <span class="nav-badge" data-badge="${a.id}" hidden></span>
                </button>`;
        });
        nav.innerHTML = html;

        nav.querySelectorAll('[data-aba]').forEach(b => {
            b.addEventListener('click', () => ir(b.dataset.aba));
        });
    }

    /* ---------- navegação ---------- */
    function ir(id, semHash) {
        const aba = ABAS.find(a => a.id === id);
        if (!aba) return;
        atual = id;
        if (!semHash) location.hash = id;
        else if (location.hash.replace('#', '') !== id) history.replaceState(null, '', '#' + id);

        document.querySelectorAll('[data-aba]').forEach(b => {
            b.classList.toggle('active', b.dataset.aba === id);
        });

        const v = aba.view();
        document.getElementById('pageTitle').innerHTML =
            `<span class="page-emoji">${aba.emoji}</span>${UI.esc(v.titulo)}`;
        document.getElementById('pageHint').textContent = v.dica || '';

        const palco = document.getElementById('view');
        palco.innerHTML = '';
        palco.className = 'view';
        v.render(palco);

        document.body.classList.remove('nav-open');
        window.scrollTo({ top: 0 });
        atualizarBadges();
        atualizarUrgente();
    }

    /* ---------- avisos na lateral ---------- */
    function atualizarBadges() {
        const conta = {
            marcas: Store.lista('marcas').filter(m =>
                !['pago', 'perdida'].includes(m.status) && m.prazoRetorno && (UI.emDias(m.prazoRetorno) ?? 99) <= 0).length,
            entregas: Store.lista('entregas').filter(e =>
                e.status !== 'aprovado' && e.prazo && (UI.emDias(e.prazo) ?? 99) <= 1).length,
            propostas: Store.lista('propostas').filter(p =>
                p.status === 'enviada' && p.enviadaEm && Math.abs(UI.emDias(p.enviadaEm) || 0) >= 4).length,
            financeiro: Store.lista('lancamentos').filter(l =>
                l.tipo === 'entrada' && l.status === 'previsto' && (UI.emDias(l.data) ?? 99) < 0).length
        };

        document.querySelectorAll('[data-badge]').forEach(el => {
            const n = conta[el.dataset.badge] || 0;
            el.textContent = n;
            el.hidden = !n;
        });
    }

    function atualizarPerfil() {
        const p = Store.get().perfil;
        document.getElementById('meNome').textContent = p.nome || 'Sua conta';
        document.getElementById('meArroba').textContent = p.arroba || 'preencha seus dados';
        document.getElementById('meAvatar').textContent = UI.iniciais(p.nome || 'C');
    }

    function recarregar() {
        atualizarPerfil();
        ir(atual, true);
    }

    return { iniciar, ir, atualizarBadges, atualizarPerfil, atualizarUrgente, recarregar, ABAS };
})();

document.addEventListener('DOMContentLoaded', App.iniciar);
