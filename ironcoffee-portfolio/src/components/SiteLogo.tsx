import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

export type SiteLogoContext = 'header' | 'drawer' | 'footer';

const SiteLogo: React.FC<{ context: SiteLogoContext }> = ({ context }) => {
  const theme = useTheme();
  const isFooter = context === 'footer';
  const fg = isFooter
    ? theme.palette.text.primary
    : theme.palette.mode === 'dark'
      ? '#f1f5f9'
      : '#0f172a';

  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.45em',
        lineHeight: 1,
        flexShrink: 0,
        maxWidth: { xs: 'min(78vw, 15rem)', sm: 'none' },
        fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
        fontSize: 'clamp(0.9rem, 2.2vw, 1.05rem)',
        letterSpacing: '-0.04em',
        color: fg,
        ...(isFooter
          ? {}
          : {
              filter:
                'drop-shadow(0 1px 2px rgba(0,0,0,0.45)) drop-shadow(0 2px 4px rgba(0,0,0,0.22))',
            }),
      }}
    >
      <Box
        component="img"
        src="/favicon-96x96.png"
        alt=""
        width={96}
        height={96}
        sx={{
          width: '1em',
          height: '1em',
          flexShrink: 0,
          display: 'block',
          objectFit: 'contain',
        }}
      />
      <Box
        component="span"
        sx={{
          whiteSpace: 'nowrap',
        }}
      >
        <Box component="span" sx={{ fontWeight: 600 }}>
          IronCoffee
        </Box>
        <Box component="span" sx={{ fontWeight: 500, opacity: 0.92 }}>
          {'\u200a'}
          Solutions
        </Box>
      </Box>
    </Box>
  );
};

export default SiteLogo;
