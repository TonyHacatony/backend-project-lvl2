const parseMapper = {
  json: (file) => JSON.parse(file),
};

const parse = (file, extension) => {
  const ext = extension.substring(1);
  const parser = parseMapper[ext];
  if (parser === undefined) {
    throw Error(`This extension: ${extension} don't support parsing`);
  }
  return parser(file);
};

export default parse;
