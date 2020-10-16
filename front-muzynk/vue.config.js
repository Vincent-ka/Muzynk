module.exports = {
    devServer: {
      proxy: process.env.VUE_APP_BACKEND_URL,
      host: "localhost",
      publicPath: process.env.VUE_APP_BACKEND_URL // utile pour supprimer l'erreur sockjs-node (Not Found) dans la console du navigateur
    },
  };