export default function generateHelloWorldHTML(): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Hello World</title>
        <style>
          h1 {
            text-align: center;
          }
        </style>
      </head>
      <body>
        <h1>Hello World</h1>
      </body>
    </html>
  `
}
