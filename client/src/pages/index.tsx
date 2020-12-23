import { useRouter, withRouter } from "next/router";
import * as React from "react";
import Room from "../components/Room";
import { RoomType } from "../types";

const Index = () => {
  const { query } = useRouter();
  const roomType = query as RoomType;

  return (
    <>
      <Room room={roomType.room} />
    </>
  );
};

export default withRouter(Index);
