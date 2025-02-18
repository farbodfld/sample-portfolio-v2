# My Portfolio

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). This project serves as a personal portfolio website to showcase my projects, skills, and contact information.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Project Structure
The project is structured as follows:

* app: Contains the main application files.
    - page.tsx: The main landing page of the portfolio.
    -   projects/: Contains the project pages.
        * [id]/page.tsx: Dynamic route for individual project details.

* components: Contains reusable components.
    * Navbar.tsx: The navigation bar component.
    * Footer.tsx: The footer component.
    * ProjectCard.tsx: The project card component used to display project summaries.
    * PageTransition.tsx: The component for handling page transitions.

* public: Contains static assets such as images.

* styles/: Contains global and component-specific styles.

## Features
* Responsive Design: The portfolio is designed to be responsive and works well on different screen sizes.
* Dark Mode: Supports dark mode using the next-themes library.
* Smooth Page Transitions: Uses framer-motion for smooth page transitions.
* Dynamic Routing: Dynamic routes for individual project pages.
* SEO Optimization: Basic SEO optimization for better search engine visibility.

## Technologies Used
* Next.js: A React framework for building fast and user-friendly web applications.
* Tailwind CSS: A utility-first CSS framework for rapid UI development.
* Framer Motion: A library for animations and transitions.
* next-themes: A library for handling theme switching (light/dark mode).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Contact
Feel free to reach out if you have any questions or suggestions!

* Email: farbodfooladi@gmail.com
