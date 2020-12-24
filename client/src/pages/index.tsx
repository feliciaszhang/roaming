import { Box, Flex, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import router, { useRouter, withRouter } from "next/router";
import * as React from "react";
import { InputField } from "../components/InputField";

const Index = () => {

  return (
    <Box mx="auto">
      <Formik
        initialValues={{ room: "" }}
        onSubmit={(values) => {
          router.push({
            pathname: "/room",
            query: { room: values.room },
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

export default withRouter(Index);
