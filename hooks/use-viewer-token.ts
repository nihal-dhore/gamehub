import { useEffect, useState } from "react";
import { toast } from "sonner";
import { createViewerToken } from "@/actions/token";
import { JwtPayload, jwtDecode } from "jwt-decode";

export const useViewerToken = (hostIdentity: string) => {
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [viewerIdentity, setViewerIdentity] = useState("");
  //console.log(hostIdentity);


  useEffect(() => {
    //console.log("useEffect");
    const createToken = async () => {

      try {
        const viewerToken = await createViewerToken(hostIdentity);
        //console.log(`viewerToken ${viewerToken}`);

        setToken(viewerToken);
        //console.log(token);


        const decodeToken = jwtDecode(viewerToken) as JwtPayload & {
          name?: string;
        };

        const name = decodeToken.name;
        const id = decodeToken.sub;
        //console.log(decodeToken);


        if (id) {
          setViewerIdentity(id);
        }

        if (name) {
          setName(name);
        }

      } catch {
        toast.error("Internal server error");
      }
    };
    createToken();
  }, [hostIdentity]);

  //console.log({ token, name, identity });


  return { token, name, viewerIdentity };
};