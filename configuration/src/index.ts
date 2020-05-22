import { promises } from 'fs'
import { resolve } from 'path'
import { getInput } from '@actions/core'

import { create, remove } from './functions'

(async function () {
  const workspace = process.cwd()
  const directory = getInput('directory')
  const base = resolve(workspace, directory)
  const files = await promises.readdir(base)

  await remove()
  await Promise.all(files.map(file => create(resolve(base, file))))
})()
