"use client";
import { useEffect, useRef, useState } from "react";

import { useSession } from "next-auth/react";
import { useMediaQuery } from "~/utils/hooks/useMediaQuery";

import { ADMIN_SIDEBAR_ITEMS } from "~/utils";

import Link from "next/link";

import {
  m,
  useAnimationControls,
  type Variants,
  LazyMotion,
  domAnimation,
} from "framer-motion";

import { AiFillCaretDown } from "react-icons/ai";
import SidebarUser from "../SidebarUser";

const sidebarVariants: Variants = {
  open: { y: 0, transition: { duration: 0.2 } },
  closed: { y: "100%", transition: { duration: 0.2 } },
};

const AdminSidebar: React.FC = () => {
  const { data: session } = useSession();

  const controls = useAnimationControls();
  const [isOpen, setIsOpen] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (isMobile) {
      void controls.start("closed");
      setIsOpen(false);
    } else {
      void controls.start("open");
      setIsOpen(true);
    }
  }, [controls, isMobile]);

  useEffect(() => {
    if (!contentRef.current) return;
    setHeight(contentRef.current.clientHeight);
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial="open"
        animate={controls}
        variants={{
          ...sidebarVariants,
          closed: {
            ...sidebarVariants.closed,
            y: `calc(100% - ${height}px)`,
          },
        }}
        transition={{ duration: 0.2 }}
        className="fixed bottom-0 left-0 z-[10] flex w-full flex-col items-start justify-start bg-icook-neutral md:bottom-auto md:h-[var(--sidebar-height)] md:w-[var(--sidebar-width)]"
      >
        {/* // * Sidebar Content Below */}
        <div
          ref={contentRef}
          className="flex w-full flex-col items-center justify-start border-b border-gray-600 px-6 "
        >
          <div className="flex w-full items-center justify-between space-x-14 py-5 text-left text-white focus:text-indigo-400 focus:outline-none">
            <p className="text-sm uppercase leading-5">Admin Panel</p>

            {isMobile && (
              <button
                onClick={() => {
                  setIsOpen((prev) => !prev);
                  void controls.start(isOpen ? "closed" : "open");
                }}
                style={{
                  transform: isOpen ? "rotate(0deg)" : "rotate(180deg)",
                }}
                className="flex items-center justify-center transition-all duration-150 ease-in-out focus:outline-none md:hidden"
              >
                <AiFillCaretDown className="text-lg text-white" />
              </button>
            )}
          </div>
        </div>

        <m.div
          initial="open"
          animate={controls}
          variants={sidebarVariants}
          transition={{ duration: 0.2 }}
          className="items-sttart flex h-full w-full flex-col justify-start bg-icook-neutral"
        >
          <div className="w-full flex-1 border-b border-gray-600 pt-5">
            <SidebarUser session={session} />
          </div>

          <div className="flex w-full flex-col items-start justify-start space-y-1">
            {ADMIN_SIDEBAR_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group flex w-full items-center justify-start space-x-3 px-6 py-3 last:pb-6 "
              >
                <p className="text-sm uppercase leading-5 text-white group-hover:underline">
                  {item.label}
                </p>
              </Link>
            ))}
          </div>
        </m.div>
      </m.div>
    </LazyMotion>
  );
};

export default AdminSidebar;
