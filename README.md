# ReviewIQ - AI Review Intelligence Dashboard

ReviewIQ is a premium SaaS-style dashboard concept for customer review operations. It brings review volume, sentiment movement, urgent issues, AI-generated insights, and response workflows into a single executive-ready command center.

![ReviewIQ dashboard screenshot](assets/dashboard-screenshot.png)

## Highlights

- Premium B2B SaaS interface with a polished sidebar, executive status pills, KPI cards, and quick-action dock
- AI review intelligence sections for pattern detection, issue clustering, escalation, and reply drafting
- Responsive layout with a mobile off-canvas menu and stacked dashboard sections
- Interactive filters for platform, product, sentiment, status, rating, and urgency
- Recent review table with reply, escalation, and resolution actions
- Static single-page implementation that runs directly in the browser

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Lucide icons
- Google Fonts / Inter

## Project Structure

```text
.
|-- assets/
|   `-- dashboard-screenshot.png
|-- index.html
|-- README.md
`-- .gitignore
```

## Run Locally

Open `index.html` directly in a browser, or serve the folder locally:

```bash
python -m http.server 8787
```

Then visit:

```text
http://127.0.0.1:8787/
```

## Key Sections

- **Customer Signal Command Center:** executive snapshot with health score, SLA risk, draft replies, and escalations
- **Review Filters:** quick operational filtering across platforms, products, sentiment, status, rating, and urgency
- **KPI Layer:** total reviews, average rating, negative reviews, sentiment, response rate, and urgent issues
- **Analytics Cards:** rating distribution, platform share, top issue categories, and sentiment trend
- **AI Assistant:** selected review context, tone selector, generated reply, and owner actions
- **Product Signals:** product-level quality, packaging, complaint, and satisfaction indicators

## Deployment

This is a static project and can be deployed on GitHub Pages, Netlify, Vercel, or any static hosting service. For GitHub Pages, publish the repository and enable Pages from the repository settings using the `main` branch root.

## Status

The dashboard is a front-end prototype with local mock data. It is ready for portfolio presentation, UI review, or future integration with review APIs and backend services.
