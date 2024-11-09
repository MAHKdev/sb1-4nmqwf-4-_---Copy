'use client';

import { useTheme } from 'next-themes';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { GrowthEntry } from '../types';

interface GrowthChartProps {
  data: GrowthEntry[];
}

export function GrowthChart({ data }: GrowthChartProps) {
  const { theme } = useTheme();
  
  // Get theme colors dynamically
  const getThemeColors = () => {
    if (typeof window === 'undefined') return { primary: '', secondary: '', text: '' };
    
    const root = document.documentElement;
    const style = getComputedStyle(root);
    return {
      primary: style.getPropertyValue('--p'),
      secondary: style.getPropertyValue('--s'),
      text: style.getPropertyValue('--bc'),
    };
  };

  const colors = getThemeColors();

  return (
    <div className="w-full h-[400px] bg-base-200 rounded-box p-4">
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            stroke={colors.text}
          />
          <YAxis 
            yAxisId="height"
            orientation="left" 
            stroke={colors.primary}
            label={{ value: 'Height (cm)', angle: -90, position: 'insideLeft' }}
          />
          <YAxis 
            yAxisId="weight"
            orientation="right" 
            stroke={colors.secondary}
            label={{ value: 'Weight (kg)', angle: 90, position: 'insideRight' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: theme === 'dark' ? '#2A303C' : '#F2F2F2',
              border: 'none',
            }}
          />
          <Legend />
          <Line
            yAxisId="height"
            type="monotone"
            dataKey="height"
            stroke={colors.primary}
            name="Height"
            dot={{ fill: colors.primary }}
          />
          <Line
            yAxisId="weight"
            type="monotone"
            dataKey="weight"
            stroke={colors.secondary}
            name="Weight"
            dot={{ fill: colors.secondary }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}