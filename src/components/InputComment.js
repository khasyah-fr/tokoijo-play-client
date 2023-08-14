import { useRef, useState } from "react";
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

function InputComment({ videoId, isOpen, onClose, handleInput }) {
  const btnRef = useRef();

  const [form, setForm] = useState({
    user_id: "",
    message: "",
  });

  const handleText = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent bg={"blackAlpha.900"}>
          <DrawerCloseButton />
          <DrawerHeader color={"green.500"}>Input your Comment</DrawerHeader>

          <DrawerBody>
            <FormControl isRequired={true}>
              <FormLabel color={"green.500"}>user_id</FormLabel>
              <Input
                name="user_id"
                value={form.user_id}
                onChange={handleText}
                placeholder="use whats on the comments like 6385da... "
                color={"whiteAlpha.900"}
              />
            </FormControl>
            <FormControl isRequired={true}>
              <FormLabel color={"green.500"}>message</FormLabel>
              <Input
                name="message"
                value={form.message}
                onChange={handleText}
                placeholder="Type here..."
                color={"whiteAlpha.900"}
              />
            </FormControl>
          </DrawerBody>

          <DrawerFooter>
            <Button
              variant="outline"
              mr={3}
              onClick={onClose}
              color={"whiteAlpha.900"}
            >
              Cancel
            </Button>
            <Button
              bg={"green.500"}
              color={"whiteAlpha.900"}
              onClick={() =>
                handleInput(
                  { user_id: form.user_id, message: form.message },
                  videoId
                )
              }
            >
              Input
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default InputComment;
