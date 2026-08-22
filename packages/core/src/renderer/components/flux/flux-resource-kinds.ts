export interface FluxKind {
  /** API group of the CRD. */
  group: string;
  /** Plural resource name, as used in the CRD and in URLs. */
  plural: string;
  /** Singular, human readable kind, shown in the "needs attention" list. */
  kind: string;
}

export interface FluxKindGroup {
  title: string;
  kinds: FluxKind[];
}

/**
 * What the dashboard summarises, in the three groups Flux users think in: what is being applied,
 * what is being released, and where it all comes from.
 */
export const fluxKindGroups: FluxKindGroup[] = [
  {
    title: "Kustomizations",
    kinds: [{ group: "kustomize.toolkit.fluxcd.io", plural: "kustomizations", kind: "Kustomization" }],
  },
  {
    title: "Helm Releases",
    kinds: [{ group: "helm.toolkit.fluxcd.io", plural: "helmreleases", kind: "HelmRelease" }],
  },
  {
    title: "Sources",
    kinds: [
      { group: "source.toolkit.fluxcd.io", plural: "gitrepositories", kind: "GitRepository" },
      { group: "source.toolkit.fluxcd.io", plural: "helmrepositories", kind: "HelmRepository" },
      { group: "source.toolkit.fluxcd.io", plural: "ocirepositories", kind: "OCIRepository" },
      { group: "source.toolkit.fluxcd.io", plural: "buckets", kind: "Bucket" },
      { group: "source.toolkit.fluxcd.io", plural: "helmcharts", kind: "HelmChart" },
    ],
  },
];
