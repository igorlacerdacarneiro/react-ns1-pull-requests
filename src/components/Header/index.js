import "./index.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"

const Header = () => {
  return (
    <>
      <div className="header">
        <FontAwesomeIcon
          icon={faGithub}
          color="#FFF"
        />
      </div>
    </>
  )
}

export default Header
