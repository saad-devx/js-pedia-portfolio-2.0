"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useBlurClick } from "@/hooks/use-blur-click";

export function ExpandableCardSection() {
    const [active, setActive] = useState(null);
    const id = useId();
    const ref = useRef(null);

    useEffect(() => {
        function onKeyDown(event) {
            if (event.key === "Escape") setActive(false);
        }

        if (active && typeof active === "object") {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [active]);

    useBlurClick(ref, () => setActive(null));

    return (<section className="py-12">
        <h1 className="mb-2 md:mb-4 text-slate-800 font-bold text-3xl lg:text-4xl text-center">JS Pedia Platforms</h1>
        <AnimatePresence>
            {active && typeof active === "object" && (
                <motion.div
                    initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                    animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
                    exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                    className="fixed inset-0 bg-black/20 h-full w-full z-10" />
            )}
        </AnimatePresence>
        <AnimatePresence>
            {active && typeof active === "object" ? (
                <div className="fixed inset-0  grid place-items-center z-[100]">
                    <motion.button
                        key={`button-${active.title}-${id}`}
                        layout
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        exit={{
                            opacity: 0,
                            transition: {
                                duration: 0.05,
                            },
                        }}
                        className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
                        onClick={() => setActive(null)}>
                        <CloseIcon />
                    </motion.button>
                    <motion.div
                        layoutId={`card-${active.title}-${id}`}
                        ref={ref}
                        className="w-[90%] lg:w-3/4 h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white sm:rounded-3xl overflow-hidden">
                        <motion.div layoutId={`image-${active.title}-${id}`}>
                            <Image
                                priority
                                width={1600}
                                height={900}
                                src={active.src}
                                alt={active.title}
                                className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top" />
                        </motion.div>

                        <div>
                            <div className="flex justify-between items-start p-4">
                                <div className="">
                                    <motion.h3
                                        layoutId={`title-${active.title}-${id}`}
                                        className="font-medium text-neutral-700 text-base">
                                        {active.title}
                                    </motion.h3>
                                    <motion.p
                                        layoutId={`description-${active.description}-${id}`}
                                        className="text-neutral-600 text-base">
                                        {active.description}
                                    </motion.p>
                                </div>

                                <motion.a
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    href={active.ctaLink}
                                    target="_blank"
                                    className="px-6 py-3 text-sm rounded-full font-bold bg-gradient-to-r from-violet-500 to-pink-500 text-white">
                                    {active.ctaText}
                                </motion.a>
                            </div>
                            <div className="pt-4 relative px-4">
                                <motion.div
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]">
                                    {typeof active.content === "function"
                                        ? active.content()
                                        : active.content}
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            ) : null}
        </AnimatePresence>
        <ul
            className="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-start gap-4 md:gap-6 lg:gap-10">
            {cards.map((card, index) => (
                <motion.div
                    layoutId={`card-${card.title}-${id}`}
                    key={index}
                    onClick={() => setActive(card)}
                    className="p-4 flex flex-col bg-slate-800/20 hover:bg-neutral-50 rounded-xl cursor-pointer transition-[background] duration-300">
                    <div className="flex gap-4 flex-col  w-full">
                        <motion.div layoutId={`image-${card.title}-${id}`}>
                            <Image
                                width={1000}
                                height={800}
                                src={card.src}
                                alt={card.title}
                                className="h-60 w-full  rounded-lg object-cover object-top" />
                        </motion.div>
                        <div className="flex justify-center items-center flex-col">
                            <motion.h3
                                layoutId={`title-${card.title}-${id}`}
                                className="font-medium text-neutral-800 text-center md:text-left text-base">
                                {card.title}
                            </motion.h3>
                            <motion.p
                                layoutId={`description-${card.description}-${id}`}
                                className="text-neutral-600text-center md:text-left text-base">
                                {card.description}
                            </motion.p>
                        </div>
                    </div>
                </motion.div>
            ))}
        </ul>
    </section>);
}

export const CloseIcon = () => {
    return (
        (<motion.svg
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            exit={{
                opacity: 0,
                transition: {
                    duration: 0.05,
                },
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-black">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
        </motion.svg>)
    );
};

const cards = [
    {
        title: "JS Pedia Market",
        description: "A marketplace for JavaScript developers and Clients",
        src: "/jsp-market-img.webp",
        ctaText: "Visit",
        ctaLink: "#",
        content: () => <p>
            JS Pedia Market is a cutting-edge digital marketplace that seamlessly connects skilled JavaScript developers with innovative clients. Built to foster creativity and collaboration, the platform offers a curated space where project opportunities meet expert coding solutions. Professionals can present detailed portfolios and receive client feedback, ensuring every match is a perfect fit. Emphasizing quality and transparency, JS Pedia Market empowers both freelancers and businesses to thrive in a competitive tech landscape.
            <br />
            With robust support tools and streamlined project management features, its innovative approach and intuitive interface guarantee efficient, secure, and mutually beneficial engagements for all parties.
        </p>
    },
    {
        title: "JS Pedia Community",
        description: "A community & forums platform for JavaScript enthusiasts",
        src: "/jsp-community-img.webp",
        ctaText: "Visit",
        ctaLink: "#",
        content: () => <p>
            JS Pedia Community is a vibrant forum dedicated exclusively to JavaScript enthusiasts, where knowledge is shared and challenges are overcome together. This dynamic space brings together both novices and experts, creating an environment where interactive discussions, live coding sessions, and Q&A workshops spark continuous learning.
            <br />
            Members exchange best practices and collaborate on innovative projects, forging strong networks along the way. With a rich library of resources and community-driven support, the platform nurtures creativity and professional growth. It’s the ideal destination for anyone eager to deepen their JavaScript expertise and contribute to a forward-thinking tech culture.
        </p>
    },

    {
        title: "Hobbyland",
        description: "A place where to be a teacher and a student, earn knowledge and money",
        src: "/hobbyland-img.webp",
        ctaText: "Visit",
        ctaLink: "#",
        content: () => <p>
            Hobbyland is an innovative educational ecosystem that uniquely blends the roles of teacher and student, allowing you to both share your expertise and acquire new skills. Designed to reward curiosity and proficiency, the platform offers interactive courses, live workshops, and real-time mentorship sessions that transform traditional learning into a dynamic, engaging experience.
            <br />
            Members can earn while they learn, unlocking opportunities to monetize their knowledge and passion. With personalized learning paths and collaborative projects, Hobbyland redefines education into a mutually beneficial journey of growth and discovery for every participant.
        </p>
    },
    {
        title: "Coding Ground",
        description: "An online colaborative coding workspace to build, showcase and save projects.",
        src: "/jsp-coding-ground-img.webp",
        ctaText: "Visit",
        ctaLink: "#",
        content: () => <p>
            Coding Ground is an interactive, collaborative workspace where developers can build, showcase, and safeguard their projects in real time. This innovative environment encourages experimentation, teamwork, and creative problem-solving by providing integrated development tools and seamless code-sharing capabilities.
            <br />
            Users can collaborate on prototypes, receive instant feedback, and maintain a secure history of their code evolution. By blending creative exploration with technical excellence, Coding Ground streamlines the development process while building a robust portfolio that highlights your skills. It’s the perfect stage to turn innovative ideas into functional, impressive applications.
        </p>
    },
];
