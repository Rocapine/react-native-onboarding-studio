import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Rocapine Onboarding Studio',
  tagline: 'CMS-driven onboarding for React Native apps',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://rocapine.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // Use '/' for root domain or Cloudflare/Netlify/Vercel
  // Use '/<projectName>/' for GitHub Pages subdirectory (e.g., '/react-native-onboarding-studio/')
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'rocapine', // Usually your GitHub org/user name.
  projectName: 'react-native-onboarding-studio', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Edit this page links
          editUrl:
            'https://github.com/rocapine/react-native-onboarding-studio/tree/main/docs/',
          routeBasePath: 'docs',
        },
        blog: false, // Disable blog for now
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Rocapine Onboarding',
      logo: {
        alt: 'Rocapine Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://github.com/rocapine/react-native-onboarding-studio',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://www.npmjs.com/package/@rocapine/react-native-onboarding-studio',
          label: 'npm',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/getting-started',
            },
            {
              label: 'API Reference',
              to: '/docs/api-reference',
            },
            {
              label: 'Customization',
              to: '/docs/customization/intro',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/rocapine/react-native-onboarding-studio',
            },
            {
              label: 'npm Package',
              href: 'https://www.npmjs.com/package/@rocapine/react-native-onboarding-studio',
            },
            {
              label: 'Contributing',
              href: 'https://github.com/rocapine/react-native-onboarding-studio/blob/main/CONTRIBUTING.md',
            },
          ],
        },
        {
          title: 'Support',
          items: [
            {
              label: 'Issues',
              href: 'https://github.com/rocapine/react-native-onboarding-studio/issues',
            },
            {
              label: 'Email',
              href: 'mailto:support@rocapine.com',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Rocapine. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
