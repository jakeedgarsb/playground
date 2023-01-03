Write a function that takes the NFTAttribute TS type, splits it into two separate groups and converts the returned data to two collections of the Option type as an Array like Option[] or Array<Option>

export type NFTAttribute = {
  trait_type: string
  value: string
}

export type Option = {
  label: string
  value: string
}