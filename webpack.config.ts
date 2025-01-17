import * as path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { container } from "webpack";
import { Configuration } from "webpack";
import * as dependencies from "./package.json";

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
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            favicon: "./public/favicon.ico",
        }),
        new ModuleFederationPlugin({
            name: "HeaderApp",
            filename: "remoteEntry.js",
            exposes: {
                "./Header": "./src/App",
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
