import { Card, CardContent, Typography } from '@mui/material';

const SystemStatus = () => (
  <Card>
    <CardContent>
      <Typography variant="h5" gutterBottom>
        Sistem Durumu
      </Typography>
      <Typography variant="body1">
        Tüm sistemler çalışır durumda.
      </Typography>
    </CardContent>
  </Card>
);

export default SystemStatus;
