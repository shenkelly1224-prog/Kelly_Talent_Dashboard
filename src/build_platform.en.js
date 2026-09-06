const fs = require('fs');
const path = require('path');

// Reuse CSS and CSS_POLISH from the Chinese build (no Chinese strings in CSS)
const cnBuild = fs.readFileSync(path.join(__dirname, 'build_platform.js'), 'utf8');

// Extract CSS const
const cssMatch = cnBuild.match(/const CSS = `([\s\S]*?)`;/);
const CSS = cssMatch ? cssMatch[1] : '';

// Extract CSS_POLISH const
const polishMatch = cnBuild.match(/const CSS_POLISH = `([\s\S]*?)`;/);
const CSS_POLISH = polishMatch ? polishMatch[1] : '';

// English BODY template (translated from Chinese BODY in build_platform.js)
const BODY = `<div id="roleGate"><div class="gate-card"><div class="gate-logo"><div class="icon">🎯</div><h1>Kelly Talent Review</h1><p>Talent review · assessment · calibration · development</p></div><div class="gate-choices"><div class="gate-choice evaluator" role="button" tabindex="0" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();this.click()}" onclick="gateChoose('evaluator')"><div class="gc-icon">📋</div><h2>I am an Evaluator</h2><p>Business manager. Select your name, verify, and assess your reports on potential, turnover risk, and succession readiness.</p></div><div class="gate-choice hrbp" role="button" tabindex="0" onkeydown="if(event.target===this&&(event.key==='Enter'||event.key===' ')){event.preventDefault();this.click()}" onclick="gateChoose('hrbp')"><div class="gc-icon">🔑</div><h2>I am the Program Owner</h2><p>HR / HRBP. Configure the tool, import data, distribute assessments, calibrate, and generate reports.</p><div class="gate-pwd-area" id="gatePwdArea" onclick="event.stopPropagation()"></div></div></div><div class="gate-footer"><a href="../" style="color:#E6C75A">中文</a><br>Data is stored only in your local browser — no network transmission · First-time Program Owners should set a password</div></div></div><div id="appShell"><div class="sidebar"><div class="sidebar-brand"><div class="logo">🎯</div><div class="title">Kelly Talent Review<span class="sub" id="sbProjectName">Talent Review</span></div></div><nav class="sidebar-nav" id="sidebarNav"></nav><div class="sidebar-footer"><div style="display:flex;align-items:center;gap:8px;"><span class="role-dot" id="roleDot"></span><span class="role-name" id="roleName">--</span></div><button class="switch-btn" onclick="switchRole()">Switch ↻</button></div><div style="padding:0 20px 8px;"><button class="switch-btn" id="footerGuideBtn" onclick="startGuideForRole()" style="display:none;font-size:11px;">📖 Onboarding Guide</button></div></div><div class="main-area"><div class="topbar"><div style="display:flex;align-items:center;"><span class="tb-title" id="tbTitle">--</span><span class="tb-sub" id="tbSub"></span></div><div class="tb-right" id="tbRight"></div></div><div class="content-area" id="contentArea"></div></div></div><div class="toast" id="toast"></div><div class="modal-overlay" id="wizardOverlay"><div class="modal modal-lg"><div class="modal-header"><h3>⚙️ Setup Wizard</h3><button class="modal-close" onclick="wizardClose()">✕</button></div><div class="modal-body" id="wizardBody"></div></div></div><div class="modal-overlay" id="genericOverlay"><div class="modal" id="genericModal"><div class="modal-header"><h3 id="genericTitle">--</h3><button class="modal-close" onclick="closeGeneric()">✕</button></div><div class="modal-body" id="genericBody"></div><div class="modal-footer" id="genericFooter"></div></div></div><script id="tr-embedded-data" type="application/json"></script>`;

const engineJs = fs.readFileSync(path.join(__dirname, 'engine.en.js'), 'utf8');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<!-- ${fs.readFileSync(path.join(__dirname, '../LICENSE'), 'utf8')} -->
<meta charset="UTF-8">
<meta name="google" content="notranslate">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Kelly Talent Review</title>
<style>
${CSS}
${CSS_POLISH}
</style>
</head>
<body>
${BODY}
<script>
${engineJs}
</scr` + `ipt>
</body>
</html>`;

// Write to src/ (for reference)
fs.writeFileSync(path.join(__dirname, 'talent_review_platform.en.html'), html, 'utf8');
console.log('Built talent_review_platform.en.html: ' + (html.length/1024).toFixed(1) + ' KB');

