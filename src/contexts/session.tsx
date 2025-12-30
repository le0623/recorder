import { createContext, useContext, useEffect, useState } from 'react';

type SessionData = {
  description: string;
  questions: string[];
};

type SessionContextType = {
  sessionData: SessionData | null;
  loading: boolean;
  error: string | null;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number) => void;
  nextQuestion: () => void;
  isLastQuestion: boolean;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

const apiUrl = import.meta.env.VITE_API_URL;

type SessionProviderProps = {
  children: React.ReactNode;
  sessionId: string;
};

export const SessionProvider = ({
  children,
  sessionId,
}: SessionProviderProps) => {
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${apiUrl}/api/session/${sessionId}`);

        if (!response.ok) {
          throw new Error('Failed to fetch session data');
        }

        const data: SessionData = await response.json();
        setSessionData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        console.error('Failed to fetch session data', err);
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) {
      fetchSessionData();
    }
  }, [sessionId]);

  const nextQuestion = () => {
    if (
      sessionData &&
      currentQuestionIndex < sessionData.questions.length - 1
    ) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const isLastQuestion =
    sessionData !== null &&
    currentQuestionIndex === sessionData.questions.length - 1;

  return (
    <SessionContext.Provider
      value={{
        sessionData,
        loading,
        error,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        nextQuestion,
        isLastQuestion,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = (): SessionContextType => {
  const context = useContext(SessionContext);

  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }

  return context;
};
