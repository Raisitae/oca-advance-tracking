"use client";
import { useEffect, useState } from "react";
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
  let [darkMode, setDarkMode] = useState(false);

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

  // Use a useEffect to wait for trackingInfo to update
  useEffect(() => {
    if (trackingInfo) {
      console.log(trackingInfo);
      let trackData = parseXml(trackingInfo);
      setTrackingArray(trackData);
      console.log("b");
    }
  }, [trackingInfo, trackingArray]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log("a");
    event.preventDefault();
    await fetchData();
    console.log(trackingInfo);
    let trackData = parseXml(trackingInfo);
    setTrackingArray(trackData);
    console.log("b");
  };

  const toggleTheme = () => {
    darkMode === true ? setDarkMode(false) : setDarkMode(true);
  };

  return (
    <main
      className={`min-h-screen bg-white dark:bg-gray-900 ${
        darkMode === true ? "dark" : "light"
      }`}>
      <div className="bg-purple-400 text-white py-4 px-6 sm:px-8 flex justify-between">
        <h1 className="text-2xl font-bold dark:text-gray-950">
          Seguimiento de encomiendas Oca
        </h1>
        <button
          className="px-4 py-2  dark:bg-gray-800 dark:text-white bg-gray-200 text-gray-800 rounded-3xl"
          onClick={() => toggleTheme()}>
          {darkMode === true ? "Light" : "Dark"}
        </button>
      </div>
      <div className="max-w-6xl mx-auto p-6 sm:p-8 min-h-full bg-white dark:bg-gray-900">
        <div className="bg-slate-200 dark:bg-gray-950 rounded-lg shadow-sm">
          <div className="px-6 py-8 sm:px-10 sm:py-12">
            <h2 className="text-2xl font-bold mb-6 dark:text-white bg-gray-950">
              Obtené un seguimiento detallado de tu envio de OCA
            </h2>
            <div className="grid gap-2">
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <Input
                  label="Cuil"
                  type="Cuil"
                  validate={(value: string) =>
                    value.length > 1 ? "" : "Debe ingresar su cuil"
                  }
                  onValueChange={onChangeCuil}
                  classname="mt-4"
                />
                <Input
                  label="Dni"
                  type="dni"
                  validate={(value: string) =>
                    value.length > 1 ? "" : "Debe ingresar su DNI"
                  }
                  onValueChange={onChangeDni}
                  classname="mt-4"
                />
                <Input
                  label="Número de seguimiento"
                  type="tracknumber"
                  validate={(value: string) =>
                    value.length > 1
                      ? ""
                      : "Debe ingresar su numero de seguimiento"
                  }
                  onValueChange={onChangeTracking}
                  classname="mt-4"
                />
                <div className="mt-4">
                  <Button
                    text="Enviar"
                    type="submit"
                    onClick={onHandleClick}
                    classname="bg-purple-400 hover:bg-purple-500 text-white dark:text-gray-950 px-8 py-3 rounded-md font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>

        {trackingArray.length !== 0 && (
          <div className="border-t dark:border-gray-800">
            <div className="px-6 py-8 sm:px-10 sm:py-12">
              <h2 className="text-2xl font-bold mb-4 text-purple-400">
                Oca Package Tracking Service
              </h2>
              <table className=" border-none md:max-w-screen block whitespace-nowrap overflow-x-auto lg:whitespace-normal">
                <thead>
                  <tr className="bg-purple-400 text-white dark:text-gray-950">
                    <th className="px-4 py-2">Id</th>
                    <th className="px-4 py-2">NumeroEnvio</th>
                    <th className="px-4 py-2">Descripcion Motivo</th>
                    <th className="px-4 py-2">Descripcion Estado</th>
                    <th className="px-4 py-2">SUC</th>
                    <th className="px-4 py-2">Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {trackingArray
                    .slice()
                    .reverse()
                    .map((item: any, index: number) => (
                      <tr
                        key={index}
                        className=" dark:text-white text-gray-950 border-none  border-y">
                        <td className="border border-purple-400 px-4 py-2  border-x-0  border-y">
                          {item.Id}
                        </td>
                        <td className="border border-purple-400 px-4 py-2  border-x-0  border-y ">
                          {item.NumeroEnvio}
                        </td>
                        <td className="border border-purple-400 px-4 py-2  border-x-0   border-y">
                          {item.Descripcion_Motivo}
                        </td>
                        <td className="border border-purple-400 px-4 py-2  border-x-0   border-y">
                          {item.Desdcripcion_Estado}
                        </td>
                        <td className="border border-purple-400 px-4 py-2  border-x-0   border-y">
                          {item.SUC}
                        </td>
                        <td className="border border-purple-400 px-4 py-2  border-x-0   border-y">
                          {item.fecha}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
