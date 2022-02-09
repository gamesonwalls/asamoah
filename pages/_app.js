import "../styles/globals.css";
import "tailwindcss/tailwind.css";
// import "../styles/bootstrap.css";
import "../styles/antd.css";
// import "../styles/custom.css";

import { DefaultSeo } from "next-seo";
import Head from "next/head";
import ProgressLoad from "../components/ProgressLoad";
import React, { useEffect } from "react";
import { SidebarProvider } from "../context/SidebarContext";
import { ThemeProvider } from "../context/ThemeContext";

import Navbar from "../components/Navbar";
// import { Windmill } from "@windmill/react-ui";

import { store } from "../redux/store";
import { Provider } from "react-redux";

import "../styles/notyf.min.css";
import AuthProvider from "../provider/authProvider";

import Script from "next/script";

// if (typeof window === "object") {
//   // Check if document is finally loaded
//   //  document.addEventListener("DOMContentLoaded", function () {
//   //      alert('Finished loading')
//   //    });
//   import "flowbite";
// }

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {/* <meta
          name='google-site-verification'
          content={
            gtag.GOOGLE_VERIF || '-yo'
          }
        /> */}

        <meta name="yandex-verification" content="356dad746d43cc34" />

        <meta name="theme-color" content="#f0efeb" />

        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" href="/favicon.png"></link>

        <title>Nextjs Windmill Dashboard</title>
        <meta name="description" content="Windmill Dashboard for nextjs" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.1.1/css/all.css"
        />
        <Script
          src="https://unpkg.com/flowbite@1.3.3/dist/flowbite.js"
          strategy="beforeInteractive"
        ></Script>
      </Head>

      <style jsx global>{`
        html {
          font-family: "Roboto", sans-serif;
          scroll-behavior: smooth;
          scroll-behavior: smooth;
        }
      `}</style>

      <DefaultSeo />
      {/* <ThemeProvider> */}
      <Provider store={store}>
        <AuthProvider>
          <SidebarProvider>
            <Navbar>
              <ProgressLoad />
              <Component {...pageProps} />
            </Navbar>
          </SidebarProvider>
        </AuthProvider>
      </Provider>
      {/* </ThemeProvider> */}
    </>
  );
}

export default MyApp;
