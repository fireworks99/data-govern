export function renderTreeNode(h, { node, data, store }) {
  // const isLeaf = !data.children || data.children.length === 0;
  const isLeaf = data.id.length > 5;

  return h(
    'span',
    {
      class: 'custom-tree-node'
    },
    [
      // h('i', {
      //   class: isLeaf ? 'el-icon-document' : 'el-icon-folder'
      // }),
      h('span', null, isLeaf ? '📄' : '📁'),
      h('span', { style: 'margin-left: 5px;' }, node.label)
    ]
  );
}