import {  useEffect, useContext, useState } from 'react'

import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({ children }) => {

 

  return (
    <div>
      <Head>
        <title>Awesome Store</title>
        <meta
          name="description"
          content="Awesome Store - a van that sells mysterious items"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col bg-amazing-world bg-cover bg-no-repeat">
        <Navbar  />
        <div className="flex flex-col justify-between min-h-screen h-full overflow-auto">
          <main className="flex mt-16 p-4 pt-12">{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Layout
