import esbuild from "esbuild";
import { sassPlugin } from 'esbuild-sass-plugin';
import path from 'path';
import fs from 'fs';

const dir = './SCSS/snippets';
const files = fs.readdirSync(dir)

const flags = process.argv;

const options = {
  production: flags.includes('production'),
  snippet: flags.includes('snippet'),
}

function createSnippetArray () {
  return files.map(file => {
    return path.join(dir,file)
  })
}

const outOptions = options.snippet ? {
  outdir: "./snippets",
} : { outfile: "./obsidian.css" };

esbuild.build({
    entryPoints: options.snippet ? createSnippetArray() : ["./SCSS/Spectrum.scss"],
    ...outOptions,
    minify: options.production,
    plugins: [sassPlugin()],
})

