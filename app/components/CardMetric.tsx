import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

interface CardMetricProps {
  title: string;
  value: number;
}

export default function CardMetric({ title, value }: CardMetricProps) {
  return (
    <Card sx={{ minWidth: 200, margin: 1, flex: 1 }}>
      <CardContent>
        <Typography variant="subtitle1" color="textSecondary">{title}</Typography>
        <Typography variant="h5">{value}</Typography>
      </CardContent>
    </Card>
  );
}