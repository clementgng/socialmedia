/* ProfileExpEdu.js -- Contains the user's work experience
and education listed from most recent user submitted experience/education
*/
import React from "react";
import Moment from "react-moment";

class ProfileExpEdu extends React.Component {
  render() {
    const { experience, education } = this.props;
    const expItems = experience.map(exp => (
      <li key={exp._id} className="list-group-item">
        <h4>{exp.company}</h4>
        <p>
          <Moment format="MM/DD/YYYY">{exp.from}</Moment> -
          {exp.to === null ? (
            " Present"
          ) : (
            <Moment format="MM/DD/YYYY">{exp.to}</Moment>
          )}
        </p>
        <p>
          <strong>Position:</strong> {exp.title}
        </p>
        <p>
          {exp.location === "" ? null : (
            <span>
              <strong>Location: </strong> {exp.location}
            </span>
          )}
        </p>
        <p>
          {exp.description === "" ? null : (
            <span>
              <strong>Description: </strong> {exp.description}
            </span>
          )}
        </p>
      </li>
    ));

    const eduItems = education.map(edu => (
      <li key={edu._id} className="list-group-item">
        <h4>{edu.school}</h4>
        <p>
          <Moment format="MM/DD/YYYY">{edu.from}</Moment> -
          {edu.current === true ? (
            " Present"
          ) : (
            <Moment format="MM/DD/YYYY">{edu.to}</Moment>
          )}
        </p>
        <p>
          <strong>Degree:</strong> {edu.degree}
        </p>
        <p>
          <strong>Field Of Study:</strong> {edu.fieldofstudy}
        </p>
        <p>
          {edu.description === "" ? null : (
            <span>
              <strong>Description: </strong> {edu.description}
            </span>
          )}
        </p>
      </li>
    ));

    return (
      <div className="row">
        <div className="col-md-6">
          {expItems.length > 0 ? (
            <span>
              <h3 className="text-center text-info">Experience</h3>
              <ul className="list-group">{expItems}</ul>
            </span>
          ) : null}
        </div>
        <div className="col-md-6">
          {eduItems.length > 0 ? (
            <span>
              <h3 className="text-center text-info">Education</h3>
              <ul className="list-group">{eduItems}</ul>
            </span>
          ) : null}
        </div>
      </div>
    );
  }
}

export default ProfileExpEdu;
