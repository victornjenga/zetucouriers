import React from "react";
import { FaFileAlt } from "react-icons/fa";

const Document = ({ name, description, file }) => {
  return (
    <>
      <section class="card rounded-lg">
        <h2 class="text-2xl font-semibold py-3">{name}</h2>

        <a
          href={file}
          target="_blank"
          class="w-full p-4 flex flex-row justify-between items-center rounded-md bg-white dark:bg-black"
        >
          <div class="w-full p-4 flex flex-col items-start">
            <p>{description}</p>
            {/* <Icon v-if="fileType" class="w-14 h-14" /> */}
            <FaFileAlt />
          </div>
        </a>
      </section>
    </>
  );
};

export default Document;
