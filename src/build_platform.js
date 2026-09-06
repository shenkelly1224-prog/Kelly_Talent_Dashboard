const fs = require('fs');
const path = require('path');

const CSS = `:root {
  --navy:#0F1F3A;--navy-light:#1A3353;--navy-deep:#0A1530;
  --accent:#C9A227;--accent-light:#E6C75A;
  --success:#2D6A4F;--warning:#B85C14;--danger:#9B2335;
  --text:#1A1A2E;--text-secondary:#6B7280;--text-light:#9CA3AF;
  --bg:#FFF;--bg-warm:#FAFAF8;--bg-page:#F4F5F7;
  --border:#E5E7EB;--border-light:#F3F4F6;
  --radius:8px;--radius-sm:5px;--sidebar-w:244px;
  --shadow-sm:0 1px 3px rgba(15,31,58,.06);--shadow:0 2px 8px rgba(15,31,58,.08);--shadow-lg:0 8px 32px rgba(15,31,58,.14);
}
*{margin:0;padding:0;box-sizing:border-box}html,body{height:100%}
body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Noto Sans SC",sans-serif;background:var(--bg-page);color:var(--text);line-height:1.6;font-size:14px}
#roleGate{position:fixed;inset:0;background:linear-gradient(135deg,var(--navy-deep) 0%,var(--navy) 50%,var(--navy-light) 100%);display:flex;align-items:center;justify-content:center;z-index:200}
#roleGate.hidden{display:none}
.gate-card{width:840px;max-width:92vw}
.gate-logo{text-align:center;margin-bottom:36px}
.gate-logo .icon{width:56px;height:56px;border-radius:14px;background:linear-gradient(135deg,var(--accent),var(--accent-light));display:inline-flex;align-items:center;justify-content:center;font-size:26px;box-shadow:0 8px 24px rgba(201,162,39,.3);margin-bottom:14px}
.gate-logo h1{color:#fff;font-size:22px;font-weight:600}
.gate-logo p{color:rgba(255,255,255,.55);font-size:13px;margin-top:4px}
.gate-choices{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.gate-choice{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-radius:16px;padding:32px 28px;cursor:pointer;transition:all .25s}
.gate-choice:hover{background:rgba(255,255,255,.12);border-color:var(--accent);transform:translateY(-3px);box-shadow:0 12px 32px rgba(0,0,0,.25)}
.gate-choice .gc-icon{width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px;margin-bottom:16px}
.gate-choice.evaluator .gc-icon{background:rgba(45,106,79,.25);color:#6EE7B7}
.gate-choice.hrbp .gc-icon{background:rgba(201,162,39,.22);color:var(--accent-light)}
.gate-choice h2{color:#fff;font-size:17px;margin-bottom:6px}
.gate-choice p{color:rgba(255,255,255,.5);font-size:12px;line-height:1.7}
.gate-pwd-area{margin-top:18px;display:none}.gate-pwd-area.show{display:block}
.gate-pwd-input{width:100%;padding:12px 14px;border:1px solid rgba(255,255,255,.2);border-radius:8px;background:rgba(255,255,255,.08);color:#fff;font-size:15px;text-align:center;letter-spacing:3px;outline:none}
.gate-pwd-input::placeholder{color:rgba(255,255,255,.35)}
.gate-pwd-input:focus{border-color:var(--accent);background:rgba(255,255,255,.12)}
.gate-pwd-btn{width:100%;margin-top:12px;padding:12px;border:none;border-radius:8px;background:var(--accent);color:var(--navy);font-weight:600;font-size:14px;cursor:pointer}
.gate-pwd-btn:hover{background:var(--accent-light)}
.gate-err{color:#FCA5A5;font-size:12px;margin-top:8px;display:none}.gate-err.show{display:block}
.gate-footer{text-align:center;margin-top:30px;color:rgba(255,255,255,.3);font-size:11px}
#appShell{display:none;height:100vh}#appShell.show{display:flex}
.sidebar{width:var(--sidebar-w);background:var(--navy-deep);display:flex;flex-direction:column;flex-shrink:0;overflow:hidden}
.sidebar-brand{padding:18px 20px;display:flex;align-items:center;gap:10px;border-bottom:1px solid rgba(255,255,255,.07)}
.sidebar-brand .logo{width:32px;height:32px;border-radius:8px;background:linear-gradient(135deg,var(--accent),var(--accent-light));display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0}
.sidebar-brand .title{color:#fff;font-size:14px;font-weight:600;line-height:1.3}
.sidebar-brand .title .sub{font-size:10px;font-weight:400;color:rgba(255,255,255,.45);display:block;margin-top:1px}
.sidebar-nav{flex:1;overflow-y:auto;padding:10px 0}
.sidebar-nav::-webkit-scrollbar{width:5px}.sidebar-nav::-webkit-scrollbar-thumb{background:rgba(255,255,255,.1);border-radius:3px}
.nav-group{margin-bottom:6px}
.nav-group-label{padding:14px 22px 6px;font-size:10px;font-weight:600;color:rgba(255,255,255,.32);text-transform:uppercase;letter-spacing:.8px}
.nav-item{display:flex;align-items:center;gap:10px;padding:9px 22px;color:rgba(255,255,255,.6);font-size:13px;cursor:pointer;transition:all .15s;border-left:3px solid transparent}
.nav-item:hover{background:rgba(255,255,255,.06);color:#fff}
.nav-item.active{background:rgba(201,162,39,.12);color:var(--accent-light);border-left-color:var(--accent);font-weight:500}
.nav-item .ni-icon{width:18px;text-align:center;font-size:14px;opacity:.8}.nav-item.active .ni-icon{opacity:1}
.nav-badge{margin-left:auto;font-size:10px;background:rgba(255,255,255,.1);color:rgba(255,255,255,.5);padding:1px 6px;border-radius:8px}
.sidebar-footer{padding:12px 20px;border-top:1px solid rgba(255,255,255,.07);display:flex;align-items:center;justify-content:space-between}
.sidebar-footer .role-dot{width:8px;height:8px;border-radius:50%}
.sidebar-footer .role-dot.eval{background:#6EE7B7}.sidebar-footer .role-dot.hrbp{background:var(--accent-light)}
.sidebar-footer .role-name{color:rgba(255,255,255,.6);font-size:12px}
.sidebar-footer .switch-btn{color:rgba(255,255,255,.4);font-size:11px;cursor:pointer;background:none;border:none}
.sidebar-footer .switch-btn:hover{color:#fff}
.main-area{flex:1;display:flex;flex-direction:column;overflow:hidden}
.topbar{height:54px;background:#fff;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;padding:0 24px;flex-shrink:0;box-shadow:var(--shadow-sm)}
.topbar .tb-title{font-size:16px;font-weight:600;color:var(--navy)}
.topbar .tb-sub{font-size:12px;color:var(--text-light);margin-left:10px}
.topbar .tb-right{display:flex;align-items:center;gap:10px}
.topbar .tb-user{font-size:12px;color:var(--text-secondary)}
.content-area{flex:1;overflow-y:auto;padding:24px}
.content-area::-webkit-scrollbar{width:7px}.content-area::-webkit-scrollbar-thumb{background:#D1D5DB;border-radius:4px}
.view{display:none;max-width:1200px;margin:0 auto}.view.active{display:block;animation:fadeIn .2s ease}
@keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
.panel{background:#fff;border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;margin-bottom:20px}
.panel-header{background:var(--bg-warm);padding:13px 18px;font-size:14px;font-weight:600;color:var(--navy);border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center}
.panel-body{padding:18px}
.btn{padding:8px 16px;border:none;border-radius:var(--radius-sm);font-size:13px;cursor:pointer;transition:all .15s;font-weight:500;display:inline-flex;align-items:center;gap:6px}
.btn:active{transform:scale(.97)}
.btn-primary{background:var(--navy);color:#fff}.btn-primary:hover{background:var(--navy-light)}
.btn-accent{background:var(--accent);color:var(--navy)}.btn-accent:hover{background:var(--accent-light)}
.btn-success{background:var(--success);color:#fff}.btn-success:hover{filter:brightness(1.1)}
.btn-danger{background:var(--danger);color:#fff}
.btn-secondary{background:#E5E7EB;color:var(--text-secondary)}
.btn-ghost{background:transparent;color:var(--text-secondary);border:1px solid var(--border)}.btn-ghost:hover{border-color:var(--navy-light);color:var(--navy)}
.btn-sm{padding:5px 11px;font-size:12px}.btn-large{padding:12px 28px;font-size:15px}
.btn-group{display:flex;gap:10px;flex-wrap:wrap}
table.data-table{width:100%;border-collapse:collapse;font-size:13px}
.data-table th{background:var(--navy);color:#fff;padding:9px 12px;text-align:left;font-weight:500;font-size:12px;white-space:nowrap}
.data-table td{padding:9px 12px;border-bottom:1px solid var(--border-light)}
.data-table tr:hover{background:#F8FAFC}.data-table tr:last-child td{border-bottom:none}
.tag{display:inline-block;padding:2px 9px;border-radius:10px;font-size:11px;font-weight:600}
.tag.high{background:#DCFCE7;color:var(--success)}.tag.mid{background:#FEF3C7;color:var(--warning)}.tag.low{background:#FEE2E2;color:var(--danger)}.tag.missing{background:#E5E7EB;color:var(--text-secondary)}
.tag.star{background:#DCFCE7;color:var(--success);border:1px solid var(--success)}.tag.hipo{background:#DBEAFE;color:#1E40AF;border:1px solid #1E40AF}.tag.core{background:#FEF3C7;color:var(--warning);border:1px solid var(--warning)}
.tag.solid{background:#F3F4F6;color:var(--text-secondary)}.tag.basic{background:#FEE2E2;color:var(--danger)}
.toast{position:fixed;top:20px;right:20px;background:var(--success);color:#fff;padding:12px 20px;border-radius:var(--radius);font-size:14px;z-index:500;display:none;box-shadow:var(--shadow-lg)}
.toast.show{display:block;animation:toastIn .25s ease}
@keyframes toastIn{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}
.empty-state{text-align:center;padding:50px 20px;color:var(--text-light)}
.empty-state .es-icon{font-size:42px;margin-bottom:12px}
.input,.textarea-field,select.input{width:100%;padding:9px 12px;border:1px solid var(--border);border-radius:var(--radius-sm);font-size:13px;font-family:inherit;background:#fff;outline:none;transition:border-color .15s}
.input:focus,.textarea-field:focus,select.input:focus{border-color:var(--navy-light)}
.textarea-field{resize:vertical;min-height:60px;line-height:1.6}
.form-label{font-size:12px;color:var(--text-light);display:block;margin-bottom:5px;font-weight:500}
.form-row{margin-bottom:16px}.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.hint-box{background:#FFF7ED;border-left:3px solid var(--warning);padding:11px 14px;border-radius:0 6px 6px 0;font-size:12px;color:var(--text-secondary);line-height:1.7;margin:10px 0}
.hint-box strong{color:var(--navy)}
.modal-overlay{position:fixed;inset:0;background:rgba(10,21,48,.5);z-index:300;display:none;align-items:center;justify-content:center;padding:20px}
.modal-overlay.show{display:flex}
.modal{background:#fff;border-radius:12px;max-width:560px;width:100%;max-height:90vh;overflow-y:auto;box-shadow:var(--shadow-lg)}
.modal.modal-lg{max-width:820px}
.modal-header{padding:16px 20px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--border)}
.modal-header h3{font-size:16px;color:var(--navy)}
.modal-close{background:none;border:none;font-size:18px;cursor:pointer;color:var(--text-light);padding:4px}.modal-close:hover{color:var(--text)}
.modal-body{padding:20px}.modal-footer{padding:14px 20px;border-top:1px solid var(--border);display:flex;justify-content:flex-end;gap:10px}
.upload-area{border:2px dashed var(--border);border-radius:var(--radius);padding:28px 20px;text-align:center;background:var(--bg-warm);cursor:pointer;transition:all .2s}
.upload-area:hover{border-color:var(--navy-light);background:#F0F9FF}
.upload-area.dragover{border-color:var(--accent);background:#FFFBEB}
.upload-area input{display:none}
.upload-area .ua-icon{font-size:26px;margin-bottom:8px}
.upload-area .ua-title{font-size:13px;font-weight:500;color:var(--navy);margin-bottom:3px}
.upload-area .ua-desc{font-size:11px;color:var(--text-light)}
.stat-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:20px}
.stat-card{background:#fff;border:1px solid var(--border);border-radius:var(--radius);padding:18px;text-align:center}
.stat-card .sc-num{font-size:30px;font-weight:700;color:var(--navy)}
.stat-card .sc-num.accent{color:var(--accent)}.stat-card .sc-num.success{color:var(--success)}.stat-card .sc-num.danger{color:var(--danger)}
.stat-card .sc-label{font-size:12px;color:var(--text-light);margin-top:4px}
.tab-bar{display:flex;gap:4px;background:#fff;padding:4px;border:1px solid var(--border);border-radius:var(--radius);margin-bottom:16px}
.tab-bar .tab{padding:8px 16px;border-radius:5px;font-size:13px;cursor:pointer;border:none;background:transparent;color:var(--text-light)}
.tab-bar .tab.active{background:var(--navy);color:#fff}
.grid-2col{display:grid;grid-template-columns:300px 1fr;gap:20px}
.matrix-big{display:grid;grid-template-columns:90px repeat(3,1fr);grid-template-rows:44px repeat(3,auto);gap:6px;max-width:920px;margin:0 auto}
.matrix-big .m-corner{background:transparent}
.matrix-big .m-label{display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:var(--navy)}
.matrix-big .m-cell{border-radius:6px;padding:12px;min-height:90px;transition:all .2s;position:relative}
.matrix-big .m-cell.drag-over{box-shadow:0 0 0 3px var(--accent);transform:scale(1.02)}
.matrix-big .m-cell .cell-title{font-size:11px;font-weight:600;margin-bottom:6px}
.matrix-big .m-cell .names{font-size:11px;line-height:1.9}
.matrix-big .m-cell .names .name-tag{display:inline-block;background:#fff;padding:2px 7px;border-radius:4px;margin:2px;border:1px solid rgba(0,0,0,.08);cursor:grab;transition:all .15s}
.matrix-big .m-cell .names .name-tag:hover{background:var(--navy);color:#fff}
.matrix-big .m-cell .names .name-tag.moved{border:2px solid var(--accent);background:#FFFBEB;color:var(--navy);font-weight:600}
.matrix-big .m-cell.star{background:#DCFCE7;color:var(--success)}
.matrix-big .m-cell.hipo{background:#DBEAFE;color:#1E40AF}
.matrix-big .m-cell.core{background:#FEF3C7;color:var(--warning)}
.matrix-big .m-cell.solid{background:#F3F4F6;color:var(--text-secondary)}
.matrix-big .m-cell.basic{background:#FEE2E2;color:var(--danger)}
.wizard-steps{display:flex;margin-bottom:24px}
.wizard-step{flex:1;text-align:center;padding:12px;border-bottom:2px solid var(--border);font-size:12px;color:var(--text-light)}
.wizard-step.active{border-bottom-color:var(--accent);color:var(--navy);font-weight:600}
.wizard-step.done{border-bottom-color:var(--success);color:var(--success)}
.opt-btn{padding:6px 16px;border:1px solid var(--border);border-radius:var(--radius-sm);background:#fff;cursor:pointer;font-size:13px;transition:all .15s;min-width:56px;text-align:center}
.opt-btn:hover{border-color:var(--navy-light)}
.opt-btn.selected-yes{background:var(--success);color:#fff;border-color:var(--success)}
.opt-btn.selected-no{background:#E5E7EB;color:var(--text-secondary)}
.readiness-row{border:1px solid var(--border);border-radius:5px;padding:8px;background:#fff;min-height:50px;margin-top:6px}
.readiness-row .r-title{font-size:10px;color:var(--text-light);font-weight:600;margin-bottom:6px;text-align:center;border-bottom:1px solid var(--border-light);padding-bottom:4px}
.readiness-row .r-names{font-size:11px;text-align:center;min-height:20px}
.risk-indicator{display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:12px;font-size:12px;font-weight:600}
.risk-high{background:#FEE2E2;color:var(--danger)}.risk-mid{background:#FEF3C7;color:var(--warning)}.risk-low{background:#DCFCE7;color:var(--success)}
@media (max-width:1024px){.grid-2col{grid-template-columns:1fr}}
@media (max-width:768px){.sidebar{display:none}.stat-grid{grid-template-columns:1fr 1fr}.form-grid{grid-template-columns:1fr}.gate-choices{grid-template-columns:1fr}}`;

const BODY = `<div id="roleGate"><div class="gate-card"><div class="gate-logo"><div class="icon">🎯</div><h1>Kelly 人才盘点与继任管理</h1><p>一体化人才盘点 · 评估 · 校准 · 发展</p></div><div class="gate-choices"><div class="gate-choice evaluator" role="button" tabindex="0" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();this.click()}" onclick="gateChoose('evaluator')"><div class="gc-icon">📋</div><h2>我是评估人</h2><p>业务管理者。选择本人姓名并验证后，对下属进行潜力、离职风险及接班准备度评估。</p></div><div class="gate-choice hrbp" role="button" tabindex="0" onkeydown="if(event.target===this&&(event.key==='Enter'||event.key===' ')){event.preventDefault();this.click()}" onclick="gateChoose('hrbp')"><div class="gc-icon">🔑</div><h2>我是项目主理人</h2><p>HR / HRBP。配置工具、导入人员数据、分发评估、汇总校准、生成报告。</p><div class="gate-pwd-area" id="gatePwdArea" onclick="event.stopPropagation()"></div></div></div><div class="gate-footer"><a href="en/" style="color:#E6C75A">English</a><br>数据仅存储在本地浏览器，不经过任何网络传输 · 首次进入项目主理人请设置密码</div></div></div><div id="appShell"><div class="sidebar"><div class="sidebar-brand"><div class="logo">🎯</div><div class="title">Kelly 人才盘点<span class="sub" id="sbProjectName">Talent Review</span></div></div><nav class="sidebar-nav" id="sidebarNav"></nav><div class="sidebar-footer"><div style="display:flex;align-items:center;gap:8px;"><span class="role-dot" id="roleDot"></span><span class="role-name" id="roleName">--</span></div><button class="switch-btn" onclick="switchRole()">切换 ↻</button></div><div style="padding:0 20px 8px;"><button class="switch-btn" id="footerGuideBtn" onclick="startGuideForRole()" style="display:none;font-size:11px;">📖 新手引导</button></div></div><div class="main-area"><div class="topbar"><div style="display:flex;align-items:center;"><span class="tb-title" id="tbTitle">--</span><span class="tb-sub" id="tbSub"></span></div><div class="tb-right" id="tbRight"></div></div><div class="content-area" id="contentArea"></div></div></div><div class="toast" id="toast"></div><div class="modal-overlay" id="wizardOverlay"><div class="modal modal-lg"><div class="modal-header"><h3>⚙️ 工具配置向导</h3><button class="modal-close" onclick="wizardClose()">✕</button></div><div class="modal-body" id="wizardBody"></div></div></div><div class="modal-overlay" id="genericOverlay"><div class="modal" id="genericModal"><div class="modal-header"><h3 id="genericTitle">--</h3><button class="modal-close" onclick="closeGeneric()">✕</button></div><div class="modal-body" id="genericBody"></div><div class="modal-footer" id="genericFooter"></div></div></div><script id="tr-embedded-data" type="application/json"></script>`;

const engineJs = fs.readFileSync(path.join(__dirname, 'engine.js'), 'utf8');

/* ---------- UI/UX POLISH LAYER (additive) ---------- */
const CSS_POLISH = `
:root{--radius:10px;--radius-lg:14px;--shadow-sm:0 1px 2px rgba(15,31,58,.05),0 1px 3px rgba(15,31,58,.07);--shadow:0 4px 14px rgba(15,31,58,.07);--shadow-lg:0 14px 40px rgba(10,21,48,.18);--bg-page:#F5F6F8}
html,body{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
#roleGate{background:radial-gradient(circle at 30% 20%,#16294a 0,var(--navy-deep) 55%)}
.gate-card{animation:gateIn .5s cubic-bezier(.2,.7,.3,1)}
@keyframes gateIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
.gate-choice{backdrop-filter:blur(4px)}
.gate-logo .icon{box-shadow:0 10px 28px rgba(201,162,39,.35)}
.sidebar{background:linear-gradient(180deg,#0B1A38 0%,var(--navy-deep) 100%)}
.nav-item.active{background:linear-gradient(90deg,rgba(201,162,39,.16),rgba(201,162,39,.04))}
.topbar{background:rgba(255,255,255,.92);backdrop-filter:saturate(1.4) blur(6px)}
.panel{border-radius:var(--radius-lg);box-shadow:var(--shadow);border-color:#EDF0F4}
.panel-header{background:linear-gradient(180deg,#FBFCFD,#F4F6F9);border-radius:var(--radius-lg) var(--radius-lg) 0 0}
.stat-card{border-radius:var(--radius-lg);transition:transform .18s,box-shadow .18s}
.stat-card:hover{transform:translateY(-2px);box-shadow:var(--shadow)}
.stat-card .sc-num{font-variant-numeric:tabular-nums;letter-spacing:-.5px}
.btn{border-radius:7px;font-weight:500;transition:transform .12s,box-shadow .15s,background .15s,filter .15s}
.btn:hover{box-shadow:0 2px 8px rgba(15,31,58,.12)}
.btn-primary{box-shadow:0 2px 8px rgba(15,31,58,.16)}
.btn-accent{box-shadow:0 2px 8px rgba(201,162,39,.3)}
.btn-success{box-shadow:0 2px 8px rgba(45,106,79,.25)}
.data-table{border-radius:var(--radius);overflow:hidden}
.data-table th{background:linear-gradient(180deg,#16294a,var(--navy));font-weight:500;letter-spacing:.2px}
.data-table tbody tr{transition:background .12s}
.data-table tbody tr:nth-child(even){background:#FAFBFC}
.data-table tbody tr:hover{background:#EEF4FB}
.matrix-big .m-cell{border-radius:var(--radius);box-shadow:inset 0 0 0 1px rgba(255,255,255,.4)}
.matrix-big .m-cell .name-tag{border-radius:6px;font-weight:500;transition:transform .12s,box-shadow .12s}
.matrix-big .m-cell .name-tag:hover{transform:translateY(-1px);box-shadow:0 3px 8px rgba(15,31,58,.18)}
.input,.textarea-field,select.input{border-radius:7px;transition:border-color .15s,box-shadow .15s}
.input:focus,.textarea-field:focus,select.input:focus{border-color:var(--accent);box-shadow:0 0 0 3px rgba(201,162,39,.15)}
.tag{border-radius:11px;letter-spacing:.2px}
.hint-box{border-radius:0 8px 8px 0}
.upload-area{border-radius:var(--radius);transition:transform .15s,border-color .15s,background .15s}
.upload-area:hover{transform:translateY(-1px)}
.empty-state .es-icon{opacity:.85;animation:floaty 3s ease-in-out infinite}
@keyframes floaty{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
.idp-table .idp-editor-row>td{box-shadow:inset 0 2px 0 var(--accent),inset 0 -1px 0 var(--border)}
.toast{border-radius:var(--radius);box-shadow:var(--shadow-lg)}
.content-area{scroll-behavior:smooth}
.opt-btn{border-radius:7px;font-weight:500}
`;


const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<!-- ${fs.readFileSync(path.join(__dirname, '../LICENSE'), 'utf8')} -->
<meta charset="UTF-8">
<meta name="google" content="notranslate">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Kelly 人才盘点与继任管理</title>
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

fs.writeFileSync(path.join(__dirname, 'talent_review_platform.html'), html, 'utf8');
console.log('Built talent_review_platform.html: ' + (html.length/1024).toFixed(1) + ' KB');

