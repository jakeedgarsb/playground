// Functions for generating randomized NFT metadata.

import fs from 'fs'

export type NFTAttribute = {
  trait_type: string
  trait_value: string
}

export type NFTMetadata = {
  tokenId: number
  name: string
  description: string
  image_uri: string
  attributes: NFTAttribute[]
  animation_url?: string
}

const customGenerator = (quantity: number) => {
  const tiers = ['common', 'uncommon', 'rare']
  const filetypes = ['glb', 'png', 'html']

  // Define the number of metadata objects to generate
  const numMetadata = quantity

  type MetaDataArray = NFTMetadata[]

  // Create an array to hold the metadata objects
  const metadata: MetaDataArray = []

  // Use a loop to generate the metadata objects
  const generatorLoop = () => {
    for (let i = 0; i < numMetadata; i++) {
      const tier = tiers[Math.floor(Math.random() * tiers.length)]
      const blue = Math.random() > 0.5
      const hasHat = Math.random() > 0.5
      const filetype = filetypes[Math.floor(Math.random() * filetypes.length)]
      const attributes = [
        { trait_type: 'tier', trait_value: tier },
        { trait_type: 'blue', trait_value: blue.toString() },
        { trait_type: 'has_hat', trait_value: hasHat.toString() },
        { trait_type: 'filetype', trait_value: filetype },
      ]
      const metadataObject = {
        tokenId: i,
        name: `nft ${i}`,
        description: `This is a description for nft ${i}`,
        image_uri: `https://exampleimageuri.com/nft${i}.png`,
        attributes: attributes,
        animation_url: `https://exampleanimationurl.com/nft${i}`,
      }
      metadata.push(metadataObject)
    }
  }
  generatorLoop()

  // Convert the metadata array to a JSON string
  const metadataJSON = JSON.stringify(metadata)

  // Write the JSON string to a file
  fs.writeFileSync('metadata.json', metadataJSON)
}

export default customGenerator
