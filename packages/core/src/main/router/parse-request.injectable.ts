import Subtext from "@hapi/subtext";
import { getInjectable } from "@ogre-tools/injectable";

export type ParseRequest = typeof Subtext.parse;

const parseRequestInjectable = getInjectable({
  id: "parse-http-request",
  instantiate: () => Subtext.parse,
});

export default parseRequestInjectable;
