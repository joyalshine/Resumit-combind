import { AnimatePresence, motion } from "framer-motion";
import { Tilt } from "react-tilt";

import { styles } from "../styles";
import { services } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import { web,backend,mobile } from "../assets";

const ServiceCard = ({ index, title, icon }) => {
  return (
    <Tilt className="xs:w-[250px] w-full ">
      <motion.div
        variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
        className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card">
        <div className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[250px] flex justify-evenly items-center flex-col">
          <img src={icon} alt={title} className="w-16 h-16 object-contain" />
          <h3 className="text-white text-[20px] font-bold text-center">
            {title}
          </h3>
        </div>
      </motion.div>
    </Tilt>
  );
};

const About = ({data}) => {
  const icons = [
    web,
    backend,
    mobile
  ]
  return (
    <AnimatePresence>
      <>
        <motion.div variants={textVariant()}>
          <p className={`${styles.sectionSubText}`}>Introduction</p>
          <h2 className={`${styles.sectionHeadText}`}>Overview</h2>
        </motion.div>

        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px] ">
          {data.about}
        </motion.p>

        <div className="mt-20 flex flex-wrap gap-10">
          {data.roles.map((service, index) => (
            <ServiceCard key={index} title={service} index={index} icon={icons[index%3]} />
          ))}
        </div>
      </>
    </AnimatePresence>
  );
};

export default SectionWrapper(About, "about");
