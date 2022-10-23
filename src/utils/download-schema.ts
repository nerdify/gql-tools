import got from 'got'
import fs from 'node:fs'
import path from 'node:path'

import {
  buildClientSchema,
  getIntrospectionQuery,
  printSchema,
  type IntrospectionQuery,
} from 'graphql'

async function getRemoteSchema(url: string | URL) {
  const response = await got.post<{data: IntrospectionQuery}>(url, {
    json: {
      query: getIntrospectionQuery(),
    },
    responseType: 'json',
  })

  return response.body.data
}

function printToFiles(
  pathName: string,
  fileName: string,
  introspectionQuery: IntrospectionQuery
) {
  const schema = buildClientSchema(introspectionQuery)
  const finalPath = path.resolve(pathName, fileName)

  try {
    fs.writeFileSync(finalPath, printSchema(schema))
  } catch {
    const pathRegex = /.+\/(?<file>:*.+)$/
    const file = pathRegex.exec(finalPath)?.groups?.file

    if (!file) {
      throw new Error('Not file found')
    }

    const dirFile = finalPath.replace(file, '')

    fs.mkdirSync(dirFile, {recursive: true})
    fs.writeFileSync(finalPath, printSchema(schema))
  }
}

interface DownloadSchemaOptions {
  /** URL to fetch graphQL introspection query*/
  url: string | URL
  /** Path where the graphql schema will be written */
  outputPath: string
  /** Name of graphql file */
  fileName: string
}

export async function downloadSchema({
  url,
  outputPath,
  fileName,
}: DownloadSchemaOptions) {
  try {
    const schema = await getRemoteSchema(url)

    printToFiles(outputPath, fileName, schema)
  } catch (err) {
    console.error(err)
  }
}
