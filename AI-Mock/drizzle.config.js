/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
        url: 'postgresql://neondb_owner:npg_dlBLOaZjYF19@ep-tight-violet-a8xg9xav-pooler.eastus2.azure.neon.tech/neondb?sslmode=require',
    }
};