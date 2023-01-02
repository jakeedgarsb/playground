import styles from '../styles/Home.module.css'
import * as MyHero from '../collections/myhero.json'
import * as NFTs from '../collections/nftcollection.json'
import { useNFTMetadata } from '@/hooks/useNftMetadata'
import SelectComponent from '@/components/Select'
import useGetAttributes from '../hooks/useGetAttributes'

const nftMetadataArray = [
  {
    tokenId: 1,
    name: 'Bakugo Yo',
    description: 'This is Bakugo.',
    image_uri: 'ipfs://QmTcLZRi9osQaJYVLH9JqfrfJWaFxjvUERb9JUvkTTYJyN/0.png',
    attributes: [
      { trait_type: 'is_bakugo', trait_value: 'is_bakugo' },
      { trait_type: 'true', trait_value: 'true' },
    ],
  },
  {
    tokenId: 3,
    name: 'Midoria',
    description: 'This is not Bakugo.',
    image_uri: 'ipfs://QmTcLZRi9osQaJYVLH9JqfrfJWaFxjvUERb9JUvkTTYJyN/2.png',
    attributes: [
      { trait_type: 'is_bakugo', trait_value: 'is_bakugo' },
      { trait_type: 'false', trait_value: 'false' },
    ],
  },
]

export type Options = {
  value: string
  label: string
}

export type Option = {
  value: string
  label: string
}

export type NFTAttribute = {
  trait_type: string
  trait_value: string
}

export default function Home() {
  const attributes = useGetAttributes(nftMetadataArray)
  const {
    getAttributes,
    metadataArr,
    getMatchingNFTs,
    getFirstNFT,
    getRareNFTs,
    getNftsByValue,
    // getTraitTypesArray,
    // getTraitOptions,
    // getTraitTypes,
    // getNFTsWithTrait,
    // getTraitValues,
    // getTraitValuesObject,
  } = useNFTMetadata(NFTs)
  const nftArray = metadataArr
  const rareNfts = getRareNFTs(nftArray)
  const matchingByTier = getNftsByValue(nftArray, 'tier', 'uncommon')
  const matchingByHat = getNftsByValue(nftArray, 'has_hat', 'false')
  const matchingNfts = getMatchingNFTs(nftArray, matchingByTier)
  // const attributes = getAttributes(nftArray)
  console.log(attributes)

  // function to display a list of the attributes from the GetAttributes function
  const DisplayAttributes = () => {
    return (
      <div>
        {attributes.map((attribute, index) => {
          return (
            <>
              <div key={`trait_type-${index}`}>{attribute.label}</div>
              {/* <div key={`trait_type-2-${index}`}>{attribute.trait_type}</div> */}
            </>
          )
        })}
      </div>
    )
  }

  const DisplayRareNfts = () => {
    return (
      <div>
        {matchingNfts.map((nft, index) => {
          return (
            <>
              {/* <div key={`description-${index}`}>{nft.description}</div>
              <div key={`url-${index}`}>{nft.animation_url}</div> */}
              <DisplayAttributes />
            </>
          )
        })}
      </div>
    )
  }
  return (
    <>
      <div className={styles.main}>
        <DisplayRareNfts />
        <SelectComponent options={attributes} />
      </div>
    </>
  )
}
