#!/usr/bin/env node

import yargs from 'yargs'
import {hideBin} from 'yargs/helpers'
import {downloadSchema} from './utils/download-schema.js'

yargs(hideBin(process.argv))
  .scriptName('gql-tools')
  .usage('$0 <cmd> [args]')
  .command(
    'schema [url] [outputPath] [fileName]',
    'welcome ter yargs',
    (yargs) => {
      return yargs
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
    },
    downloadSchema
  )
  .help().argv
