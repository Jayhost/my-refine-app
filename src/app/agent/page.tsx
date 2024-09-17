'use client';
import { useList } from "@refinedev/core";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


import { AgentCard, Loader } from "@components";

const Agents = () => {
  const { data, isLoading, isError } = useList({
    resource: "users",
  });

  const allAgents = data?.data ?? [];

  if (isLoading) return <Loader path="Agents" />;
  if (isError) return <Loader path="Agents" isError={true} />;
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="text.primary">
        Agents List
      </Typography>
      <Box
        mt="20px"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          backgroundColor: "background.default",
        }}
      >
        {/* {allAgents.map((agent) => (
          <AgentCard
            key={agent._id}
            id={agent._id}
            name={agent.name}
            email={agent.email}
            avatar={agent.avatar}
            //noOfProperties={agent.allProperties.length} come back to this
          />
        ))} */}
      </Box>
    </Box>
  );
};

export default Agents;
