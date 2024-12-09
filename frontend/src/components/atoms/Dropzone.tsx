"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export const Dropzone = ({ ...props }: any) => {
  const [file, setFile] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      const [file] = acceptedFiles;

      setFile(file.name);

      const reader = new FileReader();

      reader.readAsArrayBuffer(file);

      reader.onabort = () => console.log("File reading was aborted");
      reader.onerror = () => console.log("File reading failed");
      reader.onload = async () => {
        try {
          const buffer = reader.result as ArrayBuffer;

          const blob = new Blob([buffer], {
            type: "application/octet-stream",
          });

          // TODO: comeback endpoint in backend
          const formData = new FormData();
          formData.append("file", blob, file.name);

          const response = { ok: false };

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
        } catch (error) {
          console.error("Erro na solicitação:", error);
          return error;
        }
      };
    },
    [setFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "text/csv": [".csv"] },
    maxFiles: 1,
  });

  // TODO: resolve responsiveness
  return (
    <form
      {...getRootProps()}
      className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
        isDragActive
          ? "border-blue-500 bg-blue-100"
          : "border-gray-300 bg-white"
      }`}
    >
      <input {...getInputProps()} className="sr-only" />
      <div className="flex flex-col items-center m-2 p-4 border border-gray-200 rounded shadow-md h-64 w-64">
        {file ? (
          <div className="flex flex-col items-center">
            <p className="text-lg font-medium text-gray-600 mb-2">
              Arquivo selecionado:
            </p>
            <div className="w-full overflow-hidden">
              <p
                className="text-center text-sm font-medium text-gray-700 truncate"
                style={{ lineBreak: "anywhere" }}
                aria-label={file}
              >
                {file}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-lg font-medium text-gray-600 text-center">
            Drop the CSV file here!
          </p>
        )}
      </div>

      <button
        type="button"
        className="mt-4 px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Select File
      </button>
    </form>
  );
};
