import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Container, TextField, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Dashboard from './components/Dashboard';
import SentimentVisualizations from './components/SentimentVisualizations';

const GradientBackground = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
  padding: theme.spacing(3),
}));

const App = () => {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sentimentData, setSentimentData] = useState({
    positive: 0,
    neutral: 0,
    negative: 0
  });

  const analyzeTweets = async (term) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/analyze', { query: term });
      setTweets(response.data.tweets);
      setSentimentData({
        positive: response.data.positive_count,
        neutral: response.data.neutral_count,
        negative: response.data.negative_count
      });
    } catch (error) {
      console.error('Error analyzing tweets:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GradientBackground>
      <Container maxWidth="xl">
        <Box sx={{ mb: 4, color: 'white' }}>
          <Typography variant="h3" gutterBottom>
            Twitter Sentiment Analysis
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Enter a topic or keyword"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                  '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
                  '&.Mui-focused fieldset': { borderColor: '#6366F1' },
                },
              }}
            />
            <Button
              variant="contained"
              onClick={() => analyzeTweets(searchTerm)}
              sx={{
                background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                px: 4,
              }}
            >
              Analyze
            </Button>
          </Box>
        </Box>
        <Dashboard tweets={tweets} loading={loading} />
        <Box sx={{ mt: 4 }}>
          <SentimentVisualizations data={sentimentData} />
        </Box>
      </Container>
    </GradientBackground>
  );
};

export default App;