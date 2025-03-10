import { useAuth } from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";
import { HiOutlineLogin } from "react-icons/hi";
import { LuUserPlus2 } from "react-icons/lu";
import {
  Box,
  Flex,
  Text,
  Image,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
  Center,
  Avatar,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";

const Header = () => {
  const { isOpen, onToggle } = useDisclosure();
  const navigate = useNavigate();
  const { isAuthenticated, currentUser, logout, isAdmin } = useAuth();

  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");

  const tryLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/");
  };

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Link
            href={"/"}
            _hover={{
              textDecoration: "none",
              color: linkHoverColor,
            }}
          >
            <Image h="10" src={require("../../assets/logo.png")} />
          </Link>
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 1 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          {isAuthenticated ? (
            <>
              <Center>
                <Link
                  href={"#"}
                  fontSize={"sm"}
                  fontWeight={500}
                  color={linkColor}
                  _hover={{
                    textDecoration: "none",
                    color: linkHoverColor,
                  }}
                >
                  {/* Welcome, {currentUser} */}
                  <Avatar name={currentUser} />
                </Link>
              </Center>
              {/* <Link href={"/createlisting"} _hover={{ textDecoration: "none" }}>
                <Button
                  display={{ base: "none", md: "inline-flex" }}
                  fontSize={"sm"}
                  fontWeight={600}
                  color={"white"}
                  bg={"green.500"}
                  href={"/createlisting"}
                  _hover={{
                    bg: "green.400",
                  }}
                >
                  Create Listing
                </Button>
              </Link> */}
              <IconButton
                as={"a"}
                fontSize={"30px"}
                variant={"link"}
                onClick={tryLogout}
                cursor={"pointer"}
                fontWeight={400}
              >
                <MdOutlineLogout />
              </IconButton>
            </>
          ) : (
            <>
              <Link href={"/auth/login"} _hover={{ textDecoration: "none" }}>
                <Button
                  display={{ base: "none", md: "inline-flex" }}
                  fontSize={"sm"}
                  fontWeight={600}
                  href={"/auth/login"}
                  color={"black"}
                  _hover={{
                    bg: "blue.300",
                    color: "white",
                  }}
                  leftIcon={<HiOutlineLogin size={"20px"} />}
                >
                  Log in
                </Button>
              </Link>
              <Link href={"/auth/register"} _hover={{ textDecoration: "none" }}>
                <Button
                  display={{ base: "none", md: "inline-flex" }}
                  fontSize={"sm"}
                  fontWeight={600}
                  href={"/auth/register"}
                  color={"black"}
                  _hover={{
                    bg: "blue.300",
                    color: "white",
                  }}
                  rightIcon={<LuUserPlus2 size={"20px"} />}
                >
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
};

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");
  const { isAuthenticated, isAdmin } = useAuth();
  const nav_items = isAdmin
    ? [...NAV_ITEMS, ...ADMIN_ITEMS]
    : isAuthenticated
    ? NAV_ITEMS
    : [];

  return (
    <Stack direction={"row"} mt={2} spacing={4}>
      {nav_items.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Link
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("blue.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "blue.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const nav_items = isAdmin
    ? [...NAV_ITEMS, ...ADMIN_ITEMS]
    : isAuthenticated
    ? NAV_ITEMS
    : [];
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {nav_items.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: "Test",
    href: "/test",
  },
];

const ADMIN_ITEMS = [
  {
    label: "Problem",
    href: "/problem",
  },
];
export default Header;
