import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Box, Typography, Grid } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#4ADE80', '#FCD34D', '#EF4444'];

const AnimatedNumber = ({ value, duration = 1000 }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime;
    const startValue = displayValue;
    const endValue = value;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / duration;

      if (progress < 1) {
        setDisplayValue(Math.round(startValue + (endValue - startValue) * progress));
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(endValue);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return <span>{displayValue}</span>;
};

const StatCard = ({ title, value, color }) => (
  <motion.div
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <Box
      sx={{
        background: `linear-gradient(135deg, ${color}22 0%, ${color}11 100%)`,
        borderRadius: 2,
        p: 2,
        textAlign: 'center',
        border: `1px solid ${color}33`,
      }}
    >
      <Typography variant="h6" color="white" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h4" color={color}>
        <AnimatedNumber value={value} />
      </Typography>
    </Box>
  </motion.div>
);

const SentimentVisualizations = ({ data }) => {
  const pieData = [
    { name: 'Positive', value: data?.positive || 0 },
    { name: 'Neutral', value: data?.neutral || 0 },
    { name: 'Negative', value: data?.negative || 0 },
  ];

  return (
    <Box sx={{ height: '100%' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <StatCard
                title="Positive"
                value={data?.positive || 0}
                color={COLORS[0]}
              />
            </Grid>
            <Grid item xs={4}>
              <StatCard
                title="Neutral"
                value={data?.neutral || 0}
                color={COLORS[1]}
              />
            </Grid>
            <Grid item xs={4}>
              <StatCard
                title="Negative"
                value={data?.negative || 0}
                color={COLORS[2]}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SentimentVisualizations;