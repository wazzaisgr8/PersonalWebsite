# PersonalWebsite
Warren Spier © 2026 Strategic Thinker | Digital Transformation Leader
Model: WS-2026-PRO | Warren Spier Portfolio
Strategic Thinking • Digital Innovation • Product Information & Workflow
This repository contains the source code for the personal portfolio of Warren Spier. The site is built with a "Brutalist-Technical" aesthetic, prioritising high performance, readability, and a strategic, data-driven narrative.

🛠 Specifications (Stack)
HTML5: Semantic structure.
CSS3 / Tailwind CSS: Custom configuration for a monochrome, high-contrast, sharp-border design (borderRadius: 0px).
Vanilla JavaScript: Lightweight interactivity (Carousel, Smooth Scroll, and Navigation logic).

Typography:
Space Grotesk: Primary display and headers.
Space Mono: Technical labels, tags, and data specifications.
Icons: Material Symbols Outlined (Weight: 300).

🏗 Core Modules
1. Project Carousel
A custom-built, lightweight slider showcasing active and historical projects.

File: script.js

Logic: Uses CSS translateX transforms for GPU-accelerated performance.

Featured Projects:
SuperSimple: A React/TypeScript webapp for superannuation comparison.
CIWI: Carer Inclusive Workplace Initiative committee work.
Bupa: Strategic Workforce Plan and target operating model architecture.

2. Active Initiatives
A section highlighting ongoing professional commitments, including Illumine.Care and Mercy's Digital Transformation.

3. Navigation & UX
Smooth Scroll: Native browser behavior for internal anchor links (#parts-overview, #about, etc.).
Responsive Design: Mobile-first architecture with adaptive layouts for tablet and desktop viewports.
Dark Mode: Fully configured via Tailwind's dark class, respecting the system preferences of the user.

📂 File Structure
Plaintext

├── index.html          # Main site structure and Tailwind configuration
├── style.css           # Custom carousel styling and aesthetic overrides
├── script.js          # Carousel logic and UX interactivity
├── img/                # Asset directory
│   ├── warrenspier_portrait.jpg
│   ├── supersimple.png
│   └── ciwi.jpeg
└── README.md           # This documentation

🚀 Local Implementation
Clone/Download: Ensure all files (index.html, style.css, script.js) are in the same root directory.
Asset Check: Place your project images in the root or an img/ folder (ensure paths in index.html match).
Run: Open index.html in any modern web browser.

📝 Developer Notes
Fonts: The site pre-connects to Google Fonts for optimal loading speed.
Scalability: New projects can be added to the carousel simply by adding a new .project-slide div to the .carousel-track. The JavaScript will automatically recalculate the slide array and navigation.
