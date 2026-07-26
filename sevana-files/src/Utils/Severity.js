import { T } from '../Styles/Theme';
export const sev = (s) => ({
  critical:  { label:'Critical',   bg:T.redLt,   color:T.red,   dot:T.red },
  injured:   { label:'Injured',    bg:T.amberLt, color:T.amber, dot:T.amber },
  distressed:{ label:'Distressed', bg:T.blueLt,  color:T.blue,  dot:T.blue },
}[s] || { label:s, bg:T.bgCard2, color:T.textSoft, dot:T.textSoft });