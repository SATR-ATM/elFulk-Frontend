// ? This is based on the recent DB schema in from backend project
export const mockParent = {
  id: "uuid-parent-1",
  username: "parent_user",
  email: "parent@elfoulk.com",
  auth_provider: "local",
  is_verified: true,
};

export const mockToken = {
  access_token: "mock-jwt-access-token",
  refresh_token: "mock-jwt-refresh-token",
};

export const mockChildren = [
  {
    id: "uuid-child-1",
    parent_id: "uuid-parent-1",
    name: "Ahmed",
    age: 7,
    gender: "male",
    avatar_url: null,
  },
  {
    id: "uuid-child-2",
    parent_id: "uuid-parent-1",
    name: "Sara",
    age: 5,
    gender: "female",
    avatar_url: null,
  },
];

export const mockAccessPolicy = {
  id: "uuid-policy-1",
  child_id: "uuid-child-1",
  daily_limit_minutes: 60,
  weekly_limit_minutes: 300,
  allowed_start_time: "08:00",
  allowed_end_time: "20:00",
  max_age_rating: 7,
  lock_enabled: false,
};

export const mockVideos = [
  {
    id: "uuid-vid-1",
    youtube_id: "abc123",
    title: "Learn the Alphabet",
    category: "educational",
    age_min: 3,
    age_max: 6,
    thumbnail: "https://img.youtube.com/vi/abc123/0.jpg",
  },
  {
    id: "uuid-vid-2",
    youtube_id: "def456",
    title: "Animal Songs",
    category: "entertainment",
    age_min: 3,
    age_max: 8,
    thumbnail: "https://img.youtube.com/vi/def456/0.jpg",
  },
  {
    id: "uuid-vid-3",
    youtube_id: "ghi789",
    title: "Islamic Stories for Kids",
    category: "religious",
    age_min: 5,
    age_max: 12,
    thumbnail: "https://img.youtube.com/vi/ghi789/0.jpg",
  },
];

export const mockStories = [
  {
    id: "uuid-story-1",
    title: "The Smart Fox",
    topic: "animals",
    age_min: 4,
    age_max: 8,
    reading_time_minutes: 5,
    language: "ar",
    cover_image: "/images/fox.jpg",
  },
  {
    id: "uuid-story-2",
    title: "The Brave Knight",
    topic: "adventure",
    age_min: 6,
    age_max: 10,
    reading_time_minutes: 8,
    language: "ar",
    cover_image: "/images/knight.jpg",
  },
  {
    id: "uuid-story-3",
    title: "The Little Star",
    topic: "science",
    age_min: 3,
    age_max: 6,
    reading_time_minutes: 3,
    language: "fr",
    cover_image: "/images/star.jpg",
  },
];

export const mockStoryContent = {
  id: "uuid-story-1",
  title: "The Smart Fox",
  paragraphs: [
    {
      text: "Once upon a time, a fox lived in a forest...",
      image: "/images/fox-intro.jpg",
      image_position: "top",
    },
    { text: "The fox was known for being the smartest animal around.", image: null },
  ],
};
