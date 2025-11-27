import { KubeObjectStore } from "../../../common/k8s-api/kube-object.store";

import type { SecretApi } from "@kubesightapp/kube-api";
import type { Secret, SecretData } from "@kubesightapp/kube-object";

export class SecretStore extends KubeObjectStore<Secret, SecretApi, SecretData> {}
