import {
  FaYoutube,
  FaGithub,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

export const YouTubeLink =
  "https://www.youtube.com/channel/UCMsxbz4QS32ZqIrMSNcMH7Q";
const GitHubLink = "https://github.com/m3hransh";
const LinkedIn = "https://www.linkedin.com/in/mohammad-mehran-shahidi";

const TwitterLink = "https://twitter.com/Mehran87049642";
export default function SocialFollow() {
  return (
    <div className="flex items-baseline space-x-3 justify-center  ">
      <a target="_blank" rel="noreferrer" href={YouTubeLink}>
        <FaYoutube className="h-10 w-10 socialIcon" />
      </a>
      <a target="_blank" rel="noreferrer" href={GitHubLink}>
        <FaGithub className="h-10 w-10 socialIcon" />
      </a>
      <a target="_blank" rel="noreferrer" href={LinkedIn}>
        <FaLinkedinIn className="h-10 w-10 socialIcon" />
      </a>
      <a target="_blank" rel="noreferrer" href={TwitterLink}>
        <FaTwitter className="h-10 w-10 socialIcon" />
      </a>
    </div>
  );
}
