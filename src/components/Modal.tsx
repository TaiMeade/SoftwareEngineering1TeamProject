"use client";
import { useRef } from "react";

import { cn } from "~/utils/tw";

import { GrClose } from "react-icons/gr";

interface ModalProps {
  children?: React.ReactNode;
  button?: React.ReactNode;
  btnClass?: React.HTMLAttributes<HTMLButtonElement>["className"];
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  title?: string;
}

const Modal: React.FC<ModalProps> = ({
  children,
  button,
  className,
  btnClass,
  title,
}) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const toggleModal = () => {
    modalRef.current?.showModal();
  };

  return (
    <>
      <button onClick={toggleModal} className={cn("btn", btnClass)}>
        {button ?? "Open Modal"}
      </button>

      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="flex w-full flex-row items-center justify-between ">
            {/* Modal Title */}
            <h1 className="flex-1 text-xl">{title}</h1>

            <form method="dialog">
              <button
                onClick={toggleModal}
                className="btn btn-circle btn-ghost absolute right-3 top-3"
              >
                <GrClose className="text-lg" />
              </button>
            </form>
          </div>

          {/* Modal Content */}
          <div className={cn(className)}>{children}</div>
        </div>

        {/* Close When Clicked Outside */}
        <form method="dialog" className="modal-backdrop">
          <button>Close</button>
        </form>
      </dialog>
    </>
  );
};

export default Modal;
