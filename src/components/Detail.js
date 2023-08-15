import {
  Center,
  Grid,
  GridItem,
  HStack,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  Box,
  useDisclosure,
} from "@chakra-ui/react";

import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

import Product from "./Product";
import Video from "./Video";
import Comment from "./Comment";
import AddComment from "./AddComment";
import useFetchArray from "../hooks/useFetchArray";

function Detail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    data: videoData,
    loading: videoLoading,
    error: videoError,
  } = useFetch(
    `https://tokoijo-play-production.up.railway.app/api/videos/${id}`,
    {
      method: "GET",
    }
  );
  const {
    data: productsData,
    loading: productsLoading,
    error: productsError,
  } = useFetch(
    `https://tokoijo-play-production.up.railway.app/api/videos/${id}/products`,
    {
      method: "GET",
    }
  );
  const {
    data: commentsData,
    loading: commentsLoading,
    error: commentsError,
    update: commentsUpdate,
  } = useFetchArray(
    `https://tokoijo-play-production.up.railway.app/api/videos/${id}/comments`,
    {
      method: "GET",
    }
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleInputComment = (body, videoId) => {
    fetch(
      `https://tokoijo-play-production.up.railway.app/api/videos/${videoId}/comments`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP Status: ${res.status}`);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        if (data) {
          onClose();
          commentsUpdate();
        }
      });
  };

  return (
    <Grid
      templateAreas={`"main comment"
                  "product comment"
                  "product button"`}
      gridTemplateRows={"6fr 2fr 1fr"}
      gridTemplateColumns={"3fr 2fr"}
      h="120vh"
      gap="1"
      color="blackAlpha.700"
      fontWeight="bold"
      bg="blackAlpha.800"
    >
      <GridItem pl="2" area={"main"}>
        <Button
          bg={"blackAlpha.300"}
          color={"green.500"}
          size="lg"
          onClick={() => navigate(-1)}
          my={1}
        >
          Back
        </Button>
        {!videoLoading && <Video url={!videoError ? videoData.url : ""} />}
      </GridItem>

      <GridItem pl="2" area={"product"} style={{ overflow: "auto" }}>
        <HStack spacing="18px" px={1}>
          {!productsLoading &&
            productsData.map((data) => (
              <Box key={data._id}>
                <Product
                  title={data.title}
                  price={data.price}
                  url={data.url}
                  image={data.thumbnail}
                />
              </Box>
            ))}
        </HStack>
      </GridItem>

      <GridItem px={10} area={"comment"} style={{ overflow: "auto" }}>
        <Card minH="100%" bg={"blackAlpha.400"}>
          <CardHeader>
            <Heading size="md" color={"green.500"}>
              Comments
            </Heading>
          </CardHeader>
          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              {!commentsLoading &&
                commentsData.map((data) => (
                  <Comment
                    key={data._id}
                    user={data.user_id}
                    message={data.message}
                  />
                ))}
            </Stack>
          </CardBody>
        </Card>
      </GridItem>

      <GridItem pt={4} area={"button"}>
        <Center>
          <Button
            size="lg"
            onClick={onOpen}
            bg={"green.500"}
            color={"whiteAlpha.900"}
          >
            Add Comment
          </Button>
        </Center>
        <AddComment
          videoId={id}
          handleInput={handleInputComment}
          isOpen={isOpen}
          onClose={onClose}
        />
      </GridItem>
    </Grid>
  );
}

export default Detail;
