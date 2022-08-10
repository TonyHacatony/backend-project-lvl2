import TreeStylish from './tree.js';
import PlainStylish from './plain.js';

const mapper = {
  tree: (diff) => TreeStylish(diff),
  plain: (diff) => PlainStylish(diff),
};

const findFormatter = (name) => {
  const stylisher = mapper[name];
  if (stylisher === undefined) {
    throw new Error(`Can't find stylisher with name:${name}`);
  }
  return stylisher;
};

export default findFormatter;
