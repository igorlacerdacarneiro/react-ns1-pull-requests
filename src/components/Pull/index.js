import "./index.scss"
import React, { useState } from "react"
import moment from "moment"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCodePullRequest, faMessage } from "@fortawesome/free-solid-svg-icons"

const Pull = ({ pr }) => {
  const [isHover, setIsHover] = useState(false)

  const handleMouseEnter = () => {
    setIsHover(true)
  }

  const handleMouseLeave = () => {
    setIsHover(false)
  }

  const boxStyle = {
    backgroundColor: isHover ? "#f6f8fa" : "",
  }

  const handleDateChange = (date) => {
    const today = moment(new Date())
    const data = moment(date)

    if (today.diff(data, "hour") > 23) {
      return `${today.diff(data, "days")} days ago`
    }

    if (today.diff(data, "minutes") > 59) {
      return `${today.diff(data, "hour")} hours ago`
    }

    if (today.diff(data, "seconds") > 59) {
      return `${today.diff(data, "minutes")} minutes ago`
    }

    return `${today.diff(data, "seconds")} seconds ago`
  }

  return (
    <>
      <div
        className="pull"
        style={boxStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={pr.user.avatar_url}
          alt={`${pr.user.login}'s avatar`}
        />
        <FontAwesomeIcon icon={faCodePullRequest} />
        <div className="pull-infos">
          <div>
            <span className="pull-info-title">{pr.title}</span>
            {pr.labels.map((lb) => (
              <span
                className="pull-info-labels"
                style={{ backgroundColor: `#${lb.color}` }}
              >
                {lb.name}
              </span>
            ))}
          </div>
          <div className="pull-info-others">
            <span>
              #{pr.number} {pr.state} {handleDateChange(pr.created_at)} by{" "}
              {pr.user.login}
            </span>
          </div>
        </div>
        <div className="pull-messages">
          <FontAwesomeIcon icon={faMessage} />
          <span>{pr.comments}</span>
        </div>
      </div>
    </>
  )
}

export default Pull
