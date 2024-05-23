"use client";

import { useRouter } from "next/navigation";
import { DialogFooter } from "../molecules/DialogFooter";
import { DialogHeader } from "../molecules/DialogHeader";

export const Dialog = ({
  title,
  confirm,
  cancel,
  children,
  padding,
  dialogForm,
}: any) => {
  const router = useRouter();
  const goBack = () => router.back();

  return (
    <div
      id="default-modal"
      tabIndex={-1}
      aria-hidden="true"
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75"
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow">
          <DialogHeader title={title} onClose={goBack} />
          <div className={padding ? "p-4 " : ""}>{children}</div>
          {!dialogForm && (
            <DialogFooter confirm={confirm} cancel={cancel} onClose={goBack} />
          )}
        </div>
      </div>
    </div>
  );
};
