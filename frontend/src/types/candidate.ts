export interface Interview {
  name: string;
  scheduled: boolean;
}

export interface Candidate {
  id: number;
  name: string;
  position: string;
  company: string;
  job_title: string;
  job_id: string;
  status: string;
  status_type: 'stage' | 'role';
  last_activity: string;
  action_link: string;
  has_availability: boolean;
  availability_status?: string;
  has_interviews: boolean;
  interviews?: Interview[];
  application_type: 'active' | 'archived';
  source: string;
}

export interface CandidatesResponse {
  candidates: Candidate[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

export interface FilterState {
  search: string;
  sort: 'activity_desc' | 'activity_asc' | 'name_asc' | 'name_desc';
  application_type: string[];
  jobs: string[];
  sources: string[];
}
