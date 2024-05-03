import { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  // any props that come into the component
}
export default function App({ children }: Props) {
  return <>{children}</>;
}
