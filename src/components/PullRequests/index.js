import "./index.scss"
import React, { useState, useEffect } from "react"
import axios from "axios"
import Pull from "../Pull"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCodePullRequest,
  faCheck,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons"
import Spinner from "../Spinner"
import Pagination from "../Pagination"

const PullRequests = () => {
  const [pullRequests, setPullRequests] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    // Fetch data from GitHub API
    setIsLoading(true)
    axios
      .get("https://api.github.com/repos/facebook/react/pulls")
      .then((response) => {
        // Fetch comments for each pull request
        const requestsWithComments = response.data.map((pr) =>
          axios.get(
            `https://api.github.com/repos/facebook/react/pulls/${pr.number}/comments`
          )
        )

        // Resolve all comment requests
        Promise.all(requestsWithComments)
          .then((commentsData) => {
            const pullRequestsWithComments = response.data.map((pr, index) => ({
              ...pr,
              comments: commentsData[index].data.length,
            }))
            setPullRequests(pullRequestsWithComments)
            setIsLoading(false)
          })
          .catch((error) => {
            setIsLoading(false)
            console.error("Error fetching comments: ", error)
          })
      })
      .catch((error) => {
        console.error("Error fetching pull requests: ", error)
        setErrorMessage("Error fetching pull requests: ", error.message)
        setIsLoading(false)
      })
  }, [])

  const filteredPullRequests = pullRequests.filter((pr) => {
    return pr.title.toLowerCase().includes(searchQuery.toLowerCase())
  })

  const renderPulls = (
    <>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Pull Requests..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="container-pulls">
        <div className="pulls-top">
          <div style={{ flex: 1 }}>
            <FontAwesomeIcon
              icon={faCodePullRequest}
              color="#656d76"
            />
            <span style={{ color: "#656d76" }}>414 Open</span>
            <FontAwesomeIcon icon={faCheck} />
            <span>13,585 Closed</span>
          </div>
          <div className="pulls-menu">
            <span>
              Author
              <FontAwesomeIcon icon={faCaretDown} />
            </span>
            <span>
              Label
              <FontAwesomeIcon icon={faCaretDown} />
            </span>
            <span>
              Projects
              <FontAwesomeIcon icon={faCaretDown} />
            </span>
            <span>
              Milestone
              <FontAwesomeIcon icon={faCaretDown} />
            </span>
            <span>
              Reviews
              <FontAwesomeIcon icon={faCaretDown} />
            </span>
            <span>
              Assignee
              <FontAwesomeIcon icon={faCaretDown} />
            </span>
            <span>
              Short
              <FontAwesomeIcon icon={faCaretDown} />
            </span>
          </div>
        </div>
        {filteredPullRequests.map((pr) => (
          <Pull pr={pr} />
        ))}
      </div>
      <Pagination
        totalPages={1}
        currentPage={1}
        onPageChange={1}
      />
    </>
  )

  return (
    <div className="container">
      <div className="container-pulls-top">
        <div>
          <span>
            facebook / <b>react</b>
          </span>
        </div>
      </div>
      {isLoading ? <Spinner /> : renderPulls}
      {errorMessage && <div className="error">{errorMessage}</div>}
    </div>
  )
}

export default PullRequests
