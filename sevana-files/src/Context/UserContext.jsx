import { createContext, useContext, useState } from 'react';
import { VOLUNTEER_DATA } from '../Data/Volunteer';

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [mode, setMode] = useState('user'); // 'user' | 'volunteer'
  const [xp, setXp] = useState(2450);
  const [userData] = useState({
    name: 'Rahul Verma',
    area: 'Sector 14, Noida',
    rescues: 7,
    streak: 12,
  });

  const addXP = (amt) => setXp(prev => prev + amt);

  const toggleMode = () => setMode(m => m === 'user' ? 'volunteer' : 'user');

  return (
    <UserContext.Provider value={{ mode, toggleMode, xp, addXP, userData, volunteerData: VOLUNTEER_DATA }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);