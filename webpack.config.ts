import * as path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { container } from "webpack";
import { Configuration } from "webpack";
import * as dependencies from "./package.json";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
const { ModuleFederationPlugin } = container;

const config: Configuration = {
    entry: "./src/entry.ts",
    mode: "development",
    devServer: {
        port: 3001,
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)?$/,
                exclude: /node_modules/,
                use: "ts-loader",
            },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        },
                    },
                    'postcss-loader'
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            favicon: "./public/favicon.ico",
        }),
        new MiniCssExtractPlugin(),
        new ModuleFederationPlugin({
            name: "HeaderApp",
            filename: "remoteEntry.js",
            exposes: {
                "./styles": "./src/index.css",
                "./Register": "./src/components/register",
                "./Instance": "./src/components/instance",
            },
            shared: {
                ...dependencies.dependencies,
                react: {
                    singleton: true,
                    requiredVersion: dependencies.dependencies["react"],
                },
                "react-dom": {
                    singleton: true,
                    requiredVersion: dependencies.dependencies["react-dom"],
                },
            },
        }),
    ],
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        alias: {
            '@': path.resolve(__dirname, './src'),
        }
    },
    target: "web",
};

export default config;
