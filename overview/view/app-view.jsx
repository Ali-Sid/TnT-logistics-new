import { faker } from '@faker-js/faker';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Iconify from '../../dashboard-components/iconify/iconify';

import AppTasks from '../app-tasks';
import AppNewsUpdate from '../app-news-update';
import AppOrderTimeline from '../app-order-timeline';
import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
import AppTrafficBySite from '../app-traffic-by-site';
import AppCurrentSubject from '../app-current-subject';
import AppConversionRates from '../app-conversion-rates';
import { UserView } from '../../dashboard-components/user/view';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import { makeStyles } from '@mui/styles'; // Import makeStyles for creating custom styles

// const useStyles = makeStyles((theme) => ({
//   menuRoot: {
//     borderRadius: '15px', // Set the desired border radius
//   },
// }));

// ----------------------------------------------------------------------

export default function AppView() {
  const [data, setData] = useState([]);
  const [inDirectionCount, setInDirectionCount] = useState(0);
  const [outDirectionCount, setOutDirectionCount] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleNavigate = (link) => {
    setAnchorEl(null);
    navigate(`/${link}`)
  }

  useEffect(() => {
    const fetchInDirectionCount = async () => {
      try {
        const response = await axios.get('http://localhost:3000/getmovement'); // Adjust the URL to your actual endpoint
        setData(response.data.movements);
        setInDirectionCount(response.data.countIN); // Update state with the fetched count
        setOutDirectionCount(response.data.countOUT); // Update state with the fetched count
      } catch (error) {
        console.error('Error fetching IN direction count:', error);
      }
    };

    fetchInDirectionCount();
  }, []);


  return (
    <Container maxWidth="xl" sx={{ overflowY: 'hidden', height: '100vh' }}>
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h5" sx={{ mb: 5 }}>
          Hi, Welcome back 👋
        </Typography>
        <Box
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={{
            height: '50px',
            boxShadow: '0px 2px 4px rgba(0,0,0,0.1)', // Example shadow, adjust as needed
            borderRadius: '15px', // Half of height for perfect rounding
            display: 'flex',
            alignItems: 'center',
            px: 2, // Padding on x-axis
            gap: "10px",
            mb: "30px",
            cursor: "pointer"
          }}
        >
          <AccountCircleIcon />
          <Typography variant="subtitle1">Username</Typography>
        </Box>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={() => handleNavigate('')}>Settings</MenuItem>
          <MenuItem onClick={() => handleNavigate('')}>My account</MenuItem>
          <MenuItem onClick={() => handleNavigate('login')}>Logout</MenuItem>
        </Menu>
      </Box>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="IN"
            total={inDirectionCount}
            color="success"
            icon={<img width="60px" alt="icon" src="/src/assets/download-2.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="OUT"
            total={outDirectionCount}
            color="info"
            icon={<img width="60px" alt="icon" src="/src/assets/upload-2.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Not Found"
            total={0}
            color="warning"
            icon={<img width="60px" alt="icon" src="/src/assets/icons8-not-found-96.png" />}
          />
        </Grid>
        {/* <UserView data={data} countIN={inDirectionCount} countOUT={outDirectionCount}/> */}
        <div style={{ maxHeight: "450px", overflowY: "auto", width: "100%" }}>
          <UserView />
        </div>
      </Grid>
    </Container>
  );
}
