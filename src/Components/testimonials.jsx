import { FaDatabase } from "react-icons/fa6";

const SubjectItem = ({ subject }) => (
  <div
    className="flex flex-col h-full min-h-['400px'] min-w-64 p-6 bg-gray-800"
    data-aos="fade-up"
  >
    <div className="mb-6 lg:mb-0 text-center border-b border-gray-700">
      <h4 className="h4 text-white mb-5 text-center">{subject.title}</h4>
    </div>
    <blockquote className="text-lg text-gray-400 grow">
      {subject.content}
    </blockquote>
    <div className="text-gray-700 font-medium mt-6 pt-5 border-t border-gray-700">
      <ul className="flex justify-between">
        <li>
          <cite className="text-gray-200 not-italic">Problem Counts</cite> -
          <a
            className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out"
            href="#0"
          >
            {subject.cnt}
          </a>
        </li>
        <li>
          <a
            className="text-red-600 hover:text-gray-200 transition duration-150 ease-in-out"
            href="#0"
          >
            Delete
          </a>
        </li>
      </ul>
    </div>
  </div>
);

export default function Testimonials({ subjects }) {
  console.log(subjects);
  // subjects = [];
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-t border-gray-800">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 mb-4">All Subjects</h2>
            <p className="text-xl text-gray-400">
              Enter more topics and issues to accommodate more users. <br />
              However, you must enter the format correctly.
            </p>
          </div>

          {/* Testimonials */}
          <div className="max-w-sm mx-auto grid gap-8 lg:grid-cols-3 lg:gap-6 justify-items-center  items-center lg:max-w-none">
            {subjects &&
              subjects.map((subject, i) => (
                <SubjectItem subject={subject} key={i} />
              ))}
          </div>
          {subjects && subjects.length === 0 ? (
            <div>
              <div className="flex justify-center">
                <FaDatabase className="text-red-400 hover:text-red-200 text-9xl " />
              </div>
              <h2 className="h2 text-center text-red-400 mt-5">No Subjects</h2>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </section>
  );
}
