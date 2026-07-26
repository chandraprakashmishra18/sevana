export const REPORTS = [
  { id:1, animal:'Dog',  severity:'critical',   status:'open',        loc:'Sector 14, Noida',     addr:'Sector 14',   time:'8 min ago',  icon:'🐕', desc:'Hit by vehicle, front leg injury, cannot walk. Near the red gate under parked Maruti.', reporter:'Priya S.', resp:3, up:7,
    wishlist:[{item:'Betadine 100ml',claimed:true},{item:'Bandage roll x2',claimed:false},{item:'Saline 500ml',claimed:false}],
    thread:[{who:'Priya S.',role:'Reporter',time:'8 min ago',msg:'Dog lying near red gate, breathing heavy.'},{who:'Arjun M.',role:'Volunteer',time:'5 min ago',msg:'On my way, 3 minutes out.'},{who:'Arjun M.',role:'Volunteer',time:'2 min ago',msg:'Reached. Dog conscious, calling Dr. Mehta clinic.'}]},
  { id:2, animal:'Cat',  severity:'injured',    status:'in_progress', loc:'DLF Phase 2, Gurugram', addr:'DLF Phase 2', time:'22 min ago', icon:'🐈', desc:'Cat with eye injury sitting under parked car. Approachable, not aggressive.', reporter:'Rahul K.', resp:1, up:4,
    wishlist:[{item:'Eye drops',claimed:false},{item:'Carrier box',claimed:true}],
    thread:[{who:'Rahul K.',role:'Reporter',time:'22 min ago',msg:'Cat under basement parking B2.'},{who:'NGO Paws',role:'NGO',time:'15 min ago',msg:'Dispatch sent, 20 minutes.'}]},
  { id:3, animal:'Bird', severity:'distressed', status:'open',        loc:'Vasant Kunj, Delhi',   addr:'Vasant Kunj', time:'1 hr ago',   icon:'🦜', desc:'Pigeon with injured wing on rooftop ledge, 4th floor. Not flying.', reporter:'Sneha R.', resp:0, up:2,
    wishlist:[{item:'Small carrier box',claimed:false}],
    thread:[{who:'Sneha R.',role:'Reporter',time:'1 hr ago',msg:'Bird visible from terrace, not moving.'}]},
  { id:4, animal:'Cow',  severity:'injured',    status:'resolved',    loc:'Lajpat Nagar, Delhi',  addr:'Lajpat Nagar',time:'3 hr ago',   icon:'🐄', desc:'Cow with wire around neck — removed successfully by Dr. Verma.', reporter:'Mohit D.', resp:5, up:12,
    wishlist:[],
    thread:[{who:'Mohit D.',role:'Reporter',time:'3 hr ago',msg:'Cow struggling near drain.'},{who:'Dr. Verma',role:'Vet',time:'2.5 hr ago',msg:'Wire removed, antiseptic applied.'},{who:'Mohit D.',role:'Reporter',time:'2 hr ago',msg:'Cow walking fine now ✅'}]},
];