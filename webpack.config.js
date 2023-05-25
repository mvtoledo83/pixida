const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "pixida",
    projectName: "layout",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            "style-loader", // Adiciona os estilos ao DOM injetando a tag <style>
            "css-loader", // interpreta os arquivos CSS importados
            "sass-loader", // compila arquivos Sass para CSS
          ],
        },
      ],
    },
  });
};
