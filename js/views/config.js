/* ==========================================================================
   Configurações · seus dados, sua tabela e o backup
   ========================================================================== */

window.Views = window.Views || {};

Views.config = (() => {

    let raiz = null;

    function render(el) {
        raiz = el;
        desenhar();
    }

    function desenhar() {
        const p = Store.get().perfil;
        const c = p.cache || {};
        const s = Store.get();
        const totalItens = ['marcas', 'propostas', 'entregas', 'conteudos', 'lancamentos', 'postsIg']
            .reduce((t, k) => t + Store.lista(k).length, 0);
        const local = location.protocol === 'file:';   // rodando do computador dela

        raiz.innerHTML = `
            <div class="grid g2" style="align-items:start">
                <section class="panel">
                    <div class="panel-head"><h3>Quem é você</h3></div>
                    <div class="panel-body">
                        <div class="field-row">
                            ${UI.campo('Seu nome', UI.input('nome', p.nome, 'placeholder="Como as marcas te chamam"'))}
                            ${UI.campo('Seu @', UI.input('arroba', p.arroba, 'placeholder="@seuperfil"'))}
                        </div>
                        <div class="field-row">
                            ${UI.campo('Seu nicho', UI.input('nicho', p.nicho, 'placeholder="Ex: Beleza e casa"'))}
                            ${UI.campo('Cidade', UI.input('cidade', p.cidade, 'placeholder="São Paulo, SP"'))}
                        </div>
                        <div class="field-row">
                            ${UI.campo('E-mail de trabalho', UI.input('email', p.email, 'type="email"'))}
                            ${UI.campo('WhatsApp', UI.input('whatsapp', p.whatsapp, 'placeholder="(11) 99999-9999"'))}
                        </div>
                        ${UI.campo('Uma frase sobre o seu trabalho', UI.textarea('bio', p.bio, 'style="min-height:70px" placeholder="O que você faz e pra quem"'),
                            'Isso aparece na sua proposta. Escreva como você fala, não como currículo.')}
                        <div class="field-row">
                            ${UI.campo('Seguidores', UI.input('seguidores', p.seguidores, 'type="number" min="0"'))}
                            ${UI.campo('Meta de faturamento por mês', UI.input('metaMes', p.metaMes, 'type="number" min="0" step="100"'),
                                'Um número honesto. É ele que mede seu mês.')}
                        </div>
                        <button class="btn btn-primary" id="cfSalvar" type="button">Salvar meus dados</button>
                    </div>
                </section>

                <div>
                    <section class="panel" style="margin-bottom:16px">
                        <div class="panel-head"><h3>Minha tabela de preços</h3></div>
                        <div class="panel-body">
                            <p style="margin:0 0 16px;font-size:13.5px;color:var(--soft);line-height:1.6">
                                Esses valores viram sugestão automática quando você monta uma proposta.
                                Ter tabela é o que faz você parar de responder "quanto você paga?" e passar a dizer o seu número.
                            </p>
                            <div class="field-row">
                                ${UI.campo('1 Reels', UI.input('reels', c.reels, 'type="number" min="0" step="50"'))}
                                ${UI.campo('Sequência de stories', UI.input('stories', c.stories, 'type="number" min="0" step="50"'))}
                            </div>
                            <div class="field-row">
                                ${UI.campo('Pacote de fotos', UI.input('foto', c.foto, 'type="number" min="0" step="50"'))}
                                ${UI.campo('Combo reels + stories', UI.input('combo', c.combo, 'type="number" min="0" step="50"'))}
                            </div>
                            <div class="field-row">
                                ${UI.campo('Exclusividade', UI.input('exclusividade', c.exclusividade, 'type="number" min="0"'), '% a mais')}
                                ${UI.campo('Permissão de anúncio', UI.input('permissaoAds', c.permissaoAds, 'type="number" min="0"'), '% a mais')}
                            </div>
                            <button class="btn btn-primary" id="cfPreco" type="button">Salvar tabela</button>
                        </div>
                    </section>

                    ${local ? `
                    <section class="panel" style="margin-bottom:16px">
                        <div class="panel-body">
                            <div class="note ok" style="margin:0">
                                ${UI.icon('check')}
                                <div><b>Você está usando a sua cópia instalada.</b> O painel está rodando direto do seu computador,
                                então funciona mesmo sem internet. Só os vídeos das referências precisam de conexão.</div>
                            </div>
                        </div>
                    </section>` : `
                    <section class="panel" style="margin-bottom:16px">
                        <div class="panel-head"><h3>💻 Levar o painel pro seu computador</h3></div>
                        <div class="panel-body">
                            <p style="margin:0 0 15px;font-size:13.5px;color:var(--soft);line-height:1.6">
                                Baixe o painel como um arquivo só. Salve na área de trabalho, dê dois cliques e ele abre no navegador,
                                funcionando igualzinho e sem depender de internet.
                            </p>
                            <button class="btn btn-primary" id="cfBaixarApp" type="button">${UI.icon('baixar', 15)} Baixar o meu painel</button>
                            <p style="margin:12px 0 0;font-size:12.5px;color:var(--muted);line-height:1.5">
                                Atenção: a cópia baixada guarda os dados dela separados desta página. Escolha um lugar e use sempre o mesmo.
                            </p>
                        </div>
                    </section>`}

                    <section class="panel">
                        <div class="panel-head"><h3>Seus dados e backup</h3></div>
                        <div class="panel-body">
                            <div class="note info" style="margin-bottom:16px">
                                ${UI.icon('info')}
                                <div>Tudo que você digita fica salvo <b>só neste navegador, neste computador</b>.
                                Nada é enviado pra lugar nenhum. Se você limpar o histórico do navegador ou trocar de máquina, os dados somem.
                                Por isso: <b>baixe um backup de vez em quando</b>.</div>
                            </div>

                            <div style="display:flex;gap:9px;flex-wrap:wrap;margin-bottom:18px">
                                <button class="btn btn-primary" id="cfExportar" type="button">${UI.icon('baixar', 15)} Baixar backup</button>
                                <button class="btn" id="cfImportar" type="button">${UI.icon('subir', 15)} Restaurar de um backup</button>
                                <input type="file" id="cfArquivo" accept="application/json,.json" style="display:none">
                            </div>

                            <div style="padding-top:16px;border-top:1px solid var(--border)">
                                <div class="eyebrow" style="margin-bottom:8px">O que você já tem aqui dentro</div>
                                <div style="display:flex;gap:16px;flex-wrap:wrap;font-size:13.5px;color:var(--soft)">
                                    <span><b style="color:var(--ink)">${Store.lista('marcas').length}</b> marcas</span>
                                    <span><b style="color:var(--ink)">${Store.lista('propostas').length}</b> propostas</span>
                                    <span><b style="color:var(--ink)">${Store.lista('entregas').length}</b> entregas</span>
                                    <span><b style="color:var(--ink)">${Store.lista('conteudos').length}</b> conteúdos</span>
                                    <span><b style="color:var(--ink)">${Store.lista('lancamentos').length}</b> lançamentos</span>
                                </div>
                            </div>

                            ${s.exemplo ? `
                                <div class="note" style="margin-top:18px">
                                    ${UI.icon('alerta')}
                                    <div><b>Você está vendo o painel de exemplo.</b> Os dados da Manu Ribeiro são fictícios, só pra você entender como cada tela funciona.
                                    Quando estiver pronta, limpe tudo e comece com os seus.</div>
                                </div>` : ''}

                            <div style="display:flex;gap:9px;flex-wrap:wrap;margin-top:18px;padding-top:16px;border-top:1px solid var(--border)">
                                <button class="btn" id="cfExemplo" type="button">Recarregar o exemplo</button>
                                <button class="btn btn-danger" id="cfZerar" type="button">${UI.icon('lixo', 15)} Limpar tudo e começar do zero</button>
                            </div>
                            <p style="margin:12px 0 0;font-size:12.5px;color:var(--muted);line-height:1.55">
                                ${totalItens} registros no total. Limpar apaga tudo e não tem volta, então baixe o backup antes.
                            </p>
                        </div>
                    </section>
                </div>
            </div>`;
        ligar();
    }

    function ligar() {
        raiz.querySelector('#cfSalvar').addEventListener('click', () => {
            const box = raiz.querySelector('.panel');
            const d = UI.lerForm(box);
            Store.setPerfil({
                nome: d.nome, arroba: d.arroba, nicho: d.nicho, cidade: d.cidade,
                email: d.email, whatsapp: d.whatsapp, bio: d.bio,
                seguidores: Number(d.seguidores) || 0,
                metaMes: Number(d.metaMes) || 0
            });
            UI.toast('Seus dados foram salvos');
            App.atualizarPerfil();
        });

        raiz.querySelector('#cfPreco').addEventListener('click', () => {
            const d = {};
            ['reels', 'stories', 'foto', 'combo', 'exclusividade', 'permissaoAds'].forEach(k => {
                const el = raiz.querySelector(`[name="${k}"]`);
                d[k] = Number(el ? el.value : 0) || 0;
            });
            Store.setPerfil({ cache: d });
            UI.toast('Tabela salva');
        });

        const baixarApp = raiz.querySelector('#cfBaixarApp');
        if (baixarApp) baixarApp.addEventListener('click', async () => {
            baixarApp.disabled = true;
            baixarApp.textContent = 'Baixando...';
            try {
                const r = await fetch('Painel-da-Creator.html', { cache: 'no-store' });
                if (!r.ok) throw new Error(r.status);
                const html = await r.text();
                const a = document.createElement('a');
                a.href = URL.createObjectURL(new Blob([html], { type: 'text/html' }));
                a.download = 'Painel da Creator.html';
                a.click();
                setTimeout(() => URL.revokeObjectURL(a.href), 3000);
                UI.toast('Pronto! Salve na área de trabalho e dê dois cliques pra abrir');
            } catch (e) {
                UI.toast('Não consegui baixar agora, tenta de novo', 'erro');
            }
            desenhar();
        });

        raiz.querySelector('#cfExportar').addEventListener('click', () => {
            Store.exportar();
            UI.toast('Backup baixado. Guarde no Drive ou mande pra você mesma no WhatsApp');
        });

        const arquivo = raiz.querySelector('#cfArquivo');
        raiz.querySelector('#cfImportar').addEventListener('click', () => arquivo.click());
        arquivo.addEventListener('change', () => {
            const f = arquivo.files[0];
            if (!f) return;
            Store.importar(f)
                .then(() => { UI.toast('Backup restaurado'); App.recarregar(); })
                .catch(() => UI.toast('Esse arquivo não é um backup do painel', 'erro'));
        });

        raiz.querySelector('#cfExemplo').addEventListener('click', () => {
            UI.confirmar({
                titulo: 'Recarregar o exemplo?',
                texto: 'Isso apaga o que você digitou e volta pro painel da creator fictícia. Baixe um backup antes se tiver algo seu aqui.',
                botao: 'Recarregar exemplo',
                aoConfirmar() { Store.restaurarExemplo(); App.recarregar(); UI.toast('Exemplo recarregado'); }
            });
        });

        raiz.querySelector('#cfZerar').addEventListener('click', () => {
            UI.confirmar({
                titulo: 'Limpar tudo?',
                texto: 'Apaga marcas, propostas, entregas, conteúdos, lançamentos e números. Os modelos de mensagem continuam. Isso não tem volta.',
                botao: 'Sim, limpar tudo',
                aoConfirmar() { Store.zerar(); App.recarregar(); UI.toast('Painel zerado. Agora é seu.'); }
            });
        });
    }

    return {
        titulo: 'Configurações',
        dica: 'Seus dados, sua tabela e o backup',
        render
    };
})();
