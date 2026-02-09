// Basic JS DOM examples for app.js

document.addEventListener('DOMContentLoaded', () => {
    // Ensure a root container exists (works in an empty HTML)
    const root = document.getElementById('app') || document.body;
    if (!document.getElementById('app')) {
        const container = document.createElement('div');
        container.id = 'app';
        container.innerHTML = `
            <h1>Basic DOM</h1>
            <input id="itemInput" placeholder="Add item" />
            <button id="addBtn">Add</button>
            <button id="toggleBtn">Toggle Highlight</button>
            <p id="count">Items: 0</p>
            <ul id="list"></ul>
        `;
        root.appendChild(container);
    }

    const input = document.getElementById('itemInput');
    const addBtn = document.getElementById('addBtn');
    const toggleBtn = document.getElementById('toggleBtn');
    const list = document.getElementById('list');
    const count = document.getElementById('count');

    function updateCount() {
        count.textContent = `Items: ${list.children.length}`;
    }

    function createListItem(text) {
        const li = document.createElement('li');
        li.className = 'item';
        li.innerHTML = `${escapeHtml(text)} <button class="remove">Remove</button>`;
        return li;
    }

    function escapeHtml(s) {
        return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    }

    addBtn.addEventListener('click', () => {
        const val = input.value.trim();
        if (!val) return;
        list.appendChild(createListItem(val));
        input.value = '';
        updateCount();
    });

    input.addEventListener('keypress', e => {
        if (e.key === 'Enter') addBtn.click();
    });

    // event delegation for remove buttons
    list.addEventListener('click', e => {
        if (e.target.matches('.remove')) {
            const li = e.target.closest('li');
            li && li.remove();
            updateCount();
        }
    });

    // toggle a class on the container
    toggleBtn.addEventListener('click', () => {
        document.getElementById('app').classList.toggle('highlight');
    });

    updateCount();
});

// simple styles
const style = document.createElement('style');
style.textContent = `
#app { font-family: sans-serif; max-width: 480px; margin: 16px; }
.item { display:flex; gap:8px; align-items:center; }
.remove { margin-left:8px; }
.highlight { background:#fffbcc; }
`;
document.head.appendChild(style);