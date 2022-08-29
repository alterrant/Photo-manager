type ErrorMessageType = {
  errorMessage: string;
};

export const ErrorMessage = ({ errorMessage }: ErrorMessageType) => (
  <div className="error-text-wrapper">
    <div className="error-text-message">{errorMessage}</div>
  </div>
);
