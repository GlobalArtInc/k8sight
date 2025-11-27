import webpackLensMain from "./main";
import { webpackLensRenderer } from "./renderer";

const config = [webpackLensMain(), webpackLensRenderer()];

export default config;
