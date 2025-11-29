import webpackK8sightMain from "./main";
import { webpackK8sightRenderer } from "./renderer";

const config = [webpackK8sightMain(), webpackK8sightRenderer()];

export default config;
