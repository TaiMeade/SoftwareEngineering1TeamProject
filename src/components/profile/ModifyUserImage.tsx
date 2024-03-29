"use client";
import Image from "next/image";

import { UploadDropzone } from "~/utils/ut";

import { AiOutlineUser } from "react-icons/ai";

interface ModifyUserImageProps {
  userImage: string | null | undefined;
}

const ModifyUserImage: React.FC<ModifyUserImageProps> = ({ userImage }) => {
  /**
   * @see https://docs.uploadthing.com/api-reference/react#useuploadthing
   */

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center justify-center gap-4">
        <div className="h-44 w-44">
          {userImage ? (
            <Image
              src={userImage}
              alt="User Image"
              width={176}
              height={176}
              className="h-44 w-44 object-cover"
            />
          ) : (
            <AiOutlineUser className="h-44 w-44 animate-pulse duration-1000" />
          )}
        </div>

        <UploadDropzone
          /**
           * @see https://docs.uploadthing.com/api-reference/react#uploaddropzone
           */
          endpoint="userUpdateImg"
          onClientUploadComplete={(res) => {
            console.log(res?.map((r) => r.url));
            alert("Upload Completed");
          }}
          onUploadBegin={() => {
            console.log("upload begin");
          }}
          config={{ mode: "manual" }}
        />
      </div>

      {/* <button
        onClick={() => {
          // startUpload().catch(() => void 0);
        }}
        disabled={isUploading}
        className="rounded-md bg-blue-500 px-4 py-2 text-white transition-all duration-100 ease-in-out disabled:opacity-50 hover:bg-blue-600"
      >
        Upload
      </button> */}
    </div>
  );
};

export default ModifyUserImage;
