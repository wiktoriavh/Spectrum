import esbuild from "esbuild";
import { sassPlugin } from 'esbuild-sass-plugin';
import path from 'path';
import fs from 'fs';
import dotenv from "dotenv";

dotenv.config();

const dir = './SCSS/snippets';
const files = fs.readdirSync(dir)

const flags = process.argv;

const options = {
  production: flags.includes('production'),
  snippet: flags.includes('snippet'),
  development: flags.includes('development'),
}

function createSnippetArray () {
  return files.map(file => {
    return path.join(dir,file)
  })
}

const testingVaultPath = path.join(
  process.env.TESTING_VAULT_PATH,
  ".obsidian",
  "themes",
);

const outOptions = options.production ? {outfile: "./obsidian.css"} : options.snippet ? {outdir: "./snippets"} : {outdir: testingVaultPath};

const entrySettings = options.production ? ["./SCSS/Spectrum.scss"] : options.snippet ? createSnippetArray() : {"spectrum-testing": "./SCSS/Spectrum.scss"};

esbuild.build({
    entryPoints: entrySettings,
    ...outOptions,
    minify: options.production,
    plugins: [sassPlugin()],
    watch: options.development,
    treeShaking: options.production,
})

