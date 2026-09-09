/* ==========================================================================
   Build · gera o arquivo único pra aluna baixar e usar no computador dela
   Rodar:  node build.js
   Sai:    Painel-da-Creator.html  (um arquivo só, dá dois cliques e abre)
   ========================================================================== */

const fs = require('fs');
const path = require('path');

const raiz = __dirname;
const SAIDA = 'Painel-da-Creator.html';

const ler = p => fs.readFileSync(path.join(raiz, p), 'utf8');

/** dentro de um <script> inline, a sequência </script> fecha a tag antes da hora */
const seguro = js => js.replace(/<\/script>/gi, '<\\/script>');

let html = ler('index.html');

/* ---------- CSS vira <style> ---------- */
html = html.replace(
    /<link rel="stylesheet" href="(css\/[^"]+)">/g,
    (_, arquivo) => `<style>\n/* ${arquivo} */\n${ler(arquivo)}\n</style>`
);

/* ---------- cada <script src> vira o próprio código ---------- */
html = html.replace(
    /<script src="(js\/[^"]+)"><\/script>/g,
    (_, arquivo) => `<script>\n/* ${arquivo} */\n${seguro(ler(arquivo))}\n</script>`
);

/* ---------- marca que esta cópia é a de uso local ---------- */
html = html.replace(
    '<body>',
    `<body data-versao-local="${new Date().toISOString().slice(0, 10)}">`
);

/* ---------- confere que não sobrou nada apontando pra fora ----------
   Olha só a marcação: dentro de <script> e <style> os src/href são texto
   de template do próprio código, não arquivo de verdade. */
const soMarcacao = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '');
const pendentes = soMarcacao.match(/(?:src|href)="(?!https:|data:|#)[^"]+"/g) || [];
if (pendentes.length) {
    console.error('\nAinda tem arquivo externo no HTML, o arquivo único não vai funcionar sozinho:');
    pendentes.forEach(p => console.error('  ' + p));
    process.exit(1);
}

fs.writeFileSync(path.join(raiz, SAIDA), html);

const kb = (Buffer.byteLength(html) / 1024).toFixed(0);
console.log(`${SAIDA} gerado · ${kb} KB · tudo embutido, funciona com dois cliques`);
