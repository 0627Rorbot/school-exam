import React from "react";
import {
  Card,
  CardBody,
  Button,
  Heading,
  Text,
  Center,
  Box,
} from "@chakra-ui/react";
import { IoLogoPython } from "react-icons/io5";

const TCard = ({ title, content, onTest, onDelete, test_f }) => {
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      size={"full"}
      mt={5}
      bg={"gray.300"}
    >
      <CardBody>
        <Center p={5}>
          <Box p={2}>
            <IoLogoPython fontSize={"100px"} />
          </Box>
          <Box p={2}>
            <Heading size="md">{title}</Heading>
            <Text>{content}</Text>
          </Box>
          <Box p={2}>
            {test_f ? (
              <Button bg={"blue.400"} color={"white"} onClick={onTest}>
                Start Test
              </Button>
            ) : (
              <Button bg={"red.400"} color={"white"} onClick={onDelete}>
                Delete
              </Button>
            )}
          </Box>
        </Center>
      </CardBody>
    </Card>
  );
};

export default TCard;
