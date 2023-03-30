/**
=========================================================
* Material Dashboard 2 PRO React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
// eslint-disable-next-line no-unused-vars
import { useMemo, useState, useEffect, Link } from "react";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// @mui icons
// import FacebookIcon from "@mui/icons-material/Facebook";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import InstagramIcon from "@mui/icons-material/Instagram";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "layouts/pages/profile/components/ProfileInfoCard";
// import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Overview page components
import Header from "layouts/pages/profile/components/Header";

// Data
// import profilesListData from "layouts/pages/profile/profile-overview/data/profilesListData";
// import ProfilesList from "examples/Lists/ProfilesList";

import TimelineList from "examples/Timeline/TimelineList";
import TimelineItem from "examples/Timeline/TimelineItem";
// import timelineData from "layouts/pages/projects/timeline/data/timelineData";

import { pullAnnouncements, setViewedAnnouncements, getLoginCookie } from "utils/koapi";

function Overview() {
  const [announcements, setAnnouncementData] = useState("");
  const [currentUser, setCurrentUser] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getLoginCookie().then((accountData) => {
        console.log(accountData.account);
        if (accountData && accountData.account.email) {
          setCurrentUser(accountData.account);
          pullAnnouncements(accountData.account.email).then((notificationData) => {
            console.log(notificationData);
            if (notificationData && notificationData.announcements) {
              const sortedAnnouncements = notificationData.announcements;
              setAnnouncementData(sortedAnnouncements.reverse());
            }
          });
          setViewedAnnouncements(accountData.account.email).then(() => {
            console.log("updated announcments");
          });
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Header />
      <MDBox my={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <ProfileInfoCard
              title="profile information"
              description={`Hi, ${currentUser.name}, This is where you find any announcements from IT about updates to the order app.`}
              info={{
                fullName: currentUser.name,
                mobile: "",
                email: currentUser.username,
                location: "USA",
              }}
              social={
                [
                  // {
                  //   link: "https://www.facebook.com/CreativeTim/",
                  //   icon: <FacebookIcon />,
                  //   color: "facebook",
                  // },
                  // {
                  //   link: "https://twitter.com/creativetim",
                  //   icon: <TwitterIcon />,
                  //   color: "twitter",
                  // },
                  // {
                  //   link: "https://www.instagram.com/creativetimofficial/",
                  //   icon: <InstagramIcon />,
                  //   color: "instagram",
                  // },
                ]
              }
              action={{ route: "", tooltip: "Edit Profile" }}
              shadow
            />
            <Divider orientation="vertical" sx={{ mx: 0 }} />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TimelineList title="Announcements" dark>
              {announcements ? (
                announcements.map(({ Title, createdDate, Body }) => (
                  <TimelineItem
                    key={`${Title}success`}
                    color="success"
                    icon="notifications"
                    title={Title}
                    dateTime={new Date(createdDate).toDateString()}
                    description={Body}
                    badges={["design"]}
                    // lastItem={lastItem}
                  />
                ))
              ) : (
                <></>
              )}
            </TimelineList>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
