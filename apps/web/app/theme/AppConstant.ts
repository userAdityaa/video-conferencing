export const AppColors = {
    primary: {
      main: '#338aff',
      light: '#70b1ff',
      dark: '#0066cc',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ffea00',
      light: '#ff8a65',
      dark: '#c41c00',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
      disabled: '#bdbdbd',
    },
    error: {
      main: '#d32f2f',
      light: '#ef5350',
      dark: '#c62828',
    },
    success: {
      main: '#2e7d32',
      light: '#4caf50',
      dark: '#1b5e20',
    },
    warning: {
      main: '#ed6c02',
      light: '#ff9800',
      dark: '#e65100',
    },
  };
  
export const AppStyles = {
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
};

export const AppFont = {
    primary: {
        main: '"Black Han Sans", sans-serif',
        bold: '"Black Han Sans", sans-serif', // Black Han Sans is already bold by default
        light: '"Pretendard Variable", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
    },
    secondary: {
        main: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', // Fallback fonts
    },
};

export const AppFontSize = {
    primary: { 
        header: '24px', 
        main: '26px',
        normal: '22px'
    }
}
