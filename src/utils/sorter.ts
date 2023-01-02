// Function for sorting metadata

import * as NFTCollection from '../collections/nftcollection.json'

// Types

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
  animation_url?: string | undefined
}

type Options = {
  label: string
  value: string
}

// Function to convert a json object to an array of NFTMetadata
export const convertJsonToArray = (json: any): NFTMetadata[] => {
  const nftMetadataArray: NFTMetadata[] = []
  for (const key in json) {
    if (Object.prototype.hasOwnProperty.call(json, key)) {
      const element = json[key]
      nftMetadataArray.push(element)
    }
  }
  return nftMetadataArray
}

const nftMetadataArray = convertJsonToArray(NFTCollection)

// Function that returns the TokenId of all NFTs with the tier trait_type of 'rare'
export const getRareNFTs = (nftMetadataArray: NFTMetadata[]): number[] => {
  const rareNFTs: number[] = []
  for (const key in nftMetadataArray) {
    if (Object.prototype.hasOwnProperty.call(nftMetadataArray, key)) {
      const element = nftMetadataArray[key]
      const attributes = element.attributes
      for (const key in attributes) {
        if (Object.prototype.hasOwnProperty.call(attributes, key)) {
          const attribute = attributes[key]
          if (
            attribute.trait_type === 'tier' &&
            attribute.trait_value === 'rare'
          ) {
            rareNFTs.push(element.tokenId)
          }
        }
      }
    }
  }
  return rareNFTs
}

// Function that turns the attributes of an NFTMetadata object into an array of Options
export const getOptions = (nftMetadata: NFTMetadata): Options[] => {
  const options: Options[] = []
  const attributes = nftMetadata.attributes
  for (const key in attributes) {
    if (Object.prototype.hasOwnProperty.call(attributes, key)) {
      const element = attributes[key]
      const option = { label: element.trait_type, value: element.trait_value }
      options.push(option)
    }
  }
  return options
}

// Function that returns an array of all the trait_types of an NFTMetadata object
export const getTraitTypes = (nftMetadata: NFTMetadata): string[] => {
  const traitTypes: string[] = []
  const attributes = nftMetadata.attributes
  for (const key in attributes) {
    if (Object.prototype.hasOwnProperty.call(attributes, key)) {
      const element = attributes[key]
      traitTypes.push(element.trait_type)
    }
  }
  return traitTypes
}

console.log('Options:', getOptions(nftMetadataArray[0]))

// Function that returns an array of NFTMetadata objects that have a specific trait_type and trait_value
export const getNFTsWithTrait = (
  nftMetadataArray: NFTMetadata[],
  traitType: string,
  traitValue: string
): NFTMetadata[] => {
  const nfts: NFTMetadata[] = []
  for (const key in nftMetadataArray) {
    if (Object.prototype.hasOwnProperty.call(nftMetadataArray, key)) {
      const element = nftMetadataArray[key]
      const attributes = element.attributes
      for (const key in attributes) {
        if (Object.prototype.hasOwnProperty.call(attributes, key)) {
          const attribute = attributes[key]
          if (
            attribute.trait_type === traitType &&
            attribute.trait_value === traitValue
          ) {
            nfts.push(element)
          }
        }
      }
    }
  }
  return nfts
}

// With a specific NFT attribute trait_type return the possible trait_values of that trait_type
export const getTraitValues = (
  nftMetadataArray: NFTMetadata[],
  traitType: string
): string[] => {
  const traitValues: string[] = []
  for (const key in nftMetadataArray) {
    if (Object.prototype.hasOwnProperty.call(nftMetadataArray, key)) {
      const element = nftMetadataArray[key]
      const attributes = element.attributes
      for (const key in attributes) {
        if (Object.prototype.hasOwnProperty.call(attributes, key)) {
          const attribute = attributes[key]
          if (attribute.trait_type === traitType) {
            traitValues.push(attribute.trait_value)
          }
        }
      }
    }
  }
  return traitValues
}

// With a specific NFT attribute trait_type return an object of the possible trait_values on that trait_type
export const getTraitValuesObject = (
  nftMetadataArray: NFTMetadata[],
  traitType: string
): { [key: string]: string } => {
  const traitValuesObject: { [key: string]: string } = {}
  const traitValues = getTraitValues(nftMetadataArray, traitType)
  for (const key in traitValues) {
    traitValues[key]
  }
  return traitValuesObject
}
