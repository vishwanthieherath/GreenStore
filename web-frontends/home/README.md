### Install tailwindCSS
1. yarn add tailwindcss postcss autoprefixer
2. npx tailwindcss init -p
3. In tailwind.config.js replace content with the line below
        content: [
            "./src/**/*.{js,jsx,ts,tsx}",
            "./public/index.html",
        ],
4. In tailwind.css add the lines below
    @import "tailwindcss/base";
    @import "tailwindcss/components";
    @import "tailwindcss/utilities";
5. In root-config/index.ejs add the line below
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">