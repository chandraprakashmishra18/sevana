import { T } from '../Styles/Theme';
export const status = (s) => ({
  open:        { label:'Open',        bg:T.redLt,   color:T.red },
  in_progress: { label:'In Progress', bg:T.amberLt, color:T.amber },
  resolved:    { label:'Resolved',    bg:T.greenLt, color:T.green },
}[s] || { label:s, bg:T.bgCard2, color:T.textSoft });