import classes from './ContactText.module.scss';

interface IProps {
  title: string;
  data: string;
}

const ContactText = ({title, data}: IProps) => {
  return (
    <div className={classes['contact-text']}>
      <span className={classes['contact-title']}>{title}</span>
      <h1 className={classes['contact-data']}>{data}</h1>
    </div>
  )
}

export default ContactText