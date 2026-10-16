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
            dark: 'rgb(50, 50, 50)'
          }
        }
      },
      navbar: {
        title: 'Documentation',
        logo: {
          alt: 'eelDev',
          src: 'img/eeldev_icon.png',
        },
        items: [
          { href: 'https://eeldev.com', label: 'eeldev.com' },
          { href: 'https://www.fab.com/listings/01eebf59-f05a-42be-bc3f-6f4256edd33c', label: 'Fab Marketplace' },
          { href: 'https://www.youtube.com/channel/UC6Rhr_F5BxwfTtcADVPUNYA', label: 'YouTube', position: 'right' },
          { href: 'https://discord.gg/3Yu7pEy', label: 'Discord', position: 'right'},
          { href: 'https://twitter.com/dryeeldev', label: 'Twitter', position: 'right' },
        ],
      },
      footer: {
        style: 'dark',
        links: [],
        copyright: `Copyright © ${new Date().getFullYear()} eelDev AB`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['csharp', 'ini', 'bash', 'json'],
      },
    }
    ),
};

export default config;
