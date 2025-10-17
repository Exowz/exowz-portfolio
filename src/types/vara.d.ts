declare module 'vara' {
  interface VaraOptions {
    strokeWidth?: number;
    color?: string;
    fontSize?: number;
    textAlign?: string;
  }

  interface VaraText {
    text: string;
    y?: number;
    fromCurrentPosition?: { y: boolean };
    duration?: number;
    delay?: number;
  }

  interface VaraContainer {
    style: {
      transition: string;
      opacity: string;
    };
  }

  interface VaraAnimationObject {
    container: VaraContainer;
  }

  class Vara {
    constructor(
      selector: string,
      fontUrl: string,
      texts: VaraText[],
      options?: VaraOptions
    );
    
    ready(callback: () => void): void;
    animationEnd(callback: (index: number, obj: VaraAnimationObject) => void): void;
  }

  export default Vara;
}