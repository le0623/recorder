// import RecordButton from 'components/RecordButton';
// import { useCountdown } from 'contexts/countdown';
// import { useLayout } from 'contexts/layout';
// import { usePictureInPicture } from 'contexts/pictureInPicture';
// import { useScreenshare } from 'contexts/screenshare';
import cx from 'classnames';
import StopIcon from '@mui/icons-material/Stop';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { useRecording } from 'contexts/recording';
import PiPRecordButton from 'components/PiPRecordButton';
import useStopWatch from 'hooks/useStopWatch';
import { formatDuration } from 'services/format/duration';
import CameraSelect from 'components/CameraSelect';
import MicrophoneSelect from 'components/MicrophoneSelect';

import styles from './MainRecordButton.module.css';

const MainRecordButton = () => {
  const { isRecording, isPaused, startRecording, stopRecording } =
    useRecording();
  const stopWatch = useStopWatch();

  return (
    // <RecordButton
    //   className={cx(styles.root, { [styles.recording]: isRecording })}
    //   classes={{ icon: styles.icon }}
    //   onClick={async () => {
    //     if (countingDown) {
    //       return;
    //     }
    //     // if (isRecording) {
    //     //   pipWindow?.close();
    //     // } else if (pipWindow) {
    //     //   setCountingDown(true);
    //     // } else if (layout === 'cameraOnly') {
    //     //   await requestPipWindow();
    //     // } else {
    //     //   await startScreenshare();
    //     // }
    //   }}
    // />
    <>
      <Typography className={styles.duration} variant="subtitle2">
        {formatDuration(stopWatch.elapsed)}
      </Typography>
      <div className={styles.controls}>
        {!isRecording ? (
          <Tooltip title="Start recording">
            <PiPRecordButton
              onCountdownEnd={() => {
                startRecording();
                stopWatch.start();
              }}
            />
          </Tooltip>
        ) : (
          <>
            {/* <Tooltip title={isPaused ? 'Resume' : 'Pause'}>
              <IconButton
                color={isPaused ? 'primary' : 'default'}
                onClick={() => {
                  if (isPaused) {
                    resumeRecording();
                    stopWatch.start();
                  } else {
                    stopWatch.stop();
                    pauseRecording();
                  }
                }}
              >
                {isPaused ? <PlayArrowIcon /> : <PauseIcon />}
              </IconButton>
            </Tooltip> */}
            <Tooltip title="Stop">
              <IconButton
                className={cx(styles.stopButton)}
                color={isPaused ? 'default' : 'primary'}
                onClick={() => {
                  stopRecording();
                  stopWatch.stop();
                }}
              >
                <StopIcon />
              </IconButton>
            </Tooltip>
          </>
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
