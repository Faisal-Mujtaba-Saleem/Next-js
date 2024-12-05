import React from 'react'
import fs from 'fs/promises';
import Script from 'next/script';
import Features from '@/components/Features';

/**
 * The homepage of the blog.
 *
 * Displays a list of the latest blog features, with a title, excerpt, and author information.
 *
 * @returns A React component to display on the homepage.
 */
const Home = async () => {
  let features = await fs.readFile('./features.json', 'utf8');
  features = JSON.parse(features.toString())['Next.js_Features'];

  // throw new Error('Something went wrong!');
  return (
    <React.Fragment>
      <Script>
        alert('Welcome to next js features page!');
      </Script>
      <Features features={features} />
    </React.Fragment>
  )
}

export default Home
