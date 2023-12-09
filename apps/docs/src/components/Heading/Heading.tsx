import { Anchor, Title, TitleProps } from '@mantine/core';
import classes from './Heading.module.css';

interface Props extends Omit<TitleProps, 'children'> {
  label: string;
}

const Heading = ({ label, ...props }: Props) => {
  const id = label.replaceAll(' ', '-').toLowerCase();

  return (
    <Anchor href={`#${id}`} className={classes.anchor}>
      <Title id={id} {...props}>
        {label}
      </Title>
    </Anchor>
  );
};

export default Heading;
