import { T } from '../../Styles/Theme';
export default function Divider({ dark=false, margin='12px 0' }) {
  return <div style={{ height:1, background: dark ? '#1E3024' : T.borderLt, margin }} />;
}