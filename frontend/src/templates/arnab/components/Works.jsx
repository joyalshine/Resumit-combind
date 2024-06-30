import { motion } from "framer-motion";
import { Tilt } from "react-tilt";
import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const ProjectCard = ({
  index,
  title,
  desc,
  techStack,
  github : githublink
}) => {
  console.log(title)
  const colors = ["blue-text-gradient","green-text-gradient"]
  return (
    <motion.div >
      <Tilt
        options={{
          max: 45,
          scale: 1,
          spedd: 450,
        }}
        className="bg-tertiary p-5 rounded-2xl  sm:w-[360px] w-full">

        <div className="relative w-full h-[230px]">
          <img
            src="/src/templates/arnab/assets/jobit.png"
            alt={title}
            className="w-full h-full object-cover rounded-2xl "
          />

          <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
            <div
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-github"
              onClick={() => window.open(githublink, "blank")}>
              <img
                src={github}
                alt="github"
                className="w-1/2 h-1/2 object-contain cursor-github"
              />
            </div>
          </div>
        </div>

        <div className="mt-5 ">
          <h3 className="text-white font-bold text-[24px]">{title}</h3>
          <p className="mt-2 text-secondary text-[14px]">{desc}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {techStack.map((tag,index) => (
            <p key={tag} className={`text-[14p] ${colors[index % 2]}`}>
              #{tag}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = ({ data }) => {
  return (
    <>
      <motion.div >
        <p className={`${styles.sectionSubText}`}>My Work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]">
          In the realm of software development, projects implemented in
          React.js, Flutter, and MERN stack (MongoDB, Express.js, React,
          Node.js) represent versatile and powerful solutions. React.js, a
          JavaScript library, is frequently used for building interactive and
          user-friendly web interfaces. Flutter, on the other hand, stands out
          for its cross-platform mobile application development capabilities,
          enabling the creation of apps with a single codebase for multiple
          platforms. Meanwhile, the MERN stack serves as a robust foundation for
          web applications, encompassing a NoSQL database, backend and frontend
          JavaScript frameworks, and a runtime environment. These technologies
          empower developers to deliver responsive and feature-rich applications
          for both web and mobile platforms, making them indispensable choices
          in the modern software development landscape.
        </motion.p>
      </div>

      <div className="mt-20 flex flex-wrap gap-7">
        {data.map((project, index) => {
          return (
            <ProjectCard key={`project=${index}`} index={index} {...project} />
          )
        })}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "");
