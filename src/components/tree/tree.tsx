import { IData, ITreeNode, IRequestData } from "../types/types";

class TreeNode implements ITreeNode {
  data: IData;
  parent: ITreeNode | null = null;
  children: [ITreeNode] | [] = [];

  constructor(data: IData) {
    this.data = data;
  }
}

class Tree {
  private _root: ITreeNode;

  constructor(data: IData) {
    this._root = new TreeNode(data);
  }

  private traverseDF(callback: (node: ITreeNode) => void) {
    (function recurse(currentNode) {
      for (let i = 0; i < currentNode.children.length; i++) {
        recurse(currentNode.children[i]);
      }
      callback(currentNode);
    })(this._root);
  }

  private add(data: IData, toData: Number) {
    let child: ITreeNode = new TreeNode(data);
    let parent: ITreeNode | null = null;

    const callback = (node: ITreeNode) => {
      if (node.data.id === toData) {
        parent = node;
        return node;
      }
    };

    this.traverseDF(callback);

    if (parent) {
      const arrChildren: ITreeNode[] = (parent as ITreeNode).children;
      arrChildren.push(child);
      child.parent = parent;
    } else {
      throw new Error(
        "Невозможно добавить узел к несуществующему родительскому элементу."
      );
    }
  }

  growTree(requestData: IRequestData[]): ITreeNode[] {
    for (let item of requestData) {
      if (item.path.length > 1) {
        const toData = +item.path[item.path.length - 3];
        this.add({ name: item.name, id: item.id, isRoled: false }, toData);
      } else {
        const treeChildren: ITreeNode[] = tree._root.children;
        treeChildren.push(
          new TreeNode({ name: item.name, id: item.id, isRoled: false })
        );
      }
    }

    return Object.values(tree);
  }
}

export const tree = new Tree({ name: "territory", id: 0, isRoled: false });
