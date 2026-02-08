# Copilot Instructions for PersonalWebsite

Welcome to the `PersonalWebsite` project! This document provides guidance for AI coding agents to effectively contribute to this codebase. Please follow these instructions to ensure consistency and maintain the project's standards.

## Project Overview
This repository contains the source code for the personal portfolio of Warren Spier, built with a "Brutalist-Technical" aesthetic. The project emphasizes high performance, readability, and a strategic, data-driven narrative.

### Key Features
1. **Project Carousel**
   - File: `script.js`
   - Implements a lightweight slider using CSS `translateX` transforms for GPU-accelerated performance.
   - New projects can be added by appending a `.project-slide` div to the `.carousel-track`. The JavaScript automatically recalculates the slide array and navigation.

2. **Active Initiatives**
   - Highlights ongoing professional commitments.

3. **Navigation & UX**
   - Smooth scrolling for internal anchor links (e.g., `#parts-overview`, `#about`).
   - Mobile-first responsive design with adaptive layouts for tablet and desktop.
   - Dark mode support using Tailwind's `dark` class, respecting system preferences.

## File Structure
```
├── index.html          # Main site structure and Tailwind configuration
├── style.css           # Custom carousel styling and aesthetic overrides
├── script.js           # Carousel logic and UX interactivity
├── img/                # Asset directory
│   ├── warrenspier_portrait.jpg
│   ├── supersimple.png
│   └── ciwi.jpeg
└── README.md           # Project documentation
```

## Development Guidelines

### 1. Adding New Projects to the Carousel
- Add a new `.project-slide` div to the `.carousel-track` in `index.html`.
- Ensure the new slide follows the existing structure for consistency.
- The JavaScript in `script.js` will automatically handle the new slide.

### 2. Styling
- Use `style.css` for custom styles.
- Follow the "Brutalist-Technical" aesthetic: monochrome, high-contrast, sharp borders, and no border radius.
- Use Tailwind CSS for utility-first styling. Avoid inline styles unless absolutely necessary.

### 3. JavaScript
- All interactivity is implemented in vanilla JavaScript.
- Use `script.js` for carousel and navigation logic.
- Avoid adding external JavaScript libraries unless absolutely necessary.

### 4. Assets
- Store all images in the `img/` directory.
- Ensure paths in `index.html` match the actual file locations.

### 5. Fonts
- The site uses Google Fonts (Space Grotesk and Space Mono). Ensure any new fonts are pre-connected for optimal loading speed.

## Local Development
1. Clone or download the repository.
2. Ensure all files (`index.html`, `style.css`, `script.js`) are in the same root directory.
3. Place project images in the `img/` folder.
4. Open `index.html` in any modern web browser to view the site.

## Notes for AI Agents
- Prioritize performance and simplicity in all code contributions.
- Maintain the existing design aesthetic and coding patterns.
- When adding new features, ensure they integrate seamlessly with the current structure and logic.
- Avoid introducing unnecessary dependencies or frameworks.

For any questions or clarifications, refer to the `README.md` or consult the project owner.