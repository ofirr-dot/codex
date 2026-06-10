"use client";

import { useEffect, useMemo, useState } from "react";
import type { PortfolioSnapshot } from "@/lib/types";

const tabs = [
  { id: "overview", label: "סקירה" },
  { id: "holdings", label: "אחזקות" },
  { id: "cash", label: "מזומן ובנקים" },
  { id: "savings", label: "חיסכון לילדים" }
] as const;

type TabId = (typeof tabs)[number]["id"];

const shekel = new Intl.NumberFormat("he-IL", {
  style: "currency",
  currency: "ILS",
  maximumFractionDigits: 0
});

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

function pct(value: number) {
  if (!Number.isFinite(value)) return "0.0%";
  return `${(value * 100).toFixed(1)}%`;
}

function cls(value: number) {
  return value >= 0 ? "positive" : "negative";
}

export default function Home() {
  const [tab, setTab] = useState<TabId>("overview");
  const [data, setData] = useState<PortfolioSnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/portfolio", { cache: "no-store" });
      const nextData = await response.json();
      setData(nextData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "שגיאה בטעינת הנתונים");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const topHoldings = useMemo(() => {
    return [...(data?.holdings ?? [])].sort((a, b) => b.valueIls - a.valueIls).slice(0, 6);
  }, [data]);

  return (
    <main>
      <header className="topbar">
        <div>
          <div className="brand">תיק <span>Ofir</span></div>
          <div className="subline">
            {data ? `עודכן: ${data.meta.updatedAt} | USD/ILS ${data.meta.usdIls.toFixed(4)}` : "טוען נתונים"}
          </div>
        </div>
        <div className="actions">
          {data?.meta.source === "demo" && <span className="pill warn">מצב דמו</span>}
          <button className="refresh" onClick={load} disabled={loading}>
            {loading ? "טוען..." : "רענן"}
          </button>
        </div>
      </header>

      <nav className="tabs" aria-label="ניווט בדשבורד">
        {tabs.map((item) => (
          <button
            key={item.id}
            className={tab === item.id ? "active" : ""}
            onClick={() => setTab(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {error && <section className="error">{error}</section>}

      {!data ? (
        <section className="loading">מכין את הדשבורד...</section>
      ) : (
        <>
          {tab === "overview" && (
            <section className="page">
              <div className="kpis">
                <Kpi label="שווי כולל" value={shekel.format(data.summary.totalValueIls)} note={usd.format(data.summary.totalValueIls / data.meta.usdIls)} />
                <Kpi label="אחזקות" value={shekel.format(data.summary.holdingsValueIls)} note={pct(data.summary.holdingsValueIls / data.summary.totalValueIls)} />
                <Kpi label="בנקים ומזומן" value={shekel.format(data.summary.banksValueIls + data.summary.cashValueIls)} note={pct((data.summary.banksValueIls + data.summary.cashValueIls) / data.summary.totalValueIls)} />
                <Kpi label="תשואה" value={shekel.format(data.summary.totalReturnIls)} note={pct(data.summary.totalReturnPct)} tone={cls(data.summary.totalReturnIls)} />
              </div>

              <section className="panel">
                <div className="panelHead">
                  <h2>הרכב התיק</h2>
                  <span>{shekel.format(data.summary.totalValueIls)}</span>
                </div>
                <div className="allocList">
                  {data.allocation.map((item) => (
                    <div className="alloc" key={item.label}>
                      <div className="allocText">
                        <span>{item.label}</span>
                        <b>{shekel.format(item.valueIls)} · {pct(item.pct)}</b>
                      </div>
                      <div className="bar">
                        <i style={{ width: `${Math.max(item.pct * 100, 1)}%`, background: item.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="panel">
                <div className="panelHead">
                  <h2>אחזקות מובילות</h2>
                  <span>{topHoldings.length} פריטים</span>
                </div>
                <Table
                  headers={["סימבול", "מקור", "שווי", "תשואה"]}
                  rows={topHoldings.map((item) => [
                    <strong key="symbol">{item.symbol}</strong>,
                    item.source,
                    shekel.format(item.valueIls),
                    <span key="ret" className={cls(item.returnIls)}>{shekel.format(item.returnIls)} · {pct(item.returnPct)}</span>
                  ])}
                />
              </section>
            </section>
          )}

          {tab === "holdings" && (
            <section className="page">
              <section className="panel">
                <div className="panelHead">
                  <h2>אחזקות</h2>
                  <span>{data.holdings.length} שורות</span>
                </div>
                <Table
                  headers={["סימבול", "שם", "מקור", "כמות", "מחיר", "שווי", "תשואה"]}
                  rows={data.holdings.map((item) => [
                    <strong key="symbol">{item.symbol}</strong>,
                    item.name,
                    item.source,
                    item.quantity.toLocaleString("he-IL"),
                    item.currency === "USD" ? usd.format(item.currentPrice) : shekel.format(item.currentPrice),
                    shekel.format(item.valueIls),
                    <span key="ret" className={cls(item.returnIls)}>{shekel.format(item.returnIls)} · {pct(item.returnPct)}</span>
                  ])}
                />
              </section>
            </section>
          )}

          {tab === "cash" && (
            <section className="page">
              <div className="cashHero">
                <span>מזומן ונזילות</span>
                <strong>{shekel.format(data.summary.cashValueIls + data.summary.banksValueIls)}</strong>
                <small>{usd.format((data.summary.cashValueIls + data.summary.banksValueIls) / data.meta.usdIls)}</small>
              </div>
              <div className="cards">
                {data.banks.map((account) => (
                  <article className="miniCard" key={`${account.institution}-${account.accountType}-${account.currency}`}>
                    <span>{account.institution}</span>
                    <h3>{account.accountType}</h3>
                    <strong>{account.currency === "ILS" ? shekel.format(account.balance) : `${account.balance.toLocaleString("en-US")} ${account.currency}`}</strong>
                    <small>שווי: {shekel.format(account.valueIls)}</small>
                  </article>
                ))}
              </div>
            </section>
          )}

          {tab === "savings" && (
            <section className="page">
              <section className="panel">
                <div className="panelHead">
                  <h2>חיסכון לכל ילד</h2>
                  <span>{shekel.format(data.summary.savingsValueIls)}</span>
                </div>
                <Table
                  headers={["שם", "קופה", "מסלול", "עודכן", "ביטוח לאומי", "הורים", "סה\"כ"]}
                  rows={data.savings.map((item) => [
                    <strong key="name">{item.childName}</strong>,
                    item.fund,
                    item.track,
                    item.updatedAt,
                    shekel.format(item.bituachLeumi),
                    shekel.format(item.parents),
                    shekel.format(item.total)
                  ])}
                />
              </section>
            </section>
          )}
        </>
      )}
    </main>
  );
}

function Kpi({ label, value, note, tone }: { label: string; value: string; note: string; tone?: string }) {
  return (
    <article className="kpi">
      <span>{label}</span>
      <strong className={tone}>{value}</strong>
      <small>{note}</small>
    </article>
  );
}

function Table({ headers, rows }: { headers: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="tableWrap">
      <table>
        <thead>
          <tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
