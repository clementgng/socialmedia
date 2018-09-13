/* Profileheader.js -- Profile Header contains the user's profile picture,
name, location, company, and their social media links
*/
import React from "react";
import isEmpty from "../../validation/is-empty";

class ProfileHeader extends React.Component {
  render() {
    const { profile } = this.props;
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-primary text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img
                  className="rounded-circle"
                  src={profile.user.profilePicture}
                  alt=""
                />
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center">
                {profile.user.firstName} {profile.user.lastName}
              </h1>
              <p className="lead text-center">
                {profile.status}{" "}
                {isEmpty(profile.company) ? null : (
                  <span>at {profile.company}</span>
                )}
              </p>
              <p>
                {isEmpty(profile.location) ? null : (
                  <span>{profile.location}</span>
                )}
              </p>
              <p>
                {isEmpty(profile.website) ? null : (
                  <a className="text-white p-2" href={profile.website}>
                    <img
                      alt="website"
                      src="https://img.freepik.com/free-icon/world-wide-web-on-grid_318-39147.jpg?size=50c&ext=jpg"
                      style={{ width: "50px", height: "50px" }}
                    />
                  </a>
                )}

                {isEmpty(
                  profile.socialmedialinks && profile.socialmedialinks.twitter
                ) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.socialmedialinks.twitter}
                  >
                    <img
                      alt="twitter"
                      src="https://seeklogo.com/images/T/twitter-2012-positive-logo-916EDF1309-seeklogo.com.png"
                      style={{ width: "50px", height: "50px" }}
                    />
                  </a>
                )}
                {isEmpty(
                  profile.socialmedialinks && profile.socialmedialinks.facebook
                ) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.socialmedialinks.facebook}
                  >
                    <img
                      alt="facebook"
                      src="https://en.facebookbrand.com/wp-content/uploads/2016/05/flogo_rgb_hex-brc-site-250.png"
                      style={{ width: "50px", height: "50px" }}
                    />
                  </a>
                )}
                {isEmpty(
                  profile.socialmedialinks && profile.socialmedialinks.linkedin
                ) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.socialmedialinks.linkedin}
                  >
                    <img
                      alt="linkedin"
                      src="https://seeklogo.com/images/L/linkedin-in-icon-logo-2E34704F04-seeklogo.com.png"
                      style={{ width: "50px", height: "50px" }}
                    />
                  </a>
                )}
                {isEmpty(
                  profile.socialmedialinks && profile.socialmedialinks.instagram
                ) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.socialmedialinks.instagram}
                  >
                    <img
                      alt="instagram"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8am-JexrgXooBpwupowymwJduXNSpL4XAtpvR0eOWUpVjVSW8Pw"
                      style={{ width: "50px", height: "50px" }}
                    />
                  </a>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
