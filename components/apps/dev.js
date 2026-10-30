import React, { Component, useState, useEffect } from 'react';

export class AboutDev extends Component {

    constructor() {
        super();
        this.screens = {};
        this.state = {
            screen: () => { },
            active_screen: "about", // by default 'about' screen is active
            navbar: false,
        }
    }

    componentDidMount() {
        this.screens = {
            "about": <About />,
            "experience": <Experience />,
            "education": <Education />,
            "skills": <Skills />,
            "projects": <Projects />,
            "publications": <Publications />,
            "resume": <Resume />,
        }

        let lastVisitedScreen = localStorage.getItem("about-section");
        if (lastVisitedScreen === null || lastVisitedScreen === undefined) {
            lastVisitedScreen = "about";
        }

        // focus last visited screen
        this.changeScreen(document.getElementById(lastVisitedScreen));
    }

    changeScreen = (e) => {
        const screen = e.id || e.target.id;

        // store this state
        localStorage.setItem("about-section", screen);

        this.setState({
            screen: this.screens[screen],
            active_screen: screen
        });
    }

    showNavBar = () => {
        this.setState({ navbar: !this.state.navbar });
    }

    renderNavLinks = () => {
        return (
            <>
                <div id="about" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "about" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="about dev" src="./themes/Yaru/status/about.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">About Me</span>
                </div>
                <div id="experience" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "experience" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="Dev's experience" src="./themes/Yaru/status/experience.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Experience</span>
                </div>
                <div id="education" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "education" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="Dev's education" src="./themes/Yaru/status/education.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Education</span>
                </div>
                <div id="skills" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "skills" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="Dev's skills" src="./themes/Yaru/status/skills.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Skills</span>
                </div>
                <div id="projects" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "projects" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="Dev's projects" src="./themes/Yaru/status/projects.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Projects</span>
                </div>
                <div id="publications" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "publications" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="Dev's publications" src="./themes/Yaru/status/contact.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Publications</span>
                </div>
                <div id="resume" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "resume" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="Dev's resume" src="./themes/Yaru/status/download.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Resume</span>
                </div>
            </>
        );
    }

    render() {
        return (
            <div className="w-full h-full flex bg-ub-cool-grey text-white select-none relative">
                <div className="md:flex hidden flex-col w-1/4 md:w-1/5 text-sm overflow-y-auto windowMainScreen border-r border-black">
                    {this.renderNavLinks()}
                </div>
                <div onClick={this.showNavBar} className="md:hidden flex flex-col items-center justify-center absolute bg-ub-cool-grey rounded w-6 h-6 top-1 left-1">
                    <div className=" w-3.5 border-t border-white"></div>
                    <div className=" w-3.5 border-t border-white" style={{ marginTop: "2pt", marginBottom: "2pt" }}></div>
                    <div className=" w-3.5 border-t border-white"></div>
                    <div className={(this.state.navbar ? " visible animateShow z-30 " : " invisible ") + " md:hidden text-xs absolute bg-ub-cool-grey py-0.5 px-1 rounded-sm top-full mt-1 left-0 shadow border-black border border-opacity-20"}>
                        {this.renderNavLinks()}
                    </div>
                </div>
                <div className="flex flex-col w-3/4 md:w-4/5 justify-start items-center flex-grow bg-ub-grey overflow-y-auto windowMainScreen">
                    {this.state.screen}
                </div>
            </div>
        );
    }
}

export default AboutDev;

export const displayAboutDev = () => {
    return <AboutDev />;
}


function About() {
    return (
        <>
            <div className="w-20 md:w-28 my-4 bg-white rounded-full">
                <img className="w-full" src="./images/logos/dev-bitmoji.png" alt="Dev Patel Logo" />
            </div>
            <div className="mt-4 md:mt-8 text-lg md:text-2xl text-center px-1">
                <div>Hi, I'm <span className="font-bold">Dev Patel</span></div>
                <div className="font-normal mt-1">
                    <span className="text-pink-600 font-bold">Software Engineer</span>
                    <span className="text-gray-400 font-light"> · </span>
                    <span className="text-ubt-gedit-orange font-semibold">ML Systems</span>
                </div>
            </div>
            <div className="mt-4 relative md:my-6 pt-px bg-white w-32 md:w-48">
                <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-0"></div>
                <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-0"></div>
            </div>
            <ul className="mt-2 leading-tight tracking-tight text-sm md:text-base w-5/6 md:w-3/4 emoji-list">
                <li className="list-pc">
                    Currently a <span className="font-medium">Research Assistant at SMILE Lab, Vanderbilt University</span>, building software & ML systems for neuroimaging research. <span className="font-medium">MS Computer Science</span> from the University of Florida <span className="text-gray-400">(GPA 3.8/4.0)</span>. Open to full-time Software Engineer roles — <a className="text-ubt-gedit-orange underline" href="mailto:devrpatel26@gmail.com">devrpatel26@gmail.com</a>
                </li>
                <li className="mt-3 list-building">
                    I build end-to-end — <span className="font-medium">FastAPI / Node.js</span> backends, <span className="font-medium">React / Next.js</span> frontends, <span className="font-medium">Redis-backed multi-GPU inference</span>, and the <span className="font-medium">Docker / K3s / ArgoCD</span> infra underneath. Lead developer of <a className="text-ubt-gedit-orange underline" href="https://crown-toolkit.vercel.app/" target="_blank" rel="noreferrer">CROWN</a>, a browser-based whole-head MRI segmentation platform.
                </li>
                <li className="mt-3 list-star">
                    Passionate about bridging <span className="font-medium text-ubt-gedit-orange">AI research and real-world products</span> — medical imaging, generative models, and LLM tooling are my playground. Also obsessed with crafting delightful UI/UX (this portfolio is exhibit A).
                </li>
                <li className="mt-3 list-time">
                    Off the keyboard: Elden Ring ⚔️, GTA V, Call of Duty, Formula 1 🏎️, and <a className="underline" href="https://www.youtube.com/@Sidemen" target="_blank" rel="noreferrer">Sidemen</a> marathons. Sometimes a book, if the game servers are down.
                </li>
            </ul>
        </>
    )
}
const experience_list = [
    {
        role: "Research Assistant · Software & ML Systems",
        org: "SMILE Lab, Vanderbilt University",
        location: "Nashville, TN",
        date: "2026 – Present",
        points: [
            "Built a FLUX.1/FLUX.2 pipeline with text/image embeddings, OpenAI APIs, and multi-agent orchestration for reproducible generation of controlled emotion-study stimuli.",
            "Standardized fMRI preprocessing comparisons across SPM, fMRIPrep, and DeepPrep with workflows for decoding, LPP, and RSA analyses aligned with EEG experiments.",
            "Designed the Center of Intelligent Imaging website and lab blogs for technical and non-technical audiences.",
        ],
        tags: ["FLUX", "OpenAI", "Multi-agent", "fMRI", "Python"]
    },
    {
        role: "Research Assistant · Backend & ML Platform Engineering",
        org: "SMILE Lab, University of Florida",
        location: "Gainesville, FL",
        date: "Dec 2024 – 2026",
        points: [
            "Built CROWN, a FastAPI/Next.js platform for 11-tissue analysis — whole-head MRI segmentation in 10–60 seconds and end-to-end TES modeling in under 35 minutes.",
            "Designed Redis-backed multi-GPU orchestration, persistent job state, SSE progress streaming, and the crown-cli package for concurrent inference across 6 GRACE/DOMINO model variants.",
        ],
        tags: ["FastAPI", "Next.js", "Redis", "Multi-GPU", "SSE"]
    },
    {
        role: "Software Developer · Mobile, Search & Data Platform",
        org: "Indian Institute of Technology Bombay",
        location: "Mumbai, India",
        date: "Dec 2021 – May 2022",
        points: [
            "Developed a Flutter Android/iOS app backed by Flask, Docker, and GCP serving 50,000+ vocabulary entries across 3 languages.",
            "Cut search p95 latency by 30% across 4 multilingual corpora with a MySQL inverted index and optimized Python ETL, schemas, and queries.",
            "Prototyped predictive-text and learning-analytics features, increasing lesson completion and understanding by 40%.",
        ],
        tags: ["Flutter", "Flask", "MySQL", "GCP", "Docker"]
    },
    {
        role: "Software Developer · Backend & Cloud Infrastructure",
        org: "Bharat Tyres Pvt. Ltd.",
        location: "Anand, India",
        date: "Sep 2020 – Sep 2021",
        points: [
            "Built Node.js/Next.js services on AWS EC2/ALB/RDS with PostgreSQL and Redis caching — 40% lower API p95 latency, 20% higher throughput.",
            "Implemented Docker/Kubernetes zero-downtime CI/CD and JWT/OAuth 2.0 service auth, reducing production downtime by 30%.",
        ],
        tags: ["Node.js", "AWS", "PostgreSQL", "Kubernetes", "OAuth 2.0"]
    },
];

function Experience() {
    return (
        <>
            <div className="font-medium relative text-2xl mt-2 md:mt-4 mb-4">
                Experience
                <div className="absolute pt-px bg-white mt-px top-full w-full">
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
                </div>
            </div>
            <ul className="w-10/12 mt-4 ml-4 px-0 md:px-1 space-y-6">
                {experience_list.map((exp, index) => (
                    <li key={index} className="list-disc">
                        <div className="flex flex-wrap justify-between items-baseline">
                            <div className="text-lg md:text-xl text-left font-bold leading-tight mr-2">{exp.org}</div>
                            <div className="text-gray-300 font-light text-sm">{exp.date}</div>
                        </div>
                        <div className="text-sm text-ubt-gedit-orange font-medium mt-0.5">{exp.role}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{exp.location}</div>
                        <ul className="tracking-normal leading-tight text-sm font-light ml-4 mt-2">
                            {exp.points.map((point, i) => <li key={i} className="list-disc mt-1 text-gray-100">{point}</li>)}
                        </ul>
                        <div className="flex flex-wrap gap-1 mt-2">
                            {exp.tags.map(t => (
                                <span key={t} className="px-2 py-0.5 bg-gray-700 bg-opacity-60 rounded text-xs text-gray-200">{t}</span>
                            ))}
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}
function Education() {
    return (
        <>
            <div className="font-medium relative text-2xl mt-2 md:mt-4 mb-4">
                Education
                <div className="absolute pt-px bg-white mt-px top-full w-full">
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
                </div>
            </div>
            <ul className="w-10/12 mt-4 ml-4 px-0 md:px-1 space-y-6">
                <li className="list-disc">
                    <div className="text-lg md:text-xl text-left font-bold leading-tight">
                        University of Florida
                    </div>
                    <div className="text-sm text-gray-400 mt-0.5">Master of Science · Computer Science · Aug 2022 – May 2024</div>
                    <div className="text-sm text-green-400 font-semibold mt-1">GPA 3.8 / 4.0</div>
                    <div className="mt-2 text-xs text-gray-300 font-medium uppercase tracking-wide">Relevant Coursework</div>
                    <div className="flex flex-wrap gap-1 mt-1">
                        {["Advanced Data Structures", "Operating Systems", "Distributed Computing", "Machine Learning", "Computer Vision", "Natural Language Processing", "Compilers", "Analysis of Algorithms"].map(c => (
                            <span key={c} className="px-2 py-0.5 bg-gray-700 bg-opacity-60 rounded text-xs text-gray-200">{c}</span>
                        ))}
                    </div>
                </li>
                <li className="list-disc">
                    <div className="text-lg md:text-xl text-left font-bold leading-tight">
                        Dharmsinh Desai University
                    </div>
                    <div className="text-sm text-gray-400 mt-0.5">Bachelor of Engineering · Computer Engineering · Aug 2018 – May 2022</div>
                    <div className="text-sm text-green-400 font-semibold mt-1">CGPA 8.9 / 10</div>
                    <div className="mt-2 text-xs text-gray-300 font-medium uppercase tracking-wide">Relevant Coursework</div>
                    <div className="flex flex-wrap gap-1 mt-1">
                        {["Data Structures & Algorithms", "Database Management", "Computer Networks", "Object-Oriented Programming", "Software Engineering", "Web Technologies", "Artificial Intelligence", "Cloud Computing"].map(c => (
                            <span key={c} className="px-2 py-0.5 bg-gray-700 bg-opacity-60 rounded text-xs text-gray-200">{c}</span>
                        ))}
                    </div>
                </li>
            </ul>
        </>
    )
}
function Skills() {
    return (
        <>
            <div className="font-medium relative text-2xl mt-2 md:mt-4 mb-4">
                Technical Skills
                <div className="absolute pt-px bg-white mt-px top-full w-full">
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
                </div>
            </div>
            <ul className="tracking-tight text-sm md:text-base w-10/12 emoji-list">
                <li className="list-arrow text-sm md:text-base mt-4 leading-tight tracking-tight">
                    Full-stack engineer with depth across <strong className="text-ubt-gedit-orange">systems programming, web development, and applied ML</strong>. Comfortable from bare-metal algorithms to cloud deployments.
                </li>
                <li className="list-arrow text-sm md:text-base mt-3 leading-tight tracking-tight">
                    Here's my current toolkit:
                </li>
            </ul>

            {/* Languages */}
            <div className="w-full md:w-10/12 mt-5">
                <div className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-2 pl-1">Languages</div>
                <div className="flex flex-wrap justify-start items-center gap-1 px-1">
                    <img className="m-0.5" src="https://img.shields.io/badge/-JavaScript-%23F7DF1C?style=flat&logo=javascript&logoColor=000000&labelColor=%23F7DF1C&color=%23FFCE5A" alt="JavaScript" />
                    <img className="m-0.5" src="https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white" alt="TypeScript" />
                    <img className="m-0.5" src="http://img.shields.io/badge/-Python-3776AB?style=flat&logo=python&logoColor=ffffff" alt="Python" />
                    <img className="m-0.5" src="https://img.shields.io/badge/Go-00ADD8?style=flat&logo=go&logoColor=white" alt="Go" />
                    <img className="m-0.5" src="https://img.shields.io/badge/SQL-4479A1?style=flat&logo=postgresql&logoColor=white" alt="SQL" />
                    <img className="m-0.5" src="https://img.shields.io/badge/Java-ED8B00?style=flat&logo=openjdk&logoColor=white" alt="Java" />
                    <img className="m-0.5" src="https://img.shields.io/badge/C%2B%2B-00599C?style=flat&logo=c%2B%2B&logoColor=white" alt="C++" />
                    <img className="m-0.5" src="https://img.shields.io/badge/Dart-0175C2?style=flat&logo=dart&logoColor=white" alt="Dart" />
                    <a href="https://www.google.com/search?q=is+html+a+language%3F" target="_blank" rel="noreferrer"><img title="yes it's a language!" className="m-0.5" src="https://img.shields.io/badge/-HTML5-%23E44D27?style=flat&logo=html5&logoColor=ffffff" alt="HTML5" /></a>
                    <img className="m-0.5" src="https://img.shields.io/badge/-Sass-%23CC6699?style=flat&logo=sass&logoColor=ffffff" alt="Sass" />
                </div>
            </div>

            {/* Frameworks & Libraries */}
            <div className="w-full md:w-10/12 mt-4">
                <div className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-2 pl-1">Frameworks & Libraries</div>
                <div className="flex flex-wrap justify-start items-center gap-1 px-1">
                    <img className="m-0.5" src="https://img.shields.io/badge/Next-black?style=flat&logo=next.js&logoColor=ffffff" alt="Next.js" />
                    <img className="m-0.5" src="https://img.shields.io/badge/-React-61DAFB?style=flat&logo=react&logoColor=ffffff" alt="React" />
                    <img className="m-0.5" src="https://img.shields.io/badge/Angular-DD0031?style=flat&logo=angular&logoColor=white" alt="Angular" />
                    <img className="m-0.5" src="https://img.shields.io/badge/Flutter-02569B?style=flat&logo=flutter&logoColor=white" alt="Flutter" />
                    <img className="m-0.5" src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
                    <img className="m-0.5" src="https://img.shields.io/badge/-Nodejs-339933?style=flat&logo=Node.js&logoColor=ffffff" alt="Node.js" />
                    <img className="m-0.5" src="https://img.shields.io/badge/FastAPI-009688?style=flat&logo=fastapi&logoColor=white" alt="FastAPI" />
                    <img className="m-0.5" src="https://img.shields.io/badge/Flask-000000?style=flat&logo=flask&logoColor=white" alt="Flask" />
                    <img className="m-0.5" src="https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white" alt="Express" />
                    <img className="m-0.5" src="https://img.shields.io/badge/Redux-593D88?style=flat&logo=redux&logoColor=white" alt="Redux" />
                    <img className="m-0.5" src="https://img.shields.io/badge/PyTorch-EE4C2C?style=flat&logo=pytorch&logoColor=white" alt="PyTorch" />
                </div>
            </div>

            {/* Tools & Infra */}
            <div className="w-full md:w-10/12 mt-4">
                <div className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-2 pl-1">Tools & Infrastructure</div>
                <div className="flex flex-wrap justify-start items-center gap-1 px-1">
                    <img className="m-0.5" src="https://img.shields.io/badge/-Git-%23F05032?style=flat&logo=git&logoColor=%23ffffff" alt="Git" />
                    <img className="m-0.5" src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat&logo=github-actions&logoColor=white" alt="GitHub Actions" />
                    <img className="m-0.5" src="https://img.shields.io/badge/-Firebase-FFCA28?style=flat&logo=firebase&logoColor=ffffff" alt="Firebase" />
                    <img className="m-0.5" src="https://img.shields.io/badge/MySQL-00000F?style=flat&logo=mysql&logoColor=white" alt="MySQL" />
                    <img className="m-0.5" src="https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white" alt="PostgreSQL" />
                    <img className="m-0.5" src="https://img.shields.io/badge/Redis-DC382D?style=flat&logo=redis&logoColor=white" alt="Redis" />
                    <img className="m-0.5" src="https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white" alt="MongoDB" />
                    <img className="m-0.5" src="https://img.shields.io/badge/Pinecone-000000?style=flat&logo=pinecone&logoColor=white" alt="Pinecone" />
                    <img className="m-0.5" src="https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white" alt="Docker" />
                    <img className="m-0.5" src="http://img.shields.io/badge/-Linux-0078D6?style=flat&logo=linux&logoColor=ffffff" alt="Linux" />
                    <img className="m-0.5" src="https://img.shields.io/badge/Kubernetes%20%2F%20K3s-326CE5?style=flat&logo=kubernetes&logoColor=white" alt="Kubernetes" />
                    <img className="m-0.5" src="https://img.shields.io/badge/Ansible-EE0000?style=flat&logo=ansible&logoColor=white" alt="Ansible" />
                    <img className="m-0.5" src="https://img.shields.io/badge/ArgoCD-EF7B4D?style=flat&logo=argo&logoColor=white" alt="ArgoCD" />
                    <img className="m-0.5" src="https://img.shields.io/badge/AWS-232F3E?style=flat&logo=amazonwebservices&logoColor=white" alt="AWS" />
                    <img className="m-0.5" src="https://img.shields.io/badge/GCP-4285F4?style=flat&logo=googlecloud&logoColor=white" alt="GCP" />
                    <img className="m-0.5" src="https://img.shields.io/badge/Azure-0078D4?style=flat&logo=microsoftazure&logoColor=white" alt="Azure" />
                    <img className="m-0.5" src="https://img.shields.io/badge/Nginx-009639?style=flat&logo=nginx&logoColor=white" alt="Nginx" />
                    <img className="m-0.5" src="https://img.shields.io/badge/Raspberry_Pi-A22846?style=flat&logo=raspberrypi&logoColor=white" alt="Raspberry Pi" />
                    <img className="m-0.5" src="https://img.shields.io/badge/Pytest-0A9EDC?style=flat&logo=pytest&logoColor=white" alt="Pytest" />
                    <img className="m-0.5" src="https://img.shields.io/badge/Sentry-362D59?style=flat&logo=sentry&logoColor=white" alt="Sentry" />
                    <img className="m-0.5" src="https://img.shields.io/badge/OpenTelemetry-000000?style=flat&logo=opentelemetry&logoColor=white" alt="OpenTelemetry" />
                </div>
            </div>
        </>
    )
}

// Featured projects — always shown first, above the live GitHub feed
const featured_projects = [
    {
        name: "CROWN — MRI Segmentation Suite",
        date: "2026",
        link: "https://crown-toolkit.vercel.app/",
        repo: "CROWN",
        description: [
            "Comprehensive Reconstruction Of Whole-head Neuromodulation: browser-based platform for automated 11-tissue whole-head MRI segmentation (10–60 s) and individualized tDCS current density modeling.",
            "FastAPI/Next.js app with Redis-backed multi-GPU orchestration across 6 GRACE/DOMINO model variants, SSE progress streaming, and the crown-cli package.",
        ],
        domains: ["FastAPI", "Next.js", "Redis", "PyTorch", "Medical Imaging"]
    },
    {
        name: "CROWN DICOM → NIfTI",
        date: "Oct 2026",
        link: "https://crown-dicom.vercel.app/",
        repo: "crown-dicom",
        description: [
            "Fully in-browser DICOM to NIfTI converter for CROWN using dcm2niix compiled to WebAssembly — patient data never leaves the machine.",
            "Series picker, de-identification options, JSON sidecars, and a built-in radiological slice viewer.",
        ],
        domains: ["WebAssembly", "dcm2niix", "JavaScript", "DICOM"]
    },
    {
        name: "medllm",
        date: "Oct 2026",
        link: "https://github.com/d3v-26/medllm",
        repo: "medllm",
        description: [
            "Share medical vision-language models (MedGemma, Lingshu, Qwen3-VL) on a multi-GPU machine with vLLM: free-GPU serving, idle shutdown, chat CLI, and a local API.",
        ],
        domains: ["Python", "vLLM", "Multi-GPU", "LLM"]
    },
    {
        name: "RecallKit",
        date: "Jul 2026",
        link: "http://pateldev.tech/RecallKit/",
        repo: "RecallKit",
        description: [
            "Local-first search engine for images, documents, tables, ebooks, audio, and video.",
        ],
        domains: ["TypeScript", "Search", "Local-first"]
    },
    {
        name: "AutoWiki",
        date: "Jul 2026",
        link: "http://pateldev.tech/AutoWiki/",
        repo: "AutoWiki",
        description: [
            "Turn any repository into a hosted architecture wiki on GitHub Pages.",
        ],
        domains: ["TypeScript", "LLM", "GitHub Pages"]
    },
    {
        name: "Cache Up",
        date: "Jul 2026",
        link: "http://pateldev.tech/cache-up-lite/",
        repo: "cache-up-lite",
        description: [
            "FastAPI/Next.js summarization and search system for Hacker News sustaining 100+ req/s at 99.9% uptime on a Raspberry Pi, with Pinecone vector search, MCP, and Sentry monitoring.",
        ],
        domains: ["FastAPI", "Next.js", "PostgreSQL", "Pinecone", "MCP"]
    },
    {
        name: "Affective MVPA Replication",
        date: "Jul 2026",
        link: "https://pateldev.tech/affective-mvpa-replication/",
        repo: "affective-mvpa-replication",
        description: [
            "Replication of Bo et al. (2021) — decoding neural representations of affective scenes in retinotopic visual cortex.",
        ],
        domains: ["Python", "fMRI", "MVPA", "Neuroscience"]
    },
    {
        name: "ADDiffusion",
        date: "May 2026",
        link: "https://github.com/d3v-26/addiffusion",
        repo: "addiffusion",
        description: [
            "Adaptive agent-based inference for diffusion models.",
        ],
        domains: ["Python", "PyTorch", "Diffusion", "Agents"]
    },
];

const project_list = [
    {
        name: "Ubuntu Themed Portfolio Website",
        date: "Apr 2024",
        link: "https://github.com/d3v-26/d3v-26.github.io",
        description: [
            "Ubuntu themed portfolio website built with Next.js and Tailwind CSS",
        ],
        domains: ["Next.js", "Tailwind CSS", "javascript"]
    },
    {
        name: "Walkie Talkie",
        date: "Apr 2025",
        link: "https://github.com/d3v-26/walkie-talkie",
        description: [
            "Simple walkie-talkie–style application written in Go that lets users on the same local network communicate using audio.",
        ],
        domains: ["GO", "UDP", "Audio Streaming"]
    },
    {
        name: "GatorTaxi",
        date: "Apr 2023",
        link: "https://github.com/d3v-26/GatorTaxi",
        description: [
            "Used Red-Black Trees & MinHeap for ride information storage using C++ from scratch",
        ],
        domains: ["C++", "MinHeap", "RedBlackTree"]
    },
    {
        name: "Compact Compiler",
        date: "Dec 2022",
        link: "https://github.com/d3v-26/Compiler-PLP-Project",
        description: [
            "Implement a complete compiler using Java and ASM for a user-defined language",
        ],
        domains: ["Java", "ASM"]
    },
    {
        name: "Distributed Concurrent Systems",
        date: "Aug 2023",
        link: "https://github.com/d3v-26/COP5615-Project3",
        description: [
            "Implemented a concurrent client-server system in F#",
        ],
        domains: ["F#", "Distributed Principles"]
    },
    {
        name: "Intermediate task transfer learning",
        date: "Apr 2023",
        link: "https://drive.google.com/file/d/1qhvBs44mK5bejG8WJHAC3k9GS7XnhP6a/view?usp=share_link",
        description: [
            "Implemented a task transfer learning project, for sarcasm detection, using transfer learning techniques from a related tasks such as sentiment detection, humor detection, irony detection etc",
        ],
        domains: ["Python", "PyTorch", "Multi-modal analysis", "NLP"]
    },
    {
        name: "GAN & VAE on MNIST",
        date: "Apr 2023",
        link: "https://github.com/d3v-26/GAN-VAE-MNIST",
        description: [
            "Implemented GAN and VAE on MNIST dataset.",
        ],
        domains: ["Python", "PyTorch", "GAN", "VAE"]
    },
    {
        name: "React Boilerplate",
        date: "Feb 2021",
        link: "https://github.com/d3v-26/react-boilerplate",
        description: [
            "Boilerplate code to get you started on your react project",
        ],
        domains: ["React", "javascript"]
    },
    {
        name: "HackerNews Feed",
        date: "Feb 2021",
        link: "https://github.com/d3v-26/hacker-feed",
        description: [
            "A side project to develop a pretty HackerNews Feed.",
        ],
        domains: ["javascript", "React", "Materialize"]
    },
    {
        name: "Automated Time Table Generator",
        date: "Sep 2022",
        link: "https://github.com/d3v-26/Automatic-Time-Table-Generator",
        description: [
            "An automated time table generator using genetic algorithms in java.",
        ],
        domains: ["Java", "JavaFX", "MySQL"]
    },
    {
        name: "Online Chatting",
        date: "Sep 2022",
        link: "https://github.com/d3v-26/Online-Chatting-Application",
        description: [
            "Online Chatting Application Using Angular.js",
        ],
        domains: ["Angular","TypeScript","SCSS"]
    }
];

// Deterministic palette — full class names so Tailwind JIT includes them
const TAG_PALETTE = [
    ["border-yellow-300", "text-yellow-300"],
    ["border-pink-400", "text-pink-400"],
    ["border-blue-400", "text-blue-400"],
    ["border-green-400", "text-green-400"],
    ["border-purple-400", "text-purple-400"],
    ["border-orange-300", "text-orange-300"],
    ["border-cyan-400", "text-cyan-400"],
    ["border-red-400", "text-red-400"],
    ["border-indigo-400", "text-indigo-400"],
    ["border-teal-400", "text-teal-400"],
    ["border-yellow-500", "text-yellow-500"],
    ["border-pink-500", "text-pink-500"],
    ["border-blue-300", "text-blue-300"],
    ["border-green-300", "text-green-300"],
    ["border-purple-300", "text-purple-300"],
    ["border-orange-400", "text-orange-400"],
    ["border-cyan-300", "text-cyan-300"],
    ["border-red-300", "text-red-300"],
    ["border-indigo-300", "text-indigo-300"],
    ["border-teal-300", "text-teal-300"],
];

function tagColor(tag) {
    let h = 0;
    for (let i = 0; i < tag.length; i++) h = (h * 31 + tag.charCodeAt(i)) >>> 0;
    return TAG_PALETTE[h % TAG_PALETTE.length];
}

function Projects() {
    const [projects, setProjects] = useState([...featured_projects, ...project_list]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://api.github.com/users/d3v-26/repos?sort=pushed&per_page=100', {
            headers: { Accept: 'application/vnd.github+json' }
        })
            .then(res => { if (!res.ok) throw new Error(); return res.json(); })
            .then(repos => {
                const featuredRepos = new Set(featured_projects.map(p => p.repo.toLowerCase()));
                const filtered = repos
                    .filter(r => !r.fork && r.description && !featuredRepos.has(r.name.toLowerCase()))
                    .map(r => ({
                        name: r.name.replace(/-/g, ' '),
                        date: new Date(r.pushed_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
                        link: r.html_url,
                        description: [r.description],
                        domains: [...(r.topics || []), r.language].filter(Boolean),
                    }));
                if (filtered.length > 0) setProjects([...featured_projects, ...filtered]);
            })
            .catch(() => { /* keep static fallback */ })
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            <div className=" font-medium relative text-2xl mt-2 md:mt-4 mb-4">
                Projects
                <div className="absolute pt-px bg-white mt-px top-full w-full">
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
                </div>
            </div>

            {loading && (
                <div className="text-gray-400 text-sm mt-2 mb-1">fetching projects from github...</div>
            )}

            {
                projects.map((project, index) => {
                    return (
                        <a key={index} href={project.link} target="_blank" rel="noreferrer" className="flex w-full flex-col px-4">
                            <div className="w-full py-1 px-2 my-2 border border-gray-50 border-opacity-10 rounded hover:bg-gray-50 hover:bg-opacity-5 cursor-pointer">
                                <div className="flex flex-wrap justify-between items-center">
                                    <div className='flex justify-center items-center'>
                                        <div className=" text-base md:text-lg mr-2">{project.name.toLowerCase()}</div>
                                        {project.repo && <span className="px-1.5 py-px text-xs rounded bg-ub-orange text-white">featured</span>}
                                    </div>
                                    <div className="text-gray-300 font-light text-sm">{project.date}</div>
                                </div>
                                <ul className=" tracking-normal leading-tight text-sm font-light ml-4 mt-1">
                                    {
                                        project.description.map((desc, index) => {
                                            return <li key={index} className="list-disc mt-1 text-gray-100">{desc}</li>;
                                        })
                                    }
                                </ul>
                                <div className="flex flex-wrap items-start justify-start text-xs py-2">
                                    {project.domains && project.domains.map((domain, index) => {
                                        const [borderClass, textClass] = tagColor(domain);
                                        return <span key={index} className={`px-1.5 py-0.5 w-max border ${borderClass} ${textClass} m-1 rounded-full`}>{domain}</span>;
                                    })}
                                </div>
                            </div>
                        </a>
                    )
                })
            }
        </>
    )
}
const publication_list = [
    {
        authors: "Acharya, C. K., Patel, D. R., et al.",
        year: "2026",
        title: "Comprehensive Reconstruction Of Whole-head Neuromodulation (CROWN): A Browser-Based Platform for Automated 11-Tissue MRI Segmentation and Individualized tDCS Current Density Modeling.",
        venue: "Accepted abstract, 2026 NYC Neuromodulation Conference",
        link: "https://crown-toolkit.vercel.app/",
    },
    {
        authors: "Stolte, S. E., Busch, T. A., Acharya, C. K., Patel, D. R., et al.",
        year: "2026",
        title: "GATOR-JMAPS: A Fully Automated tDCS Modeling Tool for Older Adults.",
        venue: "Accepted abstract and oral highlight, 2026 NYC Neuromodulation Conference",
    },
];

function Publications() {
    return (
        <>
            <div className="font-medium relative text-2xl mt-2 md:mt-4 mb-4">
                Publications
                <div className="absolute pt-px bg-white mt-px top-full w-full">
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
                </div>
            </div>
            <ul className="w-10/12 mt-4 ml-4 px-0 md:px-1 space-y-5">
                {publication_list.map((pub, index) => (
                    <li key={index} className="list-disc text-sm md:text-base leading-tight">
                        <div className="font-medium">
                            {pub.link ? <a className="hover:underline" href={pub.link} target="_blank" rel="noreferrer">{pub.title}</a> : pub.title}
                        </div>
                        <div className="text-gray-300 mt-1">{pub.authors} ({pub.year})</div>
                        <div className="text-ubt-gedit-orange text-sm mt-0.5 italic">{pub.venue}</div>
                    </li>
                ))}
            </ul>
        </>
    )
}
function Resume() {
    return (
        <iframe className="h-full w-full" src="https://d3v-26.github.io/resume/" title="Dev patel resume" frameBorder="0"></iframe>
    )
}