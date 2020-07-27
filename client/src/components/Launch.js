import React, { Component, Fragment } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import classNames from "classnames";
import ReactPlayer from "react-player/lazy";
import YouTube from "react-youtube";

const LAUNCH_QUERY = gql`
  query LaunchQuery($flight_number: Int!) {
    launch(flight_number: $flight_number) {
      flight_number
      mission_name
      launch_year
      launch_success
      launch_date_local
      details
      rocket {
        rocket_id
        rocket_name
        rocket_type
      }
      links {
        video_link
        youtube_id
      }
    }
  }
`;

export class Launch extends Component {
  render() {
    let { flight_number } = this.props.match.params;
    flight_number = parseInt(flight_number);
    return (
      <Fragment>
        <Query query={LAUNCH_QUERY} variables={{ flight_number }}>
          {({ loading, error, data }) => {
            if (loading) return <h4>loading...</h4>;
            if (error) console.log(error);

            console.log(data.launch);

            const {
              mission_name,
              flight_number,
              launch_year,
              launch_success,
              details,
              rocket: { rocket_id, rocket_name, rocket_type },
              links: { video_link, youtube_id }
            } = data.launch;

            const opts = {
              height: "500px",
              width: "100%"
            };

            return (
              <div>
                <h1 className="display-4 my-3">
                  <span className="text-dark">Mission: </span>
                  {mission_name}
                </h1>

                <YouTube
                  width="100%"
                  height="800px"
                  opts={opts}
                  videoId={youtube_id}
                />
                <br />
                <h4 className="mb-3">Launch Details</h4>
                <ul className="list-group">
                  <li className="list-group-item">
                    Flight Number: {flight_number}
                  </li>
                  <li className="list-group-item">
                    Launch Year: {launch_year}
                  </li>
                  <li className="list-group-item">
                    Launch Successful:{" "}
                    <span
                      className={classNames({
                        "text-success": launch_success,
                        "text-danger": !launch_success
                      })}
                    >
                      {launch_success ? "yes" : "No"}
                    </span>
                  </li>
                  <li className="list-group-item">Details: {details}</li>
                </ul>

                <h4 className="my-3">Rocket Details</h4>
                <ul className="list-group">
                  <li className="list-group-item">Rocket ID: {rocket_id}</li>
                  <li className="list-group-item">
                    Rocket Name: {rocket_name}
                  </li>
                  <li className="list-group-item">
                    Rocket Type: {rocket_type}
                  </li>
                </ul>
                <hr />
                <Link to="/" className="btn btn-secondary">
                  Back
                </Link>
                <br />
                <br />
              </div>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

export default Launch;
