import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Stack,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import bookImage from "..assets/bookImage";

const BCard = ({ onTryit }) => {
  return (
    <Card overflow="hidden" variant="outline" maxW="sm" mt={"30px"}>
      <Stack>
        <CardBody>
          <Heading size="md">Exam_Title: 'Title_1'</Heading>
          <Image
            src={bookImage}
            alt="Green double couch with wooden legs"
            borderRadius="sm"
            sizes="sm"
          />
          <Text py="2">This exam is the largest</Text>
        </CardBody>

        <CardFooter>
          <Button variant="solid" colorScheme="blue" onClick={onTryit}>
            Try it.
          </Button>
          {/* <Button variant='solid' colorScheme='red' ml={3}>
            View more
          </Button> */}
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default BCard;
