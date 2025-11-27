export interface ParentOfChildComposite<Id extends string = string> {
  id: Id;
}

export interface ChildOfParentComposite<ParentId extends string = string> {
  parentId: ParentId;
}

export type RootComposite<Id extends string = string> = { parentId: undefined } & ParentOfChildComposite<Id>;
