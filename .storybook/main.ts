import type { StorybookConfig } from '@storybook/nextjs'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const reactDomShimReact18 = require.resolve('@storybook/react-dom-shim')

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: ['../public'],
  webpackFinal: async (webpackConfig) => {
    webpackConfig.resolve = webpackConfig.resolve ?? {}
    webpackConfig.resolve.alias = {
      ...(webpackConfig.resolve.alias ?? {}),
      '@storybook/react/node_modules/@storybook/react-dom-shim/dist/react-18.js':
        reactDomShimReact18,
      './node_modules/@storybook/react/node_modules/@storybook/react-dom-shim/dist/react-18.js':
        reactDomShimReact18,
    }

    return webpackConfig
  },
}

export default config
