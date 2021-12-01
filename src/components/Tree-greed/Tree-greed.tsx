import React, { useEffect, FC, useState } from 'react'
import CreateList from '../Create-List/Create-List';
import { tree as myTree } from '../tree/tree'
import { ITreeNode } from '../types/types';


const TreeGreed: FC = () => {

  const [tree, setTree] = useState<ITreeNode[]>([])

  const rollItem = (id: number): void => {
    const newTree = tree[0];
    (function recurse(currentNode: ITreeNode) {
      for (let i = 0, length = currentNode.children.length; i < length; i++) {
        recurse(currentNode.children[i]);
      }

      if (currentNode.data.id === id) {
        currentNode.data.isRoled = !currentNode.data.isRoled;
      }
    })(newTree);
      
    setTree([newTree])
  }

  useEffect(() => {
    fetch('/api/regions')
      .then(res => res.json())
      .then(json => {
        const grownTree: ITreeNode[] = myTree.growTree(json);
        setTree(grownTree);
      })
      .catch(e => console.log('Ошибка загрузки данных', e));
  }, []);

  return (
    <div>
      {tree.length > 0 ? <CreateList tree={tree} rollItem={rollItem} /> : null}
    </div>
  )
}

export default TreeGreed;