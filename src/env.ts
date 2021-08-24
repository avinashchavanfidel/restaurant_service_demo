import * as dotenv from 'dotenv';
import * as path from 'path';

import * as pkg from '../package.json';
import { getOsEnv, getOsEnvOptional, getOsPaths, getPath, normalizePort, toBool } from './lib/env';

/**
 * Load .env file or for tests the .env.test file.
 */
dotenv.config({ path: path.join(process.cwd(), `.env${((process.env.NODE_ENV === 'test') ? '.test' : '')}`) });

/**
 * Environment variables
 */
export const env = {
    node: process.env.NODE_ENV || 'development',
    isProduction: process.env.NODE_ENV === 'production',
    isTest: process.env.NODE_ENV === 'test',
    isDevelopment: process.env.NODE_ENV === 'development',
    app: {
        name: getOsEnv('APP_NAME'),
        version: (pkg as any).version,
        author: (pkg as any).author,
        description: (pkg as any).description,
        host: getOsEnv('APP_HOST'),
        schema: getOsEnv('APP_SCHEMA'),
        routePrefix: getOsEnv('APP_ROUTE_PREFIX'),
        port: normalizePort(process.env.PORT || getOsEnv('APP_PORT')),
        banner: toBool(getOsEnv('APP_BANNER')),
        dirs: {
            migrations: getOsPaths('src/database/migrations/**/*.ts'),
            migrationsDir: getPath('src/database/migrations'),
            entities: getOsPaths('src/api/entities/**/*.ts'),
            entitiesDir: getPath('src/api/entities'),
            controllers: getOsPaths('src/api/controllers/**/*Controller.ts'),
            middlewares: getOsPaths('src/api/middlewares/**/*Middleware.ts'),
            interceptors: getOsPaths('src/api/interceptors/**/*Interceptor.ts'),
            subscribers: getOsPaths('src/api/subscribers/**/*Subscriber.ts'),
            resolvers: getOsPaths('src/api/resolvers/**/*Resolver.ts'),
        },
    },
    log: {
        level: getOsEnv('LOG_LEVEL'),
        json: toBool(getOsEnvOptional('LOG_JSON')),
        output: getOsEnv('LOG_OUTPUT'),
    },
    db: {
        type: getOsEnv('TYPEORM_CONNECTION'),
        url: getOsEnvOptional('TYPEORM_URL'),
        host: getOsEnvOptional('TYPEORM_HOST'),
        port: getOsEnvOptional('TYPEORM_PORT'),
        username: getOsEnvOptional('TYPEORM_USERNAME'),
        password: getOsEnvOptional('TYPEORM_PASSWORD'),
        database: getOsEnvOptional('TYPEORM_DATABASE'),
        synchronize: toBool(getOsEnvOptional('TYPEORM_SYNCHRONIZE')),
        logging: getOsEnv('TYPEORM_LOGGING'),
        ssl: toBool(getOsEnvOptional('TYPEORM_SSL_ENABLED')),
        authSource: getOsEnvOptional('TYPEORM_AUTH_SOURCE'),
    },
    swagger: {
        enabled: toBool(getOsEnv('SWAGGER_ENABLED')),
        route: getOsEnv('SWAGGER_ROUTE'),
    },
};
