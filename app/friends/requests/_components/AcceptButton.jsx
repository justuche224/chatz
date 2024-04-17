import { acceptRequest } from "@/actions/friendRequests";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AcceptButton = ({ id, testing, setTesting }) => {
  return (
    <Button
      size="sm"
      disabled={testing.includes(id)}
      onClick={async () => {
        const result = await acceptRequest(id);
        if (result.error) {
          toast(result.error);
        }
        setTesting((prevState) => [...prevState, id]);
        toast(result.success);
      }}
    >
      <span className="mr-2">
        {testing.includes(id) ? "Accepted" : "Accept"}
      </span>
    </Button>
  );
};

export default AcceptButton;
