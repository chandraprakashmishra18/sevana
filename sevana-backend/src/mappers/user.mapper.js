function toPublicUser(user) {
  if (!user) return null;

  return {
    id: user.id,
    full_name: user.full_name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    is_verified: user.is_verified,
    is_active: user.is_active,
    xp: user.xp,
    level: user.level,
    avatar_url: user.avatar_url,
    area: user.area,
    city: user.city,
    state: user.state,
    bio: user.bio,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };
}

module.exports = toPublicUser;