import {Grid, Typography, useMediaQuery} from "@mui/material";
import highline from "../../assets/images/Highline.png";
import saiga from "../../assets/images/saiga.svg";
import yonGo from "../../assets/images/yonGo.jpg";
import tcawg from "../../assets/images/tcawg.png";
import ieroglifs from "../../assets/images/ieroglifs.png";
import React from "react";
import theme from "../../theme";

const Partners = () => {
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const isSm = useMediaQuery(theme.breakpoints.only('sm'));
  const isMd = useMediaQuery(theme.breakpoints.only('md'));

  let width = 250;
  if (isMd) width = 250
  else if (isXs) width = 115
  else if (isSm) width = 200
  return (
    <>
      <Grid container justifyContent="center">
        <Grid item textAlign="center">
          <Typography variant="h4" align="center" gutterBottom className="section-title">
            OUR PARTNERS
          </Typography>
        </Grid>
        <Grid item container spacing={1} justifyContent="center">
          <Grid
            item
            xs={5}
            sm={4}
            style={{
              marginTop: 'auto',
              marginBottom: 'auto',
              textAlign: 'center',
            }}
          >
            <img
              src={highline}
              alt="Highline"
              width={width}
              style={{margin: '3px 0 0 2px'}}
            />
          </Grid>
          <Grid
            item
            xs={5}
            sm={4}
            style={{
              marginTop: 'auto',
              marginBottom: 'auto',
              textAlign: 'center',
            }}
          >
            <img
              src={saiga}
              alt="Saiga"
              width={width}
              style={{margin: '3px 0 0 2px'}}
            />
          </Grid>
          <Grid
            item
            xs={5}
            sm={4}
            style={{
              marginTop: 'auto',
              marginBottom: 'auto',
              textAlign: 'center',
            }}
          >
            <img
              src={yonGo}
              alt="yonGO"
              width={width}
              style={{margin: '3px 0 0 2px'}}
            />
          </Grid>
          <Grid
            item
            xs={5}
            sm={4}
            style={{
              marginTop: 'auto',
              marginBottom: 'auto',
              textAlign: 'center',
            }}
          >
            <img
              src={tcawg}
              alt="TCAWG"
              width={width}
              style={{margin: '3px 0 0 2px'}}
            />
          </Grid>
          <Grid
            item
            xs={5}
            sm={4}
            style={{
              marginTop: 'auto',
              marginBottom: 'auto',
              textAlign: 'center',
            }}
          >
            <img
              src={ieroglifs}
              alt="Ieroglifs"
              width={width}
              style={{margin: '3px 0 0 2px'}}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  )
};

export default Partners;