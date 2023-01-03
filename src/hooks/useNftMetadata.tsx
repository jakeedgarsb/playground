// Bunch of bad book implementations.

import { NFTMetadata } from '@/types'
import { Option } from '@/components/Select'
import { useState, useEffect } from 'react'
import { convertJsonToArray } from '@/utils/sorter'

export const useNFTMetadata = (json: any) => {
  // Initialize state of NFT metadata as an empty array
  const [nftMetadataArray, setNFTMetadataArray] = useState<NFTMetadata[]>([])
  const [traitTypesArray, setTraitTypesArray] = useState<Option[]>([])
  // Initialize state of NFTs with a specific trait values as an empty object
  const [nfts, setNFTs] = useState<Array<NFTMetadata>>([])
  // Initialize a state of trait types as an empty array of the Option[] type
  const [traitTypesObject, setTraitTypesObject] = useState<Option[]>([])
  // Initialize state of trait values as an empty object
  const [traitValuesObject, setTraitValuesObject] = useState({})
  // Initialize state of Options for the Select menu as an empty array
  const [options, setOptions] = useState<Option[]>([])
  // Initialize state of NFTs with the rare tier trait type and value as an empty array
  const [rareNfts, setRareNfts] = useState<number[]>([])
  // Initialize state of trait types as an empty array
  const [traitTypes, setTraitTypes] = useState<string[]>([])
  // Initialize state of trait values as an empty array
  const [traitValues, setTraitValues] = useState<string[]>([])

  const metadataArr = convertJsonToArray(json)

  // Get the first NFT in the collection
  const getFirstNFT = (nftMetadataArray: NFTMetadata[]): NFTMetadata | null => {
    if (nftMetadataArray.length === 0) return null
    return nftMetadataArray[0]
  }

  const getRareNFTs = (nftMetadataArray: NFTMetadata[]): number[] => {
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

  const getNftTokenIds = (
    nftMetadataArray: NFTMetadata[],
    traitType: string,
    traitValue: string
  ): number[] => {
    const byValueNfts: number[] = []
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
              byValueNfts.push(element.tokenId)
            }
          }
        }
      }
    }
    return byValueNfts
  }

  const getMatchingNFTs = (
    nftMetadataArray: NFTMetadata[],
    rareNFTs: number[]
  ): NFTMetadata[] => {
    const matchingNFTs: NFTMetadata[] = []
    for (const nft of nftMetadataArray) {
      if (rareNFTs.includes(nft.tokenId)) {
        matchingNFTs.push(nft)
      }
    }
    return matchingNFTs
  }

  // Function that returns an array of key value pairs of trait types as key and value
  const getTraitTypesArray = (nftMetadataArray: NFTMetadata[]): Option[] => {
    for (const key in nftMetadataArray) {
      if (Object.prototype.hasOwnProperty.call(nftMetadataArray, key)) {
        const element = nftMetadataArray[key]
        const attributes = element.attributes
        for (const key in attributes) {
          if (Object.prototype.hasOwnProperty.call(attributes, key)) {
            const attribute = attributes[key]
            const option = {
              label: attribute.trait_type,
              value: attribute.trait_type,
            }
            setTraitTypesArray([...traitTypesArray, option])
          }
        }
      }
    }
    return traitTypesArray
  }

  const getTraitOptions = (nftMetadata: NFTMetadata): Option[] => {
    const attributes = nftMetadata.attributes
    for (const key in attributes) {
      if (Object.prototype.hasOwnProperty.call(attributes, key)) {
        const element = attributes[key]
        const option = { key: element.trait_type, value: element.trait_type }
        options.push(option as any)
      }
    }
    return options
  }

  const getTraitTypes = (nftMetadata: NFTMetadata): string[] => {
    const attributes = nftMetadata.attributes
    for (const key in attributes) {
      if (Object.prototype.hasOwnProperty.call(attributes, key)) {
        const element = attributes[key]
        setTraitTypes([...traitTypes, element.trait_type])
      }
    }
    return traitTypes
  }

  // With a specific NFT attribute trait_type return the possible trait_values of that trait_type
  const getTraitValues = (
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
            if (
              attribute.trait_type === traitType &&
              !traitValues.includes(attribute.trait_value)
            ) {
              traitValues.push(attribute.trait_value)
            }
          }
        }
      }
    }
    return traitValues
  }

  // Function that returns an array of NFTMetadata objects that have a specific trait_type and trait_value
  const getNFTsWithTrait = (
    nftMetadataArray: NFTMetadata[],
    traitType: string,
    traitValue: string
  ): NFTMetadata[] => {
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
              setNFTs([...nfts, element])
            }
          }
        }
      }
    }
    return nfts
  }

  // With a specific NFT attribute trait_type return an object of the possible trait_values on that trait_type
  const getTraitValuesObject = (
    nftMetadataArray: NFTMetadata[],
    traitType: string
  ): { [key: string]: string } => {
    const traitValues = getTraitValues(nftMetadataArray, traitType)
    for (const key in traitValues) {
      setTraitValuesObject({
        ...traitValuesObject,
        [key]: traitValues[key],
      })
    }
    return traitValuesObject
  }

  const getAttributes = (nftMetadataArray: NFTMetadata[]): Option[] => {
    const attributes: Option[] = []
    nftMetadataArray.map((nftMetadata) => {
      nftMetadata.attributes.map((attribute) => {
        attributes.push({
          label: attribute.trait_type,
          value: attribute.trait_type,
        })
      })
    })
    return attributes
  }

  return {
    getAttributes,
    getNftTokenIds,
    getMatchingNFTs,
    metadataArr,
    getFirstNFT,
    getRareNFTs,
    getTraitTypesArray,
    getTraitTypes,
    getNFTsWithTrait,
    getTraitValues,
    getTraitValuesObject,
    getTraitOptions,
  }
}
