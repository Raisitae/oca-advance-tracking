// components/XmlParser.tsx
import React from "react";

interface TableData {
  Id: number;
  NumeroEnvio: string;
  Descripcion_Motivo: string;
  Desdcripcion_Estado: string;
  SUC: string;
  fecha: string;
}

interface Props {
  xmlString: string;
}

export default function parseXml(xmlString: string) {
  // Load XML string
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, "text/xml");

  // Get all tables inside NewDataSet
  const tables = xmlDoc.querySelectorAll("NewDataSet > Table");

  // Define an array to store the objects
  const result: TableData[] = [];

  // Loop through each table
  tables.forEach((table, index) => {
    // Extract data from the table
    const NumeroEnvio = table.querySelector("NumeroEnvio")?.textContent || "";
    const Descripcion_Motivo =
      table.querySelector("Descripcion_Motivo")?.textContent || "";
    const Desdcripcion_Estado =
      table.querySelector("Desdcripcion_Estado")?.textContent || "";
    const SUC = table.querySelector("SUC")?.textContent || "";
    const fecha = table.querySelector("fecha")?.textContent || "";

    // Create an object with the extracted data
    const obj: TableData = {
      Id: index + 1, // You can change this if you have a specific id for each table
      NumeroEnvio,
      Descripcion_Motivo,
      Desdcripcion_Estado,
      SUC,
      fecha,
    };

    // Push the object to the result array
    result.push(obj);
  });
  return result;
}
