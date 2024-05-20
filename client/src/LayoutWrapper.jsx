import { useLocation } from 'react-router-dom';
import Sidebar from './dashboard-components/Sidebar';
import BottomNav from './dashboard-components/BottomNav';
import { useMediaQuery } from '@mui/material';

export function LayoutWrapper({ children }) {
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <>
    <div style={{display: "flex", flexDirection: !isMobile && "row"}}>
    {!isMobile && location.pathname!== '/login' && (
        <div style={{ width: "5%", height: "100vh", borderRadius: "5px" }}>
          <Sidebar />
        </div>
      )}
      <div style={{ width: isMobile || location.pathname === '/login'? "100%" : "95%", height: "100%", paddingTop: "2rem", overflowY: "auto" }}>
        {children}
        {isMobile && <BottomNav />}
      </div>
    </div>
    </>
  );
}
