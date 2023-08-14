import { Box, Heading, Text } from "@chakra-ui/react";

function Comment({ user, message }) {
  return (
    <Box>
      <Heading size="xs" color={"green.400"}>
        {user.username}
      </Heading>
      <Text pt="2" fontSize="sm" color={"whiteAlpha.900"}>
        {message}
      </Text>
    </Box>
  );
}

export default Comment;
