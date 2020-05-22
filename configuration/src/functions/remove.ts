import { getInput } from '@actions/core'
import needle from 'needle'

import { Library } from '../types'

export async function remove() {
  const base = getInput('base')
  const tag = getInput('tag')
  const token = getInput('token')
  const headers = { 'Authorization': token }
  const { body } = await needle('get', `${base}/libraries`, { headers })

  return Promise.all(body
    .filter((library: Library) => library.version === tag)
    .map(({ id }: Library) => needle('delete', `${base}/libraries/${id}`, { headers }))
  )
}
