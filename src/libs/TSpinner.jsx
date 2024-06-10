import React from "react";
import { Spinner, AbsoluteCenter, Box } from '@chakra-ui/react'
// import "./style.css"

const TSpinner = () => {
  return (
    <Box 
      position='relative' 
      zIndex={'100'}
      width={'100%'}
      height={'100vh'}
      bg={'gray.300'}
    >
      <AbsoluteCenter p='4' color='white' axis='both'>
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        />
      </AbsoluteCenter>
    </Box>
  )
}

export default TSpinner;