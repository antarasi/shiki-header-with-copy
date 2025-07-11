# shiki-header-with-copy

[![npm version](https://img.shields.io/npm/v/shiki-header-with-copy)](https://npmjs.com/package/shiki-header-with-copy)
<!-- [![npm downloads](https://img.shields.io/npm/dm/shiki-header-with-copy)](https://npmjs.com/package/shiki-header-with-copy) -->

A Shiki transformer that adds a header with language display and a copy button to syntax-highlighted code blocks.

## Features

- ⚙️ Customizable header with language name display
- 📋 One-click copy functionality with visual feedback
- 🎨 Style it with CSS or Tailwind CSS classes
- 📦 ESM module support

## Demo

![Demo of shiki-header-with-copy in action](./docs/demo.webp)

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/antarasi/shiki-header-with-copy/tree/main/example?file=src%2Fmain.ts)


## Installation

```bash
npm install shiki-header-with-copy
```

## Usage

### Basic Usage

```typescript
import { codeToHtml } from 'shiki'
import { addHeaderWithCopy } from 'shiki-header-with-copy'

const code = 'const number = 1'

const html = await codeToHtml(code, {
    lang: 'javascript',
    theme: 'github-dark',
    transformers: [
      addHeaderWithCopy({
        showButtonText: true,
      })
    ],
})
```

### Style it with Tailwind CSS

```typescript
import { codeToHtml } from 'shiki'
import { addHeaderWithCopy } from 'shiki-header-with-copy'

const html = await codeToHtml(code, {
  theme: 'github-dark',
  transformers: [
    addHeaderWithCopy({
        headerClass: 'flex justify-between items-center px-4 pt-3 text-muted-foreground',
        preClass: 'overflow-x-hidden rounded-lg my-2',
        codeWrapperClass: 'px-4 py-4 overflow-x-auto',
        showButtonText: true,
        copyButtonClass: 'hover:text-accent px-2 group **:data-svg:h-[15px] *:flex *:items-center *:gap-2',
        copyReadyIconClass: '',
        copySuccessIconClass: '**:data-svg:text-green-500',
        langClass: 'text-sm',
    })
  ]
})
```

### Or style with your custom CSS

```css
pre:has(code) {
  border-radius: 10px;
  margin: 15px 0;
  position: relative;
  overflow-x: hidden;
}

pre:has(code) .shiki-header-with-copy {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
}

pre:has(code) .code-wrapper {
  overflow-x: auto;
  padding: 16px;
}

pre:has(code) .shiki-header-with-copy button {
  padding: 0 8px;
  background: none;
  outline: none;
  color: inherit;
  border: none;
}

pre:has(code) .shiki-header-with-copy button:hover {
  color: #3189f0;
}

pre:has(code) .shiki-header-with-copy button span {
  display: flex;
  align-items: center;
  gap: 4px;
}

pre:has(code) .shiki-header-with-copy button svg {
  height: 15px;
}

pre:has(code) .shiki-header-with-copy button span.success {
  color: #009900;
}
```

## Options

| Option | Type | Placed after class | Description |
|--------|------|---------|-------------|
| `headerClass` | `string` | `'shiki-header-with-copy'` | CSS class for the header container |
| `langClass` | `string` | `'lang'` | CSS class for the language text |
| `copyButtonClass` | `string` | `'copy'` | CSS class for the copy button |
| `copyReadyIconClass` | `string` | `'ready'` | CSS class for the copy icon |
| `copySuccessIconClass` | `string` | `'success'` | CSS class for the success icon |
| `preClass` | `string` | `'shiki'` | CSS class for the pre element |
| `codeWrapperClass` | `string` | `'code-wrapper'` | CSS class for the code wrapper |
| `showButtonText` | `boolean` | `false` | Whether to show text labels on the copy button |

## Generated HTML Structure

The transformer generates the following HTML structure:

```html
<div>
  <!-- ... -->
  <pre class="shiki shiki-themes [...preClass]">
    <div class="shiki-header-with-copy [...headerClass]">
      <span class="lang [...langClass]"><!-- language from fenced code block --></span>
      <button class="copy [...copyButtonClass]" onclick="...">
        <span class="ready [...copyReadyIconClass]">
          <svg><!-- Copy icon SVG --></svg>
          <span>Copy</span> <!-- Shown only if showButtonText is true -->
        </span>
        <span class="success [...copySuccessIconClass]" style="display: none">
          <svg><!-- Checkmark icon SVG --></svg>
          <span>Copied</span> <!-- Shown only if showButtonText is true -->
        </span>
      </button>
    </div>
    <div class="code-wrapper">
        <code><!-- Shiki highlighted code --></code>
    </div>
  </pre>
  <!-- ... -->
</div>
```

## Light/Dark Dual Themes

When using [dual themes](https://shiki.style/guide/dual-themes#query-based-dark-mode) to prevent shiki from styling the header togather with the rest of the `<pre>` content, simply add more specific css selector to the dark mode style:

### Query-based Dark Mode

```css
@media (prefers-color-scheme: dark) {
  .shiki,
  .shiki code span {  /* <--- "code" added here */
     ...
  }
}
```

### Class-based Dark Mode

```css
html.dark .shiki,
html.dark .shiki code span { /* <--- "code" added here */
  ...
}
```

Now only your custom classes/styles will be applied without `!important` overrides from shiki  🎉

## API Reference

### `addHeaderWithCopy(options?: HeaderOptions): ShikiTransformer`

Creates a Shiki transformer that adds a header with copy functionality.

#### `HeaderOptions`

```typescript
interface HeaderOptions {
  headerClass?: string
  langClass?: string
  copyButtonClass?: string
  copyReadyIconClass?: string
  copySuccessIconClass?: string
  preClass?: string
  codeWrapperClass?: string
  contentClass?: string
  showButtonText?: boolean
}
```

## Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Watch for changes
npm run dev

# Clean build artifacts
npm run clean
```

## Contributing

PRs and feature requests welcome!

## License

MIT
