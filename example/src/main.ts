import './vite-style.css'
import './header-style.css'
import { codeToHtml } from 'shiki'
import { addHeaderWithCopy } from 'shiki-header-with-copy'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Shiki header with copy button</h1>
    <div class="card">
      <div id="shiki"></button>
    </div>
  </div>
`


const shikiElement = document.querySelector<HTMLButtonElement>('#shiki')!

const code = `// Function to calculate the area and perimeter of a rectangle
function rectangleProperties(length, width) {
  // Calculate the area
  const area = length * width;
  
  // Calculate the perimeter
  const perimeter = 2 * (length + width);
  
  return { area, perimeter };
}

// Example usage:
const dimensions = { length: 10, width: 5 };
const { area, perimeter } = rectangleProperties(dimensions.length, dimensions.width);

console.log(\`Area: \${area}\`);
console.log(\`Perimeter: \${perimeter}\`);
`

const html = await codeToHtml(code, {
    lang: 'javascript',
    theme: 'github-dark',
    transformers: [
      addHeaderWithCopy({
        showButtonText: true,
      })
    ],
})

shikiElement.innerHTML = html
