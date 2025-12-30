import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import RecorderPage from 'components/RecorderPage';

const SessionPage = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [open, setOpen] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [canProceed, setCanProceed] = useState(false);
  const [userInfo, setUserInfo] = useState<{
    name: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    if (name.trim() && email.trim() && isValidEmail(email)) {
      setCanProceed(true);
    } else {
      setCanProceed(false);
    }
  }, [name, email]);

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleClose = (event: NonNullable<unknown>, reason?: string) => {
    if (reason === 'backdropClick' && !canProceed) {
      return; // Prevent closing on backdrop click if form is not valid
    }
    if (canProceed) {
      setOpen(false);
    }
  };

  const handleSubmit = () => {
    if (canProceed) {
      // Store the user information before closing the modal
      setUserInfo({ name: name.trim(), email: email.trim() });
      setOpen(false);
    }
  };

  return (
    <Box>
      <Dialog
        open={open}
        onClose={handleClose}
        disableEscapeKeyDown={!canProceed}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Enter Your Information</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 2 }}>
            <TextField
              autoFocus
              label="Name"
              fullWidth
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              error={name.trim() !== '' && name.trim().length < 2}
              helperText={
                name.trim() !== '' && name.trim().length < 2
                  ? 'Name must be at least 2 characters'
                  : ''
              }
            />
            <TextField
              label="Email"
              fullWidth
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              error={email.trim() !== '' && !isValidEmail(email)}
              helperText={
                email.trim() !== '' && !isValidEmail(email)
                  ? 'Please enter a valid email address'
                  : ''
              }
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ paddingLeft: 3, paddingRight: 3 }}>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={!canProceed}
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>
      {!open && sessionId && userInfo && (
        <RecorderPage
          sessionId={sessionId}
          userName={userInfo.name}
          userEmail={userInfo.email}
        />
      )}
    </Box>
  );
};

export default SessionPage;
