import { MD5 } from "crypto-js";

import type { Subject } from "@kubesightapp/kube-object";

export function hashSubject(subject: Subject): string {
  return MD5(
    JSON.stringify([
      ["kind", subject.kind],
      ["name", subject.name],
      ["namespace", subject.namespace],
      ["apiGroup", subject.apiGroup],
    ]),
  ).toString();
}
