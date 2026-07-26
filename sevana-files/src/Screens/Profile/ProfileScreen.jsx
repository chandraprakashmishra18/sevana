import { useState } from 'react';
import { T } from '../../Styles/Theme';
import ProfileToggle     from '../../Components/Profile/ProfileToggle';
import UserProfile       from './UserProfile';
import VolunteerProfile  from './VolunteerProfile/VolunteerProfile';
import UpgradeModal      from './UpgradeModal';
import { USER_DATA }      from '../../Data/UserData';
import { VOLUNTEER_DATA } from '../../Data/VolunteerData';

export default function ProfileScreen({ xp, userData }) {
  const [mode,        setMode]        = useState('user');   // 'user' | 'volunteer'
  const [showUpgrade, setShowUpgrade] = useState(false);
  const isVol = mode === 'volunteer';

  const handleToggle = () => {
    if (mode === 'user') {
      setShowUpgrade(true);   // show pledge modal before switching
    } else {
      setMode('user');        // switching back is instant
    }
  };

  const handleConfirmUpgrade = () => {
    setShowUpgrade(false);
    setMode('volunteer');
  };

  const toggle = (
    <div style={{ display:'flex', justifyContent:'center', padding: isVol ? '12px 16px 0' : '8px 0 0' }}>
      <ProfileToggle mode={mode} onToggle={handleToggle} />
    </div>
  );

  return (
    <div className="ms" style={{ background: isVol ? '#0D1410' : T.bg, minHeight:'100vh' }}>
      {isVol ? (
        <VolunteerProfile v={VOLUNTEER_DATA}>
          {toggle}
        </VolunteerProfile>
      ) : (
        <UserProfile xp={xp} userData={USER_DATA}>
          {toggle}
        </UserProfile>
      )}

      {showUpgrade && (
        <UpgradeModal
          onConfirm={handleConfirmUpgrade}
          onClose={() => setShowUpgrade(false)}
        />
      )}
    </div>
  );
}
