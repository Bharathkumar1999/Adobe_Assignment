import { Box, Flex } from "@chakra-ui/react";

import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {

  return (
    <Flex
      justify={"space-between"}
      align="center"
      w="full"
      h="56px"
      px="15px"
      borderBottom={"1px solid #dedede"}
      fontSize="20px"
      textAlign={"center"}
    >
      <Link to={""}>
        <Box _hover={{ letterSpacing: "3px" }} transition="all 0.3s" w="100px">
          User Form
        </Box>
      </Link>
      <Link to={"postform"}>
        <Box _hover={{ letterSpacing: "3px" }} transition="all 0.3s" w="100px">
          Post Form
        </Box>
      </Link>
      <Link to={"userlist"}>
        <Box _hover={{ letterSpacing: "3px" }} transition="all 0.3s" w="100px">
          User List
        </Box>
      </Link>
      <Link to={"postlist"}>
        <Box _hover={{ letterSpacing: "3px" }} transition="all 0.3s" w="100px">
          Post List
        </Box>
      </Link>
      <Link to={"useranalytics"}>
        <Box _hover={{ letterSpacing: "3px" }} transition="all 0.3s" w="100px">
          User Analytics
        </Box>
      </Link>
      <Link to={"postanalytics"}>
        <Box _hover={{ letterSpacing: "3px" }} transition="all 0.3s" w="100px">
          Post Analytics
        </Box>
      </Link>
      
    </Flex>
  );
};
