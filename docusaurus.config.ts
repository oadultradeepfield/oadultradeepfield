import type * as Preset from "@docusaurus/preset-classic";
import type {Config} from "@docusaurus/types";
import {themes as prismThemes} from "prism-react-renderer";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
    title: "Hi! I'm Phanuphat (Oad).",
    tagline:
        "I am an Astronomy Olympiad Medalist turned Computer Science major at NUS. While I first pursued AI, I later found myself drawn to areas like networking, compilers, and parallel computing. Beyond academics, I love building simple yet powerful software that makes a positive impact across disciplines :)",
    favicon: "img/favicon.ico",

    // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
    future: {
        v4: true, // Improve compatibility with the upcoming Docusaurus v4
    },

    // Set the production url of your site here
    url: "https://phanuphats.com",
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: "/",

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: "oadultradeepfield", // Usually your GitHub org/user name.
    projectName: "oadultradeepfield", // Usually your repo name.

    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: "en",
        locales: ["en"],
    },

    presets: [
        [
            "classic",
            {
                docs: false,
                blog: {
                    showReadingTime: true,
                    feedOptions: {
                        type: ["rss", "atom"],
                        xslt: true,
                    },
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    // editUrl:
                    //   "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
                    // Useful options to enforce blogging best practices
                    onInlineTags: "warn",
                    onInlineAuthors: "warn",
                    onUntruncatedBlogPosts: "warn",
                    remarkPlugins: [remarkMath],
                    rehypePlugins: [rehypeKatex],
                },
                theme: {
                    customCss: "./src/css/custom.css",
                },
            } satisfies Preset.Options,
        ],
    ],

    plugins: [
        [
            "@docusaurus/plugin-content-blog",
            {
                id: "projects",
                routeBasePath: "projects",
                path: "./projects",
                showReadingTime: true,
                blogTitle: "Projects",
                blogDescription: "A list of my projects",
                postsPerPage: "ALL",
            },
        ],
    ],

    stylesheets: [
        {
            href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
            type: "text/css",
            integrity:
                "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
            crossorigin: "anonymous",
        },
    ],

    themeConfig: {
        // Replace with your project's social card
        image: "img/docusaurus-social-card.jpg",
        navbar: {
            title: "oadultradeepfield",
            logo: {
                alt: "oadultradeepfield Logo",
                src: "img/oadultradeepfield.jpg",
            },
            items: [
                {to: "/projects", label: "Projects", position: "left"},
                {to: "/blog", label: "Blog", position: "left"},
                {
                    href: "https://github.com/oadultradeepfield",
                    label: "GitHub",
                    position: "right",
                },
            ],
        },
        footer: {
            style: "dark",
            links: [
                {
                    title: "Quick Links",
                    items: [
                        {
                            label: "Projects",
                            to: "/projects",
                        },
                        {
                            label: "Blog",
                            to: "/blog",
                        },
                    ],
                },
                {
                    title: "More",
                    items: [
                        {
                            label: "LinkedIn",
                            href: "https://www.linkedin.com/in/phanuphats",
                        },
                        {
                            label: "GitHub",
                            href: "https://github.com/oadultradeepfield",
                        },
                    ],
                },
            ],
            copyright: `Copyright © ${new Date().getFullYear()} Phanuphat (Oad) Srisukhawasu. Built with Docusaurus.`,
        },
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
        },
    } satisfies Preset.ThemeConfig,

    markdown: {
        mermaid: true,
    },
    themes: ['@docusaurus/theme-mermaid'],
};

export default config;
