import { createApp } from './app';
import { config } from './config';

const app = createApp();

const startServer = (): void => {
  const port = config.port;
  
  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port} in ${config.nodeEnv} mode`);
    console.log(`📊 Health check available at http://localhost:${port}/health`);
  });
};

startServer();
