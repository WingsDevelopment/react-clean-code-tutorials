import "../src/app/globals.css"
import type { Preview } from '@storybook/react'
import * as React from "react"

const preview: Preview = {
  decorators: [
    (Story) =>
      React.createElement(
        "div",
        { className: "relative overflow-visible" },
        React.createElement(Story),
      ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      source: { type: "code" },
      canvas: { sourceState: "hidden" },
      codePanel: true,
    },
  },
}

export default preview
