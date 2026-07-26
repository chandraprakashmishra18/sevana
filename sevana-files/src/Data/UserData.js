// src/Data/UserData.js
// Normal user profile data
export const USER_DATA = {
  name: 'Chandra Prakash Mishra',
  handle: '@cpmishra.seva',
  avatar: '👤',
  area: 'Sector 14, Lucknow',
  joined: 'June 2026',
  status: 'active',
  tier: 'Seva Volunteer',
  tierLevel: 2,
  xp: 2450,
  nextTierXP: 8000,
  streak: 12,
  verified: false,
  bio: 'Animal lover from Lucknow . Report strays, join drives whenever I can.',
  rank: { ward: 8, city: 142, state: 1820, national: 14200 },
  stats: {
    reportsTotal: 34,
    reportsResolved: 21,
    rescues: 7,
    drivesAttended: 6,
    donationAmount: 2400,
    donations: 8,
    streak: 12,
  },
  activity: [
    { date: 'Today', icon: '🐕', text: 'Filed report — injured dog, Sector 14', xp: '+30 XP', color: '#F87171' },
    { date: 'Yesterday', icon: '❤️', text: 'Upvoted 3 active rescue reports', xp: '+10 XP', color: '#4ADE80' },
    { date: '3 days ago', icon: '💚', text: 'Donated ₹200 to student Nisha K.', xp: '+40 XP', color: '#2DD4BF' },
    { date: '5 days ago', icon: '📢', text: 'Attended Sector 14 cleanup drive', xp: '+100 XP', color: '#C084FC' },
  ],
};
