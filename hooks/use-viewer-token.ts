import { useEffect, useState } from "react";
import { toast } from "sonner";
import { createViewerToken } from "../actions/token";
import { JwtPayload, jwtDecode } from "jwt-decode";

export const useViewerToken = (hostIdentity: string) => {
  const [token, setToken] = useState("");
  const [name, setName] = useState("");

  const [identity, setIdentity] = useState("");
  console.log(hostIdentity);


  useEffect(() => {
    const createToken = async () => {
      try {
        const viewerToken = await createViewerToken(hostIdentity);
        setToken(viewerToken);

        const decodeToken = jwtDecode(viewerToken) as JwtPayload & {
          name?: string;
        };

        const name = decodeToken.name;
        const identity = decodeToken.jti;
        console.log(identity);
        

        if (identity) {
          setIdentity(identity);
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

  return { token, name, identity };
};