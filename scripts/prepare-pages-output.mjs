import { copyFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const outputDirectory = path.resolve('dist-pages');
const indexFile = path.join(outputDirectory, 'index.html');
const routes = ['about-us', 'services', 'get-quote', 'help-support'];

for (const route of routes) {
  const routeDirectory = path.join(outputDirectory, route);
  await mkdir(routeDirectory, { recursive: true });
  await copyFile(indexFile, path.join(routeDirectory, 'index.html'));
}

await copyFile(indexFile, path.join(outputDirectory, '404.html'));
