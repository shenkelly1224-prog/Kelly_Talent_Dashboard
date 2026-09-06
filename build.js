const fs = require('fs');
const path = require('path');
const {execFileSync} = require('child_process');
const vm = require('vm');
for (const lang of ['', '.en']) {
  execFileSync(process.execPath, [path.join(__dirname, `src/build_platform${lang}.js`)], {stdio:'inherit'});
  const html = fs.readFileSync(path.join(__dirname, `src/talent_review_platform${lang}.html`), 'utf8');
  for (const m of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) new vm.Script(m[1]);
  const dests = lang ? ['dist/en/index.html', 'en/index.html'] : ['dist/index.html', 'index.html'];
  for (const dest of dests) {
    const target = path.join(__dirname, dest);
    fs.mkdirSync(path.dirname(target), {recursive:true});
    fs.writeFileSync(target, html);
  }
}
fs.writeFileSync(path.join(__dirname, 'index-3.html'), '<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=./"><title>Kelly 人才盘点</title><a href="./">打开 Kelly 人才盘点与继任管理</a></html>');
fs.writeFileSync(path.join(__dirname, '.nojekyll'), '');
