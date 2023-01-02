// Attempt at a hook that might do the sorting but alas

import { NFTMetadata, Option } from '@/types'

function getAttributes(nftMetadataArray: NFTMetadata[]): Option[] {
  let attributes: Option[] = []

  nftMetadataArray.forEach((nftMetadata) => {
    nftMetadata.attributes.forEach((attribute) => {
      attributes.push({
        label: attribute.trait_type,
        value: attribute.trait_type,
      })
    })
  })

  return attributes
}

export default getAttributes
