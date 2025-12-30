import { Box, CircularProgress, Typography } from '@mui/material';

import { useRecording } from 'contexts/recording';
import { useSession } from 'contexts/session';

import styles from './Questions.module.css';

const Questions = () => {
  const { isRecording } = useRecording();
  const { sessionData, loading, error, currentQuestionIndex } = useSession();

  if (loading) {
    return (
      <Box className={styles.root}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (error || !sessionData) {
    return (
      <Box className={styles.root}>
        <Typography variant="body2" color="error">
          {error || 'Failed to load session data'}
        </Typography>
      </Box>
    );
  }

  // Show description before recording starts
  if (!isRecording) {
    if (sessionData.description) {
      return (
        <Box className={styles.root}>
          <Typography variant="body1" className={styles.description}>
            {sessionData.description}
          </Typography>
        </Box>
      );
    }
    return null;
  }

  // Show questions only when recording
  if (sessionData.questions.length === 0) {
    return null;
  }

  const currentQuestion = sessionData.questions[currentQuestionIndex];

  return (
    <Box className={styles.root}>
      <Typography variant="h6" className={styles.question}>
        {currentQuestion}
      </Typography>
      {sessionData.questions.length > 1 && (
        <Typography variant="body2" className={styles.counter}>
          {currentQuestionIndex + 1} / {sessionData.questions.length}
        </Typography>
      )}
    </Box>
  );
};

export default Questions;
