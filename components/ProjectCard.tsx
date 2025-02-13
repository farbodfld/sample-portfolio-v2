import Image from "next/image";

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

export default function ProjectCard({
  title,
  description,
  imageUrl,
}: ProjectCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-700">
      <Image
        src={imageUrl}
        alt={title}
        width={500}
        height={300}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold dark:text-white">{title}</h3>
        <p className="mt-2 text-gray-700 dark:text-gray-300">{description}</p>
      </div>
    </div>
  );
}
