import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  ButtonGroup,
  CardMedia,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-alert";

const RecipeDetails = ({ user }) => {
  const [details, setDetails] = useState({});
  const [serving, setServing] = useState(1);
  const [servingRatio, setServingRatio] = useState(1);
  let url = window.location.pathname;
  const id = url.split("/search/")[1];
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/search/details/${id}`)
      .then(function (response) {
        setDetails(response.data);
        console.log("response", response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id]);

  useEffect(() => {
    setServing(details.servings);
  }, [details.servings]);

  function removeTags(str) {
    if (str === null || str === "") return false;
    else str = str.toString();
    return str.replace(/(<([^>]+)>)/gi, "");
  }

  const onClickFavourite = () => {
    if (user) {
      const URL = `http://localhost:8000/favourites/api/${user}/${details.id}`;
      axios
        .post(URL, details)
        .then((res) => {
          alert("Added!");
        })
        .catch((err) => {
          alert("This recipe has already been added to your favourites.");
        });
    } else {
      navigate("/login");
    }
  };

  const onClickConvert = () => {
    setServingRatio(serving / details.servings);
  };

  const onClickGrocery = () => {
    if (user) {
      axios
        .post(
          `http://localhost:8000/groceries/api/${user}/${details.id}`,
          details
        )
        .then((res) => {
          console.log(res);
          alert("Added!");
        })
        .catch((err) => {
          alert("This recipe has already been added to your grocery list.");
          console.log(err);
        });
    } else {
      navigate("/login");
    }
  };

  return (
    <Grid>
      <CssBaseline />
      <Paper
        sx={{
          p: 2,
          margin: "auto",
          maxWidth: 600,
          flexGrow: 1,
          paddingLeft: 0,
          paddingRight: 0,
        }}
      >
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{ p: 1, fontWeight: "bold" }}
          >
            {details.title}
          </Typography>
          <Grid sx={{ p: 2 }}>
            <CardMedia
              component="img"
              src={details.image}
              alt="recipe"
              style={{ height: 400, width: 750 }}
            />
          </Grid>
          <ButtonGroup>
            <Button onClick={onClickFavourite}>
              <StarIcon />
            </Button>
            <Button onClick={onClickGrocery}>
              <AddShoppingCartIcon />
            </Button>
          </ButtonGroup>
          <Grid sx={{ p: 2 }}>
            <Typography component="h2" variant="h5" sx={{ fontWeight: "bold" }}>
              Recipe Ingredients
            </Typography>
            <Grid sx={{ p: 2, textAlign: "left" }}>
              {Object.values(details).length > 0
                ? details.extendedIngredients.map((ing) => {
                    return (
                      <li key={ing.id}>
                        {ing.amount * servingRatio} {ing.unit} {ing.name}
                      </li>
                    );
                  })
                : null}
            </Grid>
            <Grid
              x={{
                p: 1,
              }}
            >
              <Typography sx={{ fontWeight: "bold" }}>
                Current Servings: {details.servings * servingRatio}
              </Typography>
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Typography>Convert Servings: </Typography>
                <TextField
                  style={{
                    width: 70,
                    marginTop: 5,
                    marginLeft: 10,
                    marginRight: 5,
                  }}
                  size="small"
                  type="number"
                  value={serving}
                  onChange={(e) => setServing(e.target.value)}
                  InputProps={{
                    inputProps: { min: 1, style: { textAlign: "center" } },
                  }}
                />
                <Button size="small" onClick={onClickConvert}>
                  Convert
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid sx={{ p: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Cooking Instructions
            </Typography>
            <ol type="1">
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  textAlign: "left",
                }}
              >
                {Object.values(details).length
                  ? removeTags(details.instructions)
                      .split(".")
                      .slice(0, -1)
                      .map((each) => {
                        return (
                          <li
                            key={removeTags(details.instructions)
                              .split(".")
                              .indexOf(each)}
                          >
                            {each + "."}
                          </li>
                        );
                      })
                  : null}
              </Grid>
            </ol>
          </Grid>
        </Box>
      </Paper>
    </Grid>
  );
};

export default RecipeDetails;
