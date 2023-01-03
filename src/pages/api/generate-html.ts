import fs from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'
import generateHelloWorldHTML from '../../utils/html'
import path from 'path'

const __dirname = path.resolve()
const srcDir = path.join(__dirname, '/src')
const publicDir = path.join(srcDir, '/public')
const htmlDir = path.join(publicDir, '/html')

export default async function writeHTMLToFile(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const html = generateHelloWorldHTML()
    const filePath = `${htmlDir}/file.html`
    await fs.promises.writeFile(filePath, html)
    res.status(200).send(`Successfully wrote HTML to ${filePath}`)
  } catch (error) {
    res.status(500).send(`Error writing HTML to file: ${error}`)
  }
}
