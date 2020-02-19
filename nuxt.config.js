const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();

export default {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["~/plugins/firebase"],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxtjs/dotenv", "@nuxtjs/style-resources"],
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/pwa"],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },

  manifest: {
    name: "CTAS",
    short_name: "CATS",
    description: "マーズで使うchatAppのモック",
    start_url: "/",
    display: "fullscreen",
    background_color: "#fff",
    theme_color: "#1aab8a",

    orientation: "portrait",
    icons: [
      {
        src: "static/android-chrome-36x36.png",
        sizes: "36x36",
        type: "image/png"
      },
      {
        src: "static/android-chrome-48x48.png",
        sizes: "48x48",
        type: "image/png"
      },
      {
        src: "static/android-chrome-72x72.png",
        sizes: "72x72",
        type: "image/png"
      },
      {
        src: "static/android-chrome-96x96.png",
        sizes: "96x96",
        type: "image/png"
      },
      {
        src: "static/android-chrome-128x128.png",
        sizes: "128x128",
        type: "image/png"
      },
      {
        src: "static/android-chrome-144x144.png",
        sizes: "144x144",
        type: "image/png"
      },
      {
        src: "static/android-chrome-152x152.png",
        sizes: "152x152",
        type: "image/png"
      },
      {
        src: "static/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "static/android-chrome-256x256.png",
        sizes: "256x256",
        type: "image/png"
      },
      {
        src: "static/android-chrome-384x384.png",
        sizes: "384x384",
        type: "image/png"
      },
      {
        src: "static/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  }
};
