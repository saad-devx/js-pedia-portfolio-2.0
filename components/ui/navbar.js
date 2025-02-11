"use client";
import React, { useState } from "react";
import {
    motion,
    AnimatePresence,
    useScroll,
    useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
// import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";

const navItems = [
    {
        name: "Home",
        link: "/",
        // icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
        name: "About",
        link: "/about",
        // icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
        name: "Contact",
        link: "/contact",
        // icon: <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
    },
];

export const Navbar = ({ className }) => {
    const { scrollYProgress } = useScroll();

    const [visible, setVisible] = useState(false);
    const [atTop, setAtTop] = useState(true);

    useMotionValueEvent(scrollYProgress, "change", (current) => {
        if (typeof current === "number") {
            // let direction = current - scrollYProgress.getPrevious();
            if (scrollYProgress.get() > 0.05) setVisible(true);
            else setVisible(false);
        }
    });

    return (
        (<AnimatePresence mode="wait">
            <motion.div
                initial={{ opacity: 1 }}
                animate={{
                    y: visible ? -30 : 0,
                }}
                transition={{
                    duration: 0.2,
                }}
                className={cn(
                    "flex max-w-fit fixed top-10 inset-x-0 mx-auto rounded-full bg-white/50 backdrop-blur-lg shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2  items-center justify-center space-x-8",
                    className
                )}>
                {navItems.map((navItem, idx) => (
                    <Link
                        key={`link=${idx}`}
                        href={navItem.link}
                        className={cn(
                            "relative items-center flex space-x-1 text-neutral-600 hover:text-neutral-500"
                        )}>
                        {/* <span className="block sm:hidden">{navItem.icon}</span> */}
                        <span className="text-sm">{navItem.name}</span>
                    </Link>
                ))}
                <button
                    className="border text-sm font-medium relative border-white text-black px-4 py-2 rounded-full">
                    <span>Login</span>
                    <span
                        className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
                </button>
            </motion.div>
        </AnimatePresence>)
    );
};
