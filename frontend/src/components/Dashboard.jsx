import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Grid, Typography, CircularProgress, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const GradientPaper = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
  color: 'white',
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

const TweetCard = styled(motion.div)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  cursor: 'pointer',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.15)',
  },
}));

const SentimentMeter = ({ score }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(score);
    }, 200);
    return () => clearTimeout(timer);
  }, [score]);

  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress
        variant="determinate"
        value={progress}
        size={60}
        thickness={4}
        sx={{
          color: score > 75 ? '#4ADE80' : score > 50 ? '#FCD34D' : '#EF4444',
        }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="white">
          {`${Math.round(progress)}%`}
        </Typography>
      </Box>
    </Box>
  );
};

const Dashboard = ({ tweets, loading }) => {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <GradientPaper>
            <Typography variant="h5" gutterBottom>
              Analyzed Tweets
            </Typography>
            <Box sx={{ mt: 2 }}>
              <AnimatePresence>
                {loading ? (
                  <Box display="flex" justifyContent="center" p={4}>
                    <CircularProgress />
                  </Box>
                ) : (
                  tweets.map((tweet, index) => (
                    <TweetCard
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={9}>
                          <Typography variant="body1">{tweet.text}</Typography>
                          <Typography variant="caption" sx={{ opacity: 0.7 }}>
                            {tweet.timestamp}
                          </Typography>
                        </Grid>
                        <Grid item xs={3} sx={{ textAlign: 'right' }}>
                          <SentimentMeter score={tweet.sentiment_score * 100} />
                        </Grid>
                      </Grid>
                    </TweetCard>
                  ))
                )}
              </AnimatePresence>
            </Box>
          </GradientPaper>
        </Grid>
        <Grid item xs={12} md={4}>
          <GradientPaper>
            <Typography variant="h5" gutterBottom>
              Sentiment Overview
            </Typography>
            {/* Add visualization components here */}
          </GradientPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;