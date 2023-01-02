import { ethers } from 'ethers'

export type BigNumber = ethers.BigNumber

export type DeployedCollection = {
  chainId: BigNumber
  deploymentAddress: string
}

export type MerkleData = {
  [key: string]: string
}

export type WhiteList = {
  address: string
  maxClaimable: string
}

export type CollectionMetadata = {
  name: string
  symbol: string
  description: string
  primary_sale_address: string
  loyalty_address: string
  share_percentage: number
  image_uri: string
  merkle?: MerkleData
}

export type NFTAttribute = {
  trait_type: string
  trait_value: string
}

export type Option = {
  label: string
  value: string
}

export type NFTMetadata = {
  tokenId: number
  name: string
  description: string
  image_uri: string
  attributes: NFTAttribute[]
  animation_url?: string
}

export type SalePhaseData = {
  startTime: BigNumber
  maxQuantity: BigNumber
  price: BigNumber
  currencyAddress: string
  quantityLimitPerTransaction: BigNumber
  waitInSeconds: BigNumber
  merkleRootHash: string
}

export type SalesPhaseStatus = {
  currentStartId: number
  count: number
}
