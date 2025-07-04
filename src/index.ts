import { h, s } from 'hastscript'
import type { Element } from 'hast'
import type { ShikiTransformer } from '@shikijs/types'

export type HeaderOptions = {
  headerClass?: string
  langClass?: string
  copyButtonClass?: string
  copyReadyIconClass?: string
  copySuccessIconClass?: string
  preClass?: string
  codeWrapperClass?: string
  showButtonText?: boolean
}

export function addHeaderWithCopy(options?: HeaderOptions): ShikiTransformer {
  const headerClass = `shiki-header-with-copy ${options?.headerClass ?? ''}`.trim()
  const langClass = `lang ${options?.langClass ?? ''}`.trim()
  const copyButtonClass = `copy ${options?.copyButtonClass ?? ''}`.trim()
  const copyReadyIconClass = `ready ${options?.copyReadyIconClass ?? ''}`.trim()
  const copySuccessIconClass = `success ${options?.copySuccessIconClass ?? ''}`.trim()
  const preClass = `shiki-pre ${options?.preClass ?? ''}`.trim()
  const codeWrapperClass = `code-wrapper ${options?.codeWrapperClass ?? ''}`.trim()
  const showButtonText = options?.showButtonText ?? false

  return {
    code(node: Element) {
      return h('div', { class: codeWrapperClass }, [node])
    },
    pre(node: Element) {
      node.properties.class = node.properties.class ? `${node.properties.class} ${preClass}` : preClass
      const langEl = h('span', { class: langClass }, this.options.lang)

      const button = h(
        'button',
        {
          class: copyButtonClass,
          onclick: `
          navigator.clipboard.writeText(this.parentElement.parentElement.lastElementChild.innerText);
          this.firstChild.style.display = 'none';
          this.lastChild.style.display = '';
          setTimeout(() => {
            this.firstChild.style.display = '';
            this.lastChild.style.display = 'none';
          }, 2000)
        `,
        },
        [
          h('span', { class: copyReadyIconClass }, [
            s(
              'svg',
              {
                xmlns: 'http://www.w3.org/2000/svg',
                width: '100%',
                height: '100%',
                viewBox: '0 0 24 24',
                fill: 'none',
                stroke: 'currentColor',
                'stroke-width': '2',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'data-svg': 'true',
              },
              [
                s('rect', {
                  width: '14',
                  height: '14',
                  x: '8',
                  y: '8',
                  rx: '2',
                  ry: '2',
                }),
                s('path', {
                  d: 'M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2',
                }),
              ]
            ),
            showButtonText ? h('span', {}, 'Copy') : null,
          ]),
          h('span', { class: copySuccessIconClass, style: 'display: none' }, [
            s(
              'svg',
              {
                xmlns: 'http://www.w3.org/2000/svg',
                width: '100%',
                height: '100%',
                viewBox: '0 0 24 24',
                fill: 'none',
                stroke: 'currentColor',
                'stroke-width': '2',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'data-svg': 'true',
              },
              [
                s('path', {
                  d: 'M20 6 9 17l-5-5',
                }),
              ]
            ),
            showButtonText ? h('span', {}, 'Copied') : null,
          ]),
        ]
      )

      const headerEl = h('div', { class: headerClass }, [langEl, button])

      if (headerEl) {
        node.children.unshift(headerEl)
      }
    },
  }
}
