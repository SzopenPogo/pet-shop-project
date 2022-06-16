import classes from './QueueBox.module.scss';

interface IProps {
  queueLength: number;
  activeQueue: number;
  setSlide: (slideNumber: number) => void;
}

const QueueBox = ({queueLength, activeQueue, setSlide}: IProps) => {
  const renderBoxes = [...Array(queueLength)].map((box, index) => {
    const boxClass = index === activeQueue 
      ? `${classes['queue-box']} ${classes['queue-box--active']}`
      : `${classes['queue-box']}`

    return <span key={index} className={boxClass} onClick={setSlide.bind(this, index)} />
  })

  return (
    <div className={classes['queue-boxes']}>
      {renderBoxes}
    </div>
  )
}

export default QueueBox