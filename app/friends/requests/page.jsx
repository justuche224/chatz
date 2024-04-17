import { getPendingRequests } from "@/actions/getRequests";
import { currentUser } from "@/lib/auth";
import Requests from "./_components/Requests";

const page = async () => {
  const user = await currentUser();
  const requests = await getPendingRequests(user.id);

  return <Requests requests={requests} />;
};

export default page;
