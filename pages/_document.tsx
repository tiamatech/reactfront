import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Removed Next.js default favicon link */}
          {/* Optionally, add your own favicon if desired:
              <link rel="icon" href="/custom-favicon.ico" /> 
          */}
        </Head>
        <body>
          <Main />
          <NextScript /> {/* Added missing NextScript */}
        </body>
      </Html>
    );
  }
}

export default MyDocument;
