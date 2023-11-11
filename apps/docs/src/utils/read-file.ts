import { promises as fs } from 'fs';

interface Props {
  path: string;
  replaces?: [string, string][];
}

const readFile = async ({ path, replaces }: Props) => {
  let content = await fs.readFile(
    `${process.cwd()}/src${path}`,
    'utf8'
  );

  replaces?.forEach(([oldValue, newValue]) => {
    content = content.replaceAll(oldValue, newValue);
  });

  return content.replace(`'use client';\n`, '');
};

export default readFile;
