import {
  Card,
  CardBody,
  CardFooter,
  Link,
  Button,
  Stack,
  Image,
  Text,
  Heading,
  Center,
} from "@chakra-ui/react";

import BoxPng from "./box.png";

function Product({ title, price, url, image = BoxPng }) {
  return (
    <Card direction={{ base: "column", sm: "row" }} bg={"blackAlpha.400"}>
      <Center size="100px">
        <Image src={image} mx={"auto"} maxW={{ base: "80%", sm: "100px" }} />
      </Center>
      <Stack>
        <CardBody>
          <Heading size="sm" color={"whiteAlpha.900"}>
            {title}
          </Heading>
          <Text color={"green.500"} fontSize="xs">
            Rp.{price}
          </Text>
        </CardBody>
        <CardFooter>
          <Link href={url} target="blank">
            <Button
              size="xs"
              variant="solid"
              bg={"green.500"}
              color={"whiteAlpha.900"}
            >
              Buy now
            </Button>
          </Link>
        </CardFooter>
      </Stack>
    </Card>
  );
}

export default Product;
