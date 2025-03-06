"use client";

import { usePathname } from "next/navigation";
import React from "react";

const DynamicMeta = () => {
  const pathName = usePathname();

  React.useEffect(() => {
    if (pathName.includes("/expiry-alert")) {
      document.title = "Health quality | Expiry";
    } else {
      document.title = "Health quality | Food";
    }
  }, [pathName]);

  return null;
};

export default DynamicMeta;
