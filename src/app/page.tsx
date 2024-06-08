"use client";
import { use, useEffect, useState } from "react";
import Image from "next/image";
import Input from "./components/input";
import Button from "./components/button";
import fetchTrackingInfo from "./utils/getPackage";
import parseXml from "./utils/parseData";

export default function Home() {
  let [dni, setDni] = useState("");
  let [cuil, setCuil] = useState("");
  let [tracking, setTracking] = useState("");
  let [trackingInfo, setTrackingInfo] = useState<any>(null);
  let [trackingArray, setTrackingArray] = useState<any[]>([]);
  let track = [];
  const onChangeCuil = (value: string) => {
    setCuil(value);
  };
  const onChangeDni = (value: string) => {
    setDni(value);
  };
  const onChangeTracking = (value: string) => {
    setTracking(value);
  };

  const onHandleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("a");
  };

  const fetchData = async () => {
    try {
      const data = await fetchTrackingInfo({
        NroDocumentoCliente: dni,
        CUIT: cuil,
        Pieza: tracking,
      });
      setTrackingInfo(data);
    } catch (err) {
      console.error("Failed to fetch tracking info", err);
    }
  };

  useEffect(() => {}, [trackingArray]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Add any additional form submission logic

    console.log("Form submitted with:", { cuil, dni, tracking });
    fetchData();
    let track = parseXml(trackingInfo);
    setTrackingArray(track);
    console.log(trackingArray);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-purple-950">
      <div className="z-10 w-full flex-col items-center justify-between text-sm lg:flex">
        <h1 className="text-purple-200 text-xl font-medium mb-8">
          Obtené un seguimiento detallado de tu envio de OCA
        </h1>
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <Input
            label="Ingrese su cuil"
            type="dni"
            validate={(value: string) =>
              value.length > 1 ? "" : "Debe ingresar su cuil"
            }
            onValueChange={onChangeCuil}
            classname="mt-4"
          />
          <Input
            label="Ingrese su dni"
            type="dni"
            validate={(value: string) =>
              value.length > 1 ? "" : "Debe ingresar su DNI"
            }
            onValueChange={onChangeDni}
            classname="mt-4"
          />
          <Input
            label="Ingrese su numero de seguimiento"
            type="dni"
            validate={(value: string) =>
              value.length > 1 ? "" : "Debe ingresar su numero de seguimiento"
            }
            onValueChange={onChangeTracking}
            classname="mt-4"
          />
          <Button
            text="Enviar"
            type="submit"
            onClick={onHandleClick}
            classname="mt-8"
          />
        </form>
        {trackingArray.length !== 0 && (
          <div className="overflow-x-auto mt-12">
            <table className="w-full table-auto border-collapse border border-white">
              <thead>
                <tr className="bg-purple-800 text-white">
                  <th className="px-4 py-2">Id</th>
                  <th className="px-4 py-2">NumeroEnvio</th>
                  <th className="px-4 py-2">Descripcion Motivo</th>
                  <th className="px-4 py-2">Descripcion Estado</th>
                  <th className="px-4 py-2">SUC</th>
                  <th className="px-4 py-2">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {trackingArray.map((item: any, index: number) => (
                  <tr key={index} className="bg-purple-900 text-white">
                    <td className="border border-white px-4 py-2">{item.Id}</td>
                    <td className="border border-white px-4 py-2">
                      {item.NumeroEnvio}
                    </td>
                    <td className="border border-white px-4 py-2">
                      {item.Descripcion_Motivo}
                    </td>
                    <td className="border border-white px-4 py-2">
                      {item.Desdcripcion_Estado}
                    </td>
                    <td className="border border-white px-4 py-2">
                      {item.SUC}
                    </td>
                    <td className="border border-white px-4 py-2">
                      {item.fecha}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
