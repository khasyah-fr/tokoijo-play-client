import {
  Image,
  Heading,
  Stack,
  Wrap,
  WrapItem,
  Text,
  Flex,
  Box,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

function Gallery() {
  const { data, loading, error } = useFetch(
    "https://tokoijo-play-production.up.railway.app/api/videos",
    { method: "GET" }
  );

  const navigate = useNavigate();

  const handleDetail = (id) => {
    navigate(`/videos/${id}`);
  };

  return (
    <Stack direction="column" bg={"blackAlpha.800"}>
      <Heading color={"green.500"} textAlign={"center"} mx={"auto"} py={4}>
        Tokoijo Play
      </Heading>
      <Wrap p={6} spacing={4} justify="center" direction={"row"}>
        {!loading &&
          data.map((data) => (
            <WrapItem key={data._id} width={"200px"} minHeight={"600px"}>
              <Flex direction="column" align="center">
                <Text
                  minHeight={"100px"}
                  fontSize={18}
                  color={"whiteAlpha.900"}
                  fontWeight={"semibold"}
                >
                  {data.title}
                </Text>
                <Box
                  _hover={{ opacity: 0.8, cursor: "pointer" }}
                  _active={{ transform: "scale(0.95)" }}
                >
                  <Image
                    width={"200px"}
                    height={"400px"}
                    src={data.thumbnail}
                    onClick={() => handleDetail(data._id)}
                  />
                </Box>
                <Text
                  minHeight={"400px"}
                  fontSize={14}
                  color={"whiteAlpha.900"}
                >
                  Viewed {data.views} times
                </Text>
              </Flex>
            </WrapItem>
          ))}
      </Wrap>
    </Stack>
  );
}

export default Gallery;
