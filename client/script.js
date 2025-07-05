document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page;

  if (page === 'opinion') initOpinionPage();
});

function initOpinionPage() {
  const $ = id => document.getElementById(id);

  const input  = $('opinion-input');
  const submit = $('submit-btn');
  const filter = $('filter-select');
  const panel  = $('poll-section');

  submit.addEventListener('click', async () => {
    const text = input.value.trim();
    if (!text) return alert('Please enter your opinion.');

    await fetch('/api/opinions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });

    input.value = '';
    loadPolls();
  });

  filter.addEventListener('change', loadPolls);

  window.vote = async (id, type) => {
    await fetch(`/api/opinions/${id}/vote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type })
    });
    loadPolls();
  };

  async function loadPolls() {
    try {
      const sort = filter.value;
      const res  = await fetch(`/api/opinions?sort=${sort}`);
      const list = await res.json();

      panel.innerHTML = list.length ? '' : '<p>No opinions yet.</p>';

      list.forEach(op => panel.appendChild(renderOpinion(op)));
    } catch (err) {
      console.error(err);
      panel.innerHTML = '<p style="color:red;">Unable to load polls.</p>';
    }
  }

  function renderOpinion(o) {
    const total  = o.yes + o.no || 1;
    const yesPct = Math.round((o.yes / total) * 100);
    const noPct  = 100 - yesPct;

    const div = document.createElement('div');
    div.className = 'response-box';
    div.innerHTML = `
      <strong>${o.text}</strong>
      <div class="poll-bar-container">
        <div class="poll-bar yes-bar" style="width:${yesPct}%"></div>
        <div class="poll-bar no-bar"  style="width:${noPct}%"></div>
      </div>
      <div class="poll-labels">
        <span> ${yesPct}%</span>
        <span> ${noPct}%</span>
      </div>
      <div class="poll-buttons">
        <button onclick="vote('${o._id}','yes')">👍</button>
        <button onclick="vote('${o._id}','no')">👎</button>
      </div>
    `;
    return div;
  }

  loadPolls();
  setInterval(loadPolls, 5000);  
}

function initHome() { /* nothing yet */ }
