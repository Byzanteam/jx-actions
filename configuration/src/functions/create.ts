import { getInput } from '@actions/core'
import { readJSON } from 'fs-extra'
import needle = require('needle')

export async function create(path: string) {
  const base = getInput('base')
  const token = getInput('token')
  const headers = { 'Authorization': token }
  const manifest = await readJSON(path)

  return needle('post', `${base}/libraries`, manifest, { headers })
}
