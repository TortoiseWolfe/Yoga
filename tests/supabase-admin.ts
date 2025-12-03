/**
 * Supabase Admin Client for Tests
 * Uses service role key to bypass RLS for test cleanup
 *
 * IMPORTANT: Only use in tests for database cleanup.
 * Never use in production code.
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/lib/supabase/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

/**
 * Admin Supabase client with service role key
 * Bypasses RLS - use only for test cleanup
 * Returns null when credentials not configured (tests using this should use describe.skipIf)
 */
export const supabaseAdmin: SupabaseClient<Database> =
  supabaseUrl && supabaseServiceKey
    ? createClient<Database>(supabaseUrl, supabaseServiceKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      })
    : (null as unknown as SupabaseClient<Database>);
