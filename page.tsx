:root {
  --bg: #f5f7fa;
  --panel: #ffffff;
  --panel2: #f0f4ff;
  --border: #e3eaf5;
  --text: #17213d;
  --muted: #6d7fa4;
  --blue: #3b6fe8;
  --green: #0caf60;
  --red: #e8394a;
  --yellow: #f5a623;
  --purple: #7c5cfc;
  --shadow: 0 12px 28px rgba(27, 45, 94, 0.08);
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: Arial, "Helvetica Neue", sans-serif;
}

button {
  font: inherit;
}

.topbar {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  min-height: 68px;
  padding: 0 2rem;
  background: rgba(255, 255, 255, 0.94);
  border-bottom: 1px solid var(--border);
  backdrop-filter: blur(10px);
}

.brand {
  font-size: 1.3rem;
  font-weight: 800;
}

.brand span {
  color: var(--blue);
}

.subline {
  margin-top: 0.2rem;
  font-size: 0.78rem;
  color: var(--muted);
}

.actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.pill {
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 700;
}

.warn {
  color: #8a5a00;
  background: #fff4d8;
}

.refresh {
  min-width: 82px;
  border: 0;
  border-radius: 8px;
  padding: 0.55rem 1rem;
  color: white;
  background: var(--blue);
  cursor: pointer;
  box-shadow: 0 8px 18px rgba(59, 111, 232, 0.22);
}

.refresh:disabled {
  opacity: 0.65;
  cursor: default;
}

.tabs {
  display: flex;
  gap: 0.15rem;
  padding: 0 2rem;
  background: var(--panel);
  border-bottom: 1px solid var(--border);
  overflow-x: auto;
}

.tabs button {
  border: 0;
  border-bottom: 2px solid transparent;
  padding: 1rem 1.1rem;
  color: var(--muted);
  background: transparent;
  cursor: pointer;
  white-space: nowrap;
}

.tabs button.active {
  color: var(--blue);
  border-bottom-color: var(--blue);
  font-weight: 800;
}

.page {
  padding: 1.5rem 2rem 2rem;
}

.kpis {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.kpi,
.panel,
.miniCard {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 10px;
  box-shadow: var(--shadow);
}

.kpi {
  padding: 1.2rem;
}

.kpi span,
.miniCard span {
  display: block;
  color: var(--muted);
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.04em;
}

.kpi strong {
  display: block;
  margin-top: 0.55rem;
  font-size: 1.55rem;
  line-height: 1.1;
}

.kpi small,
.miniCard small {
  display: block;
  margin-top: 0.45rem;
  color: var(--muted);
}

.panel {
  padding: 1.25rem;
  margin-bottom: 1.25rem;
}

.panelHead {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: baseline;
  margin-bottom: 1rem;
}

.panelHead h2 {
  margin: 0;
  font-size: 1rem;
}

.panelHead span {
  color: var(--muted);
  font-size: 0.85rem;
}

.allocList {
  display: grid;
  gap: 0.9rem;
}

.allocText {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.35rem;
  font-size: 0.9rem;
}

.allocText b {
  color: var(--muted);
  font-weight: 600;
}

.bar {
  height: 9px;
  overflow: hidden;
  background: var(--panel2);
  border-radius: 999px;
}

.bar i {
  display: block;
  height: 100%;
  border-radius: inherit;
}

.tableWrap {
  overflow-x: auto;
  border: 1px solid var(--border);
  border-radius: 8px;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

th {
  padding: 0.75rem 0.9rem;
  text-align: right;
  color: var(--muted);
  background: var(--panel2);
  font-size: 0.78rem;
}

td {
  padding: 0.85rem 0.9rem;
  border-top: 1px solid var(--border);
  white-space: nowrap;
}

.positive {
  color: var(--green);
}

.negative {
  color: var(--red);
}

.cashHero {
  display: grid;
  gap: 0.25rem;
  margin-bottom: 1rem;
  padding: 1.5rem;
  color: white;
  background: linear-gradient(135deg, var(--blue), #5a8cff);
  border-radius: 10px;
  box-shadow: var(--shadow);
}

.cashHero span {
  opacity: 0.82;
  font-weight: 800;
}

.cashHero strong {
  font-size: clamp(2rem, 5vw, 3.2rem);
  line-height: 1;
}

.cashHero small {
  opacity: 0.8;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 1rem;
}

.miniCard {
  padding: 1rem;
  border-right: 4px solid var(--green);
}

.miniCard h3 {
  margin: 0.35rem 0 0.8rem;
  font-size: 1rem;
}

.miniCard strong {
  display: block;
  font-size: 1.35rem;
  color: var(--green);
}

.loading,
.error {
  margin: 1.5rem 2rem;
  padding: 1.2rem;
  border-radius: 10px;
}

.loading {
  color: var(--muted);
  background: var(--panel);
}

.error {
  color: var(--red);
  background: #fff0f2;
  border: 1px solid #ffd5db;
}

@media (max-width: 900px) {
  .kpis {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .topbar {
    align-items: flex-start;
    flex-direction: column;
    padding: 1rem;
  }

  .tabs {
    padding: 0 1rem;
  }

  .page {
    padding: 1rem;
  }

  .kpis {
    grid-template-columns: 1fr;
  }

  .panel {
    padding: 1rem;
  }
}
