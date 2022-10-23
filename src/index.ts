#!/usr/bin/env node

import yargs, {type Argv} from 'yargs'
import {hideBin} from 'yargs/helpers'
import {downloadSchema} from './utils/download-schema.js'

function schemaBuilder(argv: Argv) {
  return argv
    .positional('url', {
      type: 'string',
      describe: 'API-GQL URL',
    })
    .positional('outputPath', {
      type: 'string',
      default: process.cwd(),
    })
    .positional('fileName', {
      type: 'string',
      default: 'schema.graphql',
    })
    .demandOption(['url'])
}

yargs(hideBin(process.argv))
  .scriptName('gql-tools')
  .usage('$0 <cmd> [args]')
  .command(
    'schema [url] [outputPath] [fileName]',
    'welcome ter yargs',
    schemaBuilder,
    downloadSchema
  )
  .help().argv
