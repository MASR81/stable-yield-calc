# The 2026 Crypto Wealth Tracker (Notion Template Blueprint)

This document provides the exact schema and instructions for you (the creator) to build the Notion Template that you will sell to your audience. 

## How to Build the Product in Notion
Open a new blank workspace in Notion. Create a master page called **"Crypto Wealth Tracker & Dashboard"**. You will create four inline databases on this page.

---

### Database 1: Portfolio Balances & Yield
**Type:** Table Database
**Purpose:** To track where assets are held and how much they are yielding.

**Properties (Columns):**
1.  **Name (Title):** The name of the Asset (e.g., USDC, BTC, ETH)
2.  **Ticker (Text):** The symbol (e.g., USDC)
3.  **Platform (Select):** Where it's held (Coinbase, Nexo, Aave, Phantom, Cold Storage)
4.  **Quantity (Number):** Total amount held.
5.  **Average Purchase Price (Number - USD):** What you bought it at.
6.  **Current Price (Number - USD):** Current market price (User updates manually or via integration).
7.  **Total Value (Formula):** `prop("Quantity") * prop("Current Price")` (Format as USD)
8.  **Current APY (Number - Percent):** The yield it is currently generating.
9.  **Daily Passive Income (Formula):** `(prop("Total Value") * prop("Current APY")) / 365`

---

### Database 2: The "Gas Fee" & Tax-Loss Tracker
**Type:** List Database
**Purpose:** To record all taxable events and write-offs (like expensive Ethereum gas fees or bridged assets).

**Properties (Columns):**
1.  **Transaction Name (Title):** E.g., "Bridge USDC to Polygon" or "Sell BTC at loss"
2.  **Date (Date):** Timestamp of transaction.
3.  **Type (Select):** Loss Realization, Gas Fee, Bridge Fee, Hack/Loss.
4.  **Amount Lost/Spent (Number - USD):** The deductible amount.
5.  **Tax Software Logged? (Checkbox):** To ensure Koinly/Moneyspire caught it.

---

### Database 3: Investment Journal & Thesis
**Type:** Gallery Database
**Purpose:** A place for investors to write down *why* they bought a coin, preventing emotional selling during market crashes.

**Properties (Columns):**
1.  **Thesis Name (Title):** E.g., "Why I hold 30% in Stablecoins"
2.  **Asset Target (Relation):** Link to the specific coin in **Database 1**.
3.  **Conviction Level (Select):** Low, Medium, High, Institutional.
4.  **Buy Zone (Number):** The price range they are accumulating.
5.  **Sell Target (Number):** The mathematical exit target.

---

### Database 4: The Regulatory Compliance Log
**Type:** Board / Kanban Database
**Purpose:** Tracking the MiCA and SEC risk of the portfolio (similar to the website's checker).

**Groups (Kanban Columns):**
- Low Risk (Green)
- Medium Risk (Yellow)
- High Risk / Unregistered (Red)

**Properties (Columns):**
1.  **Asset (Relation):** Link to **Database 1**.
2.  **MiCA Status (Text):** Current EU status.
3.  **SEC Litigation (Text):** Current US status.
4.  **Last Audit Date (Date):** When the stablecoin/exchange last proved reserves.

---

## How to Package and Sell This
1.  Once you build the databases with the properties above, add a nice cover image (maybe a glassmorphism graphic) and an icon.
2.  Fill out the first 3 rows of each database with "Mock Data" as an example for the customer.
3.  Click **Share** in the top right of Notion, go to the **Publish** tab, and turn on **"Publish to web"**.
4.  Make sure **"Allow duplicate as template"** is toggled ON.
5.  Copy the web link. This is the link you provide via Gumroad/Stripe after the user purchases the product for $49.00!
