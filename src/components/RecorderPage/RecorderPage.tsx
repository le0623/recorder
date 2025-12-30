import BrowserNotSupported from 'components/BrowserNotSupported';
import Compose from 'components/Compose';
import RecorderInterface from 'components/RecorderInterface';
import { CountdownProvider } from 'contexts/countdown';
import { LayoutProvider } from 'contexts/layout';
import { MediaDevicesProvider } from 'contexts/mediaDevices';
import { PictureInPictureProvider } from 'contexts/pictureInPicture';
import { RecordingProvider } from 'contexts/recording';
import { ScreenshareProvider } from 'contexts/screenshare';
import { SessionProvider } from 'contexts/session';
import { StreamsProvider } from 'contexts/streams';

const isBrowserSupported =
  'documentPictureInPicture' in window &&
  'MediaStreamTrackProcessor' in window &&
  'MediaStreamTrackGenerator' in window;

type RecorderPageProps = {
  sessionId: string;
  userName: string;
  userEmail: string;
};

const RecorderPage = ({
  sessionId,
  userName,
  userEmail,
}: RecorderPageProps) => {
  if (!isBrowserSupported) {
    return <BrowserNotSupported />;
  }

  const RecordingProviderWithProps = ({
    children,
  }: {
    children: React.ReactNode;
  }) => (
    <RecordingProvider
      sessionId={sessionId}
      userName={userName}
      userEmail={userEmail}
    >
      {children}
    </RecordingProvider>
  );

  const SessionProviderWithProps = ({
    children,
  }: {
    children: React.ReactNode;
  }) => <SessionProvider sessionId={sessionId}>{children}</SessionProvider>;

  return (
    <Compose
      components={[
        LayoutProvider,
        StreamsProvider,
        SessionProviderWithProps,
        RecordingProviderWithProps,
        PictureInPictureProvider,
        MediaDevicesProvider,
        ScreenshareProvider,
        CountdownProvider,
      ]}
    >
      <RecorderInterface />
    </Compose>
  );
};

export default RecorderPage;
