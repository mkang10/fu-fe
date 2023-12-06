export type UserInfo = {
  user_id: string;
  fullName: string;
  email: string;
  image: string;
  bio: string;
  department: string;
  major: string;
};

export type Category = {
  category_id: string;
  description: string;
  title: string;
};

export type dataTypeAdmin = {
  key: React.Key;
  user_id: string;
  fullName: string;
  role: string;
  department: string;
  email: string;
  major: string;
  moderateStatus: string;
  isVerified: string;
  description: string;
};

export type columnItem = {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  role_id: number;
  department: string;
  major: string;
  moderateStatus: boolean;
  isVerified: boolean;
  bio: string;
};

export type blogCategory = {
  category_id: string;
  title: string;
  description: string;
};

export type blogTags = {
  tag_id: string;
  category_id: string;
  title: string;
};

export type BlogData = {
  blog_id: string;
  user_id: string;
  blog_title: string;
  category_id: string;
  content: string;
  status: number;
  view: number;
  visual: string | null;
  created_at: string;
  published_at: string;
};

export type Tag = {
  tag_id: string;
  title: string
}

export type BlogDetail = {
  blog_id: string;
  user_name: string;
  user_id: string;
  blog_title: string;
  category_description: string;
  content: string;
  status: number;
  view: number;
  tags: Tag[];
  visual: string | null;
  created_at: string;
  published_at: string;
  reject_reason: string;
};

export type Comment = {
  blog_id: string;
  comment_id: string;
  user_id: string;
  content: string;
  created_at: string;
  user_name: string;
  user_image: string;
};

export type CommentReply = {
  comment_id: string;
  commentReply_id: string;
  content: string;
  created_at: string;
  user_name: string;
  user_image: string;
};

export type MentionType = {
  id: string;
  display: string;
};

export type UserSetting = {
  user_id: string;
  first_name: string;
  last_name: string;
  bio: string;
  department_id: string;
  major_id: string;
  position: string;
  role: string;
  image: string;
  created_at: string;
};

export type Department = {
  department_id: string;
  description: string;
};

export type Major = {
  major_id: string;
  description: string;
};

export type OptionList = {
  id: string;
  value: string;
};

export type SearchResult = {
  blog_id: string;
  title: string;
  visual: string;
};

export type ProfileData = {
  user_id: string;
  fullName: string;
  email: string;
  bio: string;
  position: string;
  department: string;
  major: string;
  image: string;
  created_at: string;
};

export type NotificationItem = {
  notification_id: string;
  posted_user: string;
  title: string;
  content: string;
  image: string;
  created_at: string;
};

export type FeaturedCard = {
  blog_id: string;
  user_id: string;
  blog_title: string;
  blogImage: string;
  postedBy: string;
  userImage: string;
  content: string;
  category: string;
  created_at: string;
  like_count: number;
};


export type UserAwards = {
  full_name: string;
  image: string;
  total_likes: number;
user_id: string;
  
};
export type ModeratorAwards = {
  full_name: string;
  image: string;
total_likes: number;
user_id: string;
  
};

export type rejectionReason = {
  
  
  award_id: string;
  user_id: string;
  user_name: string;  
};
