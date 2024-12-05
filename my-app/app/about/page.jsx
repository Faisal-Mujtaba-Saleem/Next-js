import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const About = () => {
  return (
    <div className="bg-gradient-to-r from-purple-400 to-blue-500 h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg xl:w-1/2 w-full xl:max-h-[80vh] h-full xl:overflow-visible overflow-y-auto overflow-x-hidden">
        <div className="rounded-full size-40 bg-blue-500 relative m-auto">
          {/* <img className='absolute rounded-full' src="https://media.licdn.com/dms/image/v2/D4D35AQHCFdnVrGOcQQ/profile-framedphoto-shrink_200_200/profile-framedphoto-shrink_200_200/0/1729164242836?e=1729940400&v=beta&t=m_-_2Mq7I1ZXtbfk8uWBnm5IIJVzMytWjGA1md1VIZ8" alt="Faisal Dev" /> */}
          <Image
            className='rounded-full'
            fill={true}
            src="https://media.licdn.com/dms/image/v2/D4D35AQHCFdnVrGOcQQ/profile-framedphoto-shrink_200_200/profile-framedphoto-shrink_200_200/0/1729164242836?e=1730617200&v=beta&t=NIz3ZKxT0NQhOAkS_z9bbOUeBy1Oo73XqCQ0kR1WTvo" alt="Faisal Dev" />
        </div>
        <h1 className="text-4xl font-bold my-4">About Me</h1>
        <p className="text-xl my-4">
          Hi, my name is <span className="font-bold">Faisal Mujtaba Saleem</span>. I am a software engineer and a passionate web developer.
        </p>
        <p className="text-xl my-4">
          I have been coding for over 5 years and have a strong background in web development. I am currently working as a freelance web developer.
        </p>
        <p className="text-xl my-4">
          I am always looking for new projects and opportunities to work with other developers. If you have a project in mind, feel free to reach out to me.
        </p>
        <div className="flex justify-center my-4">
          <Link href="https://github.com/Faisal-Mujtaba-Saleem" target='_blank' className="text-xl font-bold text-blue-500 hover:text-blue-700 text-center">
            <i className="fab fa-github mr-2"></i>
            View my GitHub
          </Link>
        </div>
      </div>
    </div>
  )
}

export default About

export const metadata = {
  title: "About - About Page of My first Next.js app",
  description: "This is the About page of my first Next.js app",
};
