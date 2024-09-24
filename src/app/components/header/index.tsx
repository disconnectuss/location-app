"use client";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
  Link as ChakraLink,
  Heading,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { LinkItem, NavLinkProps } from "@/utils/types/types";
const Links: LinkItem[] = [
  { href: "/add", label: "Add Location" },
  { href: "/list", label: "Location List" },
  { href: "/route", label: "Route Lines" },
];
const NavLink: React.FC<NavLinkProps> = ({ href, label }) => {
  return (
    <NextLink href={href} passHref>
      <ChakraLink
        px={2}
        py={1}
        rounded={"md"}
        _hover={{
          textDecoration: "none",
          bg: useColorModeValue("gray.200", "gray.700"),
        }}
      >
        {label}
      </ChakraLink>
    </NextLink>
  );
};
export default function WithAction() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Toggle Navigation Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <NextLink href="/" passHref>
              <Heading>LooC</Heading>
            </NextLink>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink href={link.href} label={link.label} key={link.href} />
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <NextLink href="/add" passHref>
              <Button
                as={ChakraLink}
                variant={"solid"}
                colorScheme={"teal"}
                size={"sm"}
                mr={4}
                leftIcon={<AddIcon />}
              >
                Add Location
              </Button>
            </NextLink>
          </Flex>
        </Flex>
        {isOpen && (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink href={link.href} label={link.label} key={link.href} />
              ))}
            </Stack>
          </Box>
        )}
      </Box>
    </>
  );
}
