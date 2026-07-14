import { Queue, Worker } from 'bullmq';
import { config } from '../config';

// Queue names
export const QUEUE_NAMES = {
  NOTIFICATIONS: 'notifications',
  STREAK_CALCULATION: 'streak-calculation',
  EMAIL: 'email',
  PAYMENT_PROCESSING: 'payment-processing',
} as const;

// Connection options for BullMQ
const connectionOptions = {
  host: config.redis.host,
  port: config.redis.port,
  password: config.redis.password,
  maxRetriesPerRequest: 3,
};

// Create queues
export const notificationQueue = new Queue(QUEUE_NAMES.NOTIFICATIONS, { connection: connectionOptions });
export const streakQueue = new Queue(QUEUE_NAMES.STREAK_CALCULATION, { connection: connectionOptions });
export const emailQueue = new Queue(QUEUE_NAMES.EMAIL, { connection: connectionOptions });
export const paymentQueue = new Queue(QUEUE_NAMES.PAYMENT_PROCESSING, { connection: connectionOptions });

// Worker factory function
export const createWorker = (
  queueName: string,
  processor: (job: any) => Promise<void>,
  options?: any
): Worker => {
  return new Worker(queueName, processor, {
    connection: connectionOptions,
    concurrency: 5,
    ...options,
  });
};
