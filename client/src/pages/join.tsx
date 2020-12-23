import React, { useState } from "react";
import { InputField } from "../components/InputField";
import { Box, Button, Flex, Grid } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Formik, Form } from "formik";
import { RoomType } from "../types";

const Join: React.FC<{}> = ({}) => {
  const router = useRouter();

  return (
    <Box mx="auto">
      <Formik
        initialValues={{ room: "" }}
        onSubmit={(values) => {
          router.push({
            pathname: "/",
            query: { room: values.room } as RoomType,
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Flex align="center" direction="column">
              <InputField name="room" placeholder="room" label="Room" />
              <Button
                mt={2}
                type="submit"
                colorScheme="teal"
                variant="solid"
                isLoading={isSubmitting}
              >
                Join
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Join;
