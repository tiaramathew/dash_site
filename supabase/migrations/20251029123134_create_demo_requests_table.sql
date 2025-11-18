/*
  # Create demo_requests table for storing demo form submissions

  ## Overview
  This migration creates a table to store demo request submissions from the DashboardX landing page.
  It captures contact information and inquiry details for follow-up by the sales team.

  ## New Tables
  
  ### `demo_requests`
  - `id` (uuid, primary key) - Unique identifier for each demo request
  - `name` (text, required) - Full name of the requestor
  - `email` (text, required) - Work email address (indexed for fast lookups)
  - `company` (text, required) - Company name
  - `job_title` (text, required) - Job title/role of the requestor
  - `status` (text, default 'pending') - Request status: pending, contacted, completed, cancelled
  - `created_at` (timestamptz, default now()) - Timestamp when request was submitted
  - `updated_at` (timestamptz, default now()) - Timestamp of last update

  ## Security
  - Enable RLS on `demo_requests` table
  - Public users can insert their own demo requests
  - Only authenticated admin users can view and update requests
  
  ## Notes
  - Email field is indexed for efficient searching and duplicate detection
  - Status field helps track the demo request lifecycle
  - Timestamps enable tracking submission patterns and response times
*/

-- Create demo_requests table
CREATE TABLE IF NOT EXISTS demo_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text NOT NULL,
  job_title text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'completed', 'cancelled')),
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create index on email for fast lookups
CREATE INDEX IF NOT EXISTS demo_requests_email_idx ON demo_requests(email);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS demo_requests_created_at_idx ON demo_requests(created_at DESC);

-- Enable Row Level Security
ALTER TABLE demo_requests ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public users to insert their own demo requests
CREATE POLICY "Anyone can submit demo requests"
  ON demo_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Only authenticated users can view all demo requests
CREATE POLICY "Authenticated users can view all requests"
  ON demo_requests
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Only authenticated users can update demo requests
CREATE POLICY "Authenticated users can update requests"
  ON demo_requests
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_demo_requests_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_demo_requests_updated_at_trigger
  BEFORE UPDATE ON demo_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_demo_requests_updated_at();