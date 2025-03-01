import { useState } from 'react';
import { Box, Container, TextField, Button, Typography, CircularProgress, Grid, Paper } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const analyzeTweets = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/analyze/tweets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query,
          max_results: 100
        })
      });

      if (!response.ok) throw new Error('Failed to fetch data');

      const data = await response.json();
      
      // Process sentiment data for visualization
      const sentimentCounts = data.tweets.reduce((acc, tweet) => {
        acc[tweet.sentiment_label] = (acc[tweet.sentiment_label] || 0) + 1;
        return acc;
      }, {});

      const chartData = Object.entries(sentimentCounts).map(([label, count]) => ({
        sentiment: label,
        count: count
      }));

      setResults({
        tweets: data.tweets,
        chartData: chartData
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Twitter Sentiment Analysis
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            fullWidth
            label="Search keyword"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter a keyword (e.g., 'AI', 'Apple')"
          />
          <Button
            variant="contained"
            onClick={analyzeTweets}
            disabled={loading || !query.trim()}
          >
            {loading ? <CircularProgress size={24} /> : 'Analyze'}
          </Button>
        </Box>
      </Box>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          Error: {error}
        </Typography>
      )}

      {results && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: 300 }}>
              <Typography variant="h6" gutterBottom>
                Sentiment Distribution
              </Typography>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={results.chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="sentiment" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#1976d2" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, maxHeight: 300, overflow: 'auto' }}>
              <Typography variant="h6" gutterBottom>
                Recent Tweets
              </Typography>
              {results.tweets.map((tweet) => (
                <Box key={tweet.id} sx={{ mb: 2, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                  <Typography variant="body2">{tweet.text}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Sentiment: {tweet.sentiment_label} (Score: {tweet.sentiment_score.toFixed(2)})
                  </Typography>
                </Box>
              ))}
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Dashboard;