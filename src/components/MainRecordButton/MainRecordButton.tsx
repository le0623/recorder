import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { useRecording } from 'contexts/recording';
import { useSession } from 'contexts/session';
import PiPRecordButton from 'components/PiPRecordButton';
import useStopWatch from 'hooks/useStopWatch';
import { formatDuration } from 'services/format/duration';
import CameraSelect from 'components/CameraSelect';
import MicrophoneSelect from 'components/MicrophoneSelect';

import styles from './MainRecordButton.module.css';

const MainRecordButton = () => {
  const { isRecording, startRecording, stopRecording } = useRecording();
  const { isLastQuestion, nextQuestion, setCurrentQuestionIndex } =
    useSession();
  const stopWatch = useStopWatch();

  const handleStart = () => {
    setCurrentQuestionIndex(0); // Reset to first question when starting
    startRecording();
    stopWatch.start();
  };

  const handleNextOrFinish = () => {
    if (isLastQuestion) {
      stopRecording();
      stopWatch.stop();
    } else {
      nextQuestion();
    }
  };

  return (
    <>
      <Typography className={styles.duration} variant="subtitle2">
        {formatDuration(stopWatch.elapsed)}
      </Typography>
      <div className={styles.controls}>
        {!isRecording ? (
          <Tooltip title="Start">
            <PiPRecordButton onCountdownEnd={handleStart} />
          </Tooltip>
        ) : (
          <Button
            variant="contained"
            onClick={handleNextOrFinish}
            className={styles.actionButton}
          >
            {isLastQuestion ? 'Finish' : 'Next'}
          </Button>
        )}
      </div>
      <div className={styles.devices}>
        <MicrophoneSelect />
        <CameraSelect />
      </div>
    </>
  );
};

export default MainRecordButton;
