# BaldApe Services - Professional Discord Community Management

A professional website showcasing Discord community management services, portfolio, and client testimonials.

## 🌟 Overview

BaldApe Services specializes in transforming Discord communities through professional setup, optimization, and ongoing management. This website is now powered by a modern React application, with the legacy HTML/CSS site archived in `/archive`.

## 🚀 Features

- Modern React app with routing and dynamic content
- Responsive, mobile-first design
- Portfolio, testimonials, and service showcase
- All static assets and images are in `public/images/portfolio/`

## 📁 File Structure

```
programmersalesman.github.io/
├── archive/                        # Archived legacy HTML/CSS site
│   ├── index.html
│   ├── about.html
│   ├── services.html
│   ├── portfolio.html
│   ├── testimonials.html
│   ├── contact.html
│   ├── styles/
│   ├── scripts/
│   ├── api/
│   └── favicon.ico
├── public/
│   └── images/portfolio/           # All static assets for React app
│       ├── bots/
│       ├── servers/
│       ├── organization/
│       └── transformations/
├── src/                            # React source files
├── app/                            # React app logic/routes
├── ... (configs, scripts, etc.)
├── TODO.md
└── README.md
```

## 🛠️ Development & Deployment

### Local Development
1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the development server:
   ```sh
   npm run dev
   ```
   The app will be available at `http://localhost:5173`.

### Building for Production
1. Build the app:
   ```sh
   npm run build
   ```
2. Deploy the contents of the `build/` directory to your preferred hosting (e.g., GitHub Pages, Vercel, Netlify).

## 🗂️ Legacy Site

The previous static HTML/CSS site is preserved in `/archive` for reference. All new development should be done in the React app.

## 📦 Static Assets

All images and static assets required by the React app are located in `public/images/portfolio/` and its subdirectories. If you add new images, place them here.

## 📄 License

© 2025 BaldApe Services. All rights reserved.

---

*Professional Discord community management services for growing communities.*
