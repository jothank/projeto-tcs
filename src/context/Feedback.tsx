import React, { createContext, useCallback, useContext, useState } from 'react';
import { FeedbackDialog, FeedbackType } from '../components/FeedbackDialog';

export interface FeedbackContent {
  type?: FeedbackType;
  title?: string;
  description?: string;
  showDescriptionBackgroundContrast?: boolean;
  subDescription?: string;
  customDescription?: JSX.Element;
  additionalAction?: () => any;
  addActionDescription?: string;
  okButtonAction?: () => any;
  okButtonLabel?: string;
  timeout?: number;
  removeTimeout?: boolean;
  showCloseButton?: boolean;
}

interface FeedbackContextDTO {
  addFeedback(message: FeedbackContent): void;
}

const FeedbackContext = createContext<FeedbackContextDTO>({} as FeedbackContextDTO);

const FeedbackProvider = ({ children }: any) => {
  const [message, setMessage] = useState<FeedbackContent>({} as FeedbackContent);

  const addFeedback = useCallback((content: FeedbackContent) => {
    setMessage(content);
  }, []);

  return (
    <FeedbackContext.Provider value={{ addFeedback }}>
      {children}
      <FeedbackDialog message={message} />
    </FeedbackContext.Provider>
  );
};

function useFeedback(): FeedbackContextDTO {
  return useContext(FeedbackContext);
}

export { FeedbackProvider, useFeedback };
