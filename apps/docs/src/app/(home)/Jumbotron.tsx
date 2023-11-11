import { Text, ThemeIcon } from '@mantine/core';
import classes from './Jumbotron.module.css';

interface Props {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Jumbotron = ({ icon, title, description }: Props) => {
  return (
    <div className={classes.root}>
      <ThemeIcon
        size='xl'
        radius='md'
        gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
      >
        {icon}
      </ThemeIcon>
      <div>
        <Text className={classes.title}>{title}</Text>
        <Text className={classes.description}>{description}</Text>
      </div>
    </div>
  );
};
export default Jumbotron;
