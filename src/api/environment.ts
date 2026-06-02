/**
 * Environment Configuration
 * This file manages API environment selection (Staging or Production)
 */

// Environment Enums
export enum Environment {
  PRODUCTION = 'production',
  STAGING = 'staging',
}

// API URLs for different environments
export const API_URLS = {
  [Environment.PRODUCTION]: 'https://api.ambulanceapp.com',
  [Environment.STAGING]: 'https://ambulanceapp.com/api/',
} as const;

/**
 * FORCE_ENVIRONMENT: Override the automatic environment selection
 *
 * How to change environment:
 * 1. Set FORCE_ENVIRONMENT to Environment.PRODUCTION or Environment.STAGING
 * 2. Leave it as null to use automatic selection:
 *    - In development (__DEV__ is true): uses STAGING
 *    - In production build (__DEV__ is false): uses PRODUCTION
 *
 * Examples:
 * - Force production in dev: const FORCE_ENVIRONMENT = Environment.PRODUCTION;
 * - Force staging in production: const FORCE_ENVIRONMENT = Environment.STAGING;
 * - Auto select: const FORCE_ENVIRONMENT = null;
 */
const FORCE_ENVIRONMENT: Environment | null = null;

// Determine current environment
export const CURRENT_ENVIRONMENT: Environment =
  FORCE_ENVIRONMENT || (__DEV__ ? Environment.STAGING : Environment.PRODUCTION);

// Get the current API base URL based on environment
export const API_BASE_URL = API_URLS[CURRENT_ENVIRONMENT];

// Log current environment in development
if (__DEV__) {
  console.log(`🚀 API Environment: ${CURRENT_ENVIRONMENT} - ${API_BASE_URL}`);
}
