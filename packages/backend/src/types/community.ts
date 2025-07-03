export interface CreateCommunityRequest {
  name: string;
  description?: string;
  type: 'Standard' | 'Treekly Community' | 'Global Community';
  isPrivate?: boolean;
  requiresPassword?: boolean;
  password?: string;
  maxMembers?: number;
  avatar?: string;
  bannerImage?: string;
}
