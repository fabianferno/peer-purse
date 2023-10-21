import {
  SismoConnect,
  SismoConnectConfig,
  SismoConnectVerifiedResult,
  AuthType,
  SismoConnectResponse,
} from "@sismo-core/sismo-connect-server";
import { NextApiRequest, NextApiResponse } from "next";

const config: SismoConnectConfig = {
  // you will need to register an appId in the Factory
  appId: "0x440e420e700a9ea11ec789cc06ad9aaf",
  vault: {
    impersonate: ["github:leosayous21"],
  },
};

// create a new Sismo Connect instance with the server configuration
const sismoConnect = SismoConnect({ config });

async function verifyResponse(
  groupId: string,
  sismoConnectResponse: SismoConnectResponse
) {
  const result: SismoConnectVerifiedResult = await sismoConnect.verify(
    sismoConnectResponse,
    {
      auths: [{ authType: AuthType.VAULT }],
      claims: [{ groupId }],
    }
  );
  console.log(result);
  return result;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { groupId, response } = req.body;
    try {
      const result = await verifyResponse(groupId, response);
      res.status(200).json({ result });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error", message: error });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
};
