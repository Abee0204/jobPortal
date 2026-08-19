export interface UserProfile {
  id: number;
  name: string;
  email: string;
  contact?: string;
  role: "candidate" | "recruiter";
}

export interface UpdateProfileData {
  name?: string;
  email?: string;
  contact?: string;
}

export interface ProfileResponse {
  success: boolean;
  data: UserProfile;
}

export interface UpdateProfileResponse {
  success: boolean;
  message: string;
  data: UserProfile;
}
