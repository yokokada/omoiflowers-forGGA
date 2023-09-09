import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使って次のレンダリングで代替 UI を表示する
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // あなたは同様にエラーレポートを外部サービスにログとして記録することができる
    console.error("Caught an error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // カスタムのフォールバック UI をレンダリングする
      return <h1>何かが間違っています。</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
