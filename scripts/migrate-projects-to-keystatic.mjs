/**
 * One-off migration: reads projects from projects-data (via dynamic import of the built file or a JSON export)
 * and writes content/projects/<slug>/index.yaml for Keystatic.
 *
 * Run from repo root: node scripts/migrate-projects-to-keystatic.mjs
 * Prerequisite: export projects to scripts/projects-export.json (or we read from source).
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

// Project data inlined from src/projects-data.ts (first project only for seed; extend as needed)
const projects = [
  {
    slug: 'custom-e-commerce-solution',
    title: 'Custom E-Commerce Solution',
    headerImage: '/project-assets/international-salon-supplies-home.png',
    technologiesUsed: ['Next.js', 'WordPress', 'Retail Express', 'Elasticsearch', 'Nest.js', 'RabbitMQ', 'Tailwind CSS', 'TypeScript', 'PostgreSQL', 'Docker', 'Digital Ocean', 'CI/CD'],
    headerDescription: `I developed a cutting-edge e-commerce solution that combines modern technologies, seamless ERP integration, and Progressive Web App (PWA) capabilities to deliver an exceptional user experience and optimize business processes. The platform is built with a strong focus on scalability, performance, and responsiveness, ensuring it meets the demands of a dynamic and competitive market.
By leveraging Next.js, WordPress and Nest.js for a full-stack implementation, the solution provides a cohesive environment for frontend and backend operations. Elasticsearch powers advanced search functionality, while RabbitMQ ensures smooth communication between the website and ERP system for real-time data synchronization.
This solution has proven to be a robust, scalable, and efficient tool for business, offering not only an engaging shopping experience for customers but also a streamlined workflow for administrators.`,
    content: `<h3><strong>Client: </strong>International Salon Supplies</h3>
<h3><strong>Role:</strong> Full Stack Developer</h3>
<h3><strong>Features</strong></h3>
<ol>
  <li><strong>Restrict Unregistered Users</strong></li>
  <li><strong>Hide Product Prices</strong></li>
  <li><strong>ERP Integration for Order Management</strong></li>
  <li><strong>Advanced Search with Elasticsearch</strong></li>
  <li><strong>Abandoned Cart Recovery</strong></li>
  <li><strong>Secure Payment Gateway Integration</strong></li>
</ol>
<h3><strong>Links</strong></h3>
<p><a href="https://www.internationalsalonsupplies.com.au/">https://www.internationalsalonsupplies.com.au/</a></p>`,
  },
]

function escapeYamlString(s) {
  if (s.includes('\n') || s.includes('"') || s.includes(':')) {
    return s.split('\n').map(line => '  ' + line.replace(/\\/g, '\\\\').replace(/"/g, '\\"')).join('\n')
  }
  return `"${String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`
}

const contentDir = path.join(root, 'content', 'projects')
if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true })
}

for (const p of projects) {
  const dir = path.join(contentDir, p.slug)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  // Keystatic image field with directory + publicPath may store filename; reader returns full path.
  const headerImage = p.headerImage.startsWith('/') ? p.headerImage.slice(1).replace(/^project-assets\//, '') : p.headerImage
  const yaml = `title: ${JSON.stringify(p.title)}
headerImage: ${JSON.stringify(headerImage)}
technologiesUsed:
${p.technologiesUsed.map(t => `  - ${JSON.stringify(t)}`).join('\n')}
headerDescription: ${JSON.stringify(p.headerDescription)}
content: ${JSON.stringify(p.content)}
`
  fs.writeFileSync(path.join(dir, 'index.yaml'), yaml, 'utf8')
  console.log('Wrote', path.join(dir, 'index.yaml'))
}

console.log('Done. Run dev and open /keystatic to edit, or add more projects there.')
