import { Box, Grid, Typography, Container, Button, Paper, Divider } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ExploreIcon from "@mui/icons-material/Explore";
import HomeIcon from "@mui/icons-material/Home";
import collegePadho from "../../assets/collegePadho.jpg";
import SchoolIcon from "@mui/icons-material/School";
import SendIcon from "@mui/icons-material/Send";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";
import CourseDetailInner1 from "./CourseDetailInner1";
import AmenitiesSection from "./FourthPaper";
import Placement from "./FifthPaper";
import Recruiters from "./SixthPaper";
import PhotoGallery from "./SeventhPaper";
import Contact from "./NinthPaper";
import TenthPaper from "./TenthPaper";
import mba from "../../assets/mba.jpg";
import Header from "../../Global/Header";
import Footer from "../../Global/Footer";
import { useParams } from "react-router-dom";
import empty from '../../assets/noimage.gif'
import axios from "axios";
import BASE_URL from "../../constant";
import Loader from "../../Loader";
import ModalPage from "../../Global/ModalPage";

const IndividualCollegeInfo = () => {
  const [open, setOpen] = useState(false);
  const eleref = useRef()
  const handleOpen = () => setOpen(true);
  // useEffect(() => {
  //   setTimeout(() => {
  //     handleOpen()
  //   }, 3000)
  // }, [])
  const param = useParams()
  const navBars = { info: false, course: false, amenities: false, placement: false, gallery: false, video: false, contact: false, reviews: false }
  const [tabBars, setTabBars] = useState({ info: true, course: false, amenities: false, placement: false, gallery: false, video: false, contact: false, reviews: false })
  const { id } = param
  const [collegeData, setCollege] = useState([])
  const [readMore, setReadMore] = useState(false);
  const collegeInfo = () => {
    axios.get(`${BASE_URL}/api/collegeinfo/${id}`).then((res) => { setCollege([res.data.response]); }).catch((err) => { console.log(err); })
  }
  useEffect(() => { collegeInfo() }, [id])

  const [data] = collegeData

  if (collegeData.length > 0) {
    return (
      <>
        <Container maxWidth={"xl"} disableGutters>
          <ModalPage open={open} setOpen={setOpen} />
          <Header isBgColor={true} handleOpen={handleOpen} />
          <Grid container spacing={2} mb="70px" sx={{ position: 'relative' }}>
            <Grid item xs={12} >
              <Grid container>
                <Grid item xs={12}>
                  <Box sx={{ overflow: "hidden" }}>
                    <img
                      alt="pic"
                      src={data.collegeCover === null ? empty : `${BASE_URL}` + data.collegeCover.image}
                      style={{ position: "relative", scale: "1.3" }}
                      width="100%"
                      height="250px"
                    />
                  </Box>
                </Grid>
                <Grid item xs={3} sx={{ bgcolor: "#1d3f7c", display: { xs: "none", sm: "none", md: "none", lg: "block" } }}></Grid>

                <Grid item xs={12} lg={6} sx={{ bgcolor: "#1d3f7c", color: "white", p: "10px" }} >
                  <Typography variant="h5" sx={{ color: "white", fontWeight: "900", mt: "2px", fontSize: "20px" }}>
                    {data.college.collegeName}
                  </Typography>
                  <Typography style={{ fontSize: "15px", fontWeight: 100 }}>
                    {data.college.approvedBy}
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "space-evenly", textAlign: "left", mt: "2px", flexWrap: "wrap" }}>
                    {data.college.established_in !== "N/A" ? <Typography align="left" sx={{ whiteSpace: "nowrap", mb: "3px", fontSize: "10px", fontWeight: 100 }}>Established In: {data.college.established_in}</Typography> : ""}
                    <Typography mb="3px" style={{ fontSize: "10px", fontWeight: 100 }}>College Type: {data.college.college_type}</Typography>
                    {data.college.total_course_offered != 0 && data.college.total_course_offered.trim().length > 0 ? <Typography mb="3px" style={{ fontSize: "10px", fontWeight: 100 }}>Total No. of Courses Offered: {data.college.total_course_offered}</Typography> : ""}
                  </Box>

                  <Typography
                    sx={{ display: "flex", alignItems: "center", mt: "2px", fontSize: "11px", fontWeight: 100, fontFamily: "cursive" }}  >
                    <ExploreIcon sx={{ mr: "10px" }} />
                    {data.college.fullAddress},  {data.college.state},  {data.college.country},
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={4}
                  lg={3}

                  sx={{
                    bgcolor: "#1d3f7c",
                    color: "white", display: { xs: "none", sm: "none", md: "none", lg: "block" }
                  }} >
                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                    <Box mr="5px">
                      <Typography sx={{ fontSize: "12px" }}>Unreviewed</Typography>
                      <Typography sx={{ fontSize: "12px", fontStyle: "italic" }}>0 Reviews</Typography>
                    </Box>
                    <Box sx={{ bgcolor: "#32a067", p: "6px", borderRadius: "8px 8px 8px 0px" }}>
                      <Typography>0.0</Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              <Grid item >
                <Box sx={{ position: "absolute", top: "180px", left: "60px", height: "150px", width: "150px", display: { xs: "none", sm: "none", md: "none", lg: "block" }, }}>
                  <img alt="pic" src={data.collegeLogo === null ? `${BASE_URL}` + data.college.image : `${BASE_URL}` + data.collegeLogo.image} height="100%" width="100%" />
                </Box>
              </Grid>
              <Grid item xs={12}
                sx={{
                  display: "flex",
                  p: "16px",
                  flexWrap: "wrap",
                  bgcolor: "#004DDA",
                  color: "white",
                  justifyContent: { sm: "space-evenly" }
                }} >
                {data.collegeDescription.length > 0 ? <Typography sx={{ opacity: tabBars.info ? 1 : '0.6', fontSize: "18px" }} onClick={() => { const element = document.getElementById('InfoSection'); element.scrollIntoView({ behavior: 'smooth', block: 'center' }); const newFi = { ...navBars }; newFi.info = true; setTabBars(newFi) }} mr="17px" fontSize="1.1rem">
                  Info
                </Typography> : ""}
                {data.collegeCourse.length > 0 ? <Typography sx={{ opacity: tabBars.course ? 1 : '0.6', fontSize: "18px" }} onClick={() => { const element = document.getElementById('courseSection'); element.scrollIntoView({ behavior: 'smooth', block: 'center' }); const newFi = { ...navBars }; newFi.course = true; setTabBars(newFi) }} mr="17px" fontSize="1.1rem">
                  Course
                </Typography> : ""}

                {data.collegeAmenities.length > 0 ? <Typography sx={{ opacity: tabBars.amenities ? 1 : '0.6', fontSize: "18px" }} onClick={() => { const element = document.getElementById('amenitySection'); element.scrollIntoView({ behavior: 'smooth', block: 'center' }); const newFi = { ...navBars }; newFi.amenities = true; setTabBars(newFi) }} mr="17px" fontSize="1.1rem">
                  Amenties
                </Typography> : ""}
                {data.collegePlacement.length > 0 ? <Typography sx={{ opacity: tabBars.placement ? 1 : '0.6', fontSize: "18px" }} onClick={() => { const element = document.getElementById('placementSection'); element.scrollIntoView({ behavior: 'smooth', block: 'center' }); const newFi = { ...navBars }; newFi.placement = true; setTabBars(newFi) }} mr="17px" fontSize="1.1rem">
                  Placement
                </Typography> : ""}
                {data.collegeGallery.length > 1 ? <Typography sx={{ opacity: tabBars.gallery ? 1 : '0.6', fontSize: "18px" }} onClick={() => { const element = document.getElementById('gallerySection'); element.scrollIntoView({ behavior: 'smooth', block: 'center' }); const newFi = { ...navBars }; newFi.gallery = true; setTabBars(newFi) }} mr="17px" fontSize="1.1rem">
                  Gallery
                </Typography> : ""}
                {data.collegeVideoURL == null || data.collegeVideoURL == undefined ? "" : <Typography sx={{ opacity: tabBars.video ? 1 : '0.6', fontSize: "18px" }} onClick={() => { const element = document.getElementById('videoSection'); element.scrollIntoView({ behavior: 'smooth', block: 'center' }); const newFi = { ...navBars }; newFi.video = true; setTabBars(newFi) }} mr="17px" fontSize="1.1rem">
                  Video
                </Typography>}

                {data.collegeContact !== null ? <Typography sx={{ opacity: tabBars.contact ? 1 : '0.6', fontSize: "18px" }} onClick={() => { const element = document.getElementById('contactSection'); element.scrollIntoView({ behavior: 'smooth', block: 'center' }); const newFi = { ...navBars }; newFi.contact = true; setTabBars(newFi) }} mr="17px" fontSize="1.1rem">
                  Contact
                </Typography> : ""}
                <Typography sx={{ opacity: tabBars.reviews ? 1 : '0.6' }} onClick={() => { const element = document.getElementById('reviewSection'); element.scrollIntoView({ behavior: 'smooth', block: 'center' }); const newFi = { ...navBars }; newFi.reviews = true; setTabBars(newFi) }} mr="17px" fontSize="1.1rem">
                  Reviews
                </Typography>
              </Grid>

            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", alignItems: "center", p: "8px" }}>
                <Typography mt="2px" color="#004DDA">
                  <HomeIcon sx={{ fontSize: "20px" }} />{" "}
                </Typography>
                <Typography fontSize="15px">&gt;</Typography>
                <Typography color="#004DDA" fontSize="15px" letterSpacing="2px">
                  College{" "}
                </Typography>
                <Typography fontSize="15px">&gt;</Typography>
                <Typography fontSize="15px" letterSpacing="2px">
                  Group of institutions
                </Typography>
              </Box>
            </Grid>
            <Grid item justifyContent="center" display="flex" xs={12}>
              <Box>
                <img alt="pic" src={collegePadho} height="100%" width="100%" />
              </Box>
            </Grid>

            <Grid container spacing={2} p="10px">
              <Grid item xs={12} lg={8} md={8} mt="20px" >
                <Grid item mb={"20px"} sx={{ height: "fit-content" }}>
                  <Box mb="10px" ml="10px"  >
                    {data.college.stream.map((item) => {
                      return (<Button
                        key={item}
                        variant="outlined"
                        color="success"
                        sx={{ height: "25px", mr: "5px" }}>
                        {item}
                      </Button>)
                    })}

                  </Box>
                  <Paper id="InfoSection" sx={{ p: "10px", height: "fit-content", ml: '12px' }} elevation={1}>
                    <Typography fontSize="18px">
                      About - {data.college.collegeName}
                    </Typography>
                    <Divider sx={{ mb: "10px" }} />
                    {data.collegeDescription.slice(0, 1).map((item, index) => {

                      return <Grid container key={item._id} >
                        <Typography fontWeight={900} fontSize="25px" variant="h1">{item.title}</Typography>
                        <Typography paragraph sx={{ color: "#555", fontSize: "0.775rem", lineHeight: "1.6", fontFamily: "Poppins, Helvetica, sans-serif" }} mt="10px">{!readMore ? item.description.slice(0, 100) + '...' : item.description}</Typography>
                      </Grid>
                    })}
                    {data.collegeDescription.slice(1).map((item, index) => {
                      const para = item.description.split(".");
                      const paraOk = para.join(`.\n`);
                      if (readMore) {
                        return (<Grid container key={item._id} >
                          <Typography fontWeight={900} fontSize="20px" variant="h1"> {item.title} </Typography>
                          <Typography paragraph sx={{ color: "#555", fontSize: "0.775rem", lineHeight: "1.6", fontFamily: "Poppins, Helvetica, sans-serif" }} mt="10px">{paraOk}</Typography>
                        </Grid>
                        )
                      }
                      else {
                        return ("")
                      }
                    })}
                    <Button onClick={() => setReadMore(prev => { return !prev })} disableRipple
                      sx={{ bgcolor: "#004DDA", borderRadius: "25px", height: "30px", fontSize: "11px", mt: "8px", color: "white" }} variant="contained" >
                      {!readMore ? 'Read More' : 'Read less'}
                    </Button>
                  </Paper>
                </Grid>

                {data.college.awards[0].trim().length > 0 && data.college.awards[0] !== 'N/A' ? <Grid item mb={"20px"}>
                  <Paper elevation={3} sx={{ p: "10px" }} >
                    <Typography variant="h6" ml="10px">
                      <b>Awards and recognitions</b>
                    </Typography>
                    <Box sx={{ lineHeight: "25px" }}>
                      <ul>
                        {data.college.awards.map((item) => {
                          return (<li key={item}>
                            <Typography sx={{ fontSize: "12px" }} variant="body1">
                              {item}
                            </Typography>
                          </li>)
                        })}</ul>
                    </Box>
                  </Paper>
                </Grid> : ""}

                {data.collegeCourse.length > 0 ? <Grid id="courseSection" item mb={"20px"}>
                  <Paper sx={{ p: "10px" }} elevation={3}>
                    <Typography variant="h6">
                      <b>Course details</b>
                    </Typography>
                    {/* component */}
                    {data.collegeCourse.map((item) => {
                      return (<div key={item._id}>
                        <CourseDetailInner1 data={item} handleOpen={handleOpen} />
                        <Box sx={{ borderBottom: "1px dashed gray", mt: "8px" }}></Box>
                      </div>)
                    })}

                  </Paper>
                </Grid> : ""}


                {data.collegeAmenities.length > 0 ? <Grid id={"amenitySection"} item mb={"20px"} >
                  <AmenitiesSection data={data.collegeAmenities} />
                </Grid> : ""}
                {data.collegePlacement.length > 0 ? <Grid id="placementSection" item mb={"20px"}>
                  <Placement data={data.collegePlacement} />
                </Grid> : ""}

                <Grid item mb={"20px"} >
                  <Recruiters data={data.collegeRecruitersImage} />
                </Grid>
                <Grid id="gallerySection" item mb="20px" >
                  <PhotoGallery data={data.collegeGallery} />
                </Grid>
                {data.collegeVideoURL == null || data.collegeVideoURL == undefined ? "" :
                  <Grid item mb="20px" id="videoSection" sx={{ height: "fit-content" }}>
                    <iframe title="youtube" width="100%" height="345" src={`https://www.youtube.com/embed/${data.collegeVideoURL.youTubeUrl.split('=')[1]}`}></iframe>
                  </Grid>
                }

                <Grid id="contactSection" mb={"20px"}>
                  <Contact data={data.collegeContact} />
                </Grid>

                <Grid id="reviewSection" item mb={"20px"} p="10px">
                  <TenthPaper />
                </Grid>

              </Grid>
              <Grid
                item
                xs={4}
                height="fit-content"
                sx={{
                  mt: "20px",

                  position: "sticky",
                  top: "100px",
                  display: { lg: 'block', md: 'block', xs: 'none' }
                }} >
                <Paper elevation={1} sx={{ p: "10px", height: "100%" }}>
                  <Button onClick={handleOpen}
                    variant="contained"
                    sx={{ bgcolor: "#004dda", m: "5px", p: "12px", color: "white" }}
                    fullWidth>
                    <SchoolIcon />
                    Apply Now
                  </Button>
                  <Button onClick={handleOpen}
                    variant="contained"
                    sx={{ bgcolor: " #663399", m: "5px", p: "12px", color: "white" }}
                    fullWidth>
                    <SendIcon />
                    Free Counselling
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      color: "black",
                      borderColor: "black",
                      m: "2px",
                      p: "12px",
                    }}
                    fullWidth
                  >
                    <FavoriteIcon />
                    <b>Add to Wishlist</b>
                  </Button>
                  <Typography align="center" fontSize="11px" m="2px">
                    No money charged in this step
                  </Typography>
                </Paper>
                <Box

                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    mt: "30px",
                    position: "sticky",
                    top: "50px",
                  }}
                >
                  <Button

                    variant="outlined"
                    sx={{
                      color: "#303f9f",
                      borderRadius: "25px",
                      borderColor: "#303f9f",
                      fontSize: "13px",
                    }} >
                    <FacebookIcon />
                    Share
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      color: "#1da1f2",
                      borderRadius: "25px",
                      borderColor: "#1da1f2",
                      fontSize: "13px",
                    }}>
                    <TwitterIcon />
                    TWEET
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      color: "#dd4b39",
                      borderRadius: "25px",
                      borderColor: "#dd4b39",
                      fontSize: "13px",
                    }}
                  >
                    <PinterestIcon />
                    Pin
                  </Button>
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: "35px", }} >
              <Box ref={eleref} height="85%" width="65%" mt="10px">
                <img alt="pic" src={mba} width="100%" height="100%" />
              </Box>
            </Grid>
          </Grid>
          <Footer />
        </Container >
      </>
    );
  }
  if (collegeData.length === 0) {
    return (<Loader />)
  }

};

export default IndividualCollegeInfo;
