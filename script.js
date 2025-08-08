
let data = [];
async function init(){
  const res = await fetch('data.json');
  data = await res.json();
  document.getElementById('searchBtn').addEventListener('click', doSearch);
  document.getElementById('searchInput').addEventListener('keydown', (e)=>{ if(e.key==='Enter') doSearch(); });
  renderAll();
}
function renderAll(){ const container = document.getElementById('result'); container.innerHTML=''; if(!data.length){ container.innerHTML='<div class="no-results">No hay datos</div>'; return;} data.forEach(r=> container.appendChild(cardFor(r))); }
function cardFor(r){
  const el = document.createElement('div'); el.className='card';
  const thumb = document.createElement('div'); thumb.className='thumb';
  const img = document.createElement('img');
  img.src = r.Photo || r.photo || ''; img.alt = r.DESCRIPCIÓN || r.DESCRIPCION || r.DESCRIPTION || r.CODIGO || '';
  thumb.appendChild(img);
  const info = document.createElement('div'); info.className='info';
  const code = document.createElement('div'); code.className='code'; code.textContent = (r.CODIGO || r.codigo || r.Code || '');
  const desc = document.createElement('div'); desc.className='desc'; desc.textContent = (r.DESCRIPCIÓN || r.DESCRIPCION || r.Description || '');
  const client = document.createElement('div'); client.className='client'; client.textContent = (r.CLIENTE || r.Cliente || r.client || '');
  info.appendChild(code); info.appendChild(desc); info.appendChild(client);
  el.appendChild(thumb); el.appendChild(info);
  el.addEventListener('click', ()=> showDetail(r));
  return el;
}
function doSearch(){
  const q = document.getElementById('searchInput').value.trim().toLowerCase();
  const container = document.getElementById('result'); container.innerHTML='';
  if(!q){ renderAll(); return; }
  const results = data.filter(r=> {
    return (r.CODIGO||'').toString().toLowerCase().includes(q) ||
           (r.DESCRIPCIÓN||r.DESCRIPCION||'').toString().toLowerCase().includes(q) ||
           (r.CLIENTE||'').toString().toLowerCase().includes(q);
  });
  if(!results.length){ container.innerHTML='<div class="no-results">No se encontraron resultados</div>'; return; }
  results.forEach(r=> container.appendChild(cardFor(r)));
}
function showDetail(r){
  const html = `
    <div style="padding:18px;max-width:720px;margin:40px auto;background:#fff;border-radius:10px">
      <div style="display:flex;gap:18px">
        <div style="flex:0 0 320px"><img src="${r.Photo||r.photo||''}" style="width:100%;height:auto;object-fit:contain;border-radius:8px" /></div>
        <div style="flex:1">
          <h2 style="margin:0 0 8px">${r.CODIGO||''}</h2>
          <div style="color:#666">${r.DESCRIPCIÓN||r.DESCRIPCION||''}</div>
          <div style="margin-top:12px;color:#888">${r.CLIENTE||''}</div>
          <div style="margin-top:18px"><button onclick="closeDetail()" style="padding:8px 12px;border:none;background:#0b74de;color:#fff;border-radius:6px">Cerrar</button></div>
        </div>
      </div>
    </div>`;
  const overlay = document.createElement('div'); overlay.id='overlayDetail'; overlay.style.position='fixed'; overlay.style.left=0; overlay.style.top=0; overlay.style.right=0; overlay.style.bottom=0; overlay.style.background='rgba(0,0,0,0.4)'; overlay.style.zIndex=9999; overlay.innerHTML=html;
  document.body.appendChild(overlay);
}
function closeDetail(){ const o=document.getElementById('overlayDetail'); if(o) o.remove(); }
init();
