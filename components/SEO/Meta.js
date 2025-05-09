import React from 'react'
import Head from 'next/head';

export default function Meta() {
    return (
        <Head>
           /* Primary Meta Tags */
            <title>Dev Patel Portfolio - Computer Science Graduate</title>
            <meta charSet="utf-8" />
            <meta name="title" content="Dev Patel Portfolio - Computer Science Graduate" />
            <meta name="description"
                content="Dev Patel's (d3v-26) Personal Portfolio Website. Made with Ubuntu 20.4 (Linux) theme by Next.js and Tailwind CSS." />
            <meta name="author" content="Dev Patel (d3v-26)" />
            <meta name="keywords"
                content="d3v-26, d3v-26's portfolio, dev patel linux, ubuntu portfolio, dev patel protfolio, dev patel computer, dev patel, dev ubuntu, dev patel ubuntu portfolio" />
            <meta name="robots" content="index, follow" />
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="language" content="English" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#E95420" />

            /* Search Engine */
            <meta name="image" content="images/logos/favicon-16x16.png" />
            /* Schema.org for Google */
            <meta itemProp="name" content="Dev Patel Portfolio - Computer Science Graduate" />
            <meta itemProp="description"
                content="Dev Patel's (d3v-26) Personal Portfolio Website. Made with Ubuntu 20.4 (Linux) theme by Next.js and Tailwind CSS." />
            <meta itemProp="image" content="images/logos/favicon-16x16.png" />

            /* Open Graph general (Facebook, Pinterest & Google+) */
            <meta name="og:title" content="Dev Patel Portfolio - Computer Science Graduate" />
            <meta name="og:description"
                content="Dev Patel's (d3v-26) Personal Portfolio Website. Made with Ubuntu 20.4 (Linux) theme by Next.js and Tailwind CSS." />
            <meta name="og:image" content="images/logos/logo_1200.png" />
            <meta name="og:url" content="http://d3v-26.github.io/resume" />
            <meta name="og:site_name" content="Dev Patel Personal Portfolio" />
            <meta name="og:locale" content="en_US" />
            <meta name="og:type" content="website" />

            <link rel="apple-touch-icon" sizes="180x180" href="images/logos/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="images/logos/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="images/logos/favicon-16x16.png" />

            <link rel="preload" href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap" as="style" />
            <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap" rel="stylesheet"></link>
        </Head>
    )
}
