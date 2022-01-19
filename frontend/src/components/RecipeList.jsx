import { Typography, Box, Button } from '@mui/material'
import axios from 'axios'
import React from 'react'

export default function RecipeList(props) {

  const {recipes, user} = props

  const removeRecipe = (recipe) => {
    console.log(recipe._id)
    axios.delete(`/groceries/recipes/${user}/${recipe._id}`)
      .then((res) => {
        console.log(res)
        window.location.reload()
      })
  }
  
  return (
    <>
      <Box display='flex' justifyContent='center' flexDirection='column'>
        <Typography variant='h4'>Recipe List</Typography>
        {recipes.map((recipe, index) => {
          // console.log(recipe)
          return (
            <Box key={recipe._id}>
              <Typography>{recipe.title}</Typography>
              <Button 
                onClick={() => {
                  removeRecipe(recipe)}}
              >Remove Recipe from Shopping List</Button>
            </Box>
          )
        })}
      </Box>
    </>
  )
}