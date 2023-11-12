import { SITE_TITLE } from '@/config';
import { Code, Stack, Text, Title } from '@mantine/core';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Contribute | ${SITE_TITLE}`,
};

const Page = () => {
  return (
    <Stack>
      <Title order={1}>Contribute to Tiptap Resizable Image</Title>
      <Text>
        We welcome all contributions to Tiptap Resizable Image! Whether{' '}
        {`you're`}
        reporting bugs, proposing new features, improving documentation, or
        writing code, your contributions are greatly appreciated.
      </Text>

      <Title order={2}>Get started locally</Title>
      <Text>
        <Code>1. Install PNPM:</Code> This project uses PNPM for package
        management. To install PNPM, run the following command in your terminal:{' '}
        <Code>npm install -g pnpm</Code>
      </Text>

      <Text>
        <Code>2. Fork and clone the repository:</Code> Fork the project
        repository and then clone your fork to your local machine.
      </Text>

      <Text>
        <Code>3. Install the dependencies:</Code> Navigate to the project
        directory and install the dependencies by running:{' '}
        <Code>pnpm install</Code>
      </Text>

      <Text>
        <Code>4. Start the development server:</Code> Run the following command
        to start the development server: <Code>pnpm dev</Code>
      </Text>

      <Text>
        <Code>5. Build the project:</Code> To build the project for production,
        run: <Code>pnpm build</Code>
      </Text>

      <Text>
        <Code>6. Test the project:</Code> Run the tests to make sure everything
        is working correctly: <Code>pnpm test</Code>
      </Text>

      <Text>
        {`You're`} now ready to start contributing to Tiptap Resizable Image!
        Remember to create a new branch for each feature or bug fix you work on,
        and feel free to ask for help if you need it.
      </Text>

      <Title order={2}>Reporting Bugs</Title>
      <Text>
        If you find a bug, please open an issue on the GitHub repository.
        Include as many details as you can, such as the steps to reproduce the
        bug and any error messages.
      </Text>

      <Title order={2}>Suggesting Features</Title>
      <Text>
        {`We're`} always open to new ideas to improve Tiptap Resizable Image. If
        you have a suggestion, please open an issue and label it as a feature
        request.
      </Text>

      <Text>
        Thank you for considering contributing to Tiptap Resizable Image. Your
        time and effort are greatly appreciated.
      </Text>
    </Stack>
  );
};

export default Page;
