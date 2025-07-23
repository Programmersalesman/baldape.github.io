import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    // Optionally log error to an error reporting service here
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 32, color: '#b91c1c', background: '#fff3f3', borderRadius: 8 }}>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap', color: '#333' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary; 