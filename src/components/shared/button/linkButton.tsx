import Link from "next/link";
import React from "react";

interface Props {
  title: string;
  link: string;
}
const LinkButton = (props: Props) => {
  return (
    <Link
      className="bg-blue-700 transition-all duration-150 block flex-shrink-0 rounded-full px-3 py-2.5 text-white hover:bg-primary-800"
      href={props.link ?? "/-"}
    >
      {props.title ?? "Tambah"}
    </Link>
  );
};

export default LinkButton;
