import { AspectRatio, Box } from "@chakra-ui/react";

function Video({ url = "https://www.youtube.com/embed/QhBnZ6NPOY0" }) {
  return (
    <Box py={4} px={16} color="white">
      <AspectRatio maxH="480px" maxW="720px" ratio={1}>
        <iframe title="video" src={url} allowFullScreen />
      </AspectRatio>
    </Box>
  );
}

export default Video;
