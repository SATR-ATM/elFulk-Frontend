// ? This is based on the recent DB schema in from backend project
export const mockParent = {
  id: "uuid-parent-1",
  first_name: "John",
  last_name: "Doe",
  username: "parent_user",
  email: "parent@elfoulk.com",
  auth_provider: "local",
  type: "parent",
  is_verified: true,
};

export const mockToken = {
  access_token: "mock-jwt-access-token",
  refresh_token: "mock-jwt-refresh-token",
};

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
