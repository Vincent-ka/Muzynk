module.exports = {
    devServer: {
      proxy: "https://muzynkback.herokuapp.com/",
      host: "localhost",
      publicPath: "https://muzynkback.herokuapp.com/" // utile pour supprimer l'erreur sockjs-node (Not Found) dans la console du navigateur
    },
  };