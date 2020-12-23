import React, { InputHTMLAttributes } from "react";
import { InputField } from "../components/InputField";
import { Box, Button, Flex, Grid } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Formik, Form } from "formik";

const Join: React.FC<{}> = ({}) => {
  return (
    <Box mx="auto">
      <Formik
        initialValues={{ room: "" }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
              <Flex align="center" direction="column">
            <InputField name="room" placeholder="room" label="Room" />
            <Button
              ml={2}
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
