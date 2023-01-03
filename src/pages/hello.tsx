import React from 'react'

// Page to display the hello world message from the API route

const Hello = () => {
  const [message, setMessage] = React.useState('Loading...')

  React.useEffect(() => {
    fetch('/api/generate-html')
      .then((r) => r.text())
      .then(setMessage)
  }, [])

  return <p>{message}</p>
}

export default Hello
