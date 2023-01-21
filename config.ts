const missingSettings = "warning no secret put";
const config = {
  SESSION_SECRET: process.env.SESSION_SECRET || missingSettings,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID || missingSettings,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET || missingSettings,
  GITHUB_CALLBACK_URL: process.env.GITHUB_CALLBACK_URL || missingSettings,
};

export default config;
