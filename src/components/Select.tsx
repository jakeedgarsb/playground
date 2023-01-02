import React from 'react'
import Select from 'react-select'

export type SelectProps = {
  options: Option[]
}

export type Option = {
  label: string
  value: string
}

const SelectComponent = (props: SelectProps) => {
  const { options } = props
  return (
    <div
      style={{
        color: 'black',
      }}
    >
      <Select options={options} />
    </div>
  )
}

export default SelectComponent
