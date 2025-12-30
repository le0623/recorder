import { Box, Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import styles from './LandingPage.module.css';

const LandingPage = () => {
  return (
    <Box className={styles.root}>
      {/* Hero Section */}
      <Box component="section" className={styles.hero}>
        <Container maxWidth="md">
          <Typography variant="h1" className={styles.heroTitle}>
            Conduct Asynchronous Video Interviews
          </Typography>
          <Typography variant="h5" className={styles.heroSubtitle}>
            Simple, reliable, and flexible interview platform for remote
            candidates
          </Typography>
          <Box className={styles.heroActions}>
            <Button
              component={Link}
              to="/signup"
              variant="contained"
              size="large"
              className={styles.ctaButton}
              disabled
            >
              Get Started
            </Button>
            <Button
              component={Link}
              to="/signin"
              variant="outlined"
              size="large"
              className={styles.ctaButton}
              disabled
            >
              Sign In
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Box component="section" className={styles.section}>
        <Container maxWidth="lg">
          <Typography variant="h2" className={styles.sectionTitle}>
            Key Benefits
          </Typography>
          <Box className={styles.benefitsGrid}>
            <Box className={styles.benefitCard}>
              <Typography variant="h4" className={styles.benefitTitle}>
                Flexible
              </Typography>
              <Typography variant="body1" className={styles.benefitDescription}>
                Candidates can complete interviews at their own convenience,
                reducing scheduling conflicts and improving participation rates.
              </Typography>
            </Box>
            <Box className={styles.benefitCard}>
              <Typography variant="h4" className={styles.benefitTitle}>
                Scalable
              </Typography>
              <Typography variant="body1" className={styles.benefitDescription}>
                Conduct multiple interviews simultaneously without the need for
                real-time coordination, making it perfect for high-volume
                recruitment.
              </Typography>
            </Box>
            <Box className={styles.benefitCard}>
              <Typography variant="h4" className={styles.benefitTitle}>
                Time-Saving
              </Typography>
              <Typography variant="body1" className={styles.benefitDescription}>
                Administrators review interviews when convenient, eliminating
                back-and-forth scheduling and maximizing efficiency.
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box component="section" className={styles.section}>
        <Container maxWidth="lg">
          <Typography variant="h2" className={styles.sectionTitle}>
            How It Works
          </Typography>
          <Box className={styles.stepsContainer}>
            <Box className={styles.step}>
              <Typography variant="h3" className={styles.stepNumber}>
                1
              </Typography>
              <Typography variant="h5" className={styles.stepTitle}>
                Admin Creates Session
              </Typography>
              <Typography variant="body1" className={styles.stepDescription}>
                Administrators create structured interview sessions with
                predefined questions tailored to the role.
              </Typography>
            </Box>
            <Box className={styles.step}>
              <Typography variant="h3" className={styles.stepNumber}>
                2
              </Typography>
              <Typography variant="h5" className={styles.stepTitle}>
                Candidate Completes Interview
              </Typography>
              <Typography variant="body1" className={styles.stepDescription}>
                Candidates receive a session link and complete the interview
                remotely at their convenience using their browser.
              </Typography>
            </Box>
            <Box className={styles.step}>
              <Typography variant="h3" className={styles.stepNumber}>
                3
              </Typography>
              <Typography variant="h5" className={styles.stepTitle}>
                Review & Evaluate
              </Typography>
              <Typography variant="body1" className={styles.stepDescription}>
                Administrators review completed interviews, evaluate responses,
                and make informed hiring decisions.
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box component="section" className={styles.ctaSection}>
        <Container maxWidth="md">
          <Typography variant="h3" className={styles.ctaTitle}>
            Ready to Get Started?
          </Typography>
          <Typography variant="h6" className={styles.ctaSubtitle}>
            Start conducting better interviews today
          </Typography>
          <Button
            component={Link}
            to="/signup"
            variant="contained"
            size="large"
            className={styles.ctaButton}
            disabled
          >
            Get Started
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
