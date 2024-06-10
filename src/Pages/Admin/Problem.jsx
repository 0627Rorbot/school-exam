import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
// import Header from "../../Components/Header";
import TSpinner from "../../libs/TSpinner";
import PdfViewer from "../../libs/TPdfViewer";
import Testimonials from "../../Components/testimonials";
// import TCard from "../../Components/Test/TCard";

import {
  Box,
  FormControl,
  FormLabel,
  Button,
  Input,
  FormHelperText,
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
  useToast,
} from "@chakra-ui/react";

import { FaRegFilePdf } from "react-icons/fa6";
import { GrDocumentUpdate } from "react-icons/gr";
import { ImFilePdf } from "react-icons/im";

import {
  saveSubject,
  readSubjects,
  deleteSubject,
} from "../../store/features/subject/subjectSlice";

import "./style.css";

const Problem = () => {
  const toast = useToast();

  const dispatch = useDispatch();
  const res_subjects = useSelector((state) => state.subject.subjects);
  const res_message = useSelector((state) => state.subject.message);
  const res_success = useSelector((state) => state.subject.success);

  useEffect(() => {
    dispatch(readSubjects());
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  // total subjects infos
  const [load, setLoad] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const [pdf_file, setPdf_File] = useState(undefined);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const my_file = useRef();

  const onFileChange = (event) => {
    const file = event.target.files[0];
    setPdf_File(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
    }
  };

  const onDeleteSubject = (subject_id) => {
    if (subject_id !== "") dispatch(deleteSubject(subject_id));
  };

  const onSaveSubject = () => {
    if (
      pdf_file === undefined ||
      title.trim() === "" ||
      content.trim() === ""
    ) {
      toast({
        title: "Input correctly!",
        // description: "We've created your account for you.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    let subject = new FormData();
    subject.append("title", title);
    subject.append("content", content);
    subject.append("file", pdf_file);

    dispatch(saveSubject(subject));
    setContent("");
    setFileUrl("");
    setTitle("");
    setPdf_File(undefined);
  };

  return (
    <>
      {load ? <TSpinner /> : <></>}
      <div className="relative pt-32 pb-10 md:pt-40 md:pb-16">
        <Wrap justify="center" spacing={"30px"} size="lg">
          <WrapItem>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                placeholder="React.js Test"
                value={title}
                size="lg"
                onChange={(e) => setTitle(e.target.value)}
              />
              <FormHelperText>We need to input title.</FormHelperText>
            </FormControl>
          </WrapItem>
          <WrapItem>
            <FormControl>
              <FormLabel>Content</FormLabel>
              <Input
                placeholder="This is the best test for you."
                value={content}
                size="lg"
                onChange={(e) => setContent(e.target.value)}
              />
              <FormHelperText>We need to input content.</FormHelperText>
            </FormControl>
          </WrapItem>
          <WrapItem>
            <FormControl>
              <FormLabel>PDF Exam Problem URL</FormLabel>
              <Input
                type="text"
                placeholder="http://exam.pdf.com"
                size="lg"
                readOnly={true}
                value={fileUrl}
              />
              <FormHelperText>We need to input pdf url.</FormHelperText>
            </FormControl>
          </WrapItem>
          <WrapItem>
            <FormControl>
              <FormLabel>Exam Title</FormLabel>
              <Wrap spacing="10px" justify="center">
                <WrapItem>
                  <Button
                    colorScheme="green"
                    onClick={() => my_file.current.click()}
                  >
                    <FaRegFilePdf />
                    PDF
                  </Button>
                </WrapItem>
                <WrapItem>
                  <Button colorScheme="blue" onClick={() => onSaveSubject()}>
                    <GrDocumentUpdate />
                    Save
                  </Button>
                </WrapItem>
                <WrapItem>
                  <Button mr={0} colorScheme="green">
                    <ImFilePdf />
                    View
                  </Button>
                </WrapItem>
              </Wrap>
            </FormControl>
          </WrapItem>
        </Wrap>
      </div>

      <Testimonials subjects={res_subjects} />

      <Input
        type="file"
        className="hidden"
        ref={my_file}
        onChange={(e) => onFileChange(e)}
      />
      {/* <Box>
        {res_subjects &&
          res_subjects.map((item) => (
            <TCard
              p={10}
              key={item._id}
              icon={item.icon}
              title={item.title}
              content={item.content}
              onDelete={() => onDeleteSubject(item._id)}
              // onTest={onTest}
            />
          ))}
      </Box> */}
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={"full"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>PDF View - Title: Title_1</DrawerHeader>
          <DrawerBody>
            <Box>
              <PdfViewer />
            </Box>
          </DrawerBody>

          <DrawerFooter>
            {/* <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button> */}
            {/* <Button colorScheme='blue'>Save</Button> */}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Problem;
