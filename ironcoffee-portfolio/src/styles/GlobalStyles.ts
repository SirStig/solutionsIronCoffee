import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  /* Comprehensive animations with browser compatibility */
  @keyframes spin {
    0% { 
      transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      -o-transform: rotate(0deg);
    }
    100% { 
      transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      -o-transform: rotate(360deg);
    }
  }

  @-webkit-keyframes spin {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
  }

  @-moz-keyframes spin {
    0% { -moz-transform: rotate(0deg); }
    100% { -moz-transform: rotate(360deg); }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(clamp(10px, 2vw, 30px));
      -webkit-transform: translateY(clamp(10px, 2vw, 30px));
      -moz-transform: translateY(clamp(10px, 2vw, 30px));
    }
    to {
      opacity: 1;
      transform: translateY(0);
      -webkit-transform: translateY(0);
      -moz-transform: translateY(0);
    }
  }

  @-webkit-keyframes fadeIn {
    from {
      opacity: 0;
      -webkit-transform: translateY(clamp(10px, 2vw, 30px));
    }
    to {
      opacity: 1;
      -webkit-transform: translateY(0);
    }
  }

  @keyframes slideIn {
    from {
      transform: translateX(-100%);
      -webkit-transform: translateX(-100%);
      -moz-transform: translateX(-100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      -webkit-transform: translateX(0);
      -moz-transform: translateX(0);
      opacity: 1;
    }
  }

  @-webkit-keyframes slideIn {
    from {
      -webkit-transform: translateX(-100%);
      opacity: 0;
    }
    to {
      -webkit-transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes glow {
    0%, 100% {
      box-shadow: 0 0 clamp(5px, 1vw, 10px) rgba(100, 255, 218, 0.2);
      -webkit-box-shadow: 0 0 clamp(5px, 1vw, 10px) rgba(100, 255, 218, 0.2);
      -moz-box-shadow: 0 0 clamp(5px, 1vw, 10px) rgba(100, 255, 218, 0.2);
    }
    50% {
      box-shadow: 0 0 clamp(20px, 3vw, 40px) rgba(100, 255, 218, 0.4);
      -webkit-box-shadow: 0 0 clamp(20px, 3vw, 40px) rgba(100, 255, 218, 0.4);
      -moz-box-shadow: 0 0 clamp(20px, 3vw, 40px) rgba(100, 255, 218, 0.4);
    }
  }

  @keyframes gradientBG {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  @keyframes lineDrawing {
    from {
      stroke-dashoffset: 1000;
    }
    to {
      stroke-dashoffset: 0;
    }
  }

  @keyframes glowPulse {
    0%, 100% {
      text-shadow: 0 0 clamp(5px, 1vw, 10px) rgba(100, 255, 218, 0.3);
    }
    50% {
      text-shadow: 0 0 clamp(15px, 2vw, 25px) rgba(100, 255, 218, 0.6);
    }
  }

  /* Responsive keyframes for high resolution displays */
  @media (min-width: 2560px) {
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(clamp(20px, 1.5vw, 40px));
        -webkit-transform: translateY(clamp(20px, 1.5vw, 40px));
      }
    }
  }

  @media (min-width: 3840px) {
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(clamp(30px, 1.2vw, 50px));
        -webkit-transform: translateY(clamp(30px, 1.2vw, 50px));
      }
    }
  }

  @media (min-width: 7680px) {
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(clamp(40px, 1vw, 60px));
        -webkit-transform: translateY(clamp(40px, 1vw, 60px));
      }
    }
  }

  /* Modern CSS Reset */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: 'SF Mono', 'Fira Code', monospace;
    line-height: 1.5;
    z-index: 1;
    background-color: ${props => props.theme.palette.background.default};
    color: ${props => props.theme.palette.text.primary};
    overflow-x: hidden;
    cursor: none;
    transition: background-color 0.3s ease, color 0.3s ease;

    &.loading {
      overflow: hidden;
    }

    &.light-mode {
      .MuiAppBar-root {
        background: rgba(241, 245, 249, 0.85) !important;
        box-shadow: 0 4px 20px rgba(15, 23, 42, 0.1);
      }
      
      .MuiTypography-root {
        color: ${props => props.theme.palette.text.primary};
      }
      
      .MuiChip-root {
        background: ${props => props.theme.palette.primary.main}15;
        color: ${props => props.theme.palette.primary.dark};
        border: 1px solid ${props => props.theme.palette.primary.main}30;
      }

      .MuiCard-root {
        background: rgba(255, 255, 255, 0.9);
        box-shadow: 0 4px 20px rgba(15, 23, 42, 0.1);
      }

      .MuiButton-contained,
      .MuiButton-outlined {
        background: rgba(255, 255, 255, 0.15);
        border: 1px solid rgba(255, 255, 255, 0.25);
        color: #111827;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

        &:hover {
          background: rgba(255, 255, 255, 0.25);
          border-color: rgba(255, 255, 255, 0.35);
          box-shadow: 0 6px 30px rgba(0, 0, 0, 0.15);
        }
      }

      h1, h2, h3, h4, h5, h6 {
        color: ${({ theme }) => theme.palette.text.primary};
      }
      
      p, span, div {
        color: ${({ theme }) => theme.palette.text.secondary};
      }

      .numbered-heading {
        &:after {
          background-color: rgba(13, 148, 136, 0.3);
        }
      }
    }
    
    &.dark-mode {
      .MuiAppBar-root {
        background: rgba(10, 25, 47, 0.8) !important;
      }

      .MuiButton-contained,
      .MuiButton-outlined {
        background: rgba(0, 0, 0, 0.15);
        border: 1px solid rgba(255, 255, 255, 0.15);
        color: #FFFFFF;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);

        &:hover {
          background: rgba(0, 0, 0, 0.25);
          border-color: rgba(255, 255, 255, 0.25);
          box-shadow: 0 6px 30px rgba(0, 0, 0, 0.4);
        }
      }
    }
  }

  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }

  input, button, textarea, select {
    font: inherit;
  }

  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
  }

  #root {
    isolation: isolate;
  }

  /* Custom Global Styles */
  ::selection {
    background-color: ${({ theme }) => 
      theme.palette.mode === 'light'
        ? 'rgba(13, 148, 136, 0.2)'
        : 'rgba(100, 255, 218, 0.2)'};
    color: ${({ theme }) => theme.palette.primary.main};
  }

  /* Scrollbar Styles */
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) =>
      theme.palette.mode === 'light'
        ? '#F8FAFC'
        : '#1a202c'};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) =>
      theme.palette.mode === 'light'
        ? '#CBD5E1'
        : '#4a5568'};
    border-radius: 10px;

    &:hover {
      background: ${({ theme }) => theme.palette.primary.main};
    }
  }

  /* Smooth transitions for theme changes */
  * {
    transition: background-color 0.3s ease,
                color 0.3s ease,
                border-color 0.3s ease,
                box-shadow 0.3s ease;
  }

  /* Animation Keyframes */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideIn {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }

  /* Common Animation Classes */
  .fade-in {
    animation: fadeIn 0.6s ease-out forwards;
  }

  .slide-in {
    animation: slideIn 0.6s ease-out forwards;
  }

  .glow-hover {
    transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
    
    &:hover {
      color: ${props => props.theme.palette.primary.main};
      animation: glowPulse 2s infinite;
    }
  }

  /* Link Styles */
  a {
    color: ${props => props.theme.palette.primary.main};
    text-decoration: none;
    transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
    cursor: none;

    &:hover {
      color: ${props => props.theme.palette.primary.light};
    }
  }

  /* Button Styles */
  button {
    cursor: none;
  }

  /* Comprehensive Container Styles with Full Responsive Breakpoints */
  .container {
    width: 100%;
    margin: 0 auto;
    position: relative;
    
    /* Mobile first approach */
    max-width: 100%;
    padding: 0 clamp(1rem, 4vw, 1.5rem);
    
    /* Small mobile (320px+) */
    @media (min-width: 320px) {
      padding: 0 clamp(1rem, 3vw, 1.25rem);
    }
    
    /* Large mobile (480px+) */
    @media (min-width: 480px) {
      max-width: 480px;
      padding: 0 clamp(1.25rem, 3vw, 1.5rem);
    }
    
    /* Tablet portrait (600px+) */
    @media (min-width: 600px) {
      max-width: 600px;
      padding: 0 clamp(1.5rem, 2.5vw, 2rem);
    }
    
    /* Tablet landscape (768px+) */
    @media (min-width: 768px) {
      max-width: 768px;
      padding: 0 clamp(2rem, 2.5vw, 2.5rem);
    }
    
    /* Desktop small (960px+) */
    @media (min-width: 960px) {
      max-width: 960px;
      padding: 0 clamp(2.5rem, 2vw, 3rem);
    }
    
    /* Desktop medium (1024px+) */
    @media (min-width: 1024px) {
      max-width: 1024px;
      padding: 0 clamp(3rem, 2vw, 3.5rem);
    }
    
    /* Desktop large (1280px+) */
    @media (min-width: 1280px) {
      max-width: 1280px;
      padding: 0 clamp(3.5rem, 1.8vw, 4rem);
    }
    
    /* Desktop XL (1366px+) */
    @media (min-width: 1366px) {
      max-width: 1366px;
      padding: 0 clamp(4rem, 1.5vw, 4.5rem);
    }
    
    /* Full HD (1920px+) */
    @media (min-width: 1920px) {
      max-width: 1920px;
      padding: 0 clamp(4.5rem, 1.5vw, 5rem);
    }
    
    /* 2K/QHD (2560px+) */
    @media (min-width: 2560px) {
      max-width: 2400px;
      padding: 0 clamp(5rem, 1.2vw, 6rem);
    }
    
    /* Ultra-wide (3440px+) */
    @media (min-width: 3440px) {
      max-width: 3200px;
      padding: 0 clamp(6rem, 1vw, 7rem);
    }
    
    /* 4K (3840px+) */
    @media (min-width: 3840px) {
      max-width: 3600px;
      padding: 0 clamp(7rem, 0.8vw, 8rem);
    }
    
    /* 5K (5120px+) */
    @media (min-width: 5120px) {
      max-width: 4800px;
      padding: 0 clamp(8rem, 0.7vw, 10rem);
    }
    
    /* 6K (6016px+) */
    @media (min-width: 6016px) {
      max-width: 5600px;
      padding: 0 clamp(10rem, 0.6vw, 12rem);
    }
    
    /* 8K (7680px+) */
    @media (min-width: 7680px) {
      max-width: 7200px;
      padding: 0 clamp(12rem, 0.5vw, 15rem);
    }
  }

  /* Comprehensive Section Styles with Full Responsive Support */
  section {
    z-index: 1;
    position: relative;
    
    /* Mobile first padding */
    padding: clamp(3rem, 8vw, 4rem) 0;
    
    /* Small mobile (320px+) */
    @media (min-width: 320px) {
      padding: clamp(3.5rem, 7vw, 4.5rem) 0;
    }
    
    /* Large mobile (480px+) */
    @media (min-width: 480px) {
      padding: clamp(4rem, 6vw, 5rem) 0;
    }
    
    /* Tablet portrait (600px+) */
    @media (min-width: 600px) {
      padding: clamp(5rem, 5vw, 6rem) 0;
    }
    
    /* Tablet landscape (768px+) */
    @media (min-width: 768px) {
      padding: clamp(6rem, 4vw, 8rem) 0;
    }
    
    /* Desktop small (960px+) */
    @media (min-width: 960px) {
      padding: clamp(7rem, 3.5vw, 9rem) 0;
    }
    
    /* Desktop medium (1024px+) */
    @media (min-width: 1024px) {
      padding: clamp(8rem, 3vw, 10rem) 0;
    }
    
    /* Desktop large (1280px+) */
    @media (min-width: 1280px) {
      padding: clamp(9rem, 2.5vw, 12rem) 0;
    }
    
    /* Desktop XL (1366px+) */
    @media (min-width: 1366px) {
      padding: clamp(10rem, 2.2vw, 13rem) 0;
    }
    
    /* Full HD (1920px+) */
    @media (min-width: 1920px) {
      padding: clamp(12rem, 2vw, 15rem) 0;
    }
    
    /* 2K/QHD (2560px+) */
    @media (min-width: 2560px) {
      padding: clamp(15rem, 1.8vw, 18rem) 0;
    }
    
    /* Ultra-wide (3440px+) */
    @media (min-width: 3440px) {
      padding: clamp(18rem, 1.5vw, 22rem) 0;
    }
    
    /* 4K (3840px+) */
    @media (min-width: 3840px) {
      padding: clamp(22rem, 1.2vw, 26rem) 0;
    }
    
    /* 5K (5120px+) */
    @media (min-width: 5120px) {
      padding: clamp(26rem, 1vw, 32rem) 0;
    }
    
    /* 6K (6016px+) */
    @media (min-width: 6016px) {
      padding: clamp(32rem, 0.8vw, 38rem) 0;
    }
    
    /* 8K (7680px+) */
    @media (min-width: 7680px) {
      padding: clamp(38rem, 0.6vw, 45rem) 0;
    }

    &.gradient-bg {
      background: linear-gradient(
        -45deg,
        ${props => props.theme.palette.background.default},
        ${props => props.theme.palette.background.paper},
        ${props => props.theme.palette.customBackground.darker},
        ${props => props.theme.palette.customBackground.darkest}
      );
      background-size: 400% 400%;
      animation: gradientBG 15s ease infinite;
    }

    &.light-section {
      background-color: ${props => props.theme.palette.background.paper};
      box-shadow: 0 clamp(4px, 1vw, 8px) clamp(20px, 3vw, 40px) rgba(15, 23, 42, 0.1);
      -webkit-box-shadow: 0 clamp(4px, 1vw, 8px) clamp(20px, 3vw, 40px) rgba(15, 23, 42, 0.1);
      -moz-box-shadow: 0 clamp(4px, 1vw, 8px) clamp(20px, 3vw, 40px) rgba(15, 23, 42, 0.1);
    }

    &.compact {
      /* Compact sections for tighter layouts */
      padding: clamp(2rem, 4vw, 3rem) 0;
      
      @media (min-width: 768px) {
        padding: clamp(3rem, 3vw, 4rem) 0;
      }
      
      @media (min-width: 1920px) {
        padding: clamp(4rem, 2vw, 6rem) 0;
      }
      
      @media (min-width: 3840px) {
        padding: clamp(6rem, 1.5vw, 8rem) 0;
      }
      
      @media (min-width: 7680px) {
        padding: clamp(8rem, 1vw, 12rem) 0;
      }
    }
  }

  /* Typography Styles */
  h1, h2, h3, h4, h5, h6 {
    z-index: 1;
    margin: 0 0 1rem;
    font-weight: 600;
    line-height: 1.1;
    color: ${props => props.theme.palette.text.primary};
  }

  /* Numbered Headings */
  .numbered-heading {
    z-index: 1;
    display: flex;
    align-items: center;
    position: relative;
    margin: 10px 0 40px;
    width: 100%;
    font-size: clamp(26px, 5vw, 32px);
    white-space: nowrap;

    &:before {
      position: relative;
      bottom: 4px;
      counter-increment: section;
      content: "0" counter(section) ".";
      margin-right: 10px;
      color: ${props => props.theme.palette.primary.main};
      font-family: "SF Mono", "Fira Code", monospace;
      font-size: clamp(16px, 3vw, 20px);
      font-weight: 400;
    }

    &:after {
      content: "";
      display: block;
      position: relative;
      top: -5px;
      width: 300px;
      height: 1px;
      margin-left: 20px;
      background-color: ${props => props.theme.palette.primary.main};

      @media (max-width: 1080px) {
        width: 200px;
      }
      @media (max-width: 768px) {
        width: 100%;
      }
      @media (max-width: 600px) {
        margin-left: 10px;
      }
    }
  }

  /* Grid Layout */
  .grid {
    z-index: 1;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }

  /* Card Styles */
  .card {
    z-index: 1;
    background: ${props => props.theme.palette.background.paper};
    border-radius: 4px;
    padding: 2rem;
    transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
    box-shadow: ${props => 
      props.theme.palette.mode === 'light'
        ? '0 4px 20px rgba(15, 23, 42, 0.1)'
        : '0 4px 20px rgba(0, 0, 0, 0.3)'};
    
    &:hover {
      transform: translateY(-8px);
      box-shadow: ${props => 
        props.theme.palette.mode === 'light'
          ? '0 20px 30px -15px rgba(15, 23, 42, 0.2)'
          : '0 20px 30px -15px rgba(2, 12, 27, 0.7)'};
    }
  }

  /* Image Styles */
  img {
    max-width: 100%;
    height: auto;
    vertical-align: middle;
  }

  /* List Styles */
  ul {
    z-index: 1;
    list-style: none;
    
    li {
      position: relative;
      padding-left: 30px;
      margin-bottom: 10px;
      color: ${props => props.theme.palette.text.secondary};
      
      &:before {
        content: "▹";
        position: absolute;
        left: 0;
        color: ${props => props.theme.palette.primary.main};
      }
    }
  }

  .MuiAppBar-root {
    backdrop-filter: blur(8px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
  }

  .animated-line {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: lineDrawing 2s ease forwards;
  }

  .content-section {
    z-index: 1;
    position: relative;
    overflow: hidden;
    background: ${props => 
      props.theme.palette.mode === 'light'
        ? 'rgba(255, 255, 255, 0.9)'
        : 'rgba(17, 34, 64, 0.5)'};
    backdrop-filter: blur(10px);
    border: 1px solid ${props => 
      props.theme.palette.mode === 'light'
        ? 'rgba(13, 148, 136, 0.1)'
        : 'rgba(100, 255, 218, 0.1)'};
    box-shadow: ${props => 
      props.theme.palette.mode === 'light'
        ? '0 4px 20px rgba(15, 23, 42, 0.1)'
        : '0 4px 20px rgba(0, 0, 0, 0.3)'};
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 2px;
      height: 100%;
      background: ${props => props.theme.palette.primary.main};
      opacity: ${props => props.theme.palette.mode === 'light' ? 0.3 : 0.5};
      transform: scaleY(0);
      transform-origin: top;
      transition: transform 0.6s ease;
    }
    
    &.visible::before {
      transform: scaleY(1);
    }
  }

  /* Enhance card visibility in light mode */
  .MuiCard-root {
    backdrop-filter: blur(10px);
    box-shadow: ${({ theme }) => 
      theme.palette.mode === 'light' 
        ? '0 8px 32px rgba(15, 23, 42, 0.1)'
        : '0 8px 32px rgba(0, 0, 0, 0.3)'};
  }

  /* Improve button visibility */
  .MuiButton-root {
    font-weight: 500;
    letter-spacing: 0.5px;
    text-shadow: ${({ theme }) => 
      theme.palette.mode === 'light'
        ? 'none'
        : '0 0 8px rgba(100, 255, 218, 0.3)'};
  }

  /* Enhanced focus states */
  *:focus-visible {
    outline: 2px solid ${({ theme }) => theme.palette.primary.main};
    outline-offset: 2px;
  }
`;
