import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Heading,
  Center,
  Box,
  Slider,
  SliderTrack,
  SliderThumb,
  SliderFilledTrack,
  Card,
  CardBody,
  Button,
  Text,
  Flex,
  Spacer,
  Checkbox,
  Radio,
  VStack,
  Progress,
  AbsoluteCenter,
  ButtonGroup,
  useToast,
  HStack,
  Wrap,
  WrapItem,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import { FaRegCircleUser } from "react-icons/fa6";
import { GrFormNextLink } from "react-icons/gr";
import TSpinner from "../../../libs/TSpinner";
import { problems_url } from "../../../utils/urls";

const levels = ["Beginner", "Intermediate", "Advanced", "Professional"];

const Test_Main = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const [load, setLoad] = useState(false);
  const [answeredCnt, setAnsweredCnt] = useState(0);
  const [problems, setProblems] = useState([]);
  const [scores, setScores] = useState([]);
  const [totalSelectedItems, setTotalSelectedItems] = useState([]);

  // current problem
  const [selectedItems, setSelectedItems] = useState([]);

  const toast = useToast({ position: "right top" });

  const onNext = () => {
    let total_Sco = 0;
    scores.map((s) => (total_Sco += s));
    if (answeredCnt === problems.length - 1) {
      toast({
        title: `Your total score is ${total_Sco / problems.length}.`,
        description: "Please Check Answers",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      setAnsweredCnt(answeredCnt + 1);
      return;
    }
    if (answeredCnt === problems.length) {
      toast({
        title: `Your total score is ${total_Sco / problems.length}.`,
        description: "Please Check Answers",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    const correct_answer_texts = problems[answeredCnt].correct_answer_texts;
    if (selectedItems === 0) {
      toast({
        title: "Check Answers",
        description: "Please Check Answers",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    let sco = 0.0;
    selectedItems.map((item) => {
      correct_answer_texts.map((correct) => {
        if (item === correct) sco += 10.0;
      });
    });
    sco = (sco * correct_answer_texts.length) / selectedItems.length;

    setScores([...scores, sco]);
    setTotalSelectedItems([...totalSelectedItems, selectedItems]);
    toast({
      title: "Score",
      description: `Your score is ${sco.toFixed(2)} for ${answeredCnt + 1}`,
      status: "warning",
      duration: 5000,
      isClosable: true,
    });

    setAnsweredCnt(answeredCnt + 1);
  };

  const onEnd = () => {
    let totalScore = 0.0;
    scores.map((sco) => {
      totalScore += sco;
    });
    totalScore /= problems.length;
    toast({
      title: "Total Score",
      description: `Your total score is ${totalScore}.`,
      status: "warning",
      duration: 5000,
      isClosable: true,
    });
  };

  const onHistory = () => {};

  const getProblems = async () => {
    // global problem
    const subject_id = localStorage.getItem("subject_id");
    const problem_cnt = localStorage.getItem("count");

    if ((subject_id == "") | (problem_cnt <= 0)) return;

    try {
      setLoad(true);
      let test_res = await axios.get(problems_url, {
        params: {
          subject_id: subject_id,
          problem_cnt: problem_cnt,
        },
      });
      if (test_res.status == false)
        toast({
          title: "Requesting Problems...",
          description: test_res.msg,
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
      else {
        toast({
          title: "Requesting Problems...",
          description: test_res.msg,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setProblems(test_res.data.data);
      }
      setLoad(false);
    } catch (error) {
      toast({
        title: "Request Error!",
        description: "Can't have a test.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setLoad(false);
    }
  };

  const onCheck = (e) => {
    const id = e.target.id;
    selectedItems.filter((item) => item == id).length > 0
      ? setSelectedItems(selectedItems.filter((t) => t != id))
      : setSelectedItems([...selectedItems, id]);
  };

  useEffect(() => {
    getProblems();
  }, []);

  useEffect(() => {
    setSelectedItems([]);
  }, [answeredCnt]);

  return (
    <div>
      {load ? (
        <TSpinner />
      ) : (
        <>
          <Box mt={10}>
            <Wrap justify={"Center"}>
              <WrapItem>
                <FaRegCircleUser fontSize={"80px"} fontWeight={100} />
              </WrapItem>
              <WrapItem alignItems={"center"}>
                <Heading fontSize={"2rem"} ml={2} textAlign={"center"}>
                  Accessibility Test
                </Heading>
              </WrapItem>
            </Wrap>
          </Box>
          <Box>
            {problems[answeredCnt] ? (
              <>
                <Center mt={5}>
                  <Heading
                    fontSize={"20px"}
                    fontWeight={400}
                    textAlign={"center"}
                    width={"80%"}
                  >
                    {problems[answeredCnt].question}
                  </Heading>
                </Center>
                <Center mt={5}>
                  <VStack spacing={5} direction="column" width={"80%"}>
                    {problems[answeredCnt].options.map((option, i) => {
                      return (
                        <Box width={"100%"} key={i}>
                          <Checkbox
                            id={option}
                            bg={"gray.700"}
                            width={"100%"}
                            minHeight={"100px"}
                            p={3}
                            borderRadius={"10px"}
                            color={"white"}
                            onChange={(e) => onCheck(e)}
                          >
                            {option}
                          </Checkbox>
                        </Box>
                      );
                    })}
                  </VStack>
                </Center>
              </>
            ) : (
              <></>
            )}
          </Box>
          <Box mt={10}>
            <Center>
              <Text>Questions answered: {answeredCnt}</Text>
            </Center>
            <Center>
              <Progress
                mt={2}
                width={"60%"}
                value={answeredCnt}
                max={problems.length}
                borderRadius={"10px"}
                bg={"gray.400"}
              />
            </Center>
            <Center mt={5} mb={20}>
              <ButtonGroup spacing={5}>
                <VStack>
                  <Button
                    leftIcon={<GrFormNextLink fontSize={"25px"} />}
                    colorScheme="green"
                    variant="solid"
                    onClick={onNext}
                  >
                    Next Question
                  </Button>
                  {/* <Button variant="solid" colorScheme="blue" onClick={onEnd}>
                    End
                  </Button> */}
                  <Button
                    variant="solid"
                    ref={btnRef}
                    colorScheme="teal"
                    onClick={onOpen}
                  >
                    History
                  </Button>
                </VStack>
              </ButtonGroup>
            </Center>
          </Box>
          <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            size={"lg"}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>History</DrawerHeader>

              <DrawerBody>
                {totalSelectedItems.map((selecteditems, i) => {
                  const problem = problems[i];
                  return (
                    <Box key={i}>
                      <Heading
                        fontSize={"25px"}
                        p={3}
                        mt={10}
                        mb={3}
                        bg={"yellow"}
                      >
                        Question: {i + 1}
                      </Heading>
                      <Text fontSize={"20px"}>{problem.question}</Text>
                      <Heading fontSize={"22px"} mt={2} mb={2} ml={2}>
                        - Options
                      </Heading>
                      {problem.options.map((option, i) => (
                        <Text
                          key={i}
                          bg={"gray.700"}
                          width={"100%"}
                          p={3}
                          color={"white"}
                        >
                          {option}
                        </Text>
                      ))}
                      <Heading fontSize={"22px"} mt={2} mb={2} ml={2}>
                        - Selected Answers
                      </Heading>
                      <Box>
                        {selecteditems.map((item) => (
                          <Text
                            key={i}
                            bg={"gray.700"}
                            width={"100%"}
                            p={3}
                            color={"white"}
                          >
                            {item}
                          </Text>
                        ))}
                      </Box>
                      <Heading fontSize={"22px"} mt={2} mb={2} ml={2}>
                        - Correct Answers
                      </Heading>
                      <Box>
                        {problem.correct_answer_texts.map((item) => (
                          <Text
                            key={i}
                            bg={"gray.700"}
                            width={"100%"}
                            p={3}
                            color={"white"}
                          >
                            {item}
                          </Text>
                        ))}
                      </Box>
                    </Box>
                  );
                })}
              </DrawerBody>

              <DrawerFooter>
                <Button variant="outline" mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="blue">Save</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </>
      )}
    </div>
  );
};

export default Test_Main;
