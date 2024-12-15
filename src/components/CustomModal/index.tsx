import React from "react";

interface CustomModalProps {
  showModal: boolean;
  body?: any;
  handleCloseModal: () => void;
  handleDialogAction?: () => void;
  actionBtnText: string;
  title: string;
}

export const CustomModal: React.FC<CustomModalProps> = ({
  showModal,
  body,
  actionBtnText,
  title,
  handleCloseModal,
  handleDialogAction,
}) => {
  return (
    <>
      {showModal ? (
        <>
          <div className="modal">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="modal-content">
                {/*header*/}
                <div className="modal-header">
                  <h3 className="text-3xl font-semibold">{title}</h3>
                </div>
                {/*body*/}
                {!!body && <div className="relative p-6 flex-auto">{body}</div>}
                {/*footer*/}
                <div className="modal-footer">
                  <button
                    className="btn-secondary mr-2"
                    type="button"
                    onClick={handleCloseModal}
                  >
                    Close
                  </button>
                  <button
                    className="btn-primary"
                    type="button"
                    onClick={handleDialogAction}
                  >
                    {actionBtnText}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};
