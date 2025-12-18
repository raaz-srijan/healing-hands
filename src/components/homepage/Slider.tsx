'use client';

import { Box, Container, Typography, Button, Stack, Fade } from '@mui/material';
import { FaCalendarAlt, FaUserMd } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function Slider() {
  const router = useRouter();

  return (
    <Box
      sx={{
        position: 'relative',
        bgcolor: 'primary.main', 
        background: 'linear-gradient(135deg, #1565C0 0%, #00695C 100%)',
        color: 'white',
        pt: { xs: 8, md: 16 },
        pb: { xs: 8, md: 16 },
        overflow: 'hidden',
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: 'radial-gradient(circle at 20% 50%, white 0%, transparent 20%), radial-gradient(circle at 80% 20%, white 0%, transparent 20%)',
          backgroundSize: '80% 80%',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Stack spacing={4} maxWidth="md">
            <Fade in timeout={1000}>
            <Box>
                <Typography
                variant="h1"
                sx={{
                    fontWeight: 800,
                    fontSize: { xs: '2.5rem', md: '4rem' },
                    lineHeight: 1.1,
                    mb: 2,
                    textShadow: '0 2px 10px rgba(0,0,0,0.1)',
                }}
                >
                Advanced Healthcare <br />
                <Box component="span" sx={{ color: '#80CBC4' }}>
                    For Your Family
                </Box>
                </Typography>
                
                <Typography
                variant="h5"
                sx={{
                    fontWeight: 400,
                    opacity: 0.9,
                    maxWidth: 600,
                    lineHeight: 1.6,
                    mb: 4,
                }}
                >
                Experience world-class medical care with our team of specialized doctors
                and state-of-the-art facilities. Your health is our priority.
                </Typography>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                    variant="contained"
                    size="large"
                    startIcon={<FaCalendarAlt />}
                    onClick={() => router.push('/auth/login')}
                    sx={{
                    bgcolor: 'white',
                    color: 'primary.main',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    '&:hover': {
                        bgcolor: '#f5f5f5',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                    },
                    transition: 'all 0.2s',
                    }}
                >
                    Book Appointment
                </Button>
                <Button
                    variant="outlined"
                    size="large"
                    startIcon={<FaUserMd />}
                    onClick={() => router.push('/doctors')}
                    sx={{
                    borderColor: 'rgba(255,255,255,0.5)',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    '&:hover': {
                        borderColor: 'white',
                        bgcolor: 'rgba(255,255,255,0.1)',
                    },
                    }}
                >
                    Find a Doctor
                </Button>
                </Stack>
            </Box>
            </Fade>
        </Stack>
      </Container>
    </Box>
  );
}
