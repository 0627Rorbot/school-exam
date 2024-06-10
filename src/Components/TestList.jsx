import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import TestIcon from "../../../assets/test.svg";
import {
  Box,
  InputGroup,
  Input,
  Container,
  Center,
  InputRightElement,
  Heading,
  useToast,
  Image,
} from "@chakra-ui/react";
import TCard from "../../../Components/Test/TCard";
import TSpinner from "../../../libs/TSpinner";
import { subjects_url } from "../utils/urls";

const Test = () => {
  const [search, setSearch] = useState("");

  const [load, setLoad] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [searchs, setSearchs] = useState([]);
  const toast = useToast({ position: "right top" });

  const onTest = (id, title) => {
    const url = `/test/home`;
    localStorage.setItem("subject_id", id);
    localStorage.setItem("subject_title", title);

    window.open(url, "_blank");
  };

  // get data at mount time
  useEffect(() => {
    getSubjects_db();
  }, []);

  // get all subjects from database
  const getSubjects_db = async () => {
    setLoad(true);
    try {
      const subjects_res = await axios.get(subjects_url);
      if (subjects_res.data.status) {
        setSubjects(subjects_res.data.data);
        setSearchs(subjects_res.data.data);
        toast({
          title: "Get subjects successfully.",
          description: "Please input correctly",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
      console.log(subjects_res.data.data);
    } catch (error) {
      console.log("here");
    }
    setLoad(false);
  };

  useEffect(() => {
    let list = subjects.filter(
      (item) =>
        item.title.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
        item.content.toLowerCase().indexOf(search.toLowerCase()) > -1
    );
    setSearchs(list);
  }, [search]);

  return (
    <>
      {load ? <TSpinner /> : <></>}
      <Container maxW="4xl" bg="gray.50" centerContent>
        <Box>
          <Center mb={5}>
            <Image src={TestIcon} boxSize="100px"></Image>
          </Center>
          <Center m={2}>
            <Heading fontSize={"20px"} fontWeight={100}>
              Tests help you upskill faster - what are you waiting for?
            </Heading>
          </Center>
          <Center padding={3}>
            <InputGroup>
              <Input
                type="tel"
                placeholder="Search Tests"
                bg={"gray.300"}
                onChange={(e) => setSearch(e.target.value.trim())}
              />
              <InputRightElement pointerEvents="none">
                <FaSearch color="gray.300" />
              </InputRightElement>
            </InputGroup>
          </Center>
        </Box>
        <Box>
          {searchs.map((item, i) => (
            <TCard
              p={10}
              key={i}
              id={item._id}
              title={item.title}
              content={item.content}
              onTest={() => onTest(item._id, item.title)}
              test_f={true}
            />
          ))}
        </Box>
      </Container>
    </>
  );
};

export default Test;
