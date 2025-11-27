export type SubjectKind = "Group" | "ServiceAccount" | "User";

export interface Subject {
  apiGroup?: string;
  kind: SubjectKind;
  name: string;
  namespace?: string;
}
