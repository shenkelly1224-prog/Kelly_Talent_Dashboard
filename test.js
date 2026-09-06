const fs=require('fs'),vm=require('vm'),assert=require('assert');
for(const file of ['index.html','en/index.html']){
 const html=fs.readFileSync(__dirname+'/'+file,'utf8');
 const els=new Map(),storage=new Map(),alerts=[];
 const element=id=>{if(!els.has(id))els.set(id,{id,value:'',textContent:'',innerHTML:'',style:{},classList:{add(){},remove(){},toggle(){}},focus(){},click(){},appendChild(){},querySelectorAll(){return []}});return els.get(id)};
 const ctx=vm.createContext({console,document:{getElementById:element,querySelectorAll:()=>[],querySelector:()=>null,createElement:element,body:element('body')},localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)},setTimeout:()=>0,clearTimeout(){},alert:x=>alerts.push(x),confirm:()=>false,Blob,URL:{createObjectURL:()=>'',revokeObjectURL(){}},Date});
 ctx.window=ctx;
 const run=code=>vm.runInContext(code,ctx);
 for(const m of html.matchAll(/<script>([\s\S]*?)<\/script>/g))run(m[1]);
 run("gateChoose('hrbp')");assert(element('gatePwdArea').innerHTML.includes('gatePwdInput'));
 run("gateChoose('evaluator')");assert(alerts.length===1);
 element('gatePwdInput').value='test-only';element('gatePwdConfirm').value='test-only';
 run('gateCreatePassword()');assert.equal(run('currentRole'),'hrbp');
 for(const route of run('NAV_STRUCTURE.hrbp.flatMap(g=>g.items.map(i=>i.id))')){
  run('navigate('+JSON.stringify(route)+')');assert(element('contentArea').innerHTML.length>0,route);
 }
 run("eltList=[{id:'test-manager',name:'Test Manager',title:'Manager'}];saveAllData();gateChoose('evaluator')");
 assert(element('genericBody').innerHTML.includes('Test Manager'));
 for(const fn of ['downloadEmployeeTemplate','downloadEvaluatorTemplate','downloadPositionTemplate','downloadHrbpTemplate'])run(fn+'()');
 console.log(file+': both gates, owner setup, all 13 HR routes, evaluator selection and four CSV templates passed');
}
