export const VOLUNTEER_DATA = {
  name:'Prashant Mishra', handle:'@prashant.seva', avatar:'🦸', area:'Sector 14, Lucknow',
  joined:'March 2022', status:'active', tier:'Seva Champion', tierLevel:4,
  xp:24820, nextTierXP:50000, rank:{ward:1,city:3,state:18,national:142},
  streak:87, verified:true,
  bio:'Passionate about stray animal welfare and civic accountability. NSS alumnus. Royal Enfield rider — can transport animals across Noida quickly.',

  skills:[
    {id:'rescue',    label:'Animal Rescue',              icon:'🐾', verified:true,  level:'Expert'},
    {id:'aggressive',label:'Aggressive Animal Handling', icon:'⚠️', verified:true,  level:'Certified'},
    {id:'firstaid',  label:'Animal First Aid',           icon:'🩹', verified:true,  level:'Certified'},
    {id:'transport', label:'Transport (2W + 4W)',        icon:'🏍️', verified:true,  level:'Active'},
    {id:'medical',   label:'Human First Aid / CPR',      icon:'🫀', verified:false, level:'Training'},
    {id:'nss',       label:'NSS Programme Officer',      icon:'🎖️', verified:true,  level:'Active'},
    {id:'drive',     label:'Drive Organiser',            icon:'📢', verified:true,  level:'Expert'},
    {id:'foster',    label:'Foster Host (Dogs)',          icon:'🏠', verified:true,  level:'Active'},
  ],

  authorities:[
    {id:'raise',          icon:'🖐️',label:'Raise Hand Broadcast',       desc:'Geo-radius emergency alerts to nearby users',                           color:'#C93B3B',bg:'#1C0808',active:true, tier:'Tier 2+'},
    {id:'thread',         icon:'🔄',label:'Rescue Thread Updates',       desc:'Post verified updates on any active rescue thread',                     color:'#0A5C44',bg:'#0A1A0F',active:true, tier:'Tier 2+'},
    {id:'wishlist',       icon:'✅',label:'Wishlist Claim & Fulfil',     desc:'Claim rescue wishlist items and mark them fulfilled',                   color:'#C49B2A',bg:'#1A1200',active:true, tier:'Tier 1+'},
    {id:'verify_donation',icon:'🔏',label:'Donation Validation',         desc:'Verify and co-sign community donation requests as community validator', color:'#0D9488',bg:'#081816',active:true, tier:'Tier 3+'},
    {id:'foster_approve', icon:'🏠',label:'Foster Application Review',   desc:'Review and approve foster family applications in area',                color:'#1A5FA5',bg:'#081425',active:true, tier:'Tier 3+'},
    {id:'drive_create',   icon:'📢',label:'Community Drive Organiser',   desc:'Create, manage and close community drives with XP disbursement',       color:'#6B3FA0',bg:'#150D22',active:true, tier:'Tier 2+'},
    {id:'cruelty_report', icon:'⚖️',label:'Cruelty Evidence Submission', desc:'File verified cruelty reports with legal evidence chain to AWBI',       color:'#C49B2A',bg:'#1A1200',active:true, tier:'Tier 3+'},
    {id:'area_mod',       icon:'🛡️',label:'Area Moderator',             desc:'Flag, review and escalate reports in Sector 12-16 Noida',              color:'#4ADE80',bg:'#0F2518',active:false,tier:'Tier 4+'},
    {id:'health_alert',   icon:'🚨',label:'Community Health Alerts',     desc:'Locked — requires verified institutional authority appointment',        color:'#5A7A60',bg:'#192019',active:false,tier:'Authority only'},
  ],

  stats:{reportsTotal:312,reportsResolved:267,rescues:48,drivesOrganised:14,drivesAttended:29,donations:38,donationAmount:14800,fosterDays:94,handsRaised:31,wishlistFulfilled:22,crueltyReported:7},

  activity:[
    {date:'Today',      icon:'🐕',text:'Responded to critical dog rescue — Sector 14',          xp:'+150 XP',color:'#C93B3B'},
    {date:'Yesterday',  icon:'📢',text:'Organised street clean + animal feeding drive',          xp:'+200 XP',color:'#0A5C44'},
    {date:'2 days ago', icon:'🔏',text:'Validated donation request for student Nisha K.',       xp:'+60 XP', color:'#0D9488'},
    {date:'3 days ago', icon:'⚖️',text:'Filed cruelty evidence report — Sector 12 incident',  xp:'+80 XP', color:'#C49B2A'},
    {date:'4 days ago', icon:'🖐️',text:'Raised Hand — cat emergency, 3 people responded',     xp:'+150 XP',color:'#C93B3B'},
    {date:'5 days ago', icon:'🩹',text:'Resource wishlist: delivered Betadine + bandages',     xp:'+40 XP', color:'#E8821A'},
  ],

  activeCases:[
    {id:'A-4821',animal:'🐕',title:'Dog — critical, Sector 14', status:'in_progress',role:'Lead Responder',since:'8 min ago'},
    {id:'A-4810',animal:'🐈',title:'Cat — eye injury, DLF Phase 2',status:'open',role:'Co-responder',since:'2 hr ago'},
  ],

  upcomingDrives:[
    {id:'D-201',title:'Sector 14 Feeder Drive',     date:'Sun 12 Jan',volunteers:8, max:15,role:'Organiser'},
    {id:'D-198',title:'Anti-Rabies Camp — Noida',    date:'Sat 18 Jan',volunteers:22,max:50,role:'Medical Volunteer'},
  ],

  consistencyMonths:[1,1,1,0,1,1,1,1,0,1,1,1],
};