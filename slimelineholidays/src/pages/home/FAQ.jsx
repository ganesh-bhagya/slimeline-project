import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Accordion,
  AccordionHeader,
  AccordionBody
} from "@material-tailwind/react";

import { generalFaqItems } from "../../utils/dataArrays";

export const FAQ = ({ scrollRef }) => {
  const [open, setOpen] = useState(1);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2 });

  React.useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView]);

  return (
    <>
      <section
        ref={(node) => {
          ref(node); // Combine ref for animations
          scrollRef.current = node; // Assign scrollRef
        }}
        className="px-[5%] md:px-[10%] w-full bg-[#03FF000D] flex flex-col justify-center items-center py-[10%] md:py-[4%] font-nunito"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          transition={{ duration: 0.8 }}
          className="text-center text-[25px] md:text-[50px] font-light"
        >
          <span className="font-bold">FAQs</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-2 md:mt-0 mb-5 text-center text-black text-sm md:text-base font-normal"
        >
          Discover our simple process for planning and booking your perfect
          travel experience.
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={controls}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full flex flex-col"
        >
          {generalFaqItems.map((faq, faqIndex) => {
            let turn = faqIndex + 1;
            return (
              <FaqItem
                key={faqIndex}
                open={open}
                turn={turn}
                handleOpen={handleOpen}
                title={faq.title}
                des={faq.des}
                index={faqIndex}
              />
            );
          })}
        </motion.div>
      </section>
    </>
  );
};

const FaqItem = ({ open, turn, handleOpen, title, des }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2 });

  React.useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      transition={{ duration: 0.8 }}
      className=""
    >
      <Accordion open={open === turn} className="mb-3 font-nunito">
        <AccordionHeader
          onClick={() => handleOpen(turn)}
          className="border-none p-5 bg-[#D3FFD1]"
        >
          <div className="flex relative w-full gap-5 justify-between items-start px-3">
            <div className="w-[85%] flex items-center gap-5">
              <span className="text-theme-green-color text-[26px] font-nunito font-semibold">
                Q
              </span>
              <span className="text-black text-base font-nunito font-normal">
                {title}
              </span>
            </div>

            <span className="text-[26px] font-semibold">
              {open === turn ? "+" : "-"}
            </span>
          </div>
        </AccordionHeader>

        <AccordionBody className="p-5 bg-white mt-4">
          <div className="flex relative w-full gap-5 items-start px-3">
            <span className="text-theme-green-color font-nunito text-[26px] font-semibold">
              A
            </span>
            <span className="w-[90%] text-black font-nunito text-sm md:text-base font-normal">
              {des}
            </span>
          </div>
        </AccordionBody>
      </Accordion>
    </motion.div>
  );
};
