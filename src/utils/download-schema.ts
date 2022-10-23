import got from 'got'
import fs from 'node:fs'
import path from 'node:path'

import {buildClientSchema, getIntrospectionQuery, printSchema} from 'graphql'

async function getRemoteSchema(url) {
  const response = await got.post(url, {
    json: {
      query: getIntrospectionQuery(),
    },
    responseType: 'json',
  })

  return response.body
}

function printToFiles(pathName, fileName, response) {
  const schema = buildClientSchema(response.data)
  const finalPath = path.resolve(pathName, fileName)

  try {
    fs.writeFileSync(finalPath, printSchema(schema))
  } catch {
    const pathRegex = /.+\/(?<file>:*.+)$/
    const file = pathRegex.exec(finalPath).groups?.file
    const dirFile = finalPath.replace(file, '')

    fs.mkdirSync(dirFile, {recursive: true})
    fs.writeFileSync(finalPath, printSchema(schema))
  }
}

export async function downloadSchema({url, outputPath, fileName}) {
  try {
    const schema = await getRemoteSchema(url)

    printToFiles(outputPath, fileName, schema)
  } catch (err) {
    console.error(err)
  }
}
