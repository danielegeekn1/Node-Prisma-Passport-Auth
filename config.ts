const missingSettings = "warning no secret put";
const config = {
  SESSION_SECRET: process.env.SESSION_SECRET || missingSettings,
};
export default config;
