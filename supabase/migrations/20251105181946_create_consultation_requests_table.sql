/*
  # Create consultation_requests table for AI agent service inquiries

  ## Overview
  This migration creates a table to store consultation request submissions from the AgentX landing page.
  It captures contact information, service interest, and inquiry details for follow-up by the AI solutions team.

  ## New Tables
  
  ### `consultation_requests`
  - `id` (uuid, primary key) - Unique identifier for each consultation request
  - `name` (text, required) - Full name of the requestor
  - `email` (text, required) - Work email address (indexed for fast lookups)
  - `company` (text, required) - Company name
  - `job_title` (text, required) - Job title/role of the requestor
  - `service_interest` (text, required) - Type of AI agent service interested in
  - `status` (text, default 'pending') - Request status: pending, contacted, completed, cancelled
  - `created_at` (timestamptz, default now()) - Timestamp when request was submitted
  - `updated_at` (timestamptz, default now()) - Timestamp of last update

  ## Security
  - Enable RLS on `consultation_requests` table
  - Public users can insert their own consultation requests
  - Only authenticated admin users can view and update requests
  
  ## Notes
  - Email field is indexed for efficient searching and duplicate detection
  - Service interest helps route requests to appropriate specialists
  - Status field helps track the consultation request lifecycle
  - Timestamps enable tracking submission patterns and response times
*/

-- Create consultation_requests table
CREATE TABLE IF NOT EXISTS consultation_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text NOT NULL,
  job_title text NOT NULL,
  service_interest text NOT NULL CHECK (service_interest IN ('chat-agents', 'voice-agents', 'ai-avatars', 'workflow-automation', 'all-services')),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'completed', 'cancelled')),
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create index on email for fast lookups
CREATE INDEX IF NOT EXISTS consultation_requests_email_idx ON consultation_requests(email);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS consultation_requests_created_at_idx ON consultation_requests(created_at DESC);

-- Create index on service_interest for filtering
CREATE INDEX IF NOT EXISTS consultation_requests_service_interest_idx ON consultation_requests(service_interest);

-- Enable Row Level Security
ALTER TABLE consultation_requests ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public users to insert their own consultation requests
CREATE POLICY "Anyone can submit consultation requests"
  ON consultation_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Only authenticated users can view all consultation requests
CREATE POLICY "Authenticated users can view all requests"
  ON consultation_requests
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Only authenticated users can update consultation requests
CREATE POLICY "Authenticated users can update requests"
  ON consultation_requests
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_consultation_requests_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_consultation_requests_updated_at_trigger
  BEFORE UPDATE ON consultation_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_consultation_requests_updated_at();