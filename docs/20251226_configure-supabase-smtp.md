# Configure Supabase SMTP for Auth Emails

**Status:** TODO
**Priority:** High
**Created:** 2025-12-26

## Problem

Supabase Auth's built-in email service has strict rate limits (4 emails/hour on free tier). Users see "Error sending confirmation email" when signing up.

## Solution

Configure Resend as custom SMTP provider in Supabase Dashboard.

## Steps

1. Go to Supabase Dashboard:
   https://supabase.com/dashboard/project/auztrrjdnktyyrcbfcdg/settings/auth

2. Scroll to **SMTP Settings** and enable custom SMTP

3. Enter Resend SMTP settings:

   | Setting | Value |
   |---------|-------|
   | Host | `smtp.resend.com` |
   | Port | `465` |
   | User | `resend` |
   | Password | Your `RESEND_API_KEY` (from Vercel env vars) |
   | Sender email | Verified email from your Resend domain |
   | Sender name | `FARchat` |

4. Save and test signup flow

## Alternative (Testing Only)

To temporarily disable email confirmation:
1. Go to **Auth > Settings** in Supabase Dashboard
2. Toggle off **"Enable email confirmations"**

Not recommended for production.

## References

- Resend SMTP docs: https://resend.com/docs/send-with-smtp
- Supabase SMTP docs: https://supabase.com/docs/guides/auth/auth-smtp
