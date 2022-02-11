import React, { useState } from "react";
import {
  Box,
  CssBaseline,
  ClickAwayListener,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Typography,
  Tooltip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import Image from "../../docs/burger.jpeg";

const styles = {
  paperContainer: {
    backgroundImage: `url(${Image})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100%",
    height: "100%",
  },
};

const SearchForm = () => {
  const [search, setSearch] = useState("");
  const [tooltip, setTooltip] = useState(false);
  const navigate = useNavigate();

  const handleTooltipClose = () => {
    setTooltip(false);
  };

  const handleTooltipOpen = () => {
    setTooltip(true);
  };

  function handleChange(e) {
    setSearch(e.target.value);
  }
  const replaceString = (str) => {
    return str.replaceAll(" ", "+").replaceAll(",", "+");
  };
  const showSearch = (e) => {
    navigate(`/search/results/${replaceString(search)}`);
  };

  return (
    <Grid>
      <CssBaseline />
      <Paper style={styles.paperContainer}>
        <Grid
          container
          marginTop={8}
          spacing={4}
          marginTop={8}
          sx={{
            p: 2,
            flexGrow: 1,
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "93vh",
          }}>
          <Box
            component="main"
            sx={{
              p: 5,
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <Typography variant="h3">Search For Recipes</Typography>
            <Paper
              component="form"
              sx={{
                marginTop: 2,
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 600,
                ":hover": {
                  boxShadow: 20,
                },
              }}>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Enter Ingredients or Keywords"
                inputProps={{ "aria-label": "search google maps" }}
                value={search}
                onChange={handleChange}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    showSearch();
                  }
                }}
              />
              {search && (
                <IconButton
                  onClick={showSearch}
                  sx={{ p: "10px" }}
                  aria-label="search">
                  <SearchIcon />
                </IconButton>
              )}
              {!search && (
                <ClickAwayListener onClickAway={handleTooltipClose}>
                  <Tooltip
                    title={
                      <Typography fontSize={20} textAlign="center">
                        Please enter an ingrededient or keyword!
                      </Typography>
                    }
                    onClose={handleTooltipClose}
                    open={tooltip}>
                    <IconButton
                      onClick={handleTooltipOpen}
                      sx={{ p: "10px" }}
                      aria-label="search">
                      <SearchIcon />
                    </IconButton>
                  </Tooltip>
                </ClickAwayListener>
              )}
            </Paper>
          </Box>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default SearchForm;
