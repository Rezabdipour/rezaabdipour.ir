
// LOAD PROFILE
fetch("data/profile.json")
.then(r=>r.json())
.then(d=>{
  document.getElementById("name").innerText = d.name;
  document.getElementById("title").innerText = d.title;

  const m = document.getElementById("metrics");
  d.metrics.forEach(x=>{
    m.innerHTML += `
      <div class="card">
        <b>${x.value}</b><br>${x.label}
      </div>`;
  });
});

// PUBLICATIONS STATE
let publications = [];

fetch("data/publications.json")
.then(r=>r.json())
.then(data=>{
  publications = data;
  render(data);
});

// RENDER FUNCTION
function render(list){
  const box = document.getElementById("pubs");
  box.innerHTML = "";

  list.forEach(p=>{
    box.innerHTML += `
      <div class="card">
        <b>${p.title}</b><br>
        <small>${p.journal} - ${p.year}</small>
      </div>`;
  });
}

// SEARCH ENGINE
document.getElementById("search").addEventListener("input",(e)=>{
  let q = e.target.value.toLowerCase();

  let filtered = publications.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.journal.toLowerCase().includes(q)
  );

  render(filtered);
});