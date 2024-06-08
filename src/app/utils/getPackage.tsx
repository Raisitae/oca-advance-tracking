import axios from "axios";

interface GetPackageParams {
  NroDocumentoCliente: string;
  CUIT: string;
  Pieza: string;
}

export default async function fetchTrackingInfo({
  NroDocumentoCliente,
  CUIT,
  Pieza,
}: GetPackageParams): Promise<any> {
  try {
    const url = `/api/tracking/trackPackage/?NroDocumentoCliente=${NroDocumentoCliente}&CUIT=${CUIT}&Pieza=${Pieza}`;

    const response = await axios.get(url, {});
    return response.data.result;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Network response was not ok");
  }
}
