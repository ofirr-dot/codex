# Google Sheets Schema

## Settings

General app settings only. Do not put tokens here.

| Column A | Column B |
| --- | --- |
| USD_ILS_FALLBACK | Fallback FX rate |
| ALERT_DOWN_PCT | Future alert setting |
| ALERT_UP_PCT | Future alert setting |

## Holdings

Main table for IBKR, FAIR and manual assets.

| Column | Meaning |
| --- | --- |
| Symbol | Ticker or internal symbol, for example `VOO` or `FAIR-CASH` |
| Name | Display name |
| Source | `IBKR`, `FAIR`, or `MANUAL` |
| Asset Type | `ETF`, `Stock`, `Bond`, `מזומן`, etc. |
| Currency | `USD`, `ILS`, etc. |
| Quantity | Units |
| Buy Price | Original unit price |
| Current Price | Current unit price |
| FX Rate Override | Optional manual FX rate |
| Cost ILS Override | Optional total cost in ILS |
| Value ILS Override | Optional current value in ILS |
| Notes | Free text, not displayed prominently |

## Bank Accounts

| Column | Meaning |
| --- | --- |
| Institution | Bank name |
| Account Type | Current account, deposit, savings, etc. |
| Currency | `ILS`, `USD`, etc. |
| Balance | Balance in original currency |
| FX Rate | Optional rate to ILS |
| Value ILS Override | Optional exact ILS value |

## Child Savings

| Column | Meaning |
| --- | --- |
| Child Name | Display name |
| Fund | Fund/provider |
| Track | Investment track |
| Updated At | Last manual update |
| Bituach Leumi | Amount from National Insurance |
| Parents | Parent contribution |
| Total Override | Optional exact total |

## Realized Gains

Prepared for the next phase. V1 creates the sheet but does not yet show realized gains on the dashboard.
