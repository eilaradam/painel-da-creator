/* ==========================================================================
   UI · pecinhas que todas as abas usam
   ========================================================================== */

const UI = (() => {

    /* ---------- ícones (traço, 24x24) ---------- */
    const P = {
        casa: '<path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
        marcas: '<path d="M20.6 12.6 12 21.2l-8.6-8.6A5 5 0 1 1 12 6.1a5 5 0 1 1 8.6 6.5z"/>',
        proposta: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',
        entrega: '<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
        video: '<polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/>',
        grafico: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
        dinheiro: '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
        check: '<polyline points="20 6 9 17 4 12"/>',
        chat: '<path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z"/>',
        config: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
        mais: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
        busca: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
        lapis: '<path d="M17 3a2.8 2.8 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z"/>',
        lixo: '<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
        copiar: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
        x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
        menu: '<line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>',
        alerta: '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
        info: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
        relogio: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
        calendario: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
        seta: '<polyline points="6 9 12 15 18 9"/>',
        setaDir: '<polyline points="9 18 15 12 9 6"/>',
        baixar: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
        subir: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>',
        estrela: '<polygon points="12 2 15.1 8.3 22 9.3 17 14.1 18.2 21 12 17.8 5.8 21 7 14.1 2 9.3 8.9 8.3 12 2"/>',
        usuario: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
        vazio: '<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.5 5.5 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.5-6.5A2 2 0 0 0 16.7 4H7.3a2 2 0 0 0-1.8 1.5z"/>',
        link: '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
        imprimir: '<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
        raio: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
        livro: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>'
    };

    function icon(nome, tamanho) {
        const d = P[nome] || P.info;
        const s = tamanho ? ` width="${tamanho}" height="${tamanho}"` : '';
        return `<svg${s} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
    }

    /* ---------- formatação ---------- */
    const brl = v => (Number(v) || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
    const brlExato = v => (Number(v) || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 });
    const numero = v => (Number(v) || 0).toLocaleString('pt-BR');

    function compacto(v) {
        const n = Number(v) || 0;
        if (n >= 1000000) return (n / 1000000).toFixed(1).replace('.0', '').replace('.', ',') + ' mi';
        if (n >= 1000) return (n / 1000).toFixed(1).replace('.0', '').replace('.', ',') + ' mil';
        return String(n);
    }

    const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
    const MESES_CURTO = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

    function data(iso, formato) {
        if (!iso) return '';
        const [a, m, d] = String(iso).slice(0, 10).split('-').map(Number);
        if (!a || !m) return '';
        if (formato === 'longo') return `${d} de ${MESES[m - 1]}`;
        if (formato === 'mes') return `${MESES_CURTO[m - 1]}/${String(a).slice(2)}`;
        return `${String(d).padStart(2, '0')}/${String(m).padStart(2, '0')}`;
    }

    /** diferença em dias entre hoje e uma data ISO (negativo = passou) */
    function emDias(iso) {
        if (!iso) return null;
        const [a, m, d] = String(iso).slice(0, 10).split('-').map(Number);
        if (!a || !m || !d) return null;
        const hoje = new Date(); hoje.setHours(0, 0, 0, 0);
        const alvo = new Date(a, m - 1, d);   // meia-noite local, igual ao hoje
        return Math.round((alvo - hoje) / 86400000);
    }

    /** "hoje", "amanhã", "atrasado 3 dias", "em 5 dias" */
    function prazoTexto(iso) {
        const d = emDias(iso);
        if (d === null) return { texto: 'sem prazo', tom: '' };
        if (d < -1) return { texto: `atrasado ${Math.abs(d)} dias`, tom: 'danger' };
        if (d === -1) return { texto: 'atrasado 1 dia', tom: 'danger' };
        if (d === 0) return { texto: 'hoje', tom: 'warn' };
        if (d === 1) return { texto: 'amanhã', tom: 'warn' };
        if (d <= 3) return { texto: `em ${d} dias`, tom: 'warn' };
        return { texto: `em ${d} dias`, tom: '' };
    }

    const esc = s => String(s == null ? '' : s)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

    const iniciais = nome => String(nome || '?').trim().split(/\s+/).slice(0, 2).map(p => p[0]).join('').toUpperCase();

    /* ---------- avisos ---------- */
    function toast(msg, tipo) {
        let caixa = document.querySelector('.toasts');
        if (!caixa) {
            caixa = document.createElement('div');
            caixa.className = 'toasts';
            document.body.appendChild(caixa);
        }
        const el = document.createElement('div');
        el.className = 'toast';
        el.innerHTML = icon(tipo === 'erro' ? 'alerta' : 'check', 16) + '<span>' + esc(msg) + '</span>';
        caixa.appendChild(el);
        setTimeout(() => {
            el.classList.add('out');
            setTimeout(() => el.remove(), 220);
        }, 2600);
    }

    /* ---------- modal ---------- */
    let aoFechar = null;

    function modal({ titulo, sub, corpo, rodape, largo, aoAbrir }) {
        fecharModal();
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        overlay.innerHTML = `
            <div class="modal${largo ? ' wide' : ''}" role="dialog" aria-modal="true" aria-label="${esc(titulo)}">
                <div class="modal-head">
                    <div style="flex:1">
                        <h3>${esc(titulo)}</h3>
                        ${sub ? `<p>${esc(sub)}</p>` : ''}
                    </div>
                    <button class="icon-btn" data-fechar type="button" aria-label="Fechar">${icon('x', 18)}</button>
                </div>
                <div class="modal-body">${corpo || ''}</div>
                ${rodape ? `<div class="modal-foot">${rodape}</div>` : ''}
            </div>`;
        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';

        overlay.addEventListener('click', e => {
            if (e.target === overlay || e.target.closest('[data-fechar]')) fecharModal();
        });
        aoFechar = () => { document.body.style.overflow = ''; };

        const primeiro = overlay.querySelector('input, textarea, select');
        if (primeiro) setTimeout(() => primeiro.focus(), 60);
        if (aoAbrir) aoAbrir(overlay);
        return overlay;
    }

    function fecharModal() {
        const o = document.querySelector('.overlay');
        if (o) o.remove();
        if (aoFechar) { aoFechar(); aoFechar = null; }
    }

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') fecharModal();
    });

    /** confirma antes de apagar */
    function confirmar({ titulo, texto, botao = 'Apagar', aoConfirmar }) {
        modal({
            titulo,
            corpo: `<p style="margin:0;font-size:14.5px;line-height:1.6;color:var(--soft)">${esc(texto)}</p>`,
            rodape: `<button class="btn" data-fechar type="button">Cancelar</button>
                     <button class="btn btn-primary" data-ok type="button">${esc(botao)}</button>`,
            aoAbrir(o) {
                o.querySelector('[data-ok]').addEventListener('click', () => {
                    fecharModal();
                    aoConfirmar();
                });
            }
        });
    }

    /* ---------- copiar ---------- */
    function copiar(texto, aviso = 'Copiado!') {
        const feito = () => toast(aviso);
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(texto).then(feito).catch(() => copiarFallback(texto, feito));
        } else {
            copiarFallback(texto, feito);
        }
    }
    function copiarFallback(texto, feito) {
        const ta = document.createElement('textarea');
        ta.value = texto;
        ta.style.cssText = 'position:fixed;opacity:0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); feito(); }
        catch (e) { toast('Não consegui copiar, seleciona o texto com a mão', 'erro'); }
        ta.remove();
    }

    /* ---------- vazio ---------- */
    function vazio(titulo, texto, botao, emoji) {
        return `<div class="empty">
            ${emoji ? `<span class="empty-emoji">${emoji}</span>` : icon('vazio')}
            <h4>${esc(titulo)}</h4>
            <p>${esc(texto)}</p>
            ${botao || ''}
        </div>`;
    }

    /* ---------- barras ---------- */
    function barras(itens, { formato = 'brl', altura = 168 } = {}) {
        const max = Math.max(...itens.map(i => i.valor), 1);
        const fmt = v => formato === 'brl' ? brl(v) : compacto(v);
        return `<div class="bars" style="height:${altura}px">
            ${itens.map(i => `
                <div class="bar-col">
                    <div class="bar-value">${i.valor ? fmt(i.valor) : ''}</div>
                    <div class="bar${i.suave ? ' soft' : ''}" style="height:${Math.max(2, (i.valor / max) * 100)}%" title="${esc(i.rotulo)}: ${fmt(i.valor)}"></div>
                    <div class="bar-label">${esc(i.rotulo)}</div>
                </div>`).join('')}
        </div>`;
    }

    /* ---------- campos de formulário ---------- */
    const campo = (label, html, ajuda) => `
        <div class="field">
            <label>${esc(label)}</label>
            ${html}
            ${ajuda ? `<div class="help">${esc(ajuda)}</div>` : ''}
        </div>`;

    const input = (nome, valor = '', extra = '') => `<input class="input" name="${nome}" value="${esc(valor)}" ${extra}>`;
    const textarea = (nome, valor = '', extra = '') => `<textarea class="textarea" name="${nome}" ${extra}>${esc(valor)}</textarea>`;
    const select = (nome, opcoes, valor) => `<select class="select" name="${nome}">${opcoes.map(o => {
        const v = o.v !== undefined ? o.v : o;
        const t = o.t !== undefined ? o.t : o;
        return `<option value="${esc(v)}"${v === valor ? ' selected' : ''}>${esc(t)}</option>`;
    }).join('')}</select>`;

    /** lê um formulário dentro de um elemento e devolve objeto */
    function lerForm(escopo) {
        const dados = {};
        escopo.querySelectorAll('[name]').forEach(el => {
            dados[el.name] = el.type === 'checkbox' ? el.checked : el.value.trim();
        });
        return dados;
    }

    /* ---------- data e hora por extenso ---------- */
    const DIAS_SEMANA = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];

    function agoraTexto() {
        const d = new Date();
        return {
            data: `${DIAS_SEMANA[d.getDay()]}, ${d.getDate()} de ${MESES_CURTO[d.getMonth()]}`,
            hora: String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0')
        };
    }

    /** quanto do mês já passou, de 0 a 1 */
    function quantoDoMes() {
        const d = new Date();
        const noMes = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
        return d.getDate() / noMes;
    }

    /* ---------- comemoração ---------- */
    const CORES_CONFETE = ['#CC7C5E', '#9C563B', '#BE3A22', '#FEF7CF', '#4B7A50', '#09090B'];

    function confete() {
        const tela = document.getElementById('confete');
        if (!tela) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const ctx = tela.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        tela.width = window.innerWidth * dpr;
        tela.height = window.innerHeight * dpr;
        tela.style.width = window.innerWidth + 'px';
        tela.style.height = window.innerHeight + 'px';
        ctx.scale(dpr, dpr);

        const pecas = Array.from({ length: 90 }, () => ({
            x: window.innerWidth / 2 + (Math.random() - 0.5) * 260,
            y: window.innerHeight * 0.32 + (Math.random() - 0.5) * 90,
            vx: (Math.random() - 0.5) * 9,
            vy: Math.random() * -11 - 3,
            giro: Math.random() * Math.PI,
            vgiro: (Math.random() - 0.5) * 0.24,
            lado: 5 + Math.random() * 6,
            cor: CORES_CONFETE[Math.floor(Math.random() * CORES_CONFETE.length)]
        }));

        let quadros = 0;
        (function anima() {
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            pecas.forEach(p => {
                p.vy += 0.36;              // gravidade
                p.vx *= 0.995;
                p.x += p.vx;
                p.y += p.vy;
                p.giro += p.vgiro;
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.giro);
                ctx.fillStyle = p.cor;
                ctx.fillRect(-p.lado / 2, -p.lado / 2, p.lado, p.lado * 0.62);
                ctx.restore();
            });
            quadros++;
            if (quadros < 150) requestAnimationFrame(anima);
            else ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        })();
    }

    return {
        icon, brl, brlExato, numero, compacto, data, emDias, prazoTexto, esc, iniciais,
        toast, modal, fecharModal, confirmar, copiar, vazio, barras,
        campo, input, textarea, select, lerForm,
        agoraTexto, quantoDoMes, confete,
        MESES, MESES_CURTO
    };
})();
