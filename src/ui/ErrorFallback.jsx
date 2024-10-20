import Error from "./Error";

function ErrorFallback({ error, resetErrorBoundary }) {
  return <Error message={error.message} onClick={resetErrorBoundary} />;
}

export default ErrorFallback;
