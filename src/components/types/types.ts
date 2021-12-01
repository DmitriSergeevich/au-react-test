export interface IData {
  name: string;
  id: number;
  isRoled: boolean;
}

export interface ITreeNode {
  data: IData;
  parent: ITreeNode | null;
  children: ITreeNode[] | [];
}

export interface IQueueItems {
  [key: string]: Node;
}

export interface IRequestData extends IData {
  path: string
}

export interface ListProps {
  tree: ITreeNode[];
  rollItem: (id: number) => void;
}