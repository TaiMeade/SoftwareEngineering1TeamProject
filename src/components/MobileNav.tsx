"use client";
import { useEffect, useState } from "react";

import Link from "next/link";

import { cn } from "~/utils/tw";
import { NAV_ITEMS } from "~/utils";

import { m, LazyMotion, domAnimation, AnimatePresence } from "framer-motion";

import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

const MobileNav: React.FC = () => {
  const [isOpen, setOpen] = useState(false);

  // * Close menu on first render
  useEffect(() => {
    setOpen(false);
  }, []);

  // * Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  return (
    <>
      {/* Real Content */}
      <div className="z-[999]">
        <button
          onClick={() => setOpen(!isOpen)}
          className={cn(
            "btn btn-ghost swap swap-flip",
            isOpen && "swap-active",
          )}
        >
          <IoMenu className="swap-off h-7 w-7 fill-current font-bold" />
          <IoMdClose className="swap-on h-7 w-7 fill-current font-bold" />
          <span className="sr-only">Open Menu</span>
        </button>
      </div>

      {/* Is Open Content */}
      <LazyMotion features={domAnimation}>
        <AnimatePresence>
          {isOpen && (
            <m.div
              initial={{
                opacity: 0.5,
                clipPath: "circle(0% at 0% 0%)",
              }}
              animate={{
                opacity: 1,
                clipPath: "circle(150% at 0% 0%)",
              }}
              transition={{
                ease: "easeInOut",
                duration: 0.4,
              }}
              className={cn(
                "fixed left-0 top-0 z-[99] hidden h-full w-full bg-white px-4 py-2 shadow-lg",
                isOpen && "block",
              )}
            >
              <ul className="flex h-full w-full flex-col items-center justify-center gap-10">
                {[{ label: "Home", href: "/" }, ...NAV_ITEMS].map(
                  (item, idx) => (
                    <m.li
                      key={"mobile-" + item.label}
                      initial={{
                        opacity: 0,
                        x: "-20%",
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        ease: "easeInOut",
                        duration: 0.4,
                        delay: idx * 0.1 + 0.3,
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="link-hover link text-3xl"
                      >
                        {item.label}
                      </Link>
                    </m.li>
                  ),
                )}
              </ul>
            </m.div>
          )}
        </AnimatePresence>
      </LazyMotion>
    </>
  );
};

export default MobileNav;
