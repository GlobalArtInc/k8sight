import { getInjectable, type Injectable } from "@ogre-tools/injectable";

export type Fetch = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

const fetchInjectable: Injectable<Fetch, unknown, void> = getInjectable({
  id: "fetch",
  instantiate: (di) => fetch,
});

export default fetchInjectable;
