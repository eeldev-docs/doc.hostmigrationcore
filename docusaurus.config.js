// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'HostMigrationCore Documentation',
  tagline: 'HostMigrationCore - Listen Server Host Migration Documentation',
  url: 'https://hostmigrationcore.eeldev.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/eeldev_icon.png',
  organizationName: 'eeldev-docs', // Usually your GitHub org/user name.
  projectName: 'doc.hostmigrationcore', // Usually your repo name.
  plugins: [require.resolve("docusaurus-plugin-image-zoom")],
  deploymentBranch: 'deployment',
  trailingSlash: false,
  customFields: {
    productName: 'HostMigrationCore',
  },
  stylesheets: [
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap',
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      zoom: {
        selector: '.markdown :not(em) > img',
        config: {
          // options you can specify via https://github.com/francoischalifour/medium-zoom#usage
          background: {
            light: 'rgb(255, 255, 255)',
            dark: 'rgb(17, 18, 20)'
          }
        }
      },
      colorMode: {
        defaultMode: 'dark',
        respectPrefersColorScheme: false,
      },
      navbar: {
        items: [
          { href: 'https://eeldev.com', label: 'Website', position: 'right' },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'eelDev',
            items: [
              { label: 'Website', href: 'https://eeldev.com' },
              { label: 'HostMigrationCore on Fab', href: 'https://www.fab.com/listings/01eebf59-f05a-42be-bc3f-6f4256edd33c' },
            ],
          },
          {
            title: 'Community',
            items: [
              { label: 'Discord', href: 'https://discord.gg/3Yu7pEy' },
              { label: 'YouTube', href: 'https://www.youtube.com/channel/UC6Rhr_F5BxwfTtcADVPUNYA' },
              { label: 'Twitter', href: 'https://twitter.com/dryeeldev' },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} eelDev AB`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.vsDark,
        additionalLanguages: ['csharp', 'ini', 'bash', 'json'],
      },
    }
    ),
};

export default config;
