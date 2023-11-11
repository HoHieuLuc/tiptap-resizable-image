import { promises as fs } from 'fs';

interface Props {
  path: string;
}

const readFile = async ({ path }: Props) => {
  const file = await fs.readFile(
    `${process.cwd()}/src${path}`,
    'utf8'
  );
  return file.replace(`'use client';\n`, '');
};

export default readFile;
